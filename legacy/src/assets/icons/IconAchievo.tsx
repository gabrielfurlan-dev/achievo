import { SVGAttributes } from "react";

export interface SvgIconProps extends SVGAttributes<SVGElement> {
    color?: string;
    size?: number;
}

export const IconAchievo: React.FC<SvgIconProps> = ({ color = "currentColor", size = 120 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_758_653)">
                <rect width="120" height="120" rx="20" fill="#5C8A74" />
                <path d="M40.3911 95.0006C40.3911 78.2132 36.2459 35.5964 54.8985 30.0006M66.0901 34.9746C59.6239 36.4669 53.655 44.301 53.655 47.4097C74.7947 47.4097 79.147 61.7101 80.3905 70.4146H62.3596C63.8269 78.6684 64.8569 86.8997 65.5153 95.0006" stroke="white" stroke-width="5.72014" />
                <circle cx="54.9029" cy="58.5993" r="3.73053" fill="#F8F9FA" />
            </g>
            <defs>
                <clipPath id="clip0_758_653">
                    <rect width="120" height="120" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
