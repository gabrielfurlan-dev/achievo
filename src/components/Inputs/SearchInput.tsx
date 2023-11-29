import { MagnifyingGlass } from "phosphor-react";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface searchInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
}

export function SearchInput({ ...props }: searchInputProps) {
    return (
        <>
            <div id="search" className="bg-NEUTRAL_GRAY_01 dark:bg-NEUTRAL_DARK_300 flex rounded-xl items-center py-4 px-5  gap-4 w-full">
                <MagnifyingGlass className="text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_06" size={26} />
                <input
                    type="text"
                    className="outline-none w-full bg-transparent text-NEUTRAL_GRAY_06"
                    placeholder="Search"
                    {...props}
                />
            </div>
        </>
    );
}
