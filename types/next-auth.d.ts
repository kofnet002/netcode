import NextAuth from "next-auth/next";

declare module "next-auth"{
    interface Session {
        user:{
            access: string;
            refresh: string;
        }
    }
}