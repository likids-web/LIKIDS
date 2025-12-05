import { api } from "@/lib/api";
import styles from "./page.module.css";
import ProgramHero from "@/components/ProgramHero";
import ActionArea from "@/components/ActionArea";
import VideoGallery from "@/components/VideoGallery";
import ReviewList from "@/components/ReviewList";
import ReviewForm from "@/components/ReviewForm";
import { notFound } from "next/navigation";

// Correct Next.js App Router Props for Page
interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProgramDetailPage({ params }: PageProps) {
    const { id } = await params;
    const program = await api.getProgramById(id);

    if (!program) {
        notFound();
    }

    const reviews = await api.getReviewsByProgramId(id);

    return (
        <div className={styles.container}>
            <ProgramHero program={program} />

            <div className={styles.description}>
                <h3>About this Activity</h3>
                <p>{program.description}</p>
            </div>

            {/* Dynamic Content based on Status */}
            {program.status === 'completed' && (
                <>
                    <VideoGallery videoUrl={program.videoUrl} />
                    <ReviewForm programId={id} />
                    <ReviewList reviews={reviews} />
                </>
            )}

            <ActionArea status={program.status} programId={id} />
        </div>
    );
}
