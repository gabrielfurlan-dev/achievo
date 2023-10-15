import { db } from "@/db";

export async function getCommonFollowersFunction(userId: string, userIdToCompare: string) {

    const followersUser = await db.follow.findMany({
        where: { userId: userId },
        select: { followingUserId: true },
    });

    const followersUserTocompare = await db.follow.findMany({
        where: { userId: userIdToCompare },
        select: { followingUserId: true },
    });

    return followersUser.filter(followerUser =>
        followersUserTocompare.some(followerToCompare => followerToCompare.followingUserId === followerUser.followingUserId)
    );
}
