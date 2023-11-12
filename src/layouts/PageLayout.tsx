import Head from "next/head";
import { ReactNode } from "react";

type LayoutProps = {
    pageName: string,
    children: ReactNode;
};

const PageLayout = ({ pageName, children }: LayoutProps) => (
    <>
        <Head>
            <title>{pageName ?? "Achievo"}</title>
            <link rel="icon" href={"@/assets/favicon.ico"} />
        </Head>
        <div className="w-full flex-1 flex flex-col min-h-screen">
            <div className="h-full flex flex-col
                            px-4 md:px-10 lg:px-28
                            my-10 md:my-16">
                {children}
            </div>
        </div>
    </>
);

export default PageLayout;
