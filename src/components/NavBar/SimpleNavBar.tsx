import { Icon } from "@phosphor-icons/react"
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { NavBarControls } from "./NavBarControls";

type pageHeaderProps = {
    IconPage: Icon;
    title: string;
    subTitle?: string;
    children?: ReactNode;
}

export function SimpleNavBar({ IconPage, children, title, subTitle }: pageHeaderProps) {
    const router = useRouter()

    return (
        <div className="flex gap-2">
            <div className="flex justify-between items-start w-full">
                <div className="flex md:gap-3 items-center">
                    <IconPage className="text-PRINCIPAL" size={32} />
                    <div className="text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT_SECONDARY">
                        <h1 className="text-xl md:text-2xl font-bold text-LIGHT_TEXT dark:text-DARK_TEXT">{title}</h1>
                        <p className="hidden md:block text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT_SECONDARY">{subTitle}</p>
                        {children}
                    </div>
                </div>

                <NavBarControls />
            </div>
        </div>
    )
}
