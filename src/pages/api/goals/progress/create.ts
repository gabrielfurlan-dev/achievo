import { db } from "@/db";
import { ITag } from "@/interfaces/tags/ITag";

export interface ICreateProgressGoalCommand {
    goals: [
        {
            title: string,
            index: number,
            value: number,
            total: number,
            tags: ITag[]
        },
    ],
    reportId: number,
    userId: string,
}

export default async function handler({ goals, reportId, userId }: ICreateProgressGoalCommand) {
    try {

        await db.$transaction(async (tx) => {

            for (const goal of goals) {

                const createdGoal = await tx.progressGoal.create({
                    data: {
                        title: goal.title,
                        index: goal.index,
                        total: goal.total,
                        value: goal.value,
                        reportId: reportId
                    },
                });

                await relateTags(goal.tags, tx, userId, createdGoal.id);
            }
        })

        return {
            data: "Relatório adicionado com sucesso!",
            error: "",
            type: "success",
        };
    } catch (error) {
        return {
            data: "Erro ao adicionar o relatório:",
            error: String(error),
            type: "error",
        };
    }
}

async function relateTags(
        tags: ITag[],
        tx: any,
        userId: string,
        createdGoalId: number) {

    for (const tag of tags) {

        if (tag.id === 0) {
            const createdTag = await tx.tag.create({
                data: {
                    title: tag.title,
                    icon: "",
                    colorHexCode: tag.colorHexCode,
                    userId: userId,
                }
            });

            await tx.goalTags.create({
                data: {
                    progressGoalId: createdGoalId,
                    tagId: createdTag.id
                }
            });

        } else {
            await tx.goalTags.create({
                data: {
                    progressGoalId: tag.id,
                    tagId: tag.id
                }
            });

        }
    }
}

