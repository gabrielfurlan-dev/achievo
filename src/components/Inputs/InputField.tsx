import { InputLayout } from "@/layouts/InputLayout";
import type { HTMLInputTypeAttribute, SetStateAction } from "react";

type InputFieldProps = {
    value?: string;
    placeHolder?: string;
    type?: HTMLInputTypeAttribute;
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

export function InputField({
    value,
    placeHolder,
    type,
    onChange: method,
    noBackground,
    alignRight,
    widthAuto,
    disabled,
    noPadding,
    label,
    required,
    error
}: InputFieldProps) {
    return (
        <InputLayout error={error} label={label}>
            <input
                className="text-md rounded-lg py-2 px-4
                         bg-LIGHT_BACKGROUND_SECONDARY dark:bg-DARK_BACKGROUND_SECONDARY
                         text-LIGHT_TEXT dark:text-DARK_TEXT"
                disabled={disabled}
                placeholder={placeHolder}
                value={value}
                type={type}
                onChange={e => method(e.target.value)}
                style={{
                    borderColor: noBackground ? "transparent" : "",
                    outline: "none",
                    backgroundColor: noBackground ? "transparent" : "",
                    textAlign: alignRight ? "right" : "left",
                    width: widthAuto ? "" : "100%",
                    padding: noPadding ? "0" : "",
                }}
                required={required}
            />
        </InputLayout>
    );
}
