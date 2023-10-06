import z from "zod";

const envSchema = z.object({
    SUPABASE_URL: z.string(),
    SUPABASE_ANON_KEY: z.string(),
    JWT_WEBTOKEN: z.string(),
    MAIL_SERVICE_URL: z.string(),
    MAIL_SERVICE_KEY: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_SECRET_KEY: z.string(),
});

const variables = envSchema.parse({
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    JWT_WEBTOKEN: process.env.NEXT_PUBLIC_JWT_WEBTOKEN,
    MAIL_SERVICE_URL: process.env.NEXT_PUBLIC_MAIL_SERVICE_URL,
    MAIL_SERVICE_KEY: process.env.NEXT_PUBLIC_MAIL_SERVICE_KEY,
    GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_KEY: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY,
});

export default variables;
