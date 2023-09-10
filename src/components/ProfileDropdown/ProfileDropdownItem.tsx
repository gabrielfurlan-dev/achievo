import { Icon } from "phosphor-react";
import { HTMLAttributes } from "react";

interface ProfileDropdownItemProps extends HTMLAttributes<HTMLLIElement> {
    text: string,
    Icon: Icon,
    url: string | "#"
}

export function ProfileDropdownItem({ text, Icon, url, ...props }: ProfileDropdownItemProps) {
    return (
        <li
            className="transition hover:duration-200
            rounded-lg mx-4
            hover:bg-NEUTRAL_500
            hover:text-NEUTRAL_100
            dark:hover:bg-NEUTRAL_150
            dark:hover:text-NEUTRAL_500"
            {...props}
        >
            <a href={url ?? ""} className="flex items-center gap-3 p-2">
                <Icon size={20} />
                <p children={text} />
            </a>
        </li>
    );
}
