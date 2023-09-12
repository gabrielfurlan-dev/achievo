import { InputHTMLAttributes } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface inputValidationProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string,
    inputName: string,
    placeholder: string,
    reference: UseFormRegisterReturn,
    errors: string | undefined,
    disabled?: boolean
}

export function InputValidation({ title, inputName, placeholder, reference, errors, disabled, ...props }: inputValidationProps) {
    return (
        <div className="flex flex-col">
            <div className="flex gap-2 items-center">
                <label className="whitespace-nowrap w-fit text-LIGHT_TEXT dark:text-DARK_TEXT" htmlFor={inputName} children={title} />
                <span className="w-full text-SECONDARY text-xs">{errors && `*${errors}`}</span>
            </div>
            <input
                {...props}
                {...reference}
                disabled={disabled}
                title={inputName}
                placeholder={placeholder}
                className="bg-LIGHT_BACKGROUND_SECONDARY
                            dark:bg-DARK_BACKGROUND_SECONDARY
                            text-LIGHT_TEXT
                            dark:text-DARK_TEXT
                            rounded-lg
                            py-2 px-3"
            />
        </div>
    )
}
