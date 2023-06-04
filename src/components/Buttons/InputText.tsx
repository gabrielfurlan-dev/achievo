import { SetStateAction } from "react";

type inputProps={
    value?:string;
    placeHolder?:string,
    type?:("email"|"password"|undefined),
    onChange:(value: SetStateAction<any>) => void;
}

export function InputText({value, placeHolder, type, onChange:method}:inputProps) {
    return (
        <>
            <input
                className=" border border-GRAY text-md rounded-lg py-2 px-4"
                placeholder={placeHolder}
                type={type}
                value={value}
                onChange={method}
            />
        </>
    );
}
