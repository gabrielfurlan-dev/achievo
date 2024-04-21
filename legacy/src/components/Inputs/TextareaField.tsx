import { InputLayout } from "@/layouts/InputLayout";
import type { SetStateAction, TextareaHTMLAttributes } from "react";

interface InputFieldProps extends TextareaHTMLAttributes<HTMLInputElement> {
    value?: string;
    placeHolder?: string;
    onChange: (value: SetStateAction<any>) => void;
    noBackground?: boolean;
    alignRight?: boolean;
    widthAuto?: boolean;
    disabled?: boolean;
    noPadding?: boolean;
    label?: string;
    required?: boolean;
    error?: {
        mustShowError: boolean,
        errorMessage?: string,
    }
};

export function TextareaField({
    value,
    placeHolder,
    onChange: method,
    noBackground,
    alignRight,
    widthAuto,
    disabled,
    noPadding,
    label,
    required,
    error,
    style
}: InputFieldProps) {
    return (
        <InputLayout error={error} label={label}>
            <textarea
                className="flex text-md rounded-lg py-2 px-4 bg-LIGHT_BACKGROUND_SECONDARY dark:bg-DARK_BACKGROUND_SECONDARY text-LIGHT_TEXT dark:text-DARK_TEXT"
                disabled={disabled}
                placeholder={placeHolder}
                value={value}
                onChange={e => method(e.target.value)}
                style={{
                    ...style,
                    borderColor: noBackground ? "transparent" : "",
                    outline: "none",
                    backgroundColor: noBackground ? "transparent" : "",
                    textAlign: alignRight ? "right" : "left",
                    width: widthAuto ? "" : "100%",
                    padding: noPadding ? "0" : "",
                    height: "200px",
                }}
                required={required}
            />
        </InputLayout>
    );
}
