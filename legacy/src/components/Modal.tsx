import { Trash, Warning, X } from "phosphor-react";
import React, { ReactNode, useState } from "react";
import { DangerButton, NoBackgroundButton } from "./Buttons";
import { ConfirmButton } from "./Buttons/ConfirmButton";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    handleSaveButton?: () => void;
    hideButtons?: boolean;
    hideDelete?: boolean;
    onDelete?: () => void;

    title?: string;
    subtitle?: string;
    confirmText: "Salvar" | "Adicionar" | "Sim" | "Yes";
    cancelText: "Cancelar" | "Não" | "No" | "Cancel";
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    handleSaveButton,
    hideButtons,
    hideDelete,
    onDelete,
    title,
    subtitle,
    confirmText,
    cancelText,
}) => {
    if (!isOpen) return null;
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black dark:bg-DARK_BACKGROUND_SECONDARY bg-opacity-50 dark:bg-opacity-50 z-50">
            <div className="bg-LIGHT_BACKGROUND dark:bg-DARK_BACKGROUND shadow-lg rounded-2xl p-4  w-[400px] md:w-auto">
                <button
                    className="float-right right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>

                <div className="m-6">
                    <div className="mb-8">
                        <p className="font-bold text-2xl text-LIGHT_TEXT dark:text-DARK_TEXT">
                            {title}
                        </p>
                        <p className="text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT_SECONDARY">
                            {subtitle}
                        </p>
                    </div>

                    <div className="modal-content text-LIGHT_TEXT dark:text-DARK_TEXT">
                        {children}
                    </div>
                    {!hideButtons && (
                        <div className="mt-10 h-12 flex justify-between">
                            <div className="mr-2">
                                {!hideDelete && (
                                    <DangerButton onClick={() => setShowConfirmDelete(true)}>
                                        <div className="flex gap-2">
                                            <Trash size={20} />
                                            <p className="hidden md:block">
                                                Delete
                                            </p>
                                        </div>
                                    </DangerButton>
                                )}
                            </div>

                            <div className="flex justify-end w-full">
                                <div className="flex gap-2 h-full w-full justify-end">
                                    <NoBackgroundButton onClick={onClose}>
                                        {cancelText}
                                    </NoBackgroundButton>
                                    <div className="w-36">
                                        <ConfirmButton
                                            onClick={handleSaveButton}
                                        >
                                            {" "}
                                            <p className="px-2 font-semibold">
                                                {confirmText}
                                            </p>{" "}
                                        </ConfirmButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal
                isOpen={showConfirmDelete}
                onClose={() => setShowConfirmDelete(false)}
                title={""}
                confirmText={"Yes"}
                cancelText={"Cancel"}
                handleSaveButton={onDelete}
                hideDelete
            >
                <div className="flex flex-col w-full items-center">
                    <Warning size={56} className="text-PRINCIPAL" />
                    <h2 className="text-xl font-bold mt-10">This action cannot be undone</h2>
                    <p className="mt-2">Are you sure you want to proceed?</p>
                </div>
            </Modal>
        </div>
    );
};

export default Modal;
