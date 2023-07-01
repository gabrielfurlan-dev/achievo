import { SetStateAction, useEffect, useState } from "react";
import { IProgressGoal } from "@/Interfaces/report";
import React from "react";
import ProgressModal from "./ProgressBarModal";
import { Button } from "@mui/material";

type ProgressGoalProps = {
    progressGoal: IProgressGoal,
    setProgressGoals: (value: SetStateAction<IProgressGoal[]>) => void
}

export default function ProgressBar({ progressGoal, setProgressGoals }: ProgressGoalProps) {
    const [isDone, setIsDone] = useState(false)
    const [atualProgress, setAtualProgress] = useState(0)
    const [goal, setGoal] = useState(progressGoal)

    let progressoAtual = ((Number(progressGoal.value) / Number(progressGoal.total)) * 100).toFixed();
    let completou = Number(progressoAtual) >= 100
    let corDeFundo = completou ? "#5C8A74" : "#EAEAEA";

    useEffect(() => {

        setProgressGoals((prevProgressGoals) => {
            const newProgress = prevProgressGoals.map((x) => {
                if (x.id === goal.id) {
                    return {
                        ...x,
                        value: Number(goal.value),
                        total: Number(goal.total),
                        title: goal.title,
                    };
                } else {
                    return x;
                }
            });

            return newProgress;
        });

    }, [goal])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Button className="flex w-full" onClick={openModal} style={{ color: completou ? '#EAEAEA' : '#1C1C1C' }}>
                <div className="flex flex-col gap-1 items-start  p-2 px-4 rounded-md  w-full" style={{ backgroundColor: corDeFundo }}>
                    <div className="flex w-full justify-between items-center">
                        <p className="mt-2" style={{ textDecoration: completou ? "line-through" : "none" }}>
                            {goal.title}
                        </p>
                        <span className="text-WHITE_SECONDARY flex items-center">
                            {goal.value}/{goal.total}
                        </span>
                    </div>

                    <div className="w-full flex gap-2 items-center">
                        <div id="progress-bar" className="w-full bg-gray-300 h-3 rounded-md">
                            <div id="progress"
                                className={`h-full rounded-md`}
                                style={{
                                    width: `${completou ? '100' : progressoAtual}%`,
                                    backgroundColor: completou ? '#232F24' : '#5C8A74'
                                }} />
                        </div>
                    </div>
                </div>
            </Button>
            <ProgressModal
                isOpen={isModalOpen}
                onClose={closeModal}
                progressGoal={goal}
                setProgressGoal={setGoal}
            />
        </div>
    );
}
