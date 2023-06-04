import { GoogleLogo } from "@phosphor-icons/react";
import Swal from "sweetalert2";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';''
import { initializeApp } from "firebase/app";
import env from "variables";
import Router from "next/router";
import firebaseConfig from "@/firebaseConfig";


function handleLoginGoogle() {

    const firebase = firebaseConfig

    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            Router.push("/ShowReport")
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
    return (
        <div className="flex">
            <button
                className="flex bg-green-300 border-green-300 border-[1px] h-10 w-10 m-auto items-center justify-center rounded-md"
                onClick={handleLoginGoogle}
            >
                <GoogleLogo />
            </button>
        </div>
    );
}
