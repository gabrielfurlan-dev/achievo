import { ProfileImage } from "@/components/profileImage";
import { IUserListItem } from "@/interfaces/users/IUserListItem";
import { CompactNavBar } from "@/layouts/NavBar/CompactNavBar";
import PageLayout from "@/layouts/PageLayout";
import { followUser } from "@/services/user/follow";
import { getFollowers } from "@/services/user/getFollowers";
import { searchUsers } from "@/services/user/search";
import { unfollowUser } from "@/services/user/unfollow";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { CircularProgress } from "@mui/material";
import { ArrowClockwise, DotsThree, MagnifyingGlass, UserPlus, Users } from "phosphor-react";
import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";

export default function findUser() {
    const [filterName, setFilterName] = useState<string>("")
    const { userInfo } = useUserInfoStore()
    const [originalUsers, setOriginalUsers] = useState<IUserListItem[]>([])
    const [users, setUsers] = useState<IUserListItem[]>(originalUsers)
    const [selectedButton, setSelectedButton] = useState<"following" | "follower" | "none">("none");
    const [followers, setFollowers] = useState<string[]>([]);

    async function updateUsersList() {

        const obtainedUsers = (await searchUsers({
            name: filterName,
            userId: userInfo.id
        })).data as IUserListItem[]

        setOriginalUsers(obtainedUsers);
        setUsers(obtainedUsers);
        setFollowers((await getFollowers(userInfo.id)).data)
    }

    function filterUsers() {
        const regex = new RegExp(filterName, 'i');

        const filteredUsers = originalUsers.filter((user) => {
            console.log(user.id)

            const nameMatch = regex.test(user.name) || regex.test(user.username);
            const followerMatch = !(selectedButton == "follower") || user.commonFollowers.some(x => x == userInfo.username);
            const followingMatch = !(selectedButton == "following") || followers.some(follower => follower == user.id);

            return nameMatch && followingMatch && followerMatch;
        });

        setUsers(filteredUsers)
    }

    useEffect(() => {
        updateUsersList();
    }, [userInfo.id])

    useEffect(() => {
        filterUsers()
    }, [filterName, selectedButton])

    const handleButtonClick = (buttonName: "following" | "follower" | "none") => {
        if (selectedButton === buttonName) {
            setSelectedButton("none");
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
        if (user.commonFollowers.length > 1)
            return `${user.commonFollowers.join(" and ")} are following`
        if (user.commonFollowers.length == 1)
            return `${user.commonFollowers} is following`

        return "you have no followers in common"
    }

    function handleFollowUser(action: "follow" | "unfollow", userIdToAct: string) {

        if (action == "follow") {
            followUser(userInfo.id, userIdToAct);
            setFollowers(prevFollowers => [...prevFollowers, userIdToAct]);
        }
        else if (action == "unfollow") {
            unfollowUser(userInfo.id, userIdToAct);
            setFollowers(followers.filter(x => x !== userIdToAct));
        }
    }

    return (
        <PageLayout>
            <CompactNavBar title="Friends" />
            <div className="bg-NEUTRAL_GRAY_0 dark:bg-NEUTRAL_DARK_100 py-14 px-28 mt-14 rounded-3xl h-full">
                <div id="filters">
                    <div className="flex justify-between">
                        <div className="flex gap-4">
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
                            <button children={<ArrowClockwise className="text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_06" size={24}/>}/>
                        </div>
                        <div className="flex flex-row gap-6">
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
                </div>

                <div id="users" className="h-2/3">
                    {
                        //TODO: validate this
                        !users && (
                            <div className="w-full h-full flex justify-center items-center">
                                <CircularProgress className="text-NEUTRAL_GRAY_06 dark:text-NEUTRAL_GRAY_01" />
                            </div>
                        )
                    }
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

                                    {
                                        followers.some(x => x == user.id)
                                            ?
                                            <button
                                                className="h-10 bg-PRIMARY_DEFAULT text-NEUTRAL_WHITE px-6 rounded-lg text-md"
                                                onClick={() => handleFollowUser("unfollow", user.id)}
                                                children={"Unfollow"}
                                            />
                                            :
                                            <button
                                                className="text-md text-NEUTRAL_WHITE flex items-center h-10 bg-PRIMARY_DEFAULT px-4 rounded-lg gap-2"
                                                onClick={() => handleFollowUser("follow", user.id)}
                                            >
                                                <UserPlus size={24} />
                                                Follow
                                            </button>
                                    }

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
