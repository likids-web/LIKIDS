"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { ProgramStatus } from "@/types";

export async function createProgramAction(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const date = formData.get('date') as string;
    const location = formData.get('location') as string;
    const price = parseInt(formData.get('price') as string);
    const maxParticipants = parseInt(formData.get('maxParticipants') as string);
    const thumbnail = formData.get('thumbnail') as string;

    await api.createProgram({
        title,
        description,
        date,
        location,
        price,
        maxParticipants,
        thumbnail,
        images: [] // Default empty images array
    });

    revalidatePath('/');
    revalidatePath('/admin/programs');
}

export async function updateProgramStatusAction(id: string, status: ProgramStatus) {
    await api.updateProgramStatus(id, status);
    revalidatePath(`/admin/programs/${id}/manage`);
    revalidatePath(`/programs/${id}`);
    revalidatePath('/admin/programs');
}

export async function updateProgramVideoAction(id: string, videoUrl: string) {
    await api.updateProgramVideo(id, videoUrl);
    revalidatePath(`/admin/programs/${id}/manage`);
    revalidatePath(`/programs/${id}`);
}

export async function submitApplicationAction(programId: string, userId: string, userName: string) {
    await api.applyForProgram(programId, userId, userName);
    revalidatePath(`/programs/${programId}`);
    revalidatePath(`/admin/programs/${programId}/manage`);
}

export async function submitReviewAction(programId: string, userId: string, rating: number, comment: string) {
    await api.createReview(programId, userId, rating, comment);
    revalidatePath(`/programs/${programId}`);
}

export async function updateApplicationStatusAction(appId: string, status: string, programId: string) {
    await api.updateApplicationStatus(appId, status);
    revalidatePath(`/admin/programs/${programId}/manage`);
}

export async function getMyApplicationsAction(userId: string) {
    const apps = await api.getApplicationsByUserId(userId);
    return apps;
}
