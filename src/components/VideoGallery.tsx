import styles from './VideoGallery.module.css';

interface VideoGalleryProps {
    videoUrl?: string; // Simple single video for now
}

export default function VideoGallery({ videoUrl }: VideoGalleryProps) {
    if (!videoUrl) return null;

    return (
        <section className={styles.gallery}>
            <h2 className={styles.heading}>
                <span>🎥</span> Activity Highlights
            </h2>
            <div className={styles.videoWrapper}>
                <video controls className={styles.video}>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    );
}
