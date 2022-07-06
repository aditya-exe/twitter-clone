import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            username: string;
            image: string;
            name: string;
            uid: string;
        }
    }
}