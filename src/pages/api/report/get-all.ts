import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { IReportItem } from "@/interfaces/reports/IReportItem";
import { ReportFilterOptions } from "@/interfaces/reports/types/reportFilterOptions";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).send({ message: "Somente métodos GET são permitidos" });
        return;
    }

    try {
        const userId = req.query.userId as string;
        const startDate = new Date(req.query.startDate as string)
        const endDate = new Date(req.query.endDate as string)
        const option = req.query.option as ReportFilterOptions;
        const searchName = req.query.searchName as string;

        if (!userId || !startDate || !endDate || !option) {
            return res.status(400).send({ message: 'Parâmetros inválidos' });
        }

        const filterByName = () => {
            if (option === "onlyMine" || !searchName || searchName.length == 0)
                return Prisma.sql``;

            return Prisma.sql`AND LOWER("U"."name") LIKE ${`%${searchName.toLowerCase()}%`}`;
        }

        const filterByOption = async () => {

            if (option == "whoDoIFollow") {
                const followers = await db.follow.findMany({
                    where: { userId: userId},
                    select: { followingUserId: true }
                });

                if (followers.length > 0) {
                    return Prisma.sql`AND "R"."userId" IN (${Prisma.join(followers.map(x => x.followingUserId))})`
                }else{
                    return Prisma.sql`AND "R"."userId" IN (${'0'})`
                }

            } else if (option == "onlyMine") {
                return Prisma.sql`AND "R"."userId" = ${userId}`
            }

            return Prisma.sql``;
        }

        const sql = Prisma.sql`SELECT "R"."id" AS "reportId",
                              "R"."updatedDate",
                              "R"."createdDate",
                              "U"."id" AS "userId",
                              "U"."name",
                              "U"."username",
                              "U"."description",
                              "U"."imageURL",
                              SUM("PG"."total") AS "total",
                              SUM("PG"."value") AS "value"
                              FROM "Report" AS "R"
                              INNER JOIN "User" AS "U" ON "U".id = "R"."userId"
                              LEFT JOIN "ProgressGoal" AS "PG" ON "PG"."reportId" = "R".id
                              WHERE "R"."createdDate" BETWEEN ${startDate} AND ${endDate}
                              ${filterByName()}
                              ${await filterByOption()}
                              GROUP BY "U"."name", "U"."username", "U"."description", "U"."imageURL", "R"."id", "U"."id";`

        const reports = await db.$queryRaw(sql) as IReportItem[]

        return res.status(200).json({
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
