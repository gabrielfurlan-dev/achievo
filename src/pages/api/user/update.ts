import { db } from "@/db";
import { IResponseData } from "@/interfaces/iResponseData";
import { NextApiRequest, NextApiResponse } from "next";

export interface IUpdateUserCommand {
    id: number,
    name: string,
    username: string,
    description: string
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        res.status(405).send({
            message: "Somente métodos PUT são permitidos",
        });
        return;
    }

    const userInfo = req.body as IUpdateUserCommand;

    try {
        const user = await db.user.update({
            data: {
                name: userInfo.name,
                username: userInfo.username,
                description: userInfo.description
            },
            where: {
                id: userInfo.id
            }
        })

        return res.status(201).json({
            success: true,
            data: user,
            message: "Usuário atualizado com sucesso!",
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
