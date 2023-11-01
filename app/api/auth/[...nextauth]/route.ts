import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/sign-in",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "hello@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const prismaUser = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!prismaUser) {
                    return null;
                }

                const passwordValid = await compare(
                    credentials.password,
                    prismaUser.password
                );

                if (!passwordValid) {
                    return null;
                }

                return {
                    id: prismaUser.id,
                    email: prismaUser.email,
                    name: prismaUser.name,
                };
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            // console.log("Session Callback", { session, token });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                },
            };
        },
        jwt: ({ token, user }) => {
            // console.log("JWT Callback", { token, user });
            if (user) {
                const u = user as unknown as User;
                return {
                    ...token,
                    id: u.id,
                };
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
