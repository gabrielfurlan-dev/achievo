import { IProgressGoal } from "@/interfaces/goals/progressGoals/iProgressGoal";
import { InputField } from "@/components/Inputs/InputField";
import { SetStateAction, useState } from "react";
import Swal from "sweetalert2";
import { ITag } from "@/interfaces/tags/ITag";
import { Plus, Trash, X } from "phosphor-react";
import { SelectTagModal } from "@/components/tags/SelectTagModal";

import * as Dialog from '@radix-ui/react-dialog';
import { DangerButton, NoBackgroundButton } from "@/components/Buttons";
import { ConfirmButton } from "@/components/Buttons/ConfirmButton";

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

    const [tags, setTags] = useState<ITag[] | undefined>(progressGoal.tags)

    //TODO: change to react-hook-form
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
            updatedDate: String(new Date()),
            value: Number(editingValue),
            total: Number(editingTotal),
            reportId: progressGoal.id,
            tags: tags
        };

        setProgressGoal(newGoal);
        onClose();
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button>
                    Edit profile
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black bg-opacity-25 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] bg-LIGHT_BACKGROUND dark:bg-DARK_BACKGROUND shadow-lg rounded-2xl p-4 md:w-auto focus:outline-none">
                    <Dialog.Title className="text-NEUTRAL_GRAY_09 m-0 text-[17px] font-medium">
                        Edit Goal
                    </Dialog.Title>
                    <Dialog.Description className="text-NEUTRAL_GRAY_07 mt-[10px] mb-5 text-[15px] leading-normal">
                        Make changes to your Goal here. Click save when you're done.
                    </Dialog.Description>

                    <div className="modal-content text-LIGHT_TEXT dark:text-DARK_TEXT">
                        <div className="">
                            <div>
                                <InputField
                                    onChange={setEditingTitle}
                                    value={editingTitle}
                                    placeHolder="Levar a vó no judô."
                                    label="Título"
                                />
                                <div>
                                    Tags
                                    <ul>
                                        {
                                            tags?.map(x =>
                                                <li>
                                                    tag
                                                </li>
                                            )
                                        }
                                        <SelectTagModal goalId={progressGoal.id} />
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-4 md:flex-row pt-4 md:mt-8">
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
                    </div>

                    <div className="mt-10 h-12 flex justify-between">
                        <div className="mr-2">
                            <DangerButton onClick={deleteGoal}>
                                <div className="flex gap-2">
                                    <Trash size={20} />
                                    <p className="hidden md:block">
                                        Remove
                                    </p>
                                </div>
                            </DangerButton>
                        </div>

                        <div className="flex justify-end w-full">
                            <div className="flex gap-2 h-full w-full justify-end">
                                <Dialog.Close asChild>
                                    <NoBackgroundButton onClick={onClose}>
                                        Cancel
                                    </NoBackgroundButton>
                                </Dialog.Close>
                                <div className="w-36">
                                    <Dialog.Close asChild>
                                        <ConfirmButton onClick={handleSaveGoal}>
                                            {" "}
                                            <p className="px-2 font-semibold">
                                                Save
                                            </p>{" "}
                                        </ConfirmButton>
                                    </Dialog.Close>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            <X />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
