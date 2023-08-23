import { ICheckGoal } from "@/interfaces/goals/checkGoals/iCheckGoal";
import { InputField } from "@/components/Inputs/InputField";
import Modal from "@/components/Modal";
import { SetStateAction, useState } from "react";
import Swal from "sweetalert2";

type CheckModalProps = {
    isOpen: boolean;
    onClose: () => void;
    checkGoal: ICheckGoal;
    setCheckGoal: (value: SetStateAction<ICheckGoal>) => void;
    deleteGoal: () => void;
};

export default function CheckGoalModal({
    isOpen,
    onClose,
    checkGoal,
    setCheckGoal,
    deleteGoal,
}: CheckModalProps) {
    const [editingTitle, setEditingTitle] = useState(checkGoal.title);

    function validate() {
        if (editingTitle.length == 0) {
            Swal.fire(
                "Ops!",
                "É necessário informar o título da meta",
                "warning"
            );
            return false;
        }

        return true;
    }

    function handleSaveGoal() {
        if (!validate()) return;

        const newGoal: ICheckGoal = {
            id: checkGoal.id,
            index: checkGoal.index,
            title: editingTitle,
            checked: checkGoal.checked,
            reportId: checkGoal.id,
        };

        setCheckGoal(newGoal);
        onClose();
    }

    return (
        <div className="w-[1000px]">
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                onDelete={deleteGoal}
                handleSaveButton={handleSaveGoal}
                title="Editar Check-Goal"
                subtitle="Informe o nome da meta"
                cancelText="Cancelar"
                confirmText="Adicionar"
            >
                <InputField
                    onChange={setEditingTitle}
                    value={editingTitle}
                    placeHolder="Concluir curso de programação."
                    type="text"
                    label="Meta"
                />
            </Modal>
        </div>
    );
}
