import { IResponseData } from "@/Interfaces/IResponseData";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import api from "@/lib/api";
import { getUserData } from "./UserService";

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
            photoURL: user.photoURL ?? "",
        };
    } catch (error) {
        return { success: false, email: "", name: "", photoURL: "" };
    }
}

export async function handleLoginGoogle() {
    const user = await callGoogleAuth();

    if (user?.success) {
        const userData = await getUserData(user.email);

        if (userData.success) {
            const response = await fetch(api.concat("/api/user/register"), {
                method: "POST",
                body: JSON.stringify({
                    email: user.email,
                    name: user.name,
                    imageURL: user.photoURL,
                }),
                headers: { "Content-Type": "application/json" },
            });

            return (await response.json()) as IResponseData;
        }
    }

    return {
        success: false,
        message: "Não foi possível realizar o login.",
        data: null,
    } as IResponseData;
}
