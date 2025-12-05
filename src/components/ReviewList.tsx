import { Review } from '@/types';
import styles from './ReviewList.module.css';

interface ReviewListProps {
    reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Parent Reviews ({reviews.length})</h2>
            {reviews.length === 0 ? (
                <p>No reviews yet. Be the first!</p>
            ) : (
                reviews.map(review => (
                    <div key={review.id} className={styles.reviewItem}>
                        <div className={styles.reviewHeader}>
                            <span className={styles.user}>{review.userName}</span>
                            <span className={styles.date}>{new Date(review.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className={styles.rating}>
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                        <p className={styles.comment}>{review.comment}</p>
                    </div>
                ))
            )}
        </section>
    );
}
