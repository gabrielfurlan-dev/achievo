import { Check } from "phosphor-react";
import { ReactNode } from "react";

type customButtonProps = {
    onClick: (() => void) | undefined;
    children?: ReactNode;
    className?: string;
}

export function ConfirmButton({ onClick, children }: customButtonProps) {
    return (
        <button onClick={onClick} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-WHITE_PRINCIPAL bg-PRINCIPAL transition duration-400 ease-out border-2  rounded-lg shadow-md group">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-PRINCIPAL_DARK group-hover:translate-x-0 ease">
                <Check size={28}/>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-WHITE_PRINCIPAL transition-all duration-300 transform group-hover:translate-x-full ease">{children}</span>
            <span className="relative invisible">{children}</span>
        </button>
    )
}

export function SimpleButton({ onClick, children }: customButtonProps) {
    return (
        <button onClick={onClick} className="px-6 py-3 font-semibold text-center text-gray-800 rounded-lg bg-WHITE_SECONDARY hover:text-black hover:bg-WHITE_TERTIARY transition-all duration-300">
            {children}
        </button>
    );
}

export function DangerButton({ onClick, children }: customButtonProps) {
    return (
        <button onClick={onClick} className="px-6 py-3 font-semibold text-center text-gray-800 rounded-lg bg-WHITE_SECONDARY hover:text-WHITE_PRINCIPAL hover:bg-SECONDARY transition-all duration-300">
            {children}
        </button>
    );
}

export function NoBackgroundButton({ onClick, children }: customButtonProps) {
    return (
        <button onClick={onClick} className="relative block w-auto px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg hover:text-black hover:bg-WHITE_SECONDARY transition-all duration-300">
            {children}
        </button>
    );
}

