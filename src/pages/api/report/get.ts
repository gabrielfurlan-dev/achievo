import { ICheckGoalRaw } from "@/Interfaces/goals/checkGoals/ICheckGoalRaw";
import { IProgressGoalRaw } from "@/Interfaces/goals/progressGoals/IProgressGoalRaw";
import { IResponseData } from "@/Interfaces/IResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export interface ICreateReportCommand {
    userRef: number;
    progressGoals: IProgressGoalRaw[];
    checkGoals: ICheckGoalRaw[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).send({ message: "Somente métodos GET são permitidos" });
        return;
    }

    const reportId: number = Number(req.query.reportId as string);

    console.log(reportId);

    try {
        const report = await db.report.findFirst({
            include: {
                checkGoals: true,
                progressGoals: true,
                user: true,
            },
            where: {
                id: reportId,
            },
        });

        return res.status(201).json({
            success: true,
            data: report,
            message: "Relatório obtido com sucesso!",
        } as IResponseData);
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao obter o relatório, " + String(error),
        } as IResponseData);
    }
}
