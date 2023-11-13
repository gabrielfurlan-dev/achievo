import { ProfileImage } from "@/components/UserImage";
import { IUserListItem } from "@/interfaces/users/IUserListItem";
import { Check, UserPlus, Users } from "phosphor-react";

interface props {
    user: IUserListItem,
    handleFollowUser(action: "follow" | "unfollow", userIdToAct: string): Promise<void>
}

export function FriendItem({ user, handleFollowUser }: props) {

    function getMessageCommonFollowers(user: IUserListItem) {

        if (user.commonFollowers == null)
            return "you have no followers in common"

        if (user.commonFollowers.length > 3)
            return `${user.commonFollowers.join(', ')} and ${user.commonFollowers.length - 3} are following`;
        if (user.commonFollowers.length > 1)
            return `${user.commonFollowers.join(" and ")} are following`
        if (user.commonFollowers.length == 1)
            return `${user.commonFollowers} is following`
    }

    return (
        <>
            <div
                className="bg-NEUTRAL_GRAY_01 dark:bg-NEUTRAL_DARK_300 justify-between py-3 rounded-lg mb-4 pl-6 pr-4 items-center"
                key={user.id}>
                <div className="flex justify-between">
                    <div className="flex gap-3 items-center">
                        <ProfileImage imageUrl={user.imageURL} rounded className="h-12 w-12" />
                        <div>
                            <div className="flex flex-wrap">
                                <span className="text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_02 font-bold text-lg mr-2">{user.name}</span>
                                <span className="text-NEUTRAL_GRAY_06">@{user.username}</span>
                            </div>
                            <div className="hidden md:flex gap-1 items-center text-NEUTRAL_GRAY_06">
                                <Users size={24} />
                                <span>{getMessageCommonFollowers(user)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end md:items-center flex-col-reverse md:flex-row md:gap-6">
                        {
                            user.following ?
                                <button
                                    className="flex items-center h-10 w-[120px] justify-center bg-NEUTRAL_GRAY_02 dark:bg-NEUTRAL_GRAY_09 text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_WHITE px-4 md:px-6 rounded-lg text-md transition duration-150
                                    hover:bg-NEUTRAL_GRAY_04 dark:hover:bg-NEUTRAL_GRAY_07"
                                    onClick={() => handleFollowUser("unfollow", user.id)}
                                >
                                    <Check size={24} className="md:hidden" />
                                    <span className="hidden md:block">Following</span>
                                </button>
                                :
                                <button
                                    className="text-md text-NEUTRAL_WHITE w-[120px] justify-center transition duration-150 flex items-center h-10 bg-PRIMARY_DEFAULT hover:bg-PRIMARY_03 hover:dark:bg-PRIMARY_05 rounded-lg gap-2 "
                                    onClick={() => handleFollowUser("follow", user.id)}
                                >
                                    <UserPlus size={24} />
                                    <span className="hidden md:block">Follow</span>
                                </button>
                        }
                    </div>
                </div>
                <div className="flex md:hidden gap-1 items-center text-NEUTRAL_GRAY_06 py-2">
                    <Users size={24} />
                    <span>{getMessageCommonFollowers(user)}</span>
                </div>
            </div>
        </>
    );
}
