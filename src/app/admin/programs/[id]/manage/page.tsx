import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { updateProgramStatusAction, updateProgramVideoAction } from "@/app/actions";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ManageProgramPage({ params }: PageProps) {
    const { id } = await params;
    const program = await api.getProgramById(id);

    if (!program) {
        notFound();
    }

    const applicants = await api.getApplicationsByProgramId(id);

    return (
        <div className={styles.container}>
            <Link href="/admin/programs" className={styles.backLink}>← Back to Programs</Link>

            <div className={styles.header}>
                <h1 className={styles.title}>Manage: {program.title}</h1>
                <div className={`${styles.badge} ${styles[program.status]}`}>{program.status}</div>
            </div>

            <div className={styles.grid}>
                {/* Card: Status Management */}
                <div className={styles.card}>
                    <h2>Program Status</h2>
                    <p className={styles.description}>Update the lifecycle of this program.</p>

                    <div className={styles.actions}>
                        {program.status === 'recruiting' && (
                            <form action={async () => {
                                "use server";
                                await updateProgramStatusAction(program.id, 'active');
                            }}>
                                <Button variant="secondary" type="submit">Start Program (Set Active)</Button>
                            </form>
                        )}
                        {program.status === 'active' && (
                            <form action={async () => {
                                "use server";
                                await updateProgramStatusAction(program.id, 'completed');
                            }}>
                                <Button variant="outline" type="submit">Complete Program</Button>
                            </form>
                        )}
                        {program.status === 'completed' && (
                            <p>Program completed. <Link href={`/programs/${program.id}`}>View Page</Link></p>
                        )}
                    </div>
                    {/* Content Injection Area */}
                    {program.status !== 'recruiting' && (
                        <form action={async (formData) => {
                            "use server";
                            const videoUrl = formData.get('videoUrl') as string;
                            await updateProgramVideoAction(program.id, videoUrl);
                        }} className={styles.contentForm}>
                            <h3>Post-Event Content</h3>
                            <Input name="videoUrl" label="Highlights Video URL" placeholder="https://..." defaultValue={program.videoUrl} />
                            <Button type="submit" style={{ marginTop: '0.5rem' }}>Update Content</Button>
                        </form>
                    )}
                </div>

                {/* Card: Applicants */}
                <div className={styles.card}>
                    <h2>Applicants ({applicants.length})</h2>
                    <div className={styles.applicantList}>
                        {applicants.map(app => (
                            <div key={app.id} className={styles.applicantItem}>
                                <div className={styles.applicantInfo}>
                                    <span className={styles.name}>{app.userName}</span>
                                    <span className={styles.date}>{app.appliedAt}</span>
                                </div>
                                <div className={styles.applicantActions}>
                                    {app.status === 'pending' ? (
                                        <>
                                            <button className={styles.approveBtn}>Approve</button>
                                            <button className={styles.rejectBtn}>Reject</button>
                                        </>
                                    ) : (
                                        <span className={styles.statusLabel}>{app.status}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
