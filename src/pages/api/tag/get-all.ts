import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addGoalTag(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).send({
            message: "Only GET methods are allowed",
        });
    }

    try {
        const userId = req.query.userId as string;

        const response = await db.tag.findMany({
            where: {
                userId: {
                    in: [userId, "0"],
                },
            },
        });

        return res.status(200).json({
            success: true,
            data: response,
            message: "successfully obtained tags",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Error while getting tags",
            error: String(error),
        });
    }
}
