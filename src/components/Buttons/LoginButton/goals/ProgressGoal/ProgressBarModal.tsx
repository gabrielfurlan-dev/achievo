import { InputText } from "@/components/Buttons/InputText";
import Modal from "@/components/Modal";
import { ReactNode, SetStateAction, useState } from "react";

type ProgressModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;

    title: string;
    changeTitle: (value: SetStateAction<any>) => void;

    valorAtual: string;
    changeValorAtual: (value: SetStateAction<any>) => void;

    valorTotal: string;
    changeValorTotal: (value: SetStateAction<any>) => void;
}

export default function ProgressModal({
    children,
    isOpen,
    onClose,
    title,
    changeTitle,
    valorAtual,
    changeValorAtual,
    valorTotal,
    changeValorTotal }: ProgressModalProps) {

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>

                <div className="m-4">
                    <p>Título</p>
                    <InputText
                        onChange={changeTitle}
                        value={title}
                        placeHolder="Concluir curso de programação."
                    />

                    <div className="flex gap-4">
                        <div>
                            <p>Valor Atual</p>
                            <InputText
                                onChange={changeValorAtual}
                                value={valorAtual}
                                placeHolder="Concluir curso de programação."
                            />
                        </div>

                        <div>
                            <p>Valor Total</p>
                            <InputText
                                onChange={changeValorTotal}
                                value={valorTotal}
                                placeHolder="Concluir curso de programação."
                            />
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    );
}
