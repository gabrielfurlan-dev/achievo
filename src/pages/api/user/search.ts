import { db } from './../../../db';
import { NextApiRequest, NextApiResponse } from 'next';
import { IResponseData } from '@/interfaces/iResponseData';
import { Prisma } from '@prisma/client';
import { IUserListItem } from '@/interfaces/users/IUserListItem';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).send({
            message: 'Only GET method is allowed',
        });
    }

    try {
        const userId = await req.query.userId as string;

        const sql = Prisma.sql`
            WITH SpecificUserFollowers AS (
                SELECT "F"."followingUserId"
                FROM "Follow" AS "F"
                WHERE "F"."userId" = ${userId}
            )

            SELECT
            "U2"."id",
            "U2"."name",
            "U2"."username",
            "U2"."imageURL",

            ARRAY_AGG(DISTINCT CASE WHEN "F"."followingUserId" IS NOT NULL THEN "U"."name" ELSE NULL END) FILTER (WHERE "F"."followingUserId" IS NOT NULL) AS "commonFollowers",

            CASE
                WHEN (SELECT "F"."userId" FROM "Follow" AS "F"
                    WHERE "F"."userId" = "U2"."id"
                    AND "F"."followingUserId" = ${userId}) IS NOT NULL THEN TRUE
                ELSE FALSE
            END AS "isFollowingYou",

            CASE WHEN "FollowCheck"."id" IS NOT NULL THEN TRUE ELSE FALSE END AS "following"

            FROM "User" AS "U2"
            LEFT JOIN "Follow" AS "F" ON "U2"."id" = "F"."userId" AND "F"."followingUserId" IN (SELECT "followingUserId" FROM SpecificUserFollowers)
            LEFT JOIN "User" AS "U" ON "F"."followingUserId" = "U"."id"
            LEFT JOIN "Follow" AS "FollowCheck" ON "U2"."id" = "FollowCheck"."followingUserId" AND "FollowCheck"."userId" = ${userId}
            WHERE "U2"."id" != ${userId}
            GROUP BY "U2"."id", "FollowCheck"."id"
            ORDER BY "U2"."name";`

        const users = await db.$queryRaw(sql) as IUserListItem[]

        res.status(200).json({
            success: true,
            data: users,
            message: "List of users obtained successfully",
        } as IResponseData);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Error while retrieving the list of users",
            error: String(error),
        } as IResponseData);
    } finally {
        db.$disconnect();
    }
};
