import { X } from 'phosphor-react';
import React, { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl p-4">
                <div className='float-right'>
                    <button className="w-full top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
                        <X size={24}/>
                    </button>
                </div>
                <div className="modal-content mt-12">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
