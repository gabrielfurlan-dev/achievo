import { IResponseData } from "@/interfaces/iResponseData";
import variables from "@/schemas/env-variables";

export async function sendNewUserEmail(name: string, email: string) {
    try {

        const response = await fetch(variables.MAIL_SERVICE_URL.concat("/api/send-mail/welcome-user/"), {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                key: variables.MAIL_SERVICE_KEY
            }),
            headers: { "Content-Type": "application/json" }
        });

        return await response.json() as IResponseData;

    } catch (error) {
        return {
            data: null,
            success: false,
            message: `Não foi possível enviar o email de boas vindas! Erro:${error}`
        } as IResponseData
    }

}

