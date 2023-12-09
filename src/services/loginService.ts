import { IResponseData } from "@/interfaces/iResponseData";
import { registerUser, userExists } from "./users/userService";
import { sendNewUserEmail } from "./emails/newUserEmail";

export async function handleLoginGoogle(name: string, email: string, imageURL: string) {

    try {

        let userData = await userExists(email)

        if (!userData.data) {
            userData = await registerUser(name, email, imageURL);
            // await sendNewUserEmail(name, email);
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
