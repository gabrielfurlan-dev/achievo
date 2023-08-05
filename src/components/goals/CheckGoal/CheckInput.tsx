import { SetStateAction, useEffect, useState } from "react";
import { ICheckGoal } from "@/Interfaces/report";
import { CheckSquare, Square } from "phosphor-react";
import CheckGoalModal from "./CheckGoalModal";

type CheckProps = {
    checkGoal: ICheckGoal;
    setCheckGoals: (value: SetStateAction<ICheckGoal[]>) => void;
    disabled?: boolean;
}

export default function CheckInput({ checkGoal, setCheckGoals, disabled }: CheckProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [goal, setGoal] = useState(checkGoal)

    const corDeFundo = goal.checked ? "#5C8A74" : "";

    useEffect(() => {
        setCheckGoals((prevProgressGoals) => {
            const newProgress = prevProgressGoals.map((x) => {
                if (x.id === checkGoal.id) {
                    return {
                        ...x,
                        checked: goal.checked != undefined ? goal.checked : false,
                        title: goal.title
                    };
                } else {
                    return x;
                }
            });

            return newProgress;
        });

    }, [goal])

    function deleteGoal() {
        setCheckGoals((goals) => {
            return goals.filter(function (goal) {
                return goal.id !== checkGoal.id;
            });
        });
    }

    return (
        <div className="gap-1 items-center justify-between">
            <div
                className=" rounded-md h-auto py-2 bg-LIGHT_BACKGROUND dark:bg-DARK_BACKGROUND_SECONDARY"
                style={{
                    backgroundColor: corDeFundo,
                    textDecoration: goal.checked ? "line-through" : "none",
                    color: goal.checked ? 'white' : ''
                }}
            >
                <div className="flex flex-row gap-1 items-center justify-between">
                    <button onClick={() => setIsModalOpen(true)} className="w-full" disabled={disabled}>
                        <p className="ml-4 text-start w-full  dark:text-DARK_TEXT">{checkGoal.title}</p>
                    </button>
                    <button onClick={() => setGoal({ checked: !goal.checked, id: goal.id, index: goal.index, title: goal.title })} className="mr-5" disabled={disabled}>
                        {goal.checked ?
                            <CheckSquare size={26} className="text-DARK_TEXT" />
                            : <Square size={26} className="text-LIGHT_TEXT dark:text-DARK_TEXT" />}
                    </button >
                </div>
            </div>
            <CheckGoalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                deleteGoal={deleteGoal}
                checkGoal={checkGoal}
                setCheckGoal={setGoal}
            />
        </div>
    );
}
