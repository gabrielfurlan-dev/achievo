import { ProfileImage } from "@/components/UserImage";
import { updateUser, usernameAlradyTaken } from "@/services/users/userService";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfileSchema } from "@/schemas/users/commands/updateProfileSchema";
import { InputValidation } from "@/components/Inputs/InputValidation";
import { TextAreaValidation } from "@/components/Inputs/TextAreaValidation";
import { ConfirmButton } from "@/components/Buttons/ConfirmButton";

interface updateUserLayoutProps {
    destinationPathOnUpdate: "/home" | string
    isFinishingRegister?: boolean
}

export function UpdateUserLayout({ destinationPathOnUpdate, isFinishingRegister }: updateUserLayoutProps) {
    const { userInfo, setUserInfo } = useUserInfoStore()
    const router = useRouter()

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

    useEffect(() => {
        setValue("name", userInfo.name ?? "")
        setValue("username", userInfo.username ?? "")
        setValue("description", userInfo.description ?? "")
        setValue("email", userInfo.email ?? "")
    }, [userInfo])


    async function validateUsernameAlreadyTaken(username: string) {
        if (userInfo.username != username) {
            if ((await usernameAlradyTaken(username)).data.usernameAlredyTaken) {
                setError('username', { message: 'Usuário não disponível' });
                return { taken: true };
            }
        }

        return { taken: false };
    }

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
                        <ProfileImage imageUrl={userInfo.imageURL} size={200} rounded />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="grid lg:grid-cols-2 gap-2">
                            <InputValidation
                                title="Nome"
                                inputName="name"
                                placeholder="Jhon Doe"
                                errors={errors.name?.message}
                                reference={register('name')}
                            />
                            <InputValidation
                                title="Nome de Usuário"
                                inputName="username"
                                placeholder="jhondoe"
                                errors={errors.username?.message}
                                reference={register('username')}
                                onBlur={() => validateUsernameAlreadyTaken(getValues('username'))}
                            />
                        </div>

                        <InputValidation
                            title="Email"
                            inputName="email"
                            placeholder="jhondoe@email.com"
                            type="email"
                            errors={errors.email?.message}
                            reference={register('email')}
                            disabled
                        />
                        <TextAreaValidation
                            title="Descrição"
                            inputName="description"
                            placeholder={`junte-se a mim na jornada de evolução 💪✨\nBe better than yesterday! 🚀\n#LetsGrind #WeeklyReport`}
                            errors={errors.description?.message}
                            reference={register('description')}
                        />

                    </div>
                </div>
                <div className="flex justify-end mt-10">
                    <div className="w-36 h-12">
                        <ConfirmButton type="submit">Confirmar</ConfirmButton>
                    </div>
                </div>
            </form >
        </>
    );
}
