import { ReactNode } from "react";
import { useRouter } from "next/router";
import { NavBarControls } from "./NavBarControls";
import {ArrowLeft} from "phosphor-react";

type pageHeaderProps = {
    title: string;
    subTitle?: string;
    children?: ReactNode;
    goBackUrl: "/list-reports" | "/home" | "/login" | "new-report" | string;
};

export function CompactNavBar({
    children,
    title,
    subTitle,
    goBackUrl,
}: pageHeaderProps) {
    const router = useRouter();

    function goBack() {
        router.push(goBackUrl);
    }

    return (
        <div className="flex justify-between">
            <div className="flex items-center w-full gap-4">
                <button
                    onClick={goBack}
                    className=" relative block w-auto px-4 py-3 overflow-hidden
                        text-base text-center font-semibold
                        text-LIGHT_TEXT dark:text-DARK_TEXT rounded-lg
                        hover:text-LIGHT_TEXT hover:bg-WHITE_SECONDARY
                        dark:hover:text-DARK_TEXT dark:hover:bg-DARK_BACKGROUND_SECONDARY
                        transition-all duration-300"
                >
                    <ArrowLeft size={24} />
                </button>

                <div className="flex items-center gap-2">
                    <div className="text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT_SECONDARY">
                        <h1 className="text-xl font-bold text-LIGHT_TEXT dark:text-DARK_TEXT">{title}</h1>
                        <p className="hidden md:block text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT_SECONDARY">{subTitle}</p>
                        {children}
                    </div>
                </div>
            </div>

            <NavBarControls />
        </div>
    );
}
