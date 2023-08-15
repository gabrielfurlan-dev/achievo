import { ICheckGoalRaw } from "@/interfaces/goals/checkGoals/ICheckGoalRaw";
import { IProgressGoalRaw } from "@/interfaces/goals/progressGoals/IProgressGoalRaw";
import { IResponseData } from "@/interfaces/IResponseData";
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
    if (req.method !== "POST") {
        res.status(405).send({
            message: "Somente métodos POST são permitidos",
        });
        return;
    }

    try {
        const { userRef, checkGoals, progressGoals }: ICreateReportCommand =
            req.body;

        const report = await db.$transaction(async transaction => {
            const report = await transaction.report.create({
                data: {
                    userId: userRef,
                },
            });

            await transaction.progressGoal.createMany({
                data: progressGoals.map(goal => ({
                    title: goal.title,
                    index: goal.index,
                    total: goal.total,
                    value: goal.value,
                    reportId: report.id,
                })),
            });

            await transaction.checkGoal.createMany({
                data: checkGoals.map(goal => ({
                    title: goal.title,
                    index: goal.index,
                    checked: goal.checked,
                    reportId: report.id,
                })),
            });

            return report;
        });

        return res.status(201).json({
            success: true,
            data: report,
            message: "Relatório registrado com sucesso!",
        } as IResponseData);
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao registrar o relatório",
            error: String(error),
        } as IResponseData);
    }
}
