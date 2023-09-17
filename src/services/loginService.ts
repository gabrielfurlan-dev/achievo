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

export async function handleLoginGoogle() {
    const user = await callGoogleAuth();

    if (user?.success) {
        const userData = await getUserData(user.email);

        if (userData.success) {

            let userData = await userExists(user.email)

            if (!userData.data) {
                userData = await registerUser(user.name, user.email, user.photoURL);
                await sendNewUserEmail(user.name, user.email);
            }

            return userData
        }
    }

    return {
        success: false,
        message: "Não foi possível realizar o login.",
        data: null,
    } as IResponseData;
}
