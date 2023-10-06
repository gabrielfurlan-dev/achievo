import { CircularProgress } from "@mui/material";
import { ReactNode } from "react";

type LayoutProps = {
    isLoading: boolean;
    children: ReactNode;
};

export function PageLoadLayout({ children, isLoading }: LayoutProps) {

    return (
        <>
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

