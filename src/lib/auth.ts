import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db('wanderthirstDB');

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
},
    database: mongodbAdapter(db, {
        client,
    }),

    plugins: [
        jwt({ sessionCookieCache: true })
    ],
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 7 * 24 * 60 * 60
        }
    },
    user: {
        additionalFields: {
            nationality: {
                type: "string",
                required: false,
                input: true,
                returned: true,
            },
            role: {
                type: "string",
                required: false,
                input: false,
                returned: true,
                defaultValue: "user",
            },
        },
    },
});