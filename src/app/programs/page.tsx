import { PrismaClient } from "@prisma/client";
import ProgramCard from "@/components/ProgramCard";
import styles from "./page.module.css";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic'; // Ensure fresh data

export default async function ProgramsPage() {
    const programsData = await prisma.program.findMany({
        orderBy: { date: 'asc' }
    });

    const programs = programsData.map(p => ({
        ...p,
        date: p.date.toISOString(),
        images: p.images ? JSON.parse(p.images) : [],
        status: p.status as any,
        videoUrl: p.videoUrl || undefined
    }));

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Explore Programs</h1>
                <p className={styles.subtitle}>Discover exciting activities for your kids</p>
            </header>

            {programs.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No programs available at the moment.</p>
                    <p>Please check back later!</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {programs.map((program) => (
                        <ProgramCard key={program.id} program={program} />
                    ))}
                </div>
            )}
        </div>
    );
}
