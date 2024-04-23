/* eslint-disable */
import { useNotificationStore } from "@/store/notificationsStore";
import { ArrowArcLeft, ArrowLeft, ArrowRight, Bell } from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";
import { NotificationItem } from "./NotificationItem";
import { fetchNotifications } from "@/services/notificationsService";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { INotificationData } from "@/interfaces/notifications/iNotificationData";

export function NotificationDropdown() {

    const { userInfo } = useUserInfoStore();
    const {
        readNotifications,
        unreadNotifications,
        setReadNotifications,
        setUnreadNotifications
    } = useNotificationStore();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    async function getNotifications() {
        if (userInfo.id == "") return;

        const result = await fetchNotifications(userInfo.id);

        const { unreadNotifications, readNotifications } = result.data as INotificationData;

        setReadNotifications(readNotifications);
        setUnreadNotifications(unreadNotifications);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            buttonRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
            !buttonRef.current.contains(event.target as Node)
        ) {
            setIsDropdownOpen(false);
        }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {

        getNotifications();

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyPress);
        };

    }, [userInfo]);

    return (
        <div className="relative">
            <button
                id="dropdownNotificationsButton"
                data-dropdown-toggle="dropdownNotifications"
                className="p-2 rounded-lg md:hover:bg-WHITE_PRINCIPAL hover:dark:bg-DARK_BACKGROUND_SECONDARY"
                type="button"
                onClick={toggleDropdown}
                ref={buttonRef}
            >
                <div className="flex flex-row-reverse">
                    {unreadNotifications.length > 0 && (
                        <div className="absolute bg-red-600 w-4 h-4 text-[10px] font-bold text-WHITE_PRINCIPAL rounded-full right-2">
                            {unreadNotifications.length > 9 ? "9+" : unreadNotifications.length}
                        </div>
                    )}
                    <Bell
                        size={32}
                        className="text-LIGHT_TEXT dark:text-DARK_TEXT"
                    />
                </div>
            </button>

            {isDropdownOpen && (
                <div
                    id="dropdownAvatar"
                    className="z-10 relative top-2 bg-white dark:bg-DARK_BACKGROUND_SECONDARY dark:divide-DARK_BACKGROUND divide-gray-100 divide-y rounded-lg shadow w-full"
                    ref={dropdownRef}
                >
                    <div
                        x-show="dropdownOpen"
                        className="absolute right-0 mt-2 bg-LIGHT_BACKGROUND dark:bg-DARK_BACKGROUND_SECONDARY shadow-lg rounded-md overflow-hidden z-20"
                        style={{ width: "20rem" }}
                    >
                        <div className="px-6 py-2">
                            <h3 className="text-LIGHT_TEXT dark:text-DARK_TEXT pt-4">
                                <b>What's new?</b>
                            </h3>
                            <div className="flex flex-row pt-4">
                                <div>
                                    <button className="bg-LIGHT_BACKGROUND_SECONDARY px-2 py flex justify-center rounded-sm">Unread</button>
                                </div>
                                <div className="pl-6">
                                    <button className="bg-LIGHT_BACKGROUND_SECONDARY px-2 py flex justify-center rounded-sm text-[#868E96]">All</button>
                                </div>
                            </div>

                            <div className="mt-2">
                                <div className="flex flex-col justify-between pb-8">
                                    <div className="py-2 flex flex-col pb-4">
                                        <NotificationItem
                                            wikiURL={"notification.wikiURL"}
                                            id={2}
                                            title={"Update 0.1.4 is live!"}
                                            message={"Check out what's new. 🤖"}
                                            isUnred
                                            updatedTime={"1h"}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <NotificationItem
                                            wikiURL={"notification.wikiURL"}
                                            id={2}
                                            title={"Update 0.1.3"}
                                            message={"We now have a last update date, check out the details by clicking here! ⌛"}
                                            isUnred
                                            updatedTime={"20min"}
                                        />
                                    </div>
                                    
                                </div>
                                {/* <div>
                                    {unreadNotifications.length > 0 && (
                                        <div>
                                            <h3 className="text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT_SECONDARY">
                                                Não lidos
                                            </h3>
                                            <div className="py-2">
                                                <NotificationItem
                                                    wikiURL={"notification.wikiURL"}
                                                    id={2}
                                                    title={notification.title}
                                                    message={notification.message}
                                                    key={notification.id}
                                                    isUnred
                                                />
                                                 {unreadNotifications.map(
                                                    notification => (
                                                        <NotificationItem
                                                            wikiURL={notification.wikiURL}
                                                            id={notification.id}
                                                            title={notification.title}
                                                            message={notification.message}
                                                            key={notification.id}
                                                            isUnred
                                                        />
                                                    )
                                                )} 
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {readNotifications.length > 0 &&
                                    unreadNotifications.length > 0 && (
                                        <hr className="opacity-25 m-2 border-LIGHT_TEXT dark:border-DARK_TEXT" />
                                    )}
                                <div>
                                    {readNotifications.length > 0 && (
                                        <div>
                                            <h3 className="text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT_SECONDARY mt-4">
                                                Lidas
                                            </h3>
                                            <div className="py-2 px-2">
                                                {readNotifications.map(
                                                    notification => (
                                                        <NotificationItem
                                                            wikiURL={notification.wikiURL}
                                                            id={notification.id}
                                                            title={notification.title}
                                                            message={notification.message}
                                                            key={notification.id}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div> */}
                            </div>

                            <div className="flex flex-row justify-evenly">
                                <div>
                                    <button className="bg-[#F8F9FA] text-[#868E96] p-2 rounded-md flex items-center justify-between w-20 text-sm font-normal underline hover:text-black">
                                        Previous
                                    </button>
                                </div>
                                <div>
                                    <button className="bg-[#C3E5D5] p-2 rounded-md flex items-center justify-between w-20 text-sm text-[#212529] font-normal">Next
                                        <ArrowRight color="#212529" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
