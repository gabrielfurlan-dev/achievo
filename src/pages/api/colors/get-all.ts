import { db } from "@/db";
import { getCommonFollowersFunction } from "@/repositories/Followers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getCommonFollowers(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).send({
            message: "Only GET methods are allowed",
        });
    }

    try {

        const colors = await db.color.findMany()

        return res.status(200).json({
            success: true,
            data: colors,
            message: "Successfully obtained colors!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Error while getting colors",
            error: String(error),
        });
    }
}
