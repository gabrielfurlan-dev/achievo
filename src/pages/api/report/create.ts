import { IProgressGoalRaw } from "@/interfaces/goals/progressGoals/iProgressGoalRaw";
import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";
import { ITag } from "@/interfaces/tags/ITag";

export interface ICreateReportCommand {
    userId: string;
    goals: IProgressGoalRaw[];
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
        const { userId, goals }: ICreateReportCommand =
            req.body;

        await db.$transaction(async transaction => {

            const report = await transaction.report.create({
                data: {
                    userId: userId,
                },
            });

            for (const goal of goals) {
                const createdGoal = await transaction.progressGoal.create({
                    data: {
                        title: goal.title,
                        index: goal.index,
                        total: goal.total,
                        value: goal.value,
                        reportId: report.id
                    },
                });

                await relateTags(goal.tags, transaction, userId, createdGoal.id);
            }

        });

        return res.status(201).json({
            success: true,
            data: null,
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

async function relateTags(
    tags: ITag[],
    transaction: any,
    userId: string,
    createdGoalId: number) {

    for (const tag of tags) {

        if (tag.id <= 0) {
            const createdTag = await transaction.tag.create({
                data: {
                    title: tag.title,
                    icon: "",
                    colorHexCode: tag.colorHexCode,
                    userId: userId,
                }
            });

            await transaction.goalTags.create({
                data: {
                    progressGoalId: createdGoalId,
                    tagId: createdTag.id
                }
            });

        } else {
            await transaction.goalTags.create({
                data: {
                    progressGoalId: tag.id,
                    tagId: tag.id
                }
            });

        }
    }
}
