import { SetStateAction, useEffect, useState } from "react";
import React from "react";
import TaskModal from "./TaskModal";
import { getUpdatedTimeElapsed } from "@/helpers/elapsedTime";
import { TaskDTO } from "@/types/Entities/task";

type TaskProps = {
    task: TaskDTO;
    setTask: (value: SetStateAction<TaskDTO[]>) => void;
    disabled?: boolean;
};

export default function TaskItem({
    task,
    setTask,
    disabled,
}: TaskProps) {
    const [editedTask, setEditedTask] = useState(task);
    const progressoAtual = Math.floor((editedTask.value / editedTask.total) * 100);
    const completou = progressoAtual >= 100;
    const corDeFundo = completou ? "#5C8A74" : "";

    useEffect(() => {
        setTask(prevTask => {
            const newTask = prevTask.map(x => {
                if (x.id === task.id) {
                    return {
                        ...x,
                        value: task.value,
                        total: task.total,
                        title: task.title,
                    };
                } else {
                    return x;
                }
            });
            return newTask;
        });
    }, [editedTask]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    function deleteTask() {
        setTask(tasks => {
            return tasks.filter(function (x) {
                return x.id !== task.id;
            });
        });
    }

    return (
        <div>
            <button
                disabled={disabled}
                className="flex w-full normal-case bg-LIGHT_BACKGROUND dark:bg-DARK_BACKGROUND_SECONDARY rounded-md"
                onClick={openModal}
                style={{ color: completou ? "#EAEAEA" : "#000" }}
            >
                <div
                    className="flex flex-col gap-1 items-start  p-2 px-4 rounded-md  w-full bg-LIGHT_BACKGROUND dark:bg-DARK_BACKGROUND_SECONDARY"
                    style={{ backgroundColor: corDeFundo }}
                >
                    <div className="flex w-full justify-between items-center  dark:text-DARK_TEXT">
                        <p className={`mt-2 text-lg text-[${completou}]`}>{task.title}</p>
                        <span className="flex items-center">{task.value}/{task.total}</span>
                    </div>
                    <div className="text-xs font-normal" style={{ color: completou ? "#ffff" : "#000" }}>
                        <p className={`dark:text-WHITE_TERTIARY  text-[${completou}]`}>{
                            getUpdatedTimeElapsed(String(task.updatedDate))
                        }</p>
                    </div>
                    <div className="w-full flex gap-2 items-center pb-2">
                        <div
                            id="progress-bar"
                            className="w-full bg-LIGHT_BACKGROUND_TERTIARY dark:bg-DARK_BACKGROUND h-3 rounded-md"
                        >
                            <div
                                id="progress"
                                className={`h-full rounded-md`}
                                style={{
                                    width: `${completou ? "100" : progressoAtual
                                        }%`,
                                    backgroundColor: completou
                                        ? "#232F24"
                                        : "#5C8A74",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </button>
            <TaskModal
                isOpen={isModalOpen}
                onClose={closeModal}
                task={task}
                setTask={setEditedTask}
                deleteTask={deleteTask}
            />
        </div>
    );
}
