import { SetStateAction, useEffect, useState } from "react";
import AutoSizeInput from "../../AutoSizeInput";
import { InputText } from "../../InputText";
import { IProgressGoal } from "@/Interfaces/report";

type ProgressGoalProps = {
    id: number,
    title: string,
    total: number,
    atualValue: number,
    setProgressGoals: (value: SetStateAction<IProgressGoal[]>) => void
}

export default function ProgressBar({ id, title, total, atualValue: autalValue, setProgressGoals }: ProgressGoalProps) {


    const [valueGoal, setValueGoal] = useState(autalValue.toString())
    const [totalGoal, setTotalGoal] = useState(total.toString())
    const [titleInput, setTitleInput] = useState(title)

    let progressoAtual = ((Number(valueGoal) / Number(totalGoal)) * 100).toFixed();
    let completou = Number(progressoAtual) >= 100
    let corDeFundo = completou ? "#c3ffc9" : "#f3f4f6";

    useEffect(() => {
        setProgressGoals((prevProgressGoals) => {
            const newProgress = prevProgressGoals.map((goal) => {
                if (goal.id === id) {
                    return {
                        ...goal,
                        value: Number(valueGoal),
                        total: Number(totalGoal),
                        title: titleInput,
                    };
                } else {
                    return goal;
                }
            });

            return newProgress;
        });

    }, [valueGoal, totalGoal, titleInput])

    return (
        <>
            <div className="flex flex-col gap-1 items-start  p-2 px-4 rounded-md  w-full" style={{ backgroundColor: corDeFundo }}>
                <div className="flex w-full justify-between items-center">
                    <p className="mt-2" style={{ textDecoration: completou ? "line-through" : "none" }}>
                        <InputText onChange={setTitleInput} value={titleInput} noBackground />
                    </p>
                    <span className="text-[#707070] flex items-center">
                        <div className="flex w-auto">
                            <AutoSizeInput onChange={setValueGoal} value={valueGoal} />
                        </div>
                        /
                        <div className="flex w-auto">
                            <AutoSizeInput onChange={setTotalGoal} value={totalGoal} />
                        </div>
                    </span>
                </div>

                <div className="w-full flex gap-2 items-center">
                    <div id="progress-bar" className="w-full bg-gray-300 h-3 rounded-md">
                        <div id="progress" className={`h-full bg-green-500 rounded-md`} style={{ width: `${completou ? "100" : progressoAtual}%` }} />
                    </div>
                </div>
            </div>
        </>
    );
}
