import { InputField } from "@/components/Inputs/InputField";
import Modal from "@/components/Modal";
import { SetStateAction, useState } from "react";
import Swal from "sweetalert2";
import { TaskDTO } from "@/types/Entities/task";

type ProgressModalProps = {
    isOpen: boolean;
    onClose: () => void;
    task: TaskDTO;
    setTask: (value: SetStateAction<TaskDTO>) => void;
    deleteTask: () => void;
};

export default function TaskModal({
    isOpen,
    onClose,
    task: task,
    setTask: setProgressGoal,
    deleteTask: deleteGoal,
}: ProgressModalProps) {
    const [editingValue, setEditingValue] = useState(
        task.value.toString()
    );
    const [editingTotal, setEditingTotal] = useState(
        task.total.toString()
    );
    const [editingTitle, setEditingTitle] = useState(task.title);

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

        const newGoal: TaskDTO = {
            id: task.id,
            title: editingTitle,
            value: Number(editingValue),
            total: Number(editingTotal),
            reportId: task.id
        };
        console.log(newGoal)
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
