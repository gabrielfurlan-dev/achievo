import z from "zod";

const envSchema = z.object({
    FIREBASE_APIKEY: z.string(),
    FIREBASE_AUTH_DOMAIN: z.string(),
    FIREBASE_PROJECT_ID: z.string(),
    FIREBASE_STORAGE_BUCKET: z.string(),
    FIREBASE_MESSAGING_SENDER_ID: z.string(),
    FIREBASE_API_ID: z.string(),
    FIREBASE_MEASUREMENT_ID: z.string(),
    SUPABASE_URL: z.string(),
    SUPABASE_ANON_KEY: z.string(),
    JWT_WEBTOKEN: z.string(),
    BASE_URL: z.string(),
    MAIL_SERVICE_URL: z.string(),
    MAIL_SERVICE_KEY: z.string(),
    GOOGLE_CLIEND_ID: z.string(),
    GOOGLE_SECRET_KEY: z.string(),
});

const variables = envSchema.parse({
    FIREBASE_APIKEY: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_API_ID: process.env.NEXT_PUBLIC_FIREBASE_API_ID,
    FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    JWT_WEBTOKEN: process.env.NEXT_PUBLIC_JWT_WEBTOKEN,
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    MAIL_SERVICE_URL: process.env.NEXT_PUBLIC_MAIL_SERVICE_URL,
    MAIL_SERVICE_KEY: process.env.NEXT_PUBLIC_MAIL_SERVICE_KEY,
    GOOGLE_CLIEND_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIEND_ID,
    GOOGLE_SECRET_KEY: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY,
});

export default variables;
