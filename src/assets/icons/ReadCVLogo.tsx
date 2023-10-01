import { SvgIconProps } from "./ListMagnifyingGlass"

export function ReadCVLogo({ color, size }: SvgIconProps) {

    return (
        <svg width={size ?? "24"} height={size ?? "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.96219 7.31269L16.109 8.95972M9.44456 9.24455L15.5914 10.8916M8.92692 11.1764L13.5004 12.4999M6.32488 17.7261L14.0523 19.7967C14.5858 19.9396 15.1341 19.623 15.277 19.0896L18.3829 7.49845C18.5258 6.96499 18.2092 6.41665 17.6758 6.27371L9.94835 4.20315C9.41488 4.06021 8.86654 4.3768 8.7236 4.91026L5.61777 16.5014C5.47483 17.0348 5.79142 17.5832 6.32488 17.7261Z"
                stroke={color ?? "#000"}
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    )
}
