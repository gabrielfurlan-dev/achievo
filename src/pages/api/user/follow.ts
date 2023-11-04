import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function followUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).send({
            message: "Only POST methods are allowed",
        });
    }

    try {
        const { userId, userIdToFollow } = req.body;

        const follow = await db.follow.create({
            data: {
                userId: userId,
                followingUserId: userIdToFollow,
            },
        });

        return res.status(200).json({
            success: true,
            data: follow,
            message: "User followed successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Error following user",
            error: String(error),
        });
    }
}
