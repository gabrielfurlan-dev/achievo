import { IResponseData } from "@/interfaces/iResponseData";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getUserData, registerUser, userExists } from "./userService";
import { sendNewUserEmail } from "./email/newUserEmail";

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

export async function handleLoginGoogle(name: string, email: string, imageURL: string) {

    try {

        let userData = await userExists(email)

        if (!userData.data) {
            userData = await registerUser(name, email, imageURL);
            await sendNewUserEmail(name, email);
        }

        return userData

    } catch (error) {
        return {
            success: false,
            message: "Não foi possível realizar o login.",
            data: null,
        } as IResponseData;
    }
}
