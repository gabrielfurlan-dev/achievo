import { ProfileImage } from "@/components/profileImage";
import { FriendItem } from "@/components/users/friends/FriendItem";
import { IUserListItem } from "@/interfaces/users/IUserListItem";
import { CompactNavBar } from "@/layouts/NavBar/CompactNavBar";
import PageLayout from "@/layouts/PageLayout";
import { followUser } from "@/services/user/follow";
import { searchUsers } from "@/services/user/search";
import { unfollowUser } from "@/services/user/unfollow";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { Binoculars, Check, MagnifyingGlass, UserPlus, Users, X } from "phosphor-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { tv } from "tailwind-variants";

export default function findUser() {
    const [filterName, setFilterName] = useState<string>("")
    const { userInfo } = useUserInfoStore()
    const [originalUsers, setOriginalUsers] = useState<IUserListItem[]>([])
    const [users, setUsers] = useState<IUserListItem[]>(originalUsers)
    const [selectedButton, setSelectedButton] = useState<"following" | "follower" | "all">("all");

    const button = tv({
        base: "w-28 h-10 rounded-full border-2 border-SECONDARY_DEFAULT font-semibold text-sm",
        variants: {
            selected: {
                true: "bg-SECONDARY_DEFAULT text-white",
                false: "bg-transparent text-SECONDARY_DEFAULT"
            }
        }
    })

    async function updateUsersList() {

        const obtainedUsers = (await searchUsers({
            name: filterName,
            userId: userInfo.id
        })).data as IUserListItem[]

        setOriginalUsers(obtainedUsers);
        setUsers(obtainedUsers);
    }

    function filterUsers() {
        const regex = new RegExp(filterName, 'i');

        const filteredUsers = originalUsers.filter((user) => {
            const nameMatch = regex.test(user.name) || regex.test(user.username);
            const followerMatch = !(selectedButton == "follower") || user.isFollowingYou
            const followingMatch = !(selectedButton == "following") || user.following;

            return nameMatch && followingMatch && followerMatch;
        });

        setUsers(filteredUsers)
    }

    useEffect(() => {
        if (!userInfo.id) return;

        updateUsersList();
    }, [userInfo.id])

    useEffect(() => {
        filterUsers()
    }, [filterName, selectedButton, originalUsers])



    async function handleFollowUser(action: "follow" | "unfollow", userIdToAct: string) {

        let success = false

        if (action == "follow") {
            success = (await followUser(userInfo.id, userIdToAct)).success
        }
        else if (action == "unfollow") {
            success = (await unfollowUser(userInfo.id, userIdToAct)).success
        }

        if (success) {
            setOriginalUsers(users => {
                return users.map(user => {
                    if (user.id == userIdToAct) {
                        return { ...user, following: action == "follow" }
                    }
                    return user;
                })
            });
            filterUsers();
        } else {
            Swal.fire("Something went wrong!", `Unable to ${action} user`, 'error');
        }
    }

    return (
        <PageLayout>
            <CompactNavBar title="Friends" />
            <div className="bg-NEUTRAL_GRAY_0 dark:bg-NEUTRAL_DARK_100 py-14 px-2 md:px-28 mt-14 rounded-3xl h-full">
                <div id="filters">
                    <div className="flex flex-col lg:flex-row justify-between gap-4 items-center w-full">
                        <div className="flex gap-4 w-full">
                            <div id="search" className="bg-NEUTRAL_GRAY_01 dark:bg-NEUTRAL_DARK_300 flex rounded-xl py-4 px-5 items-center gap-4 w-full lg:max-w-sm">
                                <MagnifyingGlass className="text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_06" size={26} />
                                <input
                                    type="text"
                                    className="outline-none w-full bg-transparent text-NEUTRAL_GRAY_06"
                                    placeholder="Search"
                                    onChange={(e) => setFilterName(e.target.value)}
                                    value={filterName}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 md:gap-6">
                            <button
                                className={button({ selected: selectedButton === 'follower' })}
                                onClick={() => setSelectedButton('follower')} children={"Followers"}
                            />
                            <button
                                className={button({ selected: selectedButton === 'following' })}
                                onClick={() => setSelectedButton('following')} children={"Following"}
                            />
                            <button
                                className={button({ selected: selectedButton === 'all' })}
                                onClick={() => setSelectedButton('all')} children={"All"}
                            />
                        </div>
                    </div>
                    <div>
                        <p className="text-NEUTRAL_GRAY_06 text-md mt-4 mb-6">Sort by: <span className="text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_02 font-semibold">Recently Added</span></p>
                    </div>
                </div>

                <div id="users" className="h-2/3">
                    {
                        users.length == 0 && (
                            <div className="w-full h-full flex flex-col justify-center items-center text-NEUTRAL_GRAY_04 dark:text-NEUTRAL_GRAY_07">
                                <Binoculars size={56} />
                                <p>No users found!</p>
                            </div>
                        )
                    }
                    {
                        users && users.map(user => (
                            <FriendItem user={user} handleFollowUser={handleFollowUser}/>
                        ))
                    }
                </div>

            </div>
        </PageLayout >
    );
}
