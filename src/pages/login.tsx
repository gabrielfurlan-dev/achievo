import { GoogleLogo } from "@phosphor-icons/react";
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
        if (localStorage.getItem('userEmail') != null) {
            await Router.push('/home')
        }
        setIsLoading(false)
    }

    useEffect(() => {
        validateLogin()
    }, [])

    return (
        <div className="items-center h-screen w-screen justify-center flex flex-col">
            <div className="text-center">
                <h2>Bem vindo ao <br /><span className="text-2xl font-semibold">Weekly Report</span></h2>
            </div>

            <div className="flex mt-6">
                {isLoading ? (
                    <CircularProgress color="inherit" />
                ) : (
                    <div>
                        <p className="mt-10">Faça login para continuar</p>

                        <button
                            className="flex bg-green-200 border-green-200 border-[1px] h-12 w-12 m-auto items-center justify-center rounded-md"
                            onClick={handleLoginGoogle}
                        >
                            <GoogleLogo color="black" size={24} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
