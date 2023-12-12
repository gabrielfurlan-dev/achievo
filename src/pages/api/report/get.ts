import { db } from "@/db";
import { IReport } from "@/interfaces/iReport";
import { IResponseData } from "@/interfaces/iResponseData";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).send({ message: "Only GET methods are allowed" });
        return;
    }

    const reportId: number = Number(req.query.reportId as string);

    try {
        const rawReportData = await db.$queryRaw<any[]>(Prisma.sql`
            SELECT
                "R".id AS "reportId",
                "R"."createdDate",
                "R"."updatedDate",

                "G".id AS "progressGoalId",
                "G"."updatedDate" AS "goalUpdatedDate",
                "G"."title",
                "G"."index",
                "G"."value",
                "G"."total",

                "T".id AS "tagId",
                "T"."title" AS "tagTitle",
                "T"."icon" AS "tagIcon",

                "C"."hexCode" AS "hexColor",

                "U".id AS "userId",
                "U"."username",
                "U"."name",
                "U"."imageURL"

            FROM "Report" AS "R"
            LEFT JOIN "ProgressGoal" AS "G" ON "R".id = "G"."reportId"
            LEFT JOIN "GoalTags" AS "GT" ON "G".id = "GT"."progressGoalId"
            LEFT JOIN "Tag" AS "T" ON "GT"."tagId" = "T".id
            LEFT JOIN "Color" AS "C" ON "C"."hexCode" = "T"."colorHexCode"
            INNER JOIN "User"AS "U" ON "U".id = "R"."userId"
            WHERE "R".id = ${reportId};
        `);

        const report = mapToIReportStructure(rawReportData);

        return res.status(200).json({
            success: true,
            data: report,
            message: "Report obtained successfully!",
        } as IResponseData);
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Error getting report, " + String(error),
        } as IResponseData);
    }
}

function mapToIReportStructure(rawData: any[]): IReport {
    const report: Partial<IReport> = {};

    rawData.forEach(row => {
        if (!report.reportId) {
            report.reportId = row.reportId;
            report.createdDate = row.createdDate;
            report.updatedDate = row.updatedDate;
            report.progressGoals = [];
            report.user = {
                id: row.userId,
                username: row.username,
                name: row.name,
                imageURL: row.imageURL,
                description: "",
                updatedDate: "",
                email: ""
            };
        }

        let progressGoal = report.progressGoals?.find(g => g.id === row.progressGoalId);
        if (!progressGoal) {
            progressGoal = {
                reportId: row.progressGoalId,
                updatedDate: row.goalUpdatedDate,
                id: row.progressGoalId,
                title: row.title,
                index: row.index,
                value: row.value,
                total: row.total,
                tags: []
            };
            report.progressGoals?.push(progressGoal);
        }

        if (row.tagId) {
            const tag = {
                id: row.tagId,
                title: row.tagTitle,
                icon: row.tagIcon,
                hexColor: row.hexColor
            };
            progressGoal.tags?.push(tag);
        }
    });

    return report as IReport;
}
