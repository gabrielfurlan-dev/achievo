import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import variables from "@/schemas/env-variables";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: variables.GOOGLE_CLIENT_ID,
            clientSecret: variables.GOOGLE_SECRET_KEY
        })
    ]
})
