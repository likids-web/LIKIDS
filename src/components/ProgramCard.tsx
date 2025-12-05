import Link from 'next/link';
import { Program } from '@/types';
import styles from './ProgramCard.module.css';

interface ProgramCardProps {
    program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
    return (
        <Link href={`/programs/${program.id}`} className={styles.card}>
            <div className={styles.thumbnailWrapper}>
                <img
                    src={program.thumbnail}
                    alt={program.title}
                    className={styles.image}
                    loading="lazy"
                />
                <span className={`${styles.badge} ${styles[`status-${program.status}`]}`}>
                    {program.status}
                </span>
            </div>
            <div className={styles.content}>
                <div className={styles.meta}>
                    <span>{new Date(program.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{program.location}</span>
                </div>
                <h3 className={styles.title}>{program.title}</h3>
                <div className={styles.price}>
                    ₩{program.price.toLocaleString()}
                </div>
            </div>
        </Link>
    );
}
