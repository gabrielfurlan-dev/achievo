import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).send({
            message: "Somente métodos GET são permitidos",
        });
        return;
    }

    try {
        const { email } = req.query;

        let user = await db.user.findFirst({
            where: { email: email?.toString() },
        });

        return res.status(201).json({
            success: true,
            data: user,
            message: "Usuário obtido com sucesso!",
        } as IResponseData);

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao obter usuário",
            error: String(error),
        } as IResponseData);
    }
}
