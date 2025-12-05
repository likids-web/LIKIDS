"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";

export default function SignupPage() {
    const [role, setRole] = useState<'parent' | 'student'>('parent');

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Join LiKids</h1>

            <div className={styles.roleSelector}>
                <button
                    className={`${styles.roleBtn} ${role === 'parent' ? styles.active : ''}`}
                    onClick={() => setRole('parent')}
                >
                    Parent
                </button>
                <button
                    className={`${styles.roleBtn} ${role === 'student' ? styles.active : ''}`}
                    onClick={() => setRole('student')}
                >
                    Student
                </button>
            </div>

            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <Input label="Full Name" placeholder="Enter your name" />
                <Input label="Email" type="email" placeholder="hello@example.com" />
                <Input label="Password" type="password" placeholder="Min. 8 characters" />
                <Input label="Phone" type="tel" placeholder="010-1234-5678" />
                <Input label="Birthday" type="date" />

                <div style={{ height: '1rem' }}></div>
                <Button>Sign Up</Button>
            </form>

            <p className={styles.footerText}>
                Already have an account? <Link href="/login" className={styles.link}>Log in</Link>
            </p>
        </div>
    );
}
