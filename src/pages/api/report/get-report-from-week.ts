import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export interface IGetReportFromWeek {
    startWeekDate: Date,
    endWeekDate: Date,
    userId: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).send({ message: "Somente métodos GET são permitidos" });
        return;
    }

    const request = req.body as IGetReportFromWeek;
    console.log(request)
    try {
        const report = await db.report.findFirst({
            include: {

            },
            where: {
                id: request.userId,
                createdDate: {
                    // lte: request.endWeekDate.toISOString(),
                    // gte: request.startWeekDate.toISOString(),
                    gte: request.endWeekDate,
                    lte: request.startWeekDate,
                }
            },
        });

        return res.status(201).json({
            success: true,
            data: report,
            message: "Relatório obtido com sucesso!",
        } as IResponseData);
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao obter o relatório, " + String(error),
        } as IResponseData);
    }
}
