import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getFollowers } from "@/services/user/getFollowers";
import { Prisma } from "@prisma/client";

interface IFilterReport {
    userId: string,
    startDate: string,
    endDate: string,
    options: "onlyMine" | "whoDoIFollow" | "everyone",
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).send({ message: "Somente métodos GET são permitidos" });
        return;
    }

    async function getFilter(filter: IFilterReport) {
        if (filter.options == "whoDoIFollow") {
            return `AND "R"."userId" IN (${await getFollowers(filter.userId)})`
        } else if (filter.options == "onlyMine") {
            return `AND "R"."userId" = ${filter.userId}`
        }
        //if (filter.searchName){
        // sql.concat(`AND LOWER("U"."name") LIKE '%${filter.searchName}%'`)
        // }
    }

    try {

        const filter = await req.body as IFilterReport;

        const reports = await db.$queryRaw(
            Prisma.sql`
                SELECT
                    "R"."id" AS "reportId",
                    "U"."id" AS "userId",
                    "U"."name",
                    "U"."username",
                    "U"."description",
                    "U"."imageURL",
                    SUM("PG"."total") AS "total",
                    SUM("PG"."value") AS "value"

                FROM "Report" AS "R"
                INNER JOIN "User" AS "U" ON "U".id = "R"."userId"
                INNER JOIN "ProgressGoal" AS "PG" ON "PG"."reportId" = "R".id

                WHERE "R"."createdDate" BETWEEN
                ${new Date(filter.startDate)} AND ${new Date(filter.endDate)}
                GROUP BY "U"."name", "U"."username", "U"."description", "U"."imageURL", "R"."id", "U"."id";`
        )

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
