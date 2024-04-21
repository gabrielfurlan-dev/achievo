import { db } from "@/db";
import { getWeekInterval } from "@/helpers/dateHelper";
import { IResponseData } from "@/interfaces/iResponseData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).send({ message: "Only GET methods are allowed" });
        return;
    }
    try {
        const userId = req.query.userId as string;
        const weekInterval = getWeekInterval(new Date())

        const report = await db.report.findFirst({
            where: {
                userId: userId,
                createdDate: {
                    gte: weekInterval.firstDayOfWeek,
                    lte: weekInterval.lastDayOfWeek,
                },
            },
            select: { id: true },
        });

        return res.status(201).json({
            success: true,
            data: report?.id
        } as IResponseData)

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message:
                "An error ocurred while trying to get the latest report." +
                String(error),
        } as IResponseData);
    }
}
