import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAllFollowers(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).send({
            message: "Somente métodos GET são permitidos",
        });
    }

    try {
        const userId = req.query.userId as string;

        const followers = await db.follow.findMany({
            where: {
                followingUserId: String(userId),
            },
            include: {
                userFollowed: true,
            },
        });

        return res.status(200).json({
            success: true,
            data: followers,
            message: "Seguidores recuperados com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao recuperar seguidores",
            error: String(error),
        });
    }
}
