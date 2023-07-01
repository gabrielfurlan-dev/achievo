import { Target } from "phosphor-react";
import { SetStateAction } from "react";

type inputProps={
    value?:string;
    placeHolder?:string,
    type?:("email" | "password" | undefined),
    onChange:(value: SetStateAction<any>) => void;
    noBackground?: boolean,
    alignRight?: boolean,
}

export function InputText({value, placeHolder, type, onChange:method, noBackground, alignRight}:inputProps) {
    return (
        <>
            <input
                className="text-md rounded-lg w-full py-2 px-4"
                placeholder={placeHolder}
                type={type}
                value={value}
                onChange={(e) => method(e.target.value)}
                style={{
                  borderColor:  noBackground ? "transparent" :"f3f4f6",
                  outline: "none",
                  backgroundColor: noBackground ? "transparent" : "#f3f4f6",
                  textAlign: alignRight ? "right" : "left",
                }}
            />
        </>
    );
}
