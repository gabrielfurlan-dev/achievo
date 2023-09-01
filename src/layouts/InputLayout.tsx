import { Children, type ReactNode } from "react";

interface inputLayoutProps {
    label?: string;
    error?: {
        mustShowError: boolean,
        errorMessage?: string,
    },
    children: ReactNode
}

export function InputLayout({ label, error, children }: inputLayoutProps) {
    return (
        <div className="flex flex-col h-full">
            {label && (
                <div>
                    <label className=" m-2 text-xl text-LIGHT_TEXT dark:text-DARK_TEXT placeholder:text-LIGHT_TEXT_SECONDARY placeholder:dark:text-DARK_TEXT_SECONDARY">
                        {label}
                    </label>
                    {error?.mustShowError && <label className="text-SECONDARY text-xs">* {error.errorMessage}</label>}
                </div>
            )}
            {children}
        </div>
    );
}
