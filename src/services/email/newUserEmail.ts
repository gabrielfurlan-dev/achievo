import { IResponseData } from "@/interfaces/iResponseData";
import variables from "@/schemas/env-variables";

export async function sendNewUserEmail(name: string, email: string) {
    const response = await fetch(variables.MAIL_SERVICE_URL.concat("/api/send-mail/welcome-user/"), {
        method: "POST",
        body: JSON.stringify({
            name: name,
            email: email,
            key: variables.MAIL_SERVICE_KEY
        }),
        headers: { "Content-Type": "application/json" }
    });

    console.log("Welcome mail message was sended:")

    return await response.json() as IResponseData;
}

