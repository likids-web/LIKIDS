import { Program } from '@/types';
import styles from './ProgramHero.module.css';

interface ProgramHeroProps {
    program: Program;
}

export default function ProgramHero({ program }: ProgramHeroProps) {
    return (
        <section className={styles.hero}>
            <div className={styles.imageWrapper}>
                <img src={program.thumbnail} alt={program.title} className={styles.image} />
            </div>

            <h1 className={styles.title}>{program.title}</h1>

            <div className={styles.meta}>
                <div className={styles.row}>
                    <span>🗓</span>
                    <span>{new Date(program.date).toLocaleString()}</span>
                </div>
                <div className={styles.row}>
                    <span>📍</span>
                    <span>{program.location}</span>
                </div>
                <div className={styles.row}>
                    <span>👥</span>
                    <span>{program.currentParticipants} / {program.maxParticipants} Joined</span>
                </div>
            </div>

            <div className={styles.price}>
                ₩{program.price.toLocaleString()}
            </div>
        </section>
    );
}
