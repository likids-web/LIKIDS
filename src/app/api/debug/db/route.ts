import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const userCount = await prisma.user.count();
        // Check if Account table exists by trying to count (will throw if table missing)
        let accountCount = -1;
        try {
            // @ts-ignore
            accountCount = await prisma.account.count();
        } catch (e) {
            return NextResponse.json({ error: "Account table missing or error", details: String(e) }, { status: 500 });
        }

        return NextResponse.json({
            status: "ok",
            userCount,
            accountCount,
            env: {
                NEXTAUTH_URL: process.env.NEXTAUTH_URL,
                hasSecret: !!process.env.NEXTAUTH_SECRET
            }
        });
    } catch (e) {
        return NextResponse.json({ error: "DB Connection failed", details: String(e) }, { status: 500 });
    }
}
