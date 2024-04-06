import { SVGAttributes } from "react";

export interface SvgIconProps extends SVGAttributes<SVGElement> {
    color?: string;
    size?: number;
}

export function DefaultProfile({ color, size }: SvgIconProps) {
    return (
        <>
            <svg
                height={size}
                width={size}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30.6609 24.3109C30.6609 25.4196 29.7621 26.3184 28.6534 26.3184C27.5446 26.3184 26.6458 25.4196 26.6458 24.3109C26.6458 23.2022 27.5446 22.3034 28.6534 22.3034C29.7621 22.3034 30.6609 23.2022 30.6609 24.3109Z"
                    fill={color ?? "#2C2C2C"}
                />
                <path
                    d="M24 0C10.7452 0 0 10.7451 0 23.9999C0 34.3766 6.58552 43.2152 15.8051 46.5642C15.4036 38.2714 15.0021 15.0763 20.2217 9.85669C21.5896 9.17274 22.0837 12.955 22.4482 15.7455C22.5117 16.2312 22.5712 16.6869 22.6308 17.0838C23.2999 15.8793 25.2807 13.3096 27.8504 12.6672C30.42 12.0248 28.118 16.4146 26.6458 18.6898C30.2594 19.0913 37.9684 21.2594 39.8956 26.7199C41.8228 32.1804 32.9361 34.3485 28.2519 34.75L29.7732 47.3008C40.2394 44.7163 48 35.2643 48 23.9999C48 10.7451 37.2548 0 24 0Z"
                    fill={color ?? "#2C2C2C"}
                />
            </svg>
        </>
    );
}
