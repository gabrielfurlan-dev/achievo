import { IResponseData } from "@/Interfaces/IResponseData";
import { ICheckGoal, IProgressGoal } from "@/Interfaces/report";
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
            });

            const checkUpdates = checkGoals.map(async (goal) => {
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
