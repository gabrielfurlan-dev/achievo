import { db } from "@/db";

export async function getCommonFollowersFunction(userId: string, userIdToCompare: string) {
    const followersUser1 = await db.follow.findMany({
        where: { followingUserId: userId },
        select: { userId: true },
    });

    const followersUser2 = await db.follow.findMany({
        where: { followingUserId: userIdToCompare },
        select: { userId: true },
    });

    return followersUser1.filter(followerUser =>
        followersUser2.some(followerToCompare => followerToCompare.userId === followerUser.userId)
    );
}
