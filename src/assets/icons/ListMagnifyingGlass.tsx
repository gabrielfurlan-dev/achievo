import { SVGAttributes } from "react";

export interface SvgIconProps extends SVGAttributes<SVGElement> {
    color?: string;
    size?: number;
    strokeWidth?: number;
}

export function ListMagnifyingGlass({ color, size, strokeWidth }: SvgIconProps) {

    return (
        <svg width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <path
                d="M4 7H18.4M4 12.2381H10.4M12.5333 18H4M17.8669 15.9048C18.5145 15.4269 18.9333 14.6663 18.9333 13.8095C18.9333 12.3631 17.7394 11.1905 16.2667 11.1905C14.7939 11.1905 13.6 12.3631 13.6 13.8095C13.6 15.256 14.7939 16.4286 16.2667 16.4286C16.8671 16.4286 17.4212 16.2337 17.8669 15.9048ZM17.8669 15.9048L20 17.9997"
                stroke={color ?? "#000"}
                stroke-linecap="round"
                strokeWidth={strokeWidth ?? 1}
            />

        </svg>
    )
}
