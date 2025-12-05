"use client";

import styles from "./page.module.css";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <p className={styles.subtitle}>Welcome back to LiKids</p>

            <form className={styles.form}>
                <Input label="Email" placeholder="your@email.com" type="email" />
                <Input label="Password" placeholder="******" type="password" />
                <Button fullWidth>Sign In</Button>
            </form>

            <div className={styles.divider}>Or continue with</div>

            <div className={styles.socialButtons}>
                <button className={styles.kakaoBtn} onClick={() => signIn('kakao', { callbackUrl: '/' })}>
                    Sign in with Kakao
                </button>
                <button className={styles.googleBtn} onClick={() => signIn('google', { callbackUrl: '/' })}>
                    Sign in with Google
                </button>
            </div>

            <p className={styles.footerText}>
                Don't have an account? <Link href="/signup">Sign up</Link>
            </p>
        </div>
    );
}
