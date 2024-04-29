import { tv } from "tailwind-variants"

type tabButtonProps = {
    title: string,
    selected: boolean,
    onClickAction: () => void,
    numberCount: number
}

export function TabNotificationButton({ title, selected, numberCount, onClickAction }: tabButtonProps) {
    const tabStyle = tv({
        base: "bg-LIGHT_BACKGROUND_SECONDARY px-2 py flex rounded-sm  items-center dark:bg-DARK_BACKGROUND_TERTIARY",
        variants: {
            selected: {
                true: "justify-between dark:text-white",
                false: "justify-center text-[#868E96]"
            }
        }
    })

    return (
        <button
            className={tabStyle({ selected: selected })}
            disabled={selected}
            onClick={() => onClickAction()}
        >
            <span className="pr-2">{title}</span>
            <span className="text-xs bg-[#DEE2E6] px-1 rounded-sm dark:bg-DARK_BACKGROUND_SECONDARY">
                {numberCount}
            </span>
        </button>
    )
}