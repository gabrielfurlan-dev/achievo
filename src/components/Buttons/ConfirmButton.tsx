import { CircularProgress } from "@mui/material";
import { Check } from "phosphor-react";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    className?: string;
    noBackground?: boolean;
    width?: number;
    noHover?: boolean;
};

export function ConfirmButton({ children, onClick, ...props }: CustomButtonProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function executeAction(event: React.MouseEvent<HTMLButtonElement>) {
        setIsLoading(true);
        if (onClick) {
            await onClick(event);
        }
        setIsLoading(false);
    }

    return (
        <div className="relative
                        inline-flex
                        items-center justify-center
                        overflow-hidden
                        font-medium
                        text-WHITE_PRINCIPAL bg-PRINCIPAL
                        transition duration-400 ease-out
                        rounded-lg
                        w-full h-full
                        group">
            {
                isLoading ? (
                    <div className="flex items-center">
                        <CircularProgress color="inherit" size={24} />
                    </div>
                ) : (
                    <button
                        {...props}
                        onClick={(event) => executeAction(event)}
                    >
                        <span className="absolute
                                         inset-0
                                         flex items-center justify-center
                                         w-full h-full
                                         text-white
                                         bg-PRINCIPAL_DARK
                                         duration-300 -translate-x-full
                                         group-hover:translate-x-0 ease">
                            <Check size={28} weight="bold"/>
                        </span>

                        <span className="absolute
                                         inset-0
                                         font-medium
                                         text-lg
                                         w-full h-full
                                         flex items-center justify-center
                                         text-WHITE_PRINCIPAL
                                         transition-all duration-300 transform
                                         group-hover:translate-x-full ease"
                            children={children}
/>

                        {/*Necessary to don't broke the transition*/}
                        <span className="relative invisible" children={children} />

                    </button>
                )
            }
        </div>
    );
}
