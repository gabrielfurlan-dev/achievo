import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/globals";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { DarkThemeProvider } from "@/contexts/ThemeContext";
import { SessionProvider, getSession } from 'next-auth/react'
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import 'react-datepicker/dist/react-datepicker.css';
import { Toaster} from 'sonner'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session = await getSession({ req })
    const router = useRouter()

    if (!session && router.pathname !== '/login') {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

const App: React.FC<AppProps> = ({ Component, pageProps: { session, ...props } }) => {

    return (
        <div className="font-sans flex col bg-WHITE dark:bg-DARK_BACKGROUND">
            <SessionProvider session={session}>
            <Toaster position="top-right" richColors/>
                <ThemeProvider theme={theme}>
                    <DarkThemeProvider>
                        <Component {...props} />
                    </DarkThemeProvider>
                    <GlobalStyle />
                </ThemeProvider>
            </SessionProvider>
        </div>
    );
}

export default App;
