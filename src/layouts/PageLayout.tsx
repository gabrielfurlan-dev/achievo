import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
};
const PageLayout = ({ children }: LayoutProps) => (
    <>
        <div className="w-5/6 md:w-11/12 mx-auto flex flex-col min-h-screen">
            <div className="h-full flex flex-col my-12 md:my-16">
                {children}
            </div>
        </div>
    </>
);

export default PageLayout;
