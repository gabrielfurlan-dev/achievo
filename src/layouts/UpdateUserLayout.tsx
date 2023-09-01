import { ConfirmButton } from "@/components/Buttons";
import { InputField } from "@/components/Inputs/InputField";
import { ProfileImage } from "@/components/profileImage";
import { TextareaField } from "@/components/Inputs/TextareaField";
import { updateUser } from "@/services/userService";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface updateUserLayoutProps {
    destinationPathOnUpdate: "/home" | string
    isFinishingRegister?: boolean
}

export function UpdateUserLayout({ destinationPathOnUpdate, isFinishingRegister }: updateUserLayoutProps) {
    const { userInfo, setUserInfo } = useUserInfoStore()
    const router = useRouter()
    const [name, setName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [description, setDescription] = useState<string>("")


    function validateIfHasUpdate() {
        if (userInfo.name != name) return true;
        if (userInfo.username != username) return true;
        if (userInfo.description != description) return true;

        return false;
    }

    async function handleUpdateUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const successMessage = isFinishingRegister ? "Cadastro finalizado com sucesso." : "Cadastro atualizado com sucesso"
        const failMessage = isFinishingRegister ? "Não foi possível finalizar o cadastro." : "Não foi possível atualizar o cadastro"

        if (validateIfHasUpdate()) {
            if (await updateUser(userInfo.id, name, username, description)) {
                setUserInfo({ ...userInfo, name: name, username: username, description: description, alreadyRegistered: true });
            } else {
                await Swal.fire("Fail!", failMessage, "error")
                return;
            }
        };

        await Swal.fire("Good Job!", successMessage)
        router.push(destinationPathOnUpdate)
    }

    useEffect(() => {
        setName(userInfo.name ?? "")
        setUsername(userInfo.username ?? "")
        setDescription(userInfo.description ?? "")
    }, [userInfo])

    return (
        <>
            <form className="h-full lg:mt-0 flex flex-col justify-between " onSubmit={(event) => handleUpdateUser(event)}>
                <div className="h-full w-full mt-24 flex flex-col lg:flex-row m-auto lg:gap-24 items-center">
                    <div className="w-52 lg:w-72">
                        <ProfileImage rounded />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="grid lg:grid-cols-2 gap-2">
                            <InputField
                                label="Nome"
                                onChange={setName}
                                value={name}
                                type="text"
                                placeHolder={"Jhon Doe"}
                                required
                                error={{ mustShowError: name.length == 0, errorMessage: "campo obrigatório" }}
                            />
                            <InputField
                                label="Nome de usuário"
                                onChange={setUsername}
                                value={username}
                                type="text"
                                placeHolder={"@jhondoe"}
                                required
                                error={{ mustShowError: username.length == 0, errorMessage: "campo obrigatório" }}
                            />
                        </div>
                        <InputField
                            label="Email"
                            onChange={() => { }}
                            value={userInfo.email}
                            type="text"
                            placeHolder={"jhondoe@email.com"}
                            required
                            disabled
                        />
                        <TextareaField
                            label="Descrição"
                            onChange={setDescription}
                            value={description}
                            placeHolder={"Sua descrição aqui..."}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-10">
                    <div className="w-36">
                        <ConfirmButton type="submit">Confirmar</ConfirmButton>
                    </div>
                </div>
            </form>
        </>
    );
}
