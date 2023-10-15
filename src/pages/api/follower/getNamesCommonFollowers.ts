import { db } from "@/db";
import { getCommonFollowersFunction } from "@/repositories/Followers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getNamesCommonFollowers(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).send({
            message: "Somente métodos GET são permitidos",
        });
    }

    try {

        const userId = req.query.userId1 as string;
        const userIdToCompare = req.query.userId2 as string;

        const commonFollowers = await getCommonFollowersFunction(userId, userIdToCompare);

        const commonFollowersNames = await Promise.all(
            commonFollowers.map(async follower => {
                const user = await db.user.findUnique({
                    where: { id: follower.userId },
                    select: { name: true },
                });
                return user?.name;
            })
        );

        return res.status(200).json({
            success: true,
            data: commonFollowersNames,
            message: "Nomes dos seguidores em comum recuperados com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao recuperar nomes dos seguidores em comum",
            error: String(error),
        });
    }
}
