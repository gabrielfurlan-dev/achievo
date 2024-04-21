import { InputLayout } from "@/layouts/InputLayout";
import { Icon, LockSimple } from "phosphor-react";
import type { ButtonHTMLAttributes, InputHTMLAttributes, SetStateAction } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
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
    },
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
    error,
    ...style
}: InputFieldProps) {

    return (
        <InputLayout error={error} label={label}>
            <div className="bg-LIGHT_BACKGROUND_SECONDARY dark:bg-DARK_BACKGROUND_SECONDARY flex items-center rounded-lg py-2 px-4"
                style={{ backgroundColor: noBackground ? "transparent" : "" }}>
                <input
                    className="text-md text-LIGHT_TEXT dark:text-DARK_TEXT"

                    disabled={disabled}
                    placeholder={placeHolder}
                    value={value}
                    type={type}
                    onChange={e => method(e.target.value)}
                    style={{
                        ...style,
                        opacity: disabled ? "50%" : "100%",
                        borderColor: noBackground ? "transparent" : "",
                        outline: "none",
                        textAlign: alignRight ? "right" : "left",
                        width: widthAuto ? "" : "100%",
                        padding: noPadding ? "0" : "",
                        backgroundColor: "transparent"
                    }}
                    required={required}
                />
                {disabled ? <LockSimple className="text-GRAY" size={18} /> : ""}
            </div>
        </InputLayout>
    );
}
