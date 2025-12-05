"use client";
import Link from "next/link";

import styles from "./layout.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const loading = status === "loading";

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace('/login');
        } else if (status === "authenticated" && session?.user?.role !== 'admin') {
            router.replace('/login');
        }
    }, [status, session, router]);

    if (loading || !session?.user || session.user.role !== 'admin') return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Admin Dashboard...</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.brand}>LiKids Admin</div>
                <nav className={styles.nav}>
                    <Link href="/admin/programs" className={styles.link}>
                        Programs
                    </Link>
                    <Link href="/" className={styles.link}>
                        View Site
                    </Link>
                </nav>
            </header>
            <main className={styles.main}>{children}</main>
        </div>
    );
}
