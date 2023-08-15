import { ArrowLeft, Icon } from "@phosphor-icons/react";
import { NoBackgroundButton } from "../Buttons";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { NavBarControls } from "./NavBarControls";

type pageHeaderProps = {
    IconPage: Icon;
    title: string;
    subTitle?: string;
    children?: ReactNode;
    goBackUrl: "/list-reports" | "/home" | "/login" | "new-report";
    compact?: boolean;
};

export default function NavBar({
    IconPage,
    children,
    title,
    subTitle,
    goBackUrl,
    compact,
}: pageHeaderProps) {
    const router = useRouter();

    function goBack() {
        router.push(goBackUrl);
    }

    return (
        <div
            className="flex gap-2"
            style={{
                flexDirection: compact ? "row" : "column",
                justifyContent: compact ? "space-between" : "normal",
            }}
        >
            <div className="flex justify-between items-center">
                <NoBackgroundButton onClick={goBack} noHover>
                    <div className="flex items-center gap-4 text-LIGHT_TEXT dark:text-DARK_TEXT_SECONDARY">
                        <ArrowLeft size={24} />
                        <p>Voltar</p>
                    </div>
                </NoBackgroundButton>

                <NavBarControls />
            </div>

            <div
                className="flex md:gap-3 items-center"
                style={{
                    flexDirection: compact ? "row-reverse" : "row",
                }}
            >
                <IconPage className="text-PRINCIPAL" size={48} />
                <div className="text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT_SECONDARY">
                    <h1 className="text-xl md:text-4xl font-bold text-LIGHT_TEXT dark:text-DARK_TEXT">
                        {title}
                    </h1>
                    <p className="hidden md:block text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT_SECONDARY">
                        {subTitle}
                    </p>
                    {children}
                </div>
            </div>
        </div>
    );
}
