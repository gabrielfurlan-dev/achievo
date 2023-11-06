import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
};

const PageLayout = ({ children}: LayoutProps) => (
    <>
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
