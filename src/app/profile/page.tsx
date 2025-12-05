"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { getMyApplicationsAction } from '@/app/actions';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/login');
            return;
        }

        const fetchApps = async () => {
            if (session?.user?.id) {
                try {
                    const apps = await getMyApplicationsAction(session.user.id);
                    setApplications(apps);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        };
        if (status === "authenticated") {
            fetchApps();
        }
    }, [status, session, router]);

    if (status === "loading" || !session?.user) return <p>Loading...</p>;

    const user = session.user;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>My Page</h1>
                <div className={styles.userInfo}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>

            <div className={styles.section}>
                <h2>My Applications</h2>
                {loading ? <p>Loading...</p> : (
                    <div className={styles.list}>
                        {applications.length === 0 && <p className={styles.empty}>No applications yet.</p>}
                        {applications.map((app: any) => (
                            <div key={app.id} className={styles.item}>
                                <div className={styles.thumbnail}>
                                    <img src={app.program.thumbnail} alt={app.program.title} />
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.itemHeader}>
                                        <h3 className={styles.programTitle}>{app.program.title}</h3>
                                        <span className={`${styles.badge} ${styles[app.status]}`}>{app.status}</span>
                                    </div>
                                    <p className={styles.date}>Event Date: {new Date(app.program.date).toLocaleDateString()}</p>
                                    <p className={styles.appliedDate}>Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
