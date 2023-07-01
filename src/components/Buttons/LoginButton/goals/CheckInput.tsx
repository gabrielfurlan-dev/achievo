import { Checkbox } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { InputField } from "../../InputField";
import { ICheckGoal } from "@/Interfaces/report";

type CheckProps = {
    id: number,
    title: string,
    checked?: boolean,
    setCheckGoals: (value: SetStateAction<ICheckGoal[]>) => void
}

export default function CheckInput({ id, title, checked, setCheckGoals }: CheckProps) {

    const [isChecked, setIsChecked] = useState(checked)
    const [titleInput, setTitleInput] = useState(title)

    const corDeFundo = isChecked ? "#c3ffc9" : "#f3f4f6";

    useEffect(() => {
        setCheckGoals((prevProgressGoals) => {
            const newProgress = prevProgressGoals.map((goal) => {
                if (goal.id === id) {
                    return {
                        ...goal,
                        title: titleInput,
                        checked: isChecked != undefined ? isChecked : false,
                    };
                } else {
                    return goal;
                }
            });

            return newProgress;
        });

    }, [isChecked, titleInput])

    return (
        <>
            <div className="flex flex-row gap-1 items-center justify-between rounded-md"
                style={{
                    backgroundColor: corDeFundo,
                    textDecoration: isChecked ? "line-through" : "none"
                }}
            >
                <InputField onChange={setTitleInput} value={titleInput} noBackground></InputField>
                <Checkbox checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
            </div>
        </>
    );
}
