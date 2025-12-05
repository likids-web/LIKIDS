"use client";

import { useState } from 'react';
import styles from './ApplicationModal.module.css';
import Button from './Button';
import Input from './Input';
import { submitApplicationAction } from '@/app/actions';

interface Props {
    programId: string;
    onClose: () => void;
    userId: string; // Add userId prop
    userName: string; // Add userName prop
}

export default function ApplicationModal({ programId, onClose, userId, userName }: Props) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await submitApplicationAction(programId, userId, userName);
            alert("Application Submitted!");
            onClose();
        } catch (e) {
            alert("Failed to submit");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Apply for Experience</h2>
                <p>Please confirm your details below.</p>

                <div className={styles.form}>
                    <Input label="Student Name" placeholder="Child's Name" />
                    <Input label="Age" placeholder="e.g. 7" type="number" />
                    <Input label="Parent Phone" defaultValue="010-1234-5678" readOnly />

                    <div className={styles.actions}>
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Submitting...' : 'Confirm Application'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
