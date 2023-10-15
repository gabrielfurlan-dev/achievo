import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function followUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).send({
            message: "Somente métodos POST são permitidos",
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

        return res.status(201).json({
            success: true,
            data: follow,
            message: "Seguindo com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao seguir o usuário",
            error: String(error),
        });
    }
}
