import { ProfileImage } from "@/components/profileImage";
import { IUserListItem } from "@/interfaces/users/IUserListItem";
import { CompactNavBar } from "@/layouts/NavBar/CompactNavBar";
import PageLayout from "@/layouts/PageLayout";
import { searchUsers } from "@/services/user/search";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { DotsThree, MagnifyingGlass, UserPlus, Users } from "phosphor-react";
import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { tv } from "tailwind-variants";

export default function findUser() {

    const [isFilterByFollowers, setIsFilterByFollowers] = useState<boolean>(true)
    const [isFilterByFollowing, setIsFilterByFollowing] = useState<boolean>(false)
    const { userInfo } = useUserInfoStore()
    const [users, setUsers] = useState<IUserListItem[]>([])

    async function updateUsersList() {
        const users = (await searchUsers(userInfo.id)).data as IUserListItem[]
        setUsers(users)
    }

    useEffect(() => {
        updateUsersList();
    }, [])

    function getMessageCommonFollowers(user: IUserListItem) {
        if (user.commonFollowers.length > 3)
            return `${user.commonFollowers.join(', ')} and ${user.commonFollowers.length - 3} are following`;
        if (user.commonFollowers.length > 0)
            return `${user.commonFollowers.join(" and ")} are following`

        return "you have no followers in common"
    }

    return (
        <PageLayout>
            <CompactNavBar title="Friends" />
            <div className="bg-NEUTRAL_GRAY_0 dark:bg-NEUTRAL_DARK_100 pt-14 px-28 mt-14 rounded-t-3xl h-full">
                <div className="flex justify-between">
                    <div id="search" className="bg-NEUTRAL_GRAY_01 dark:bg-NEUTRAL_DARK_300 flex rounded-xl py-2 px-4 items-center gap-4 max-w-sm">
                        <MagnifyingGlass className="text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_06" size={36} />
                        <input type="text" className="outline-none w-full bg-transparent" placeholder="Search" />
                    </div>

                    <div id="filters" className="flex flex-row gap-6">
                        <ToggleButton
                            text="followers"
                            selected={isFilterByFollowers}
                            onChange={() => setIsFilterByFollowers(!isFilterByFollowers)} />
                        <ToggleButton
                            text="following"
                            selected={isFilterByFollowing}
                            onChange={() => setIsFilterByFollowing(!isFilterByFollowing)} />
                    </div>
                </div>

                <div>
                    <p className="text-NEUTRAL_GRAY_06 text-md mt-4 mb-6">Sort by: <span className="text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_02 font-semibold">Recently Added</span></p>
                </div>

                <div id="users">
                    {
                        users && users.map(user => (
                            <div className="bg-NEUTRAL_GRAY_02 dark:bg-NEUTRAL_DARK_300 flex justify-between py-3 rounded-lg mb-4 pl-6 pr-4 items-center">

                                <div className="flex gap-3 items-center">
                                    <ProfileImage imageUrl={user.imageURL} rounded className="h-12 w-12" />
                                    <div>
                                        <div className="flex gap-2">
                                            <span className="text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_02 font-bold text-lg">{user.name}</span>
                                            <span className="text-NEUTRAL_GRAY_06">@{user.username}</span>
                                        </div>
                                        <div className="flex gap-1 items-center text-NEUTRAL_GRAY_06">
                                            <Users size={24} />
                                            <span>{getMessageCommonFollowers(user)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">

                                    <div className="text-NEUTRAL_WHITE flex items-center h-10 bg-PRIMARY_DEFAULT px-4 rounded-lg gap-2">
                                        <UserPlus size={24} />
                                        <button className="text-md">Follow</button>
                                    </div>

                                    <DotsThree className="text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_02" size={24}/>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </PageLayout>
    );
}

interface toggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    selected: boolean
}

function ToggleButton({ text, selected, ...props }: toggleButtonProps) {
    //SHOULD TO MOVE THIS CODE TO A SINGLE FILE COMPONENT
    const button = tv({
        base: "w-28 h-10 rounded-full border-2 border-SECONDARY_DEFAULT font-semibold text-sm",
        variants: {
            selected: {
                true: "bg-SECONDARY_DEFAULT text-white",
                false: "bg-transparent text-SECONDARY_DEFAULT"
            }
        }
    })

    return (
        <button className={button({ selected: selected })} children={text} {...props} />
    );
}
