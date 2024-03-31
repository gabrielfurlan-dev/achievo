import { ICheckGoalRaw } from "@/interfaces/goals/checkGoals/iCheckGoalRaw";
import { IProgressGoalRaw } from "@/interfaces/goals/progressGoals/iProgressGoalRaw";
import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export interface ICreateReportCommand {
    userId: string;
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
        const { userId , checkGoals, progressGoals }: ICreateReportCommand =
            req.body;

        const report = await db.$transaction(async transaction => {
            const report = await transaction.report.create({
                data: {
                    userId: userId,
                },
            });

            for (const goal of progressGoals) {
                await transaction.task.create({
                    data: {
                        title: goal.title,
                        index: goal.index,
                        total: goal.total,
                        value: goal.value,
                        reportId: report.id,
                    },
                });
            }

            for (const goal of checkGoals) {
                await transaction.task.create({
                    data: {
                        title: goal.title,
                        index: goal.index,
                        value: goal.checked ? 1 : 0,
                        total: 1,
                        reportId: report.id,
                    },
                });
            }

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
