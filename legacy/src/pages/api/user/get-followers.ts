import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getFollowers(
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

        const followersUser = await db.follow.findMany({
            where: {
               userId : userId
            },
            select: {
                followingUserId: true
            }
        });

        return res.status(200).json({
            success: true,
            data: followersUser.map(x => x.followingUserId),
            message: "Seguidores obtidos com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao obbter os seguidores",
            error: String(error),
        });
    }
}
