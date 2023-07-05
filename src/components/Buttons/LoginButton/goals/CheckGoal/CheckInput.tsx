import { SetStateAction, useEffect, useState } from "react";
import { ICheckGoal } from "@/Interfaces/report";
import { CheckSquare, Square } from "phosphor-react";
import CheckGoalModal from "./CheckGoalModal";

type CheckProps = {
    checkGoal: ICheckGoal;
    setCheckGoals: (value: SetStateAction<ICheckGoal[]>) => void
}

export default function CheckInput({ checkGoal, setCheckGoals }: CheckProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [goal, setGoal] = useState(checkGoal)

    const corDeFundo = goal.checked ? "#5C8A74" : "#F5F5F5";

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
        <>
            <button onClick={() => setIsModalOpen(true)} className="">
                <div className="flex flex-row gap-1 items-center justify-between rounded-md h-10"
                    style={{
                        backgroundColor: corDeFundo,
                        textDecoration: goal.checked ? "line-through" : "none",
                        color: goal.checked ? 'white' : ''
                    }}
                >
                    <p className="ml-4">{checkGoal.title}</p>
                    <button onClick={() => setGoal({checked: !goal.checked, id:goal.id, indice: goal.indice, title: goal.title})} className="mr-5">
                        {goal.checked ?
                            <CheckSquare size={26} className="text-WHITE_PRINCIPAL" />
                            : <Square size={26} className="text-GRAY_DARK" />}
                    </button>
                </div>
            </button>

            <CheckGoalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                deleteGoal={deleteGoal}
                checkGoal={checkGoal}
                setCheckGoal={setGoal}
            />
        </>
    );
}
