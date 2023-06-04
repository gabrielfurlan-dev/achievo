import { Checkbox } from "@mui/material";
import { useState } from "react";

type CheckProps = {
    title: string,
    checked?: boolean
}

export default function CheckInput({ title, checked }: CheckProps) {

    const [isChecked, setIsChecked] = useState(checked)

    const corDeFundo = isChecked ? "#c3ffc9" : "#f3f4f6";
    const padding = title.length < 50 ? "1px" : "11px";

    return (
        <>
            <div className="flex flex-row gap-1 items-center justify-between pl-4 rounded-md"
                style={{
                    paddingTop: padding,
                    paddingBottom: padding,
                    paddingLeft: "16px",
                    backgroundColor: corDeFundo,
                    textDecoration: isChecked ? "line-through" : "none"
                }}
            >
                <p>{title}</p>
                <Checkbox checked={isChecked} onClick={() => setIsChecked(!isChecked)}/>
            </div>
        </>
    );
}
