import { CircularProgress } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";

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
                <link rel="icon" href={"@/assets/favicon.ico"} />
            </Head>
            {
                isLoading ? (
                    <div className="w-full h-screen flex justify-center items-center">
                        <CircularProgress color="inherit" />
                    </div>
                ) :
                    (
                        <div className="w-5/6 md:w-11/12 mx-auto flex flex-col min-h-screen">
                            <div className="h-full flex flex-col my-12 md:my-16">
                                {children}
                            </div>
                        </div >
                    )
            }
        </>
    )
};

