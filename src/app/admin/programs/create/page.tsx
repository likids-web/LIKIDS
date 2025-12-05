"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import styles from "./page.module.css";
import { createProgramAction } from "@/app/actions";

export default function CreateProgramPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        // Call Server Action
        try {
            await createProgramAction(formData);
            alert("Program created successfully!");
            router.push("/admin/programs");
            router.refresh(); // Refresh server components
        } catch (err) {
            console.error(err);
            alert("Failed to create program");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create New Program</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <Input name="title" label="Program Title" placeholder="e.g. Forest Adventure" required />

                <div className={styles.row}>
                    <Input name="date" label="Date" type="datetime-local" required />
                    <Input name="location" label="Location" placeholder="e.g. Seoul Forest" required />
                </div>

                <div className={styles.row}>
                    <Input name="price" label="Price (KRW)" type="number" placeholder="30000" required />
                    <Input name="maxParticipants" label="Max Participants" type="number" placeholder="10" required />
                </div>

                <Input name="description" label="Description" placeholder="Describe the activity..." required />
                <Input name="thumbnail" label="Thumbnail URL" placeholder="https://..." defaultValue="https://images.unsplash.com/photo-1596464716127-f9a8f4e24390?q=80&w=800" />

                <div className={styles.actions}>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Program"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
