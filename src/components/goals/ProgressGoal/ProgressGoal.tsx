import { SetStateAction, useEffect, useState } from "react";
import React from "react";
import ProgressGoalModal from "./ProgressGoalModal";
import { IProgressGoal } from "@/interfaces/goals/progressGoals/iProgressGoal";
import { getUpdatedTimeElapsed } from "@/helpers/elapsedTime";

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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const progressoAtual = Math.floor(
        (progressGoal.value / progressGoal.total) * 100
    );

    const completou = progressoAtual >= 100;
    const corDeFundo = completou ? "#5C8A74" : "";

    useEffect(() => {
        setProgressGoals(prevProgressGoals => {
            const newProgress = prevProgressGoals.map(x => {
                if (x.id === goal.id) {
                    return {
                        ...x,
                        value: goal.value,
                        total: goal.total,
                        title: goal.title,
                    };
                } else {
                    return x;
                }
            });
            return newProgress;
        });
    }, [goal, setProgressGoals]);

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
                className="flex w-full normal-case rounded-md bg-LIGHT_BACKGROUND dark:bg-DARK_BACKGROUND_SECONDARY"
                onClick={openModal}
                style={{ color: completou ? "#EAEAEA" : "#000" }}
            >
                <div
                    className="flex flex-col items-start w-full gap-1 p-2 px-4 rounded-md bg-LIGHT_BACKGROUND dark:bg-DARK_BACKGROUND_SECONDARY"
                    style={{ backgroundColor: corDeFundo }}
                >
                    <div className="flex items-center justify-between w-full dark:text-DARK_TEXT">
                        <p className={`mt-2 text-lg text-[${completou}]`}>
                            {goal.title}
                        </p>
                        <span className="flex items-center">
                            {goal.value}/{goal.total}
                        </span>
                    </div>
                    <div
                        className="text-xs font-normal"
                        style={{ color: completou ? "#ffff" : "#000" }}
                    >
                        <p
                            className={`dark:text-WHITE_TERTIARY  text-[${completou}]`}
                        >
                            {getUpdatedTimeElapsed(goal.updatedDate)}
                        </p>
                    </div>
                    <div className="flex items-center w-full gap-2 pb-2">
                        <div
                            id="progress-bar"
                            className="w-full h-3 rounded-md bg-LIGHT_BACKGROUND_TERTIARY dark:bg-DARK_BACKGROUND"
                        >
                            <div
                                id="progress"
                                className={`h-full rounded-md`}
                                style={{
                                    width: `${
                                        completou ? "100" : progressoAtual
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
