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
                        {applications.length === 0 && <p>No applications yet.</p>}
                        {applications.map((app: any) => (
                            <div key={app.id} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    <span className={styles.programId}>Program: {app.programId}</span>
                                    <span className={`${styles.badge} ${styles[app.status]}`}>{app.status}</span>
                                </div>
                                <p className={styles.date}>Applied: {new Date(app.appliedAt).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
