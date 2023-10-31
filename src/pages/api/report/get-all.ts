import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getFollowers } from "@/services/user/getFollowers";
import { Prisma } from "@prisma/client";
import { IReportItem } from "@/interfaces/reports/IReportItem";

interface IFilterReport {
    userId: string,
    startDate: string,
    endDate: string,
    option: "onlyMine" | "whoDoIFollow" | "everyone",
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).send({ message: "Somente métodos GET são permitidos" });
        return;
    }

    //FIXME: use this code to convert js date to pgsql date
    // var userTimezoneOffset = date.getTimezoneOffset() * 60000;
    // new Date(date.getTime() - userTimezoneOffset);

    // async function getFilter(filter: IFilterReport) {
    //     if (filter.option == "whoDoIFollow") {
    //         return `AND "R"."userId" IN (${await getFollowers(filter.userId)})`
    //     } else if (filter.option == "onlyMine") {
    //         return `AND "R"."userId" = ${filter.userId}`
    //     }
    //     //if (filter.searchName){
    //     // sql.concat(`AND LOWER("U"."name") LIKE '%${filter.searchName}%'`)
    //     // }
    // }

    try {

        const userId = req.query.userId as string;
        const startDate = req.query.userId as string;
        const endDate = req.query.userId as string;
        const option = req.query.userId as string;

        console.clear();
        console.log(JSON.stringify(filter));

        const sql = Prisma.sql`
            SELECT "R"."id" AS "reportId",
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
            WHERE "R"."createdDate" BETWEEN ${filter.startDate} AND ${filter.endDate}
            GROUP BY "U"."name", "U"."username", "U"."description", "U"."imageURL", "R"."id", "U"."id";`

        // console.log(sql)

        const reports = await db.$queryRaw(sql) as IReportItem[]

        //TODO: put the where clausule in the query
        // WHERE "R"."createdDate" BETWEEN
        // ${new Date(filter.startDate)} AND ${new Date(filter.endDate)}

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
