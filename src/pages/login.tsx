import { GoogleLogo, ReadCvLogo } from "@phosphor-icons/react";
import Swal from "sweetalert2";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; ''
import Router from "next/router";
import firebaseConfig from "@/firebaseConfig";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

function handleLoginGoogle() {

    const firebase = firebaseConfig

    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            localStorage.setItem('userEmail', result.user.email ?? "");
            localStorage.setItem('userName', result.user.displayName ?? "");
            localStorage.setItem('userPhotoURL', result.user.photoURL ?? "");
            Router.push("/home")
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocorreu um erro ao fazer login com o Google!',
            });
            console.log(error);
        });
}

export default function login() {
    const [isLoading, setIsLoading] = useState(true);

    async function validateLogin() {
        if (localStorage.getItem('userEmail')) {
            await Router.push('/home')
        }
        setIsLoading(false)
    }

    useEffect(() => {
        validateLogin()
    }, [])

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
                            onClick={handleLoginGoogle}
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
