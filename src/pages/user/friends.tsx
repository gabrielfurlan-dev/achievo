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
    const [filterName, setFilterName] = useState<string>("")
    const { userInfo } = useUserInfoStore()
    const [originalUsers, setOriginalUsers] = useState<IUserListItem[]>([])
    const [users, setUsers] = useState<IUserListItem[]>(originalUsers)

    const [filterFollower, setFilterFollower] = useState(false);
    const [filterFollowing, setFilterFollowing] = useState(false);

    async function updateUsersList() {
        const obtainedUsers = (await searchUsers({
            filter: "none",
            name: filterName,
            userId: userInfo.id
        })).data as IUserListItem[]
        setOriginalUsers(obtainedUsers);
        setUsers(obtainedUsers);
    }

    function searchUsersByName(originalUsers: IUserListItem[], filterName: string): IUserListItem[] {
        const regex = new RegExp(filterName, 'i');
        return originalUsers.filter((user) => {
          const nameMatch = regex.test(user.name) || regex.test(user.username);
          const followerMatch = !filterFollower;
          const followingMatch = !filterFollowing || user.isFollowing;
          return nameMatch && followerMatch && followingMatch;
        });
      }


    useEffect(() => {
        updateUsersList();
    }, [])

    useEffect(() => {
        setUsers(searchUsersByName(originalUsers, filterName))
    }, [filterName])


    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    const handleButtonClick = (buttonName: string) => {
        if (selectedButton === buttonName) {
            setSelectedButton(null);
        } else {
            setSelectedButton(buttonName);
        }
    };

    const button = tv({
        base: "w-28 h-10 rounded-full border-2 border-SECONDARY_DEFAULT font-semibold text-sm",
        variants: {
            selected: {
                true: "bg-SECONDARY_DEFAULT text-white",
                false: "bg-transparent text-SECONDARY_DEFAULT"
            }
        }
    })

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
                        <input
                            type="text"
                            className="outline-none w-full bg-transparent text-NEUTRAL_GRAY_06"
                            placeholder="Search"
                            onChange={(e) => setFilterName(e.target.value)}
                            value={filterName}
                        />
                    </div>

                    <div id="filters" className="flex flex-row gap-6">
                        <div className="flex space-x-4">
                            <button
                                className={button({ selected: selectedButton === 'follower' })}
                                onClick={() => handleButtonClick('follower')}
                            >
                                Follower
                            </button>
                            <button
                                className={button({ selected: selectedButton === 'following' })}
                                onClick={() => handleButtonClick('following')}
                            >
                                Following
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-NEUTRAL_GRAY_06 text-md mt-4 mb-6">Sort by: <span className="text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_02 font-semibold">Recently Added</span></p>
                </div>

                <div id="users">
                    {
                        users && users.map(user => (
                            <div className="bg-NEUTRAL_GRAY_02 dark:bg-NEUTRAL_DARK_300 flex justify-between py-3 rounded-lg mb-4 pl-6 pr-4 items-center" key={user.id}>

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

                                    <DotsThree className="text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_02" size={24} />
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </PageLayout >
    );
}

interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    selectedButton: string;
}
