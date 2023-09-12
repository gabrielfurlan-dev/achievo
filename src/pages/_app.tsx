import React from "react";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/globals";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { DarkThemeProvider } from "@/contexts/ThemeContext";
import { SessionProvider } from 'next-auth/react'


const App: React.FC<AppProps> = ({ Component, pageProps: { session, ...props } }) => {
    return (
        <div className="flex col bg-WHITE dark:bg-DARK_BACKGROUND">
            <SessionProvider session={session}>
                <ThemeProvider theme={theme}>
                    <DarkThemeProvider>
                        <Component {...props} />
                    </DarkThemeProvider>
                    <GlobalStyle />
                </ThemeProvider>
            </SessionProvider>
        </div>
    );
};

export default App;
