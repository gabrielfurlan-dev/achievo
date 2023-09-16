import { GoogleLogo, ReadCvLogo } from "@phosphor-icons/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { handleLoginGoogle } from "@/services/loginService";
import { useUserInfoStore } from "@/store/userStoreInfo";
import Swal from "sweetalert2";
import { signIn, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (session) {
        return {
            redirect: {
                destination: '/home',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

export default function login() {
    const [isLoading, setIsLoading] = useState(false);
    const { setUserInfo } = useUserInfoStore();

    const { data: session, status } = useSession();

    // useEffect(() => {
    //     if (status === "authenticated") {
    //         const { name, email, image } = session.user;
    //         setUserInfo({ name, email, image });
    //     }
    // }, [status, session]);

    function handleNextAuthSignIn() {
        setIsLoading(true);
        signIn('google')
    }

    return (
        <div className="items-center h-screen w-screen justify-center flex flex-col">
            <div className="text-center items-center justify-center flex flex-col gap-2 dark:text-WHITE_PRINCIPAL">
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
                            hover:bg-PRINCIPAL hover:text-WHITE_PRINCIPAL
                             dark:text-WHITE_PRINCIPAL
                            "
                            // onClick={handleLogin}
                            onClick={handleNextAuthSignIn}
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
