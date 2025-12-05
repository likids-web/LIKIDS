import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <span>Terms</span>
                <span>Privacy</span>
                <span>Contact</span>
            </div>
            <p>&copy; {new Date().getFullYear()} LiKids. All rights reserved.</p>
        </footer>
    );
}
