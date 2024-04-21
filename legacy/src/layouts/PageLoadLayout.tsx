import { CircularProgress } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";
import icon from "@/assets/favicon.ico"

type LayoutProps = {
    pageName: string,
    isLoading: boolean,
    children: ReactNode;
};

export function PageLoadLayout({ pageName, children, isLoading }: LayoutProps) {

    return (
        <>
            <Head>
                <title>{pageName ?? "Achievo"}</title>
                <link rel="icon" href={icon.src} />
            </Head>
            {
                isLoading ? (
                    <div className="w-full h-screen flex justify-center items-center">
                        <CircularProgress color="inherit" />
                    </div>
                ) :
                    (
                        <div className="w-full flex-1 flex flex-col min-h-screen">
                            <div className="h-full flex flex-col
                            px-4 md:px-10 lg:px-28
                            my-10 md:my-16">
                                {children}
                            </div>
                        </div>
                    )
            }
        </>
    )
};

