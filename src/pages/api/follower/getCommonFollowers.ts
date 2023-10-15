import { getCommonFollowersFunction } from "@/repositories/Followers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getCommonFollowers(
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

        return res.status(200).json({
            success: true,
            data: commonFollowers,
            message: "Seguidores em comum recuperados com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao recuperar seguidores em comum",
            error: String(error),
        });
    }
}
