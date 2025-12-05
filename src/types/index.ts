export type UserRole = 'admin' | 'parent' | 'student';

import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        role?: string;
        id: string;
    }
    interface Session {
        user: {
            role?: string;
            id: string;
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
    }
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'parent'; // Added role
    phoneNumber?: string; // Added optional phone number
    avatar?: string;
    birthday?: string; // ISO Date string
    children?: string[]; // IDs of children if parent
}

export type ProgramStatus = 'recruiting' | 'active' | 'completed';

export interface Program {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    date: string; // ISO Date string for the event
    location: string;
    status: ProgramStatus;
    maxParticipants: number;
    currentParticipants: number;
    images: string[];
    videoUrl?: string; // For after-event content
    price: number;
}

export interface Review {
    id: string;
    programId: string;
    userId: string;
    userName: string;
    rating: number; // 1-5
    comment: string;
    createdAt: string;
}

export interface Application {
    id: string;
    programId: string;
    userId: string;
    status: 'pending' | 'approved' | 'rejected';
    appliedAt: string;
}
