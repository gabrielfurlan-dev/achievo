import { IProgressGoal } from "@/interfaces/goals/progressGoals/iProgressGoal";
import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";
import { prismaTransaction } from "@/interfaces/dataBase/prismaTransaction";

export interface IUpdateReportCommand {
    userId: string,
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
        res.status(405).send({ message: "Only PUT methods are allowed" });
        return;
    }

    try {
        const { userId, reportId, progressGoals }: IUpdateReportCommand = req.body;

        await db.$transaction(async transaction => {
            for (const goal of progressGoals.modified) {
                await updateGoalAndTags(transaction, goal, userId);
            }

            for (const goal of progressGoals.inserted) {
                await createGoal(transaction, goal, reportId, userId);
            }

            for (const goal of progressGoals.deleted) {
                await deleteGoal(transaction, goal);
            }
        });

        return res.status(200).json({
            success: true,
            data: null,
            message: "Report updated successfully!",
        } as IResponseData);
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Error while updating report",
            error: String(error),
        } as IResponseData);
    }
}

async function updateGoalAndTags(transaction: prismaTransaction, goal: IProgressGoal, userId: string) {

    await transaction.progressGoal.update({
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

    const tagsIds = await updateTags(transaction, goal, userId);

    const existingTags = await transaction.goalTags.findMany({
        where: {
            progressGoalId: goal.id,
        },
    });

    const existingTagIds = existingTags.map((tag) => tag.tagId);
    const tagsToRemove = existingTagIds.filter((tagId) => !tagsIds.includes(tagId));

    if (tagsToRemove.length > 0) {
        await transaction.goalTags.deleteMany({
            where: {
                progressGoalId: goal.id,
                tagId: {
                    in: tagsToRemove,
                },
            },
        });
    }
}

async function updateTags(transaction: prismaTransaction, goal: IProgressGoal, userId: string) {
    const tagsIds = [];

    for (const tag of goal.tags) {

        if (tag.id == 0) {
            const newTag = await transaction.tag.create({
                data: {
                    title: tag.title,
                    colorHexCode: tag.hexColor,
                    icon: tag.icon,
                    userId: userId
                }
            })
            tag.id = newTag.id
        }else{
            await transaction.tag.update({
                data: {
                    title: tag.title,
                    colorHexCode: tag.hexColor,
                    icon: tag.icon,
                    userId: userId
                },
                where:  {id: tag.id}
            })
        }

        await transaction.goalTags.upsert({
            where: {
                progressGoalId_tagId: {
                    tagId: tag.id,
                    progressGoalId: goal.id,
                },
            },
            update:{},
            create: {
                tagId: tag.id,
                progressGoalId: goal.id,
            },
        });
        tagsIds.push(tag.id);
    }

    return tagsIds;
}

async function createGoal(transaction: prismaTransaction, goal: IProgressGoal, reportId: number, userId: string) {
    await transaction.progressGoal.create({
        data: {
            title: goal.title,
            index: goal.index,
            total: goal.total,
            value: goal.value,
            reportId: reportId,
        },
    });

    await updateTags(transaction, goal, userId)
}

async function deleteGoal(transaction: prismaTransaction, goal: IProgressGoal) {
    await transaction.progressGoal.delete({
        where: {
            id: goal.id,
        },
    });
}
