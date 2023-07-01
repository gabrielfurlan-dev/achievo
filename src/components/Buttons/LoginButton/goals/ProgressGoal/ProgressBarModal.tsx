import { IProgressGoal } from "@/Interfaces/report";
import { InputText } from "@/components/Buttons/InputText";
import Modal from "@/components/Modal";
import { Button } from "@mui/material";
import { Trash } from "phosphor-react";
import { SetStateAction, useState } from "react";

type ProgressModalProps = {
    isOpen: boolean;
    onClose: () => void;
    progressGoal: IProgressGoal;
    setProgressGoal: (value: SetStateAction<IProgressGoal>) => void
}

export default function ProgressModal({ isOpen, onClose, progressGoal, setProgressGoal }: ProgressModalProps) {

    const [editingValue, setEditingValue] = useState(progressGoal.value.toString())
    const [editingTotal, setEditingTotal] = useState(progressGoal.total.toString())
    const [editingTitle, setEditingTitle] = useState(progressGoal.title)

    function handleSaveGoal() {

        let newGoal: IProgressGoal = {
            id: progressGoal.id,
            indice: progressGoal.indice,
            title: editingTitle,
            value: Number(editingValue),
            total: Number(editingTotal)
        };

        setProgressGoal(newGoal);
        onClose()
    }

    return (
        <div className="">
            <Modal isOpen={isOpen} onClose={onClose} handleSaveButton={handleSaveGoal}>
                <div className="w-[300px] md:w-auto">
                    <div>
                        <div className="flex flex-col gap-2">
                            <p>Título</p>
                            <InputText
                                onChange={setEditingTitle}
                                value={editingTitle}
                                placeHolder="Concluir curso de programação."
                            />
                        </div>
                        <div className="flex flex-col gap-4 md:flex-row mt-4 md:mt-8">
                            <div className="flex flex-col gap-2">
                                <p>Valor Atual</p>
                                <InputText
                                    onChange={setEditingValue}
                                    value={editingValue}
                                    placeHolder="Concluir curso de programação."
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p>Valor Total</p>
                                <InputText
                                    onChange={setEditingTotal}
                                    value={editingTotal}
                                    placeHolder="Concluir curso de programação."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
