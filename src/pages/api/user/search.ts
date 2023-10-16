import { db } from './../../../db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getCommonFollowersFunction } from '@/repositories/Followers';
import { IResponseData } from '@/interfaces/iResponseData';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).send({
            message: 'Only GET method is allowed',
        });
    }

    try {


        const userId = req.query.userId as string;
        const name = req.query.name as string;
        const filter = req.query.filter as "onlyFollowers"| "onlyFollowing" | "none";

        const users = await db.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                imageURL: true,
            },
            where:{
                name: {
                    contains: name
                }
            }
        });

        let usersWithCommonFollowers = await Promise.all(
            users.map(async (user) => {

                const commomUsers = await getCommonFollowersFunction(userId, user.id);

                return {
                    ...user,
                    commonFollowers: commomUsers.map((follower) => follower.userFollowed.username),
                    isFollowing: false
                };
            })
        );

        if (filter == 'onlyFollowers') {
            usersWithCommonFollowers = usersWithCommonFollowers.filter(x => x.isFollowing == true);
        }else if(filter == 'onlyFollowing'){
            usersWithCommonFollowers = usersWithCommonFollowers.filter(x => x.isFollowing == true);
        }

        res.status(200).json({
            success: true,
            data: usersWithCommonFollowers,
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
