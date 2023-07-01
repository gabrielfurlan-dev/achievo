import { ICheckGoal } from "@/Interfaces/report";
import { InputField } from "@/components/Buttons/InputField";
import Modal from "@/components/Modal";
import { SetStateAction, useState } from "react";

type CheckModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    setTitle: (value: SetStateAction<string>) => void;
    id: Number;
    setCheckGoal: (value: SetStateAction<ICheckGoal[]>) => void;
    deleteGoal: () => void;
}

export default function CheckGoalModal({ isOpen, onClose, title, id, setCheckGoal, deleteGoal,setTitle }: CheckModalProps) {

    const [editingTitle, setEditingTitle] = useState(title)

    function handleSaveGoal() {
        setTitle(editingTitle)
        onClose()
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                onDelete={deleteGoal}
                handleSaveButton={handleSaveGoal}
                title="Editar Meta de Checagem"
                subtitle="Informe o nome da meta"
            >
                <div className="flex flex-col gap-2">
                    <p>Valor Atual</p>
                    <InputField
                        onChange={setEditingTitle}
                        value={editingTitle}
                        placeHolder="Concluir curso de programação."
                        type="text"
                    />
                </div>
            </Modal>
        </>
    )
}
