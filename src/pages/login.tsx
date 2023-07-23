import { GoogleLogo, ReadCvLogo } from "@phosphor-icons/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { handleLoginGoogle } from '@/hooks/LoginService'
import db from '@/firebaseConfig';
import { useUserInfoStore } from "@/store/userStoreInfo";
import { getUserData, isUserRegistered, registerUser } from "@/hooks/UserService";

export default function login() {
    const [isLoading, setIsLoading] = useState(true);
    const { userInfo, setUserInfo } = useUserInfoStore()

    const firebase = db;

    async function handleLogin() {
        setIsLoading(true)
        const user = await handleLoginGoogle()

        if (user?.sucess) {

            if (await isUserRegistered(user.data.userEmail ?? "")) {

                const userData = await getUserData(user.data.userEmail ?? "")

                if (userData.success) {

                    setUserInfo({
                        id: userData.data?.id,
                        registered: true,
                        email: user.data.userEmail,
                        name: user.data.userName,
                        imageURL: user.data.imageURL
                    })
                }
            }
            else {
                await setUserInfo({
                    registered: false,
                    email: user.data.userEmail,
                    name: user.data.userName,
                    imageURL: user.data.imageURL
                })

                await registerUser({email: user.data.userEmail, registered: true})

                await setUserInfo({ registered: true })
            }
        }
    }

    useEffect(() => {
        if (userInfo.registered) {
            Router.push('/home')
        }
        else {
            // Router.push('/register')
        }

        setIsLoading(false)

    }, [userInfo])

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
