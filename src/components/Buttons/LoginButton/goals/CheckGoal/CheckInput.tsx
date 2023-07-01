import { SetStateAction, useEffect, useState } from "react";
import { ICheckGoal } from "@/Interfaces/report";
import { CheckSquare, Square } from "phosphor-react";
import CheckGoalModal from "./CheckGoalModal";

type CheckProps = {
    id: number,
    title: string,
    checked?: boolean,
    setCheckGoals: (value: SetStateAction<ICheckGoal[]>) => void
}

export default function CheckInput({ id, title, checked, setCheckGoals }: CheckProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(checked)
    const [titleInput, setTitleInput] = useState(title)

    const corDeFundo = isChecked ? "#5C8A74" : "#f3f4f6";

    useEffect(() => {
        setCheckGoals((prevProgressGoals) => {
            const newProgress = prevProgressGoals.map((goal) => {
                if (goal.id === id) {
                    return {
                        ...goal,
                        checked: isChecked != undefined ? isChecked : false,
                    };
                } else {
                    return goal;
                }
            });

            return newProgress;
        });

    }, [isChecked, titleInput])

    function deleteGoal() {
        setCheckGoals((goals) => {
            return goals.filter(function (goal) {
                return goal.id !== id;
            });
        });
    }

    return (
        <>

            <button onClick={() => setIsModalOpen(true)}>
                <div className="flex flex-row gap-1 items-center justify-between rounded-md h-10"
                    style={{
                        backgroundColor: corDeFundo,
                        textDecoration: isChecked ? "line-through" : "none",
                        color: isChecked ? 'white' : ''
                    }}
                >
                    <p className="ml-4">{titleInput}</p>
                    <button onClick={() => setIsChecked(!isChecked)} className="mr-5">
                        {isChecked ?
                            <CheckSquare size={26} className="text-WHITE_PRINCIPAL" />
                            : <Square size={26} className="text-GRAY_DARK" />}
                    </button>
                </div>
            </button>

            <CheckGoalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                deleteGoal={deleteGoal}
                title={title}
                setTitle={setTitleInput}
                id={id}
                setCheckGoal={setCheckGoals}
            />
        </>
    );
}
