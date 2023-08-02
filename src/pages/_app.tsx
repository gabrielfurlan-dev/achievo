import React from "react";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/globals";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { DarkThemeProvider } from "@/contexts/ThemeContext";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <div className="flex col bg-WHITE dark:bg-DARK_BACKGROUND">
            <ThemeProvider theme={theme}>
                <DarkThemeProvider>
                    <Component {...pageProps} />
                </DarkThemeProvider>
                <GlobalStyle />
            </ThemeProvider>
        </div>
    );
};

export default App;
