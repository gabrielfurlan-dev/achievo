import { ConfirmButton } from "@/components/Buttons";
import { InputField } from "@/components/InputField";
import { SimpleNavBar } from "@/components/NavBar/SimpleNavBar";
import { ProfileImage } from "@/components/profileImage";
import PageLayout from "@/layouts/PageLayout";
import { updateUser } from "@/services/userService";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { useRouter } from "next/router";
import { AddressBook } from "phosphor-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function pages() {
    const { userInfo, setUserInfo } = useUserInfoStore()
    const router = useRouter()
    const [name, setName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [description, setDescription] = useState<string>("")


    async function handleUpdateUser() {
        if (await updateUser(userInfo.id, name, username, description)) {
            setUserInfo({ ...userInfo, name: name, username: username, description: description });
            Swal.fire("Login finalizado com sucesso!")
            router.push("/home")
        };
    }

    useEffect(() => {
        setName(userInfo.name ?? "")
        setUsername(userInfo.username ?? "")
        setDescription(userInfo.description ?? "")
    }, [userInfo])

    return (
        <PageLayout>
            <SimpleNavBar IconPage={AddressBook} title="Finalizar Cadastro" subTitle="" />
            <div className="h-full w-full md:w-2/3 mt-24 md:mt-0 flex flex-col md:flex-row m-auto md:gap-24 items-center">
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
        </PageLayout>
    );
}
