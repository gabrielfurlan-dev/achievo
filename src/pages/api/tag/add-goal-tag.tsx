import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

interface addGoalTagProps {
    goalId: number,
    tagId: number
}

export default async function addGoalTag(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).send({
            message: "Only POST methods are allowed",
        });
    }

    try {
        const data = req.body as addGoalTagProps;

        const response = await db.goalTags.create({
            data:
            {
                tagId: data.tagId,
                progressGoalId: data.goalId
            }
        });

        return res.status(200).json({
            success: true,
            data: response,
            message: "Goal tag added successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Error adding tag",
            error: String(error),
        });
    }
}
