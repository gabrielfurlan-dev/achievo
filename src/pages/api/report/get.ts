import { IResponseData } from "@/Interfaces/IResponseData";
import { ICheckGoalRaw, IProgressGoalRaw } from "@/Interfaces/report";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export interface ICreateReportCommand {
    userRef: number,
    progressGoals: IProgressGoalRaw[];
    checkGoals: ICheckGoalRaw[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Somente métodos GET são permitidos' })
        return
    }

    const id: number = req.body;

    try {

        return await db.$transaction(async (transaction) => {

            const report = await transaction.report.findFirst({
                include: {
                    checkGoals: true,
                    progressGoals: true,
                    user: true
                },
                where: {
                    id: id
                }
            });

            return res.status(201).json({
                success: true,
                data: report,
                message: "Relatório registrado com sucesso!",
            } as IResponseData);
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao registrar o relatório",
            error: String(error)
        } as IResponseData);
    }
}
