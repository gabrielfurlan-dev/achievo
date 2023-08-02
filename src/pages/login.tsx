import { GoogleLogo, ReadCvLogo } from "@phosphor-icons/react";
import Router from "next/router";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { handleLoginGoogle } from '@/services/LoginService'
import { useUserInfoStore } from "@/store/userStoreInfo";
import Swal from "sweetalert2";

export default function login() {
    const [isLoading, setIsLoading] = useState(false);
    const { setUserInfo } = useUserInfoStore()

    async function handleLogin() {

        setIsLoading(true)

        const loginData = await handleLoginGoogle();

        if (loginData.success) {
            setUserInfo({
                registered: true,
                id: loginData.data.id,
                email: loginData.data.email,
                name: loginData.data.name,
                imageURL: loginData.data.imageURL
            })
            Router.push('/home')
        } else {
            Swal.fire('Oops!', "Não foi possível realizar o login.")
        }

        setIsLoading(false)
    }

    return (
        <div className="items-center h-screen w-screen justify-center flex flex-col">
            <div className="text-center items-center justify-center flex flex-col gap-2">
                <ReadCvLogo size={64} className="text-PRINCIPAL" />
                <p className="text-xl">Bem vindo ao </p>
                <span className="text-4xl font-semibold">Weekly Report</span>
            </div>

            <div className="flex mt-12">
                {isLoading ? (
                    <CircularProgress color="inherit" />
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <button
                            className="flex flex-row items-center  border-[2px] m-auto rounded-xl px-4 py-2 gap-4
                            bg-none
                            text-GRAY_DARK
                            border-PRINCIPAL
                            hover:bg-PRINCIPAL hover:text-WHITE_PRINCIPAL"
                            onClick={handleLogin}
                        >
                            <GoogleLogo size={24} />
                            <p className="text-lg">Fazer login com Google</p>
                        </button>
                        <p className="text-GRAY">Entre para continuar</p>
                    </div>
                )}
            </div>
        </div>
    );
}
