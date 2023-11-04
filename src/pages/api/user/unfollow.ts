import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function unfollowUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "DELETE") {
        return res.status(405).send({
            message: "Only DELETE methods are allowed",
        });
    }

    try {
        const { userId, userIdToUnfollow } = req.body;

        await db.follow.delete({
            where: {
                userId_followingUserId: {
                    userId,
                    followingUserId: userIdToUnfollow,
                },
            },
        });

        return res.status(200).json({
            success: true,
            message: "User unfollowed successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error when unfollowing user",
            error: String(error),
        });
    }
}
