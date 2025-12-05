import { PrismaClient } from '@prisma/client';
import { User, Program, Review, Application } from "@/types";

const prisma = new PrismaClient();

export const api = {
    // Programs
    getPrograms: async (): Promise<Program[]> => {
        const programs = await prisma.program.findMany();
        return programs.map(p => ({
            ...p,
            date: p.date.toISOString(),
            images: p.images ? JSON.parse(p.images) : [],
            status: p.status as 'recruiting' | 'active' | 'completed',
            videoUrl: p.videoUrl || undefined
        }));
    },

    getProgramById: async (id: string): Promise<Program | undefined> => {
        const program = await prisma.program.findUnique({ where: { id } });
        if (!program) return undefined;
        return {
            ...program,
            date: program.date.toISOString(),
            images: program.images ? JSON.parse(program.images) : [],
            status: program.status as 'recruiting' | 'active' | 'completed',
            videoUrl: program.videoUrl || undefined
        };
    },

    createProgram: async (data: Omit<Program, 'id' | 'currentParticipants' | 'status'>): Promise<Program> => {
        const program = await prisma.program.create({
            data: {
                ...data,
                date: new Date(data.date),
                images: JSON.stringify(data.images),
                status: 'recruiting',
                currentParticipants: 0
            }
        });
        return {
            ...program,
            date: program.date.toISOString(),
            images: program.images ? JSON.parse(program.images) : [],
            status: program.status as 'recruiting' | 'active' | 'completed',
            videoUrl: program.videoUrl || undefined
        };
    },

    updateProgramStatus: async (id: string, status: string): Promise<void> => {
        await prisma.program.update({
            where: { id },
            data: { status }
        });
    },

    updateProgramVideo: async (id: string, videoUrl: string): Promise<void> => {
        await prisma.program.update({
            where: { id },
            data: { videoUrl }
        });
    },

    // Reviews
    getReviewsByProgramId: async (programId: string): Promise<Review[]> => {
        const reviews = await prisma.review.findMany({
            where: { programId },
            include: { user: true }
        });
        return reviews.map(r => ({
            ...r,
            createdAt: r.createdAt.toISOString(),
            userName: r.user.name || "Anonymous"
        }));
    },

    createReview: async (programId: string, userId: string, rating: number, comment: string): Promise<Review> => {
        const review = await prisma.review.create({
            data: {
                programId,
                userId,
                rating,
                comment
            },
            include: { user: true }
        });
        return {
            ...review,
            createdAt: review.createdAt.toISOString(),
            userName: review.user.name || "Anonymous"
        };
    },

    // Users (Auth Sim) - In next phase this will be replaced by NextAuth, but for now:
    getCurrentUser: async (): Promise<User> => {
        return { id: 'u2', name: 'Parent User', email: 'parent@likids.com', role: 'parent' };
    },

    // Applications
    getApplicationsByProgramId: async (programId: string): Promise<any[]> => {
        const apps = await prisma.application.findMany({
            where: { programId },
            include: { user: true }
        });
        return apps.map(a => ({
            id: a.id,
            programId: a.programId,
            userId: a.userId,
            userName: a.user.name || "Unknown User",
            status: a.status,
            appliedAt: a.appliedAt.toISOString()
        }));
    },

    getApplicationsByUserId: async (userId: string): Promise<any[]> => {
        const apps = await prisma.application.findMany({
            where: { userId },
            include: { program: true },
            orderBy: { appliedAt: 'desc' }
        });
        return apps.map(a => ({
            ...a,
            appliedAt: a.appliedAt.toISOString(),
            program: {
                ...a.program,
                date: a.program.date.toISOString(),
                images: a.program.images ? JSON.parse(a.program.images) : [],
            }
        }));
    },

    updateApplicationStatus: async (appId: string, status: string): Promise<void> => {
        await prisma.application.update({
            where: { id: appId },
            data: { status }
        });
    },

    applyForProgram: async (programId: string, userId: string, userName: string): Promise<Application> => {
        // Check if already applied
        const existing = await prisma.application.findFirst({
            where: { programId, userId }
        });
        if (existing) {
            throw new Error("You have already applied to this program.");
        }

        // Check capacity
        const program = await prisma.program.findUnique({ where: { id: programId } });
        if (!program) throw new Error("Program not found");

        if (program.currentParticipants >= program.maxParticipants) {
            throw new Error("This program is full.");
        }

        const app = await prisma.application.create({
            data: {
                programId,
                userId,
                status: 'pending'
            }
        });
        return {
            ...app,
            status: app.status as 'pending' | 'approved' | 'rejected',
            appliedAt: app.appliedAt.toISOString()
        };
    }
};
