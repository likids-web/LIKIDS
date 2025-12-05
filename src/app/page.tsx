import ProgramCard from "@/components/ProgramCard";
import { api } from "@/lib/api";
import styles from "./page.module.css";

export default async function Home() {
  const programs = await api.getPrograms();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Explore Programs</h1>
        <p>Find the best activities for your child</p>
      </header>

      <div className={styles.grid}>
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
}
