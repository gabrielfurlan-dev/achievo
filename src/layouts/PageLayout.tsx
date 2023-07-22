import Head from 'next/head';
import { ReactNode } from 'react';


type LayoutProps = {
    children: ReactNode;
}
const PageLayout = ({ children }: LayoutProps) => (
    <>
        <Head>
            <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
        </Head>
        <div className="w-5/6 md:w-11/12 mx-auto flex flex-col min-h-screen">
            <div className="h-full flex flex-col my-12 md:my-16">
                {children}
            </div>
        </div>
    </>
);

export default PageLayout;
