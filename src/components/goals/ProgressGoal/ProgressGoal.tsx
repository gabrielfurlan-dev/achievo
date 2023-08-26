import { SetStateAction, useEffect, useState } from "react";
import React from "react";
import ProgressGoalModal from "./ProgressGoalModal";
import { IProgressGoal } from "@/interfaces/goals/progressGoals/iProgressGoal";
import { elapsedTime } from "@/helpers/elapsedTime";

type ProgressGoalProps = {
    progressGoal: IProgressGoal;
    setProgressGoals: (value: SetStateAction<IProgressGoal[]>) => void;
    disabled?: boolean;
};

export default function ProgressGoal({
    progressGoal,
    setProgressGoals,
    disabled,
}: ProgressGoalProps) {
    const [goal, setGoal] = useState(progressGoal);


    const progressoAtual = (
        (Number(progressGoal.value) / Number(progressGoal.total)) *
        100
    ).toFixed();
    const completou = Number(progressoAtual) >= 100;
    const corDeFundo = completou ? "#5C8A74" : "";

    useEffect(() => {
        setProgressGoals(prevProgressGoals => {
            const newProgress = prevProgressGoals.map(x => {
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
    }, [goal]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    function deleteGoal() {
        setProgressGoals(goals => {
            return goals.filter(function (goal) {
                return goal.id !== progressGoal.id;
            });
        });
    }

    return (
        <div>
            <button
                disabled={disabled}
                className="flex w-full normal-case bg-LIGHT_BACKGROUND dark:bg-DARK_BACKGROUND_SECONDARY rounded-md"
                onClick={openModal}
                style={{ color: completou ? "#EAEAEA" : "#000" }}
            >
                <div
                    className="flex flex-col gap-1 items-start  p-2 px-4 rounded-md  w-full bg-LIGHT_BACKGROUND dark:bg-DARK_BACKGROUND_SECONDARY"
                    style={{ backgroundColor: corDeFundo }}
                >
                    <div className="flex w-full justify-between items-center  dark:text-DARK_TEXT">
                        <p className={`mt-2 text-lg text-[${completou}]`}>{goal.title}</p>
                        <span className="flex items-center">{goal.value}/{goal.total}</span>
                    </div>
                    <div className="text-xs font-normal" style={{ color: completou ? "#ffff" : "#000" }}>
                        <p className="dark: text-WHITE_TERTIARY">{ 
                             elapsedTime(String(goal.updatedDate))
                        }</p>
                    </div>
                    <div className="w-full flex gap-2 items-center pb-2">
                        <div
                            id="progress-bar"
                            className="w-full bg-LIGHT_BACKGROUND_TERTIARY dark:bg-DARK_BACKGROUND h-3 rounded-md"
                        >
                            <div
                                id="progress"
                                className={`h-full rounded-md`}
                                style={{
                                    width: `${completou ? "100" : progressoAtual
                                        }%`,
                                    backgroundColor: completou
                                        ? "#232F24"
                                        : "#5C8A74",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </button>
            <ProgressGoalModal
                isOpen={isModalOpen}
                onClose={closeModal}
                progressGoal={goal}
                setProgressGoal={setGoal}
                deleteGoal={deleteGoal}
            />
        </div>
    );
}
