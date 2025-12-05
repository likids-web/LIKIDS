import Link from "next/link";
import { api } from "@/lib/api";
import styles from "./page.module.css";
import Button from "@/components/Button";

export default async function AdminProgramsPage() {
    const programs = await api.getPrograms();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Program Management</h1>
                <Link href="/admin/programs/create">
                    <Button>+ New Program</Button>
                </Link>
            </div>

            <div className={styles.list}>
                {programs.map((program) => (
                    <div key={program.id} className={styles.item}>
                        <div className={styles.info}>
                            <div className={styles.programTitle}>{program.title}</div>
                            <div className={styles.meta}>
                                <span className={`${styles.badge} ${styles[program.status]}`}>
                                    {program.status}
                                </span>
                                <span>{new Date(program.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <Link href={`/admin/programs/${program.id}/manage`}>
                            <Button variant="outline" style={{ fontSize: '0.8rem', padding: '0.5rem' }}>
                                Manage
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
