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
            {
                label && <label
                    className=" m-2 text-xl text-LIGHT_TEXT dark:text-DARK_TEXT
                               placeholder:text-LIGHT_TEXT_SECONDARY placeholder:dark:text-DARK_TEXT_SECONDARY"
                >
                    {label}
                </label>
            }

            {type != 'textarea' ? (
                <input
                    className=" text-md rounded-lg py-2 px-4
                                bg-LIGHT_BACKGROUND_SECONDARY dark:bg-DARK_BACKGROUND_SECONDARY
                                text-LIGHT_TEXT dark:text-DARK_TEXT"
                    disabled={disabled}
                    placeholder={placeHolder}
                    value={value}
                    type={type}
                    onChange={(e) => method(e.target.value)}
                    style={{
                        borderColor: noBackground ? "transparent" : "",
                        outline: "none",
                        backgroundColor: noBackground ? "transparent" : "",
                        textAlign: alignRight ? "right" : "left",
                        width: widthAuto ? "" : "100%",
                        padding: noPadding ? "0" : ""
                    }}
                />
            ) : (
                <textarea className="flex text-md rounded-lg py-2 px-4 bg-LIGHT_BACKGROUND_SECONDARY dark:bg-DARK_BACKGROUND_SECONDARY"
                    disabled={disabled}
                    placeholder={placeHolder}
                    value={value}
                    onChange={(e) => method(e.target.value)}
                    style={{
                        borderColor: noBackground ? "transparent" : "",
                        outline: "none",
                        backgroundColor: noBackground ? "transparent" : "",
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
