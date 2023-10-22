import { db } from "@/db";

export async function  getCommonFollowersFunction(userId: string, userIdToCompare: string) {

    const followersUser = await db.follow.findMany({
        where: { userId: userIdToCompare },
        include: {
            userFollowed: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    imageURL: true,
                    username: true,
                },
            },
        },
    });

    const followersUserTocompare = await db.follow.findMany({
        where: {
            userId: userIdToCompare,
            NOT: {
                followingUserId: userId
            }
        },
        include: {
            userFollowed: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    imageURL: true,
                    username: true,
                },
            },
        },
    });

    const commomFollowers = followersUser.filter(followerUser =>
        followersUserTocompare.some(followerToCompare => followerToCompare.followingUserId === followerUser.followingUserId)
    )

    return commomFollowers;
}
