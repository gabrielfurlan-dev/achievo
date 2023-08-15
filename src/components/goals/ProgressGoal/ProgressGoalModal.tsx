import IProgressGoal from "@/Interfaces/goals/progressGoals/IProgressGoal";
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
};

export default function ProgressGoalModal({
    isOpen,
    onClose,
    progressGoal,
    setProgressGoal,
    deleteGoal,
}: ProgressModalProps) {
    const [editingValue, setEditingValue] = useState(
        progressGoal.value.toString()
    );
    const [editingTotal, setEditingTotal] = useState(
        progressGoal.total.toString()
    );
    const [editingTitle, setEditingTitle] = useState(progressGoal.title);

    function validate() {
        if (editingTitle.length == 0) {
            Swal.fire(
                "Ops!",
                "É necessário informar o título da meta",
                "warning"
            );
            return false;
        }
        if (Number(editingTotal) == 0) {
            Swal.fire(
                "Ops!",
                "É necessário informar o valor de progresso total da meta",
                "warning"
            );
            return false;
        }

        return true;
    }

    function handleSaveGoal() {
        if (!validate()) return;

        const newGoal: IProgressGoal = {
            id: progressGoal.id,
            index: progressGoal.index,
            title: editingTitle,
            value: Number(editingValue),
            total: Number(editingTotal),
            reportId: progressGoal.id,
        };

        setProgressGoal(newGoal);
        onClose();
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
                        <InputField
                            onChange={setEditingTitle}
                            value={editingTitle}
                            placeHolder="Levar a vó no judô."
                            label="Título"
                        />
                        <div className="flex flex-col gap-4 md:flex-row mt-4 md:mt-8">
                            <InputField
                                onChange={setEditingValue}
                                value={editingValue}
                                placeHolder="4"
                                type="number"
                                label="Progresso Atual"
                            />
                            <InputField
                                onChange={setEditingTotal}
                                value={editingTotal}
                                placeHolder="10"
                                type="number"
                                label="Progresso Total"
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
