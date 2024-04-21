import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { GoogleLogo } from "phosphor-react";
import { IconAchievo } from "@/assets/icons/IconAchievo";

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
            <div className="text-center items-center justify-center flex flex-col gap-2 dark:text-white p-6 rounded-lg">
                <div className="bg-opacity-0 bg-white rounded-3xl" style={{ boxShadow: "4px 0px 18px 0px rgba(66, 101, 84, 0.61)" }}>
                    <IconAchievo size={120} color="#5C8A74" />
                </div>
                <div className="pt-6">
                    <p className="text-xl">Welcome to</p>
                    <span className="text-4xl font-semibold">Achievo</span>
                </div>
            </div>

            <div className="flex pt-4">
                {isLoading ? (<CircularProgress color="inherit" />) : (
                    <div className="flex flex-col items-center gap-4">
                        <button
                            className="flex flex-row items-center  border-[2px] m-auto rounded-xl px-4 md:px-10 py-2 gap-4
                            bg-none
                            text-GRAY_DARK
                            border-PRINCIPAL
                            hover:bg-PRINCIPAL hover:text-WHITE_PRINCIPAL
                             dark:text-WHITE_PRINCIPAL"
                            onClick={handleNextAuthSignIn}
                        >
                            <GoogleLogo size={24} />
                            <p className="text-lg">Login with Google</p>
                        </button>
                        <p className="text-GRAY">Sign in to continue</p>
                    </div>
                )}
            </div>
        </div>
    );
}
