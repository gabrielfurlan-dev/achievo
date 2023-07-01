import { Button } from '@mui/material';
import { Trash, X } from 'phosphor-react';
import React, { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    handleSaveButton?: () => void;
    hideButtons?: boolean;
    hideDelete?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, handleSaveButton, hideButtons, hideDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full">
            <div className="bg-white rounded-2xl p-4">

                <button className="float-right right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className='m-6'>
                    <div className="mb-8">
                        <p className="font-bold text-2xl">Editar Progresso</p>
                        <p className="text-GRAY">Informe todos os valores abaixo</p>
                    </div>

                    <div className="modal-content">{children}</div>
                    {!hideButtons && (
                        <div className='mt-10 h-12 flex justify-between'>
                            {!hideDelete && (<Button
                                className="md:w-36 gap-2 bg-WHITE_SECONDARY hover:bg-WHITE_TERTIARY text-GRAY_DARK normal-case"
                            >
                                <Trash size={20} />
                                <p className="hidden md:block">Eliminar</p>
                            </Button>)}

                            <div className="flex justify-end w-full">
                                <div className="flex gap-2 h-full">
                                    <Button
                                        onClick={onClose}
                                        className="w-20 md:w-24 bg-none text-GRAY_DARK hover:bg-WHITE_SECONDARY normal-case"
                                    >Cancelar</Button>
                                    <Button
                                        onClick={handleSaveButton}
                                        className="w-24 md:w-36 bg-PRINCIPAL text-WHITE_TERTIARY hover:bg-PRINCIPAL_DARK normal-case"
                                    >Salvar</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
