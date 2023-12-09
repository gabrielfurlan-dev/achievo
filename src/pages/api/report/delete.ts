import { IProgressGoalRaw } from "@/interfaces/goals/progressGoals/iProgressGoalRaw";
import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export interface ICreateReportCommand {
    userRef: number;
    progressGoals: IProgressGoalRaw[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "DELETE") {
        res.status(405).send({
            message: "Somente métodos DELETE são permitidos",
        });
        return;
    }

    const id: number = req.body;

    try {
        const report = await db.report.update({
            where: { id: id },
            data: { enable: false },
        });

        return res.status(201).json({
            success: true,
            data: report,
            message: "Relatório eliminado com sucesso!",
        } as IResponseData);
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao eliminar o relatório",
            error: String(error),
        } as IResponseData);
    }
}
