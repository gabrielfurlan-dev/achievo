import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ReadCVLogo } from "@/assets/icons/ReadCVLogo";
import { GoogleLogo } from "phosphor-react";

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

    async function handleNextAuthSignIn() {
        setIsLoading(true);
        await signIn('google')
    }

    return (
        <div className="items-center h-screen w-screen justify-center flex flex-col">
            <div className="text-center items-center justify-center flex flex-col gap-2 dark:text-WHITE_PRINCIPAL">
                <ReadCVLogo size={64} color="#5C8A74" />
                <p className="text-xl">Bem vindo ao </p>
                <span className="text-4xl font-semibold">Weekly Report</span>
            </div>

            <div className="flex mt-12">
                {isLoading ? (<CircularProgress color="inherit" />) : (
                    <div className="flex flex-col items-center gap-4">
                        <button
                            className="flex flex-row items-center  border-[2px] m-auto rounded-xl px-4 py-2 gap-4
                            bg-none
                            text-GRAY_DARK
                            border-PRINCIPAL
                            hover:bg-PRINCIPAL hover:text-WHITE_PRINCIPAL
                             dark:text-WHITE_PRINCIPAL"
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
