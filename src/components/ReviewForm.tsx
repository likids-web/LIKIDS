"use client";

import { useState } from 'react';
import styles from './ReviewForm.module.css';
import Button from './Button';
import { submitReviewAction } from '@/app/actions';

import { useSession } from "next-auth/react";

interface Props {
    programId: string;
}

export default function ReviewForm({ programId }: Props) {
    const { data: session } = useSession();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.id) return;

        setLoading(true);
        await submitReviewAction(programId, session.user.id, rating, comment);
        setComment("");
        setLoading(false);
        alert("Review Submitted!");
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h3>Write a Review</h3>

            <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map(star => (
                    <button
                        key={star}
                        type="button"
                        className={`${styles.star} ${star <= rating ? styles.active : ''}`}
                        onClick={() => setRating(star)}
                    >
                        ★
                    </button>
                ))}
            </div>

            <textarea
                className={styles.textarea}
                placeholder="How was the experience?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
            />

            <Button type="submit" disabled={loading || !session?.user}>
                {loading ? "Posting..." : (session?.user ? "Post Review" : "Login to Review")}
            </Button>
        </form>
    );
}
