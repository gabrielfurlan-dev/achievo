import { ICheckGoal } from "@/Interfaces/Goals/checkGoals/ICheckGoal";
import { IProgressGoal } from "@/Interfaces/Goals/progressGoals/IProgressGoal";
import { IResponseData } from "@/Interfaces/IResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export interface IUpdateReportCommand {
    reportId: number,
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'PUT') {
        res.status(405).send({ message: 'Somente métodos PUT são permitidos' })
        return
    }

    try {

        const { reportId, checkGoals, progressGoals }: IUpdateReportCommand = req.body;

        const report = await db.$transaction(async (transaction) => {

            const report = await transaction.report.update({
                where: { id: reportId },
                data: {
                    id: reportId
                },
            });

            const progressUpdates = progressGoals.map(async (goal) => {

                const goalFinded = await transaction.progressGoal.findFirst({
                    where: {
                        id: goal.id
                    }
                })

                if (goalFinded) {
                    return transaction.progressGoal.update({
                        data: {
                            title: goal.title,
                            index: goal.index,
                            total: goal.total,
                            value: goal.value,
                        },
                        where: {
                            id: goal.id
                        }
                    });
                } else {
                    return transaction.progressGoal.create({
                        data: {
                            title: goal.title,
                            index: goal.index,
                            total: goal.total,
                            value: goal.value,
                            reportId: reportId
                        },
                    });
                }
            });

            const checkUpdates = checkGoals.map(async (goal) => {
                const goalFinded = await transaction.checkGoal.findFirst({
                    where: {
                        id: goal.id
                    }
                })

                if (goalFinded) {
                    return transaction.checkGoal.update({
                        data: {
                            title: goal.title,
                            index: goal.index,
                            checked: goal.checked,
                        },
                        where: {
                            id: goal.id
                        }
                    });
                } else {
                    return transaction.checkGoal.create({
                        data: {
                            title: goal.title,
                            index: goal.index,
                            checked: goal.checked,
                            reportId: reportId
                        },
                    });
                }
            });

            await Promise.all([...progressUpdates, ...checkUpdates]);

            return report;
        });


        return res.status(201).json({
            success: true,
            data: report,
            message: "Relatório atualizado com sucesso!",
        } as IResponseData);
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao atualizar o relatório",
            error: String(error)
        } as IResponseData);
    }
}
