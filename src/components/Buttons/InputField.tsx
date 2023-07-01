import { Target } from "phosphor-react";
import { ChangeEvent, HTMLInputTypeAttribute, SetStateAction } from "react";

type InputFieldProps = {
    value?: string;
    placeHolder?: string,
    type?: HTMLInputTypeAttribute,
    onChange: (value: SetStateAction<any>) => void;
    noBackground?: boolean,
    alignRight?: boolean,
}



export function InputField({ value, placeHolder, type, onChange: method, noBackground, alignRight }: InputFieldProps) {
    return (
        <>
            <input
                className="text-md rounded-lg w-full py-2 px-4"
                placeholder={placeHolder}
                value={value}
                type={type}
                onChange={
                    (e) => method(e.target.value)
                }
                style={{
                    borderColor: noBackground ? "transparent" : "f3f4f6",
                    outline: "none",
                    backgroundColor: noBackground ? "transparent" : "#f3f4f6",
                    textAlign: alignRight ? "right" : "left",
                }}
            />
        </>
    );
}