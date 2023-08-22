import { ConfirmButton } from "@/components/Buttons";
import { InputField } from "@/components/InputField";
import { ProfileImage } from "@/components/profileImage";
import { updateUser } from "@/services/userService";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

    async function handleUpdateUser() {
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
            <div className="h-full w-full md:w-4/5 lg:w-2/3 mt-24 md:mt-0 flex flex-col md:flex-row m-auto md:gap-24 items-center">
                <div className="w-52 md:w-96">
                    <ProfileImage rounded />
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="grid md:grid-cols-2 gap-2">
                        <InputField label="Nome" onChange={setName} value={name} type="text" placeHolder={"Jhon Doe"} />
                        <InputField label="Nome de usuário" onChange={setUsername} value={username} type="text" placeHolder={"@jhondoe"} />
                    </div>
                    <InputField label="Email" onChange={() => { }} value={userInfo.email} type="text" placeHolder={"jhondoe@email.com"} disabled />
                    <InputField label="Descrição" onChange={setDescription} value={description} type="textarea" placeHolder={"Sua descrição aqui..."} />
                </div>
            </div>
            <div className="flex justify-end mt-10">
                <div className="w-36">
                    <ConfirmButton onClick={handleUpdateUser}>
                        Confirmar
                    </ConfirmButton>
                </div>
            </div>
        </>
    );
}
