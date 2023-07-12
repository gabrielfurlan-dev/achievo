import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Router from "next/router";
import Swal from 'sweetalert2';

export async function handleLoginGoogle() {
    try {
        const data = await callGoogleAuth();

        if (data.success) {
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userPhotoURL', data.photoURL);

            Router.push("/home");
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocorreu um erro ao fazer login com o Google!',
        });
    }
}

async function callGoogleAuth() {
    try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        return {
            success: true,
            email: user.email ?? "",
            name: user.displayName ?? "",
            photoURL: user.photoURL ?? ""
        };
    } catch (error) {
        return { success: false, email: "", name: "", photoURL: "" };
    }
}
