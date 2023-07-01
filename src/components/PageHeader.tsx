import { ArrowLeft, Icon, ReadCvLogo } from "@phosphor-icons/react"
import { NoBackgroundButton } from "./Buttons/Buttons"
import { ReactNode } from "react";

type pageHeaderProps = {
    IconPage: Icon;
    title: string;
    subTitle?: string;
    children?: ReactNode;
}

export default function PageHeader({ IconPage, children, title, subTitle }: pageHeaderProps) {

    function goBack() {
        window.history.back()
    }

    return (
        <div className="flex flex-col gap-2">
            <div>
                <NoBackgroundButton onClick={goBack}>
                    <div className="flex items-center gap-4">
                        <ArrowLeft size={24} />
                        <p>Voltar</p>
                    </div>
                </NoBackgroundButton>
            </div>

            <div className="flex gap-3 items-center">
                <IconPage className="text-PRINCIPAL" size={48}/>
                <div>
                    <h1 className="text-4xl font-bold text-GRAY_DARK">{title}</h1>
                    <p className="text-GRAY">{subTitle}</p>
                    {children}
                </div>
            </div>
        </div>
    )
}
