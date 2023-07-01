import { SetStateAction, useEffect, useState } from "react";
import AutoSizeInput from "../../../AutoSizeInput";
import { InputText } from "../../../InputText";
import { IProgressGoal } from "@/Interfaces/report";
import React from "react";
import Modal from "./ProgressBarModal";
import ProgressModal from "./ProgressBarModal";
import { Button } from "@mui/material";

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
    let corDeFundo = completou ? "#5C8A74" : "#EAEAEA";

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
                            {titleInput}
                        </p>
                        <span className="text-WHITE_SECONDARY flex items-center">
                            {valueGoal}/{totalGoal}
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

                title={titleInput}
                changeTitle={setTitleInput}

                valorAtual={valueGoal}
                changeValorAtual={setValueGoal}

                valorTotal={totalGoal}
                changeValorTotal={setTotalGoal}
            />
        </div>
    );
}
