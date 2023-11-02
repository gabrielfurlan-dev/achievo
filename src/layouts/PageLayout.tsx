import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
};

const PageLayout = ({ children}: LayoutProps) => (
    <>
        <div className="w-full px-4 md:px-0 md:w-11/12 h-full mx-auto flex flex-col min-h-screen">
            <div className="h-full flex flex-col my-12 md:my-16">
                {children}
            </div>
        </div>
    </>
);

export default PageLayout;
