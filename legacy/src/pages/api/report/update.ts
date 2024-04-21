import { ICheckGoal } from "@/interfaces/goals/checkGoals/iCheckGoal";
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
    checkGoals: {
        deleted: ICheckGoal[];
        inserted: ICheckGoal[];
        modified: ICheckGoal[];
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
        const { reportId, checkGoals, progressGoals }: IUpdateReportCommand =
            req.body;

        const report = await db.$transaction(async transaction => {
            checkGoals.modified.map(async goal => {
                return transaction.checkGoal.update({
                    data: {
                        title: goal.title,
                        index: goal.index,
                        checked: goal.checked,
                    },
                    where: {
                        id: goal.id,
                    },
                });
            });

            checkGoals.inserted.map(async goal => {
                return transaction.checkGoal.create({
                    data: {
                        title: goal.title,
                        index: goal.index,
                        checked: goal.checked,
                        reportId: reportId,
                    },
                });
            });

            checkGoals.deleted.map(async goal => {
                return transaction.checkGoal.delete({
                    where: {
                        id: goal.id,
                    },
                });
            });

            progressGoals.modified.map(async goal => {
                return transaction.progressGoal.update({
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
                return transaction.progressGoal.create({
                    data: {
                        title: goal.title,
                        index: goal.index,
                        total: goal.total,
                        value: goal.value,
                        reportId: reportId,
                    },
                });
            });

            progressGoals.deleted.map(async goal => {
                return transaction.progressGoal.delete({
                    where: {
                        id: goal.id,
                    },
                });
            });

            const report = await transaction.report.update({
                where: { id: reportId },
                data: {
                    id: reportId,
                },
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
