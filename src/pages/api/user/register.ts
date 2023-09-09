import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";
import variables from "@/schemas/env-variables";
type CreateUserProps = {
    name: string;
    email: string;
    imageURL: string;
};

export default async function (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(405).send({
            message: "Somente métodos POST são permitidos",
        });
        return;
    }

    try {
        const userData: CreateUserProps = req.body;

        let user = await db.user.findFirst({
            where: { email: userData.email },
        });

        if (!user) {
            user = await db.user.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    imageURL: userData.imageURL,
                },
            });

            user = await db.user.update({
                data: {
                    username: `guest${user.id}`
                },
                where: {
                    id: user.id
                }
            })

            await fetch(variables.MAIL_SERVICE_URL.concat("/api/send-mail/welcome-user"), {
                method: "POST",
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    key: variables.MAIL_SERVICE_KEY
                }),
                headers: { "Content-Type": "application/json" }
            })
        }

        return res.status(201).json({
            success: true,
            data: user,
            message: "Usuário registrado com sucesso!",
        } as IResponseData);

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao registrar o usuário",
            error: String(error),
        } as IResponseData);
    }
}
