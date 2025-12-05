import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
    providers: [
        // For "Real" Login
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
        }),
        // For "Dev/Test" Login (replacing our button hacks)
        CredentialsProvider({
            name: "DevLogin",
            credentials: {
                email: { label: "Email", type: "text" },
                role: { label: "Role", type: "text" } // hidden hack to simulate role
            },
            async authorize(credentials) {
                // This resembles a "Login" call
                if (!credentials?.email) return null;

                let user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                // Auto-create if not exists (for easy testing without signup flow in this MVP phase)
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            name: credentials.email.split('@')[0],
                            email: credentials.email,
                            role: credentials.role || 'parent'
                        }
                    });
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role // We need to add role to session
                };
            }
        })
    ],
    callbacks: {
        async session({ session, token }: { session: any, token: any }) {
            // Pass role to session
            if (session.user && token.role) {
                session.user.role = token.role;
                session.user.id = token.sub; // Pass ID to session
            }
            return session;
        },
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/login', // Use our custom login page
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
