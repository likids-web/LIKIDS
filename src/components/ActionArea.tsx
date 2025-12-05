"use client";

import { useState } from 'react';
import Button from './Button';
import styles from './ActionArea.module.css';
import { ProgramStatus } from '@/types';
import ApplicationModal from './ApplicationModal';
import { useSession } from "next-auth/react";

interface ActionAreaProps {
    status: ProgramStatus;
    programId: string;
}

export default function ActionArea({ status, programId }: ActionAreaProps) {
    const [showModal, setShowModal] = useState(false);
    const { data: session } = useSession();
    const user = session?.user;

    if (status === 'completed') return null;

    const handleApplyClick = () => {
        if (!user) {
            alert("Please login to apply");
            // In real app, redirect to login
            return;
        }
        setShowModal(true);
    };

    return (
        <>
            <div className={styles.spacer} />
            <div className={styles.actionArea}>
                {status === 'recruiting' ? (
                    <Button fullWidth onClick={handleApplyClick}>
                        Apply Now
                    </Button>
                ) : (
                    <Button fullWidth disabled variant='secondary'>
                        {status === 'active' ? 'In Progress' : 'Closed'}
                    </Button>
                )}
            </div>
            {showModal && user?.id && <ApplicationModal programId={programId} onClose={() => setShowModal(false)} userId={user.id} userName={user.name || "User"} />}
        </>
    );
}
