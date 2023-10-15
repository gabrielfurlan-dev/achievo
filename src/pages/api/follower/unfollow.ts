import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function unfollowUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "DELETE") {
        return res.status(405).send({
            message: "Somente métodos DELETE são permitidos",
        });
    }

    try {
        const { userId, followingUserId } = req.body;

        await db.follow.delete({
            where: {
                userId_followingUserId: {
                    userId,
                    followingUserId,
                },
            },
        });

        return res.status(200).json({
            success: true,
            message: "Deixou de seguir com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Erro ao deixar de seguir o usuário",
            error: String(error),
        });
    }
}
