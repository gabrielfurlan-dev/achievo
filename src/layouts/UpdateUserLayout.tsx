import { ConfirmButton } from "@/components/Buttons";
import { ProfileImage } from "@/components/profileImage";
import { updateUser, usernameAlradyTaken } from "@/services/userService";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfileSchema } from "@/schemas/users/commands/updateProfileSchema";

interface updateUserLayoutProps {
    destinationPathOnUpdate: "/home" | string
    isFinishingRegister?: boolean
}

export function UpdateUserLayout({ destinationPathOnUpdate, isFinishingRegister }: updateUserLayoutProps) {
    const { userInfo, setUserInfo } = useUserInfoStore()
    const router = useRouter()
    const [existingUser, setExistingUser] = useState(false);
    const {
        register,
        setValue,
        handleSubmit,
        getValues,
        watch,
        setError,
        formState: { errors },
    } = useForm<updateProfileSchema>({
        resolver: zodResolver(updateProfileSchema)
    })

    async function validateUsernameAlreadyTaken(username: string) {
        if (userInfo.username != username) {
            if ((await usernameAlradyTaken(username)).data.usernameAlredyTaken) {
                console.log("ta passando aqui")
                setError('username', { message: 'Usuário não disponível' });
                return { taken: true };
            }
        }

        return { taken: false };
    }

    useEffect(() => {
        setValue("name", userInfo.name ?? "")
        setValue("username", userInfo.username ?? "")
        setValue("description", userInfo.description ?? "")
        setValue("email", userInfo.email ?? "")
    }, [userInfo])

    function validateIfHasUpdate(data: updateProfileSchema) {
        if (userInfo.name != data.name) return true;
        if (userInfo.username != data.username) return true;
        if (userInfo.description != data.description) return true;

        return false;
    }

    async function handleUpdateUser(data: updateProfileSchema) {

        if ((await validateUsernameAlreadyTaken(getValues('username'))).taken) return;

        const successMessage = isFinishingRegister ? "Cadastro finalizado com sucesso." : "Cadastro atualizado com sucesso"
        const failMessage = isFinishingRegister ? "Não foi possível finalizar o cadastro." : "Não foi possível atualizar o cadastro"

        if (validateIfHasUpdate(data)) {
            if (await updateUser(userInfo.id, data.name, data.username, data.description)) {
                setUserInfo({ ...userInfo, name: data.name, username: data.username, description: data.description, alreadyRegistered: true });
            } else {
                await Swal.fire("Fail!", failMessage, "error")
                return;
            }
        };

        await Swal.fire("Good Job!", successMessage)
        router.push(destinationPathOnUpdate)
    }

    return (
        <>
            <form className="h-full lg:mt-0 flex flex-col justify-between " onSubmit={handleSubmit((data) => handleUpdateUser(data))}>
                <div className="h-full w-full mt-24 flex flex-col lg:flex-row m-auto lg:gap-24 items-center">
                    <div className="w-52 lg:w-72">
                        <ProfileImage rounded />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="grid lg:grid-cols-2 gap-2">

                            <div className="flex flex-col">
                                <div className="flex gap-2 items-center">
                                    <label className="text-LIGHT_TEXT dark:text-DARK_TEXT" htmlFor="name" children={"Nome"} />
                                    <span className="text-SECONDARY text-xs">{errors.name && `*${errors.name?.message}`}</span>
                                </div>
                                <input
                                    {...register('name')}
                                    name="name"
                                    type="text"
                                    placeholder="Jhon Doe"
                                    className="bg-LIGHT_BACKGROUND_SECONDARY
                                               dark:bg-DARK_BACKGROUND_SECONDARY
                                               text-LIGHT_TEXT
                                               dark:text-DARK_TEXT
                                               rounded-lg
                                               py-2 px-3"
                                />
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-2 items-center">
                                    <label className="text-LIGHT_TEXT dark:text-DARK_TEXT" htmlFor="username" children={"Nome de usuário"} />
                                    <span className="text-SECONDARY text-xs">*{errors.username?.message}</span>
                                </div>
                                <input
                                    {...register('username', { onBlur: () => validateUsernameAlreadyTaken(getValues('username')) })}
                                    name="username"
                                    type="text"
                                    placeholder="jhondoe"
                                    className="bg-LIGHT_BACKGROUND_SECONDARY
                                               dark:bg-DARK_BACKGROUND_SECONDARY
                                               text-LIGHT_TEXT
                                               dark:text-DARK_TEXT
                                               rounded-lg
                                               py-2 px-3"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex gap-2 items-center">
                                <label className="text-LIGHT_TEXT dark:text-DARK_TEXT" htmlFor="email" children={"Email"} />
                                <span className="text-SECONDARY text-xs">*{errors.email?.message}</span>
                            </div>
                            <input
                                {...register('email')}
                                disabled
                                name="email"
                                type="text"
                                placeholder="jhondoe@email.com"
                                className="bg-LIGHT_BACKGROUND_SECONDARY
                                               dark:bg-DARK_BACKGROUND_SECONDARY
                                               text-LIGHT_TEXT
                                               dark:text-DARK_TEXT
                                               rounded-lg
                                               py-2 px-3"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="flex gap-2 items-center">
                                <label className="text-LIGHT_TEXT dark:text-DARK_TEXT" htmlFor="description" children={"Descrição"} />
                                <span className="text-SECONDARY text-xs">*{errors.description?.message}</span>
                            </div>
                            <textarea
                                {...register('description')}
                                name="description"
                                placeholder="Sua descrição aqui..."
                                style={{ minHeight: '100px' }}
                                className="bg-LIGHT_BACKGROUND_SECONDARY
                                               dark:bg-DARK_BACKGROUND_SECONDARY
                                               text-LIGHT_TEXT
                                               dark:text-DARK_TEXT
                                               rounded-lg
                                               py-2 px-3"
                            />
                        </div>

                    </div>
                </div>
                <div className="flex justify-end mt-10">
                    <div className="w-36">
                        <ConfirmButton type="submit">Confirmar</ConfirmButton>
                    </div>
                </div>
            </form >
        </>
    );
}
