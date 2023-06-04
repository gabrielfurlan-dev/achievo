import { Button, Checkbox } from "@mui/material";
import { Check, CheckSquareOffset, Target, X } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react"
import { InputText } from "../../InputText";
import { ICheckGoal } from "@/Interfaces/report";
import firebaseConfig from "@/firebaseConfig";

type goalProps = {
    goal: ICheckGoal[] | null,
    setGoal: Dispatch<SetStateAction<ICheckGoal[] | null>>,
}

export function AddCheckGoal({ goal, setGoal }: goalProps) {
    const [expanded, setExpanded] = useState(false)
    const [title, setTitle] = useState('')
    const [check, setChecked] = useState(false)
    const [isHover, setIsHover] = useState(false)


    function handleAddCheckGoal(goal: ICheckGoal[]): void {
        setExpanded(false);
        console.log('teste')
        setGoal([...goal, { id: goal.length, title: title, checked: check }])
    }

    return (
        <>
            <div className="bg-CINZA rounded-md p-2">
                {
                    expanded == false ? (<div className="">
                        <Button onClick={() => setExpanded(true)}>
                            <CheckSquareOffset size={24} color="#111" />
                        </Button>
                    </div>) : (
                        <div className="flex flex-row-reverse gap-2">
                            <Button
                                style={{
                                    color: '#111',
                                }}

                                onClick={() => goal && handleAddCheckGoal(goal)}>
                                <Check size={24} />
                            </Button>

                            <div className="flex">
                                <InputText onChange={(e) => setTitle(e.target.value)} />
                                <div className="flex">
                                    <Checkbox />
                                </div>
                            </div>

                            <Button
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                                style={{
                                    backgroundColor: isHover ? "#ffcccc" : "",
                                    color: '#111',
                                }}

                                onClick={() => setExpanded(false)}>
                                <X size={24} />
                            </Button>
                        </div>
                    )
                }
            </div>
        </>
    );
}
