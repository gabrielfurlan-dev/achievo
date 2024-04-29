import { useNotificationStore } from "@/store/notificationsStore";
import { Bell } from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";
import { fetchNotifications } from "@/services/notificationsService";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { INotificationData } from "@/interfaces/notifications/iNotificationData";
import { EfilterNotification } from "@/components/notifications/Enums/EFilterNotification";
import { NotificationPage } from "@/components/notifications/NotificationPage";
import { TabNotificationButton } from "./TabNotificationButton";

export function NotificationDropdown() {
    const { userInfo } = useUserInfoStore();
    const {
        allNotifications,
        unreadNotifications,
        setAllNotifications,
        setUnreadNotifications,
    } = useNotificationStore();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [filterNotification, setFilterNotification] = useState(EfilterNotification.Unread);

    function toggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen);
    };

    async function getNotifications() {
        if (userInfo.id == "") return;

        const result = await fetchNotifications(userInfo.id);
        const { unreadNotifications, allNotifications } = result.data as INotificationData;

        setAllNotifications(allNotifications);
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

    function typeNotification() {
        if (filterNotification == EfilterNotification.All) {
            return allNotifications;
        }
        return unreadNotifications;
    }

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
                    <Bell size={32} className="text-LIGHT_TEXT dark:text-DARK_TEXT" />
                </div>
            </button>

            {isDropdownOpen && (
                <div
                    id="dropdownAvatar"
                    className="z-10 relative top-2 bg-white dark:bg-DARK_BACKGROUND_SECONDARY dark:divide-DARK_BACKGROUND divide-gray-100 divide-y rounded-lg shadow w-full"
                    ref={dropdownRef}
                >
                    <div
                        className="absolute right-0 mt-2 bg-LIGHT_BACKGROUND dark:bg-DARK_BACKGROUND_SECONDARY shadow-lg rounded-md overflow-hidden z-20"
                        style={{ width: "20rem" }}
                    >
                        <div className="px-6 py-2">
                            <h3 className="text-LIGHT_TEXT dark:text-DARK_TEXT pt-4 font-semibold">
                                What's new?
                            </h3>
                            <div className="flex flex-row pt-4 gap-4">
                                <TabNotificationButton
                                    title="Unread"
                                    numberCount={unreadNotifications.length}
                                    onClickAction={() => setFilterNotification(EfilterNotification.Unread)}
                                    selected={filterNotification == EfilterNotification.Unread}
                                />
                                <TabNotificationButton
                                    title="All"
                                    numberCount={allNotifications.length}
                                    onClickAction={() => setFilterNotification(EfilterNotification.All)}
                                    selected={filterNotification == EfilterNotification.All}
                                />
                            </div>
                            <div className="pt-4">
                                <NotificationPage notifications={typeNotification()} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}