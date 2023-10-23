import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).send({ message: "Somente métodos GET são permitidos" });
        return;
    }


    try {
        const IdsToFilter = req.body as string[];

        const reports = await db.report.findMany({
            // where: {
            //     userId: {
            //         in: IdsToFilter
            //     }
            // },
            include: {
                user: {
                    select: {
                        id: true,
                        imageURL: true
                    }
                }
            },
            orderBy: {
                createdDate: "desc",
            },
        });

        return res.status(201).json({
            success: true,
            data: reports,
            message: "Relatórios obtidos com sucesso!",
        } as IResponseData);
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao obter os relatórios",
            error: String(error),
        } as IResponseData);
    }
}
