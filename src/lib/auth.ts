
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from "better-auth/plugins"
import prisma from './prisma';

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    plugins: [
        admin() 
    ]
    

    /** if no database is provided, the user data will be stored in memory.
     * Make sure to provide a database to persist user data **/
});