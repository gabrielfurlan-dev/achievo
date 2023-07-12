import { HTMLInputTypeAttribute, SetStateAction } from "react";

type InputFieldProps = {
    value?: string;
    placeHolder?: string,
    type?: HTMLInputTypeAttribute | "textarea",
    onChange: (value: SetStateAction<any>) => void;
    noBackground?: boolean,
    alignRight?: boolean,
    widthAuto?: boolean,
    disabled?: boolean,
    noPadding?: boolean
    label?: string
}

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
    label }: InputFieldProps) {
    return (
        <div className="flex flex-col h-full">
            {label && <label className="m-2 text-xl text-GRAY_DARK">{label}</label>}
            {type != 'textarea' ? (
                <input
                    className="text-md rounded-lg py-2 px-4"
                    disabled={disabled}
                    placeholder={placeHolder}
                    value={value}
                    type={type}
                    onChange={(e) => method(e.target.value)}
                    style={{
                        borderColor: noBackground ? "transparent" : "#f3f4f6",
                        outline: "none",
                        backgroundColor: noBackground ? "transparent" : "#f3f4f6",
                        textAlign: alignRight ? "right" : "left",
                        width: widthAuto ? "" : "100%",
                        padding: noPadding ? "0" : ""
                    }}
                />
            ) : (
                <textarea className="flex text-md rounded-lg py-2 px-4"
                    disabled={disabled}
                    placeholder={placeHolder}
                    value={value}
                    onChange={(e) => method(e.target.value)}
                    style={{
                        borderColor: noBackground ? "transparent" : "#f3f4f6",
                        outline: "none",
                        backgroundColor: noBackground ? "transparent" : "#f3f4f6",
                        textAlign: alignRight ? "right" : "left",
                        width: widthAuto ? "" : "100%",
                        padding: noPadding ? "0" : "",
                        height: "200px",
                    }} />
            )
            }
        </div>
    );
}
