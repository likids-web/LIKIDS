"use client";

import Link from 'next/link';
import styles from "./Navbar.module.css";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.brand}>LiKids</Link>
            <Link href="/programs" style={{ marginLeft: '1rem', fontWeight: 500 }}>Programs</Link>

            <div className={styles.menu}>
                {user ? (
                    <div className={styles.userMenu}>
                        {user.role === 'admin' && (
                            <Link href="/admin/programs" className={styles.adminLink}>Admin</Link>
                        )}
                        {user.role === 'parent' && (
                            <Link href="/profile" className={styles.profileLink}>My Page</Link>
                        )}
                        <button onClick={() => signOut()} className={styles.logoutBtn}>Logout</button>
                    </div>
                ) : (
                    <Link href="/login" className={styles.loginBtn}>Login</Link>
                )}
            </div>
        </nav>
    );
}
