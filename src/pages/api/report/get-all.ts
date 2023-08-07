import { IResponseData } from "@/Interfaces/IResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Somente métodos GET são permitidos' })
        return
    }

    try {

        const reports = await db.report.findMany({
            include: {
                checkGoals: true,
                progressGoals: true,
                user: true
            },
            orderBy:{
                createdDate: "asc"
            }
        });

        return res.status(201).json({
            success: true,
            data: reports,
            message: "Relatórios obtidos com sucesso!",
        } as IResponseData);

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao obter os relatórios",
            error: String(error)
        } as IResponseData);
    }
}