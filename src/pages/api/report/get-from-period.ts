import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).send({ message: "Somente métodos GET são permitidos" });
        return;
    }

    try {
        const userId = req.query.userId as string;
        const beginDateOfWeek = new Date(req.query.beginDateOfWeek as string);
        const endDateOfWeek = new Date(req.query.endDateOfWeek as string);

        const report = await db.report.findFirst({
            where: {
                userId: userId,
                createdDate: {
                    gte: beginDateOfWeek,
                    lte: endDateOfWeek,
                },
            },
            select: { id: true },
        });

        if (report) {
            return res.status(201).json({
                success: true,
                data: report.id,
                message: "Existe um relatório adicionado na semana atual.",
            } as IResponseData);
        } else {
            return res.status(201).json({
                success: true,
                data: null,
                message: "Não existe um relatório adicionado na semana atual.",
            } as IResponseData);
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message:
                "Falha ao consultar se existe relatório adicionado na semana atual, " +
                String(error),
        } as IResponseData);
    }
}
