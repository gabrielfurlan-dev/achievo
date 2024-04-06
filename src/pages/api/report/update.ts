import { IProgressGoal } from "@/interfaces/goals/progressGoals/iProgressGoal";
import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export interface IUpdateReportCommand {
    reportId: number;
    progressGoals: {
        deleted: IProgressGoal[];
        inserted: IProgressGoal[];
        modified: IProgressGoal[];
    };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "PUT") {
        res.status(405).send({ message: "Somente métodos PUT são permitidos" });
        return;
    }

    try {
        const { reportId, progressGoals }: IUpdateReportCommand =
            req.body;

        const report = await db.$transaction(async transaction => {

            progressGoals.modified.map(async goal => {
                return transaction.task.update({
                    data: {
                        title: goal.title,
                        index: goal.index,
                        total: goal.total,
                        value: goal.value,
                    },
                    where: {
                        id: goal.id,
                    },
                });
            });

            progressGoals.inserted.map(async goal => {
                return transaction.task.create({
                    data: {
                        title: goal.title,
                        index: goal.index,
                        total: goal.total,
                        value: goal.value,
                        progress: Math.floor(goal.total / goal.value * 100),
                        reportId: reportId,
                    },
                });
            });

            progressGoals.deleted.map(async goal => {
                return transaction.task.delete({
                    where: {
                        id: goal.id,
                    },
                });
            });

            const report = await transaction.report.update({
                where: { id: reportId },
                data: { id: reportId },
            });

            return report;
        });

        return res.status(201).json({
            success: true,
            data: report,
            message: "Relatório atualizado com sucesso!",
        } as IResponseData);
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao atualizar o relatório",
            error: String(error),
        } as IResponseData);
    }
}
