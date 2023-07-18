import { IProgressGoal } from "@/Interfaces/report";
import { InputField } from "@/components/InputField";
import Modal from "@/components/Modal";
import { SetStateAction, useState } from "react";
import Swal from "sweetalert2";

type ProgressModalProps = {
    isOpen: boolean;
    onClose: () => void;
    progressGoal: IProgressGoal;
    setProgressGoal: (value: SetStateAction<IProgressGoal>) => void;
    deleteGoal: () => void;
}

export default function ProgressGoalModal({ isOpen, onClose, progressGoal, setProgressGoal, deleteGoal }: ProgressModalProps) {

    const [editingValue, setEditingValue] = useState(progressGoal.value.toString())
    const [editingTotal, setEditingTotal] = useState(progressGoal.total.toString())
    const [editingTitle, setEditingTitle] = useState(progressGoal.title)

    function validate() {

        if (editingTitle.length == 0) {
            Swal.fire('Ops!', 'É necessário informar o título da meta', 'warning')
            return false;
        }
        if (Number(editingTotal) == 0) {
            Swal.fire('Ops!', 'É necessário informar o valor de progresso total da meta', 'warning')
            return false;
        }

        return true;
    }

    function handleSaveGoal() {

        if (!validate()) return;

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
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                handleSaveButton={handleSaveGoal}
                onDelete={deleteGoal}
                title="Editar Progresso"
                subtitle="Informe todos os valores abaixo"
                cancelText="Cancelar"
                confirmText="Adicionar"
            >

                <div className="">
                    <div>
                        <div className="flex flex-col gap-2">
                            <p>Título</p>
                            <InputField
                                onChange={setEditingTitle}
                                value={editingTitle}
                                placeHolder="Levar a vó no judô."
                            />
                        </div>
                        <div className="flex flex-col gap-4 md:flex-row mt-4 md:mt-8">
                            <div className="flex flex-col gap-2">
                                <p>Progresso Atual</p>
                                <InputField
                                    onChange={setEditingValue}
                                    value={editingValue}
                                    placeHolder="4"
                                    type="number"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p>Progresso Total</p>
                                <InputField
                                    onChange={setEditingTotal}
                                    value={editingTotal}
                                    placeHolder="10"
                                    type="number"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}