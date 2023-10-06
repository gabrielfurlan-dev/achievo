import { LockSimple } from "phosphor-react"
import { InputHTMLAttributes } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { tv } from 'tailwind-variants';

interface inputValidationProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string,
    inputName: string,
    placeholder: string,
    reference: UseFormRegisterReturn,
    errors: string | undefined,
    disabled?: boolean
}

export function InputValidation({ title, inputName, placeholder, reference, errors, disabled, ...props }: inputValidationProps) {

    const input = tv({
        base: "w-full bg-transparent py-2 pl-3",
        variants: {
            color: {
                enabled: "text-LIGHT_TEXT dark:text-DARK_TEXT",
                disabled: "text-NEUTRAL_400"
            }
        }
    })

    return (
        <div className="flex flex-col">
            <div className="flex gap-2 items-center">
                <label className="whitespace-nowrap w-fit text-LIGHT_TEXT dark:text-DARK_TEXT" htmlFor={inputName} children={title} />
                <span className="w-full text-SECONDARY text-xs">{errors && `*${errors}`}</span>
            </div>
            <div className="bg-NEUTRAL_500
                            dark:bg-DARK_BACKGROUND_SECONDARY
                            flex items-center
                            rounded-lg">
                <input
                    {...props}
                    {...reference}
                    disabled={disabled}
                    title={inputName}
                    placeholder={placeholder}
                    className={input({ color: disabled ? "disabled" : "enabled" })}
                />
                {disabled ? <LockSimple className="text-GRAY ml-3 mr-3" size={18} /> : ""}
            </div>
        </div>
    )
}
