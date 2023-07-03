import { Trash, X } from 'phosphor-react';
import React, { ReactNode } from 'react';
import { ConfirmButton, DangerButton, NoBackgroundButton } from './Buttons/Buttons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    handleSaveButton?: () => void;
    hideButtons?: boolean;
    hideDelete?: boolean;
    onDelete?: () => void;
    title: string;
    subtitle?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, handleSaveButton, hideButtons, hideDelete, onDelete, title, subtitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl p-4  w-[400px] md:w-auto">

                <button className="float-right right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className='m-6'>
                    <div className="mb-8">
                        <p className="font-bold text-2xl">{title}</p>
                        <p className="text-GRAY">{subtitle}</p>
                    </div>

                    <div className="modal-content">{children}</div>
                    {!hideButtons && (
                        <div className='mt-10 h-12 flex justify-between'>
                            <div className='mr-2'>
                                {!hideDelete && (
                                    <DangerButton onClick={onDelete}>
                                        <div className='flex gap-2'>
                                            <Trash size={20} />
                                            <p className="hidden md:block">Eliminar</p>
                                        </div>
                                    </DangerButton>
                                )}
                            </div>


                            <div className="flex justify-end w-full">
                                <div className="flex gap-2 h-full w-full justify-end">
                                    <NoBackgroundButton onClick={onClose}> Cancelar </NoBackgroundButton>
                                    <div className='w-36'>
                                        <ConfirmButton onClick={handleSaveButton}> <p className='px-2 font-semibold'>Salvar</p> </ConfirmButton>
                                    </div>
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
