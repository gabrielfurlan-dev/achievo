import { INotification, fetchNotifications } from "@/hooks/NotificationsService";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { Bell } from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";
import { NotificationItem } from "./NotificationItem";

export function NotificationDropdown() {
    const { userInfo } = useUserInfoStore();
    const [unread, setUnreadNotifications] = useState<INotification[]>([]);
    const [read, setReadNotifications] = useState<INotification[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    getNotifications();

    async function getNotifications() {
        try {
            const { unreadNotifications, readNotifications } = await fetchNotifications(userInfo.id ?? "none");

            setReadNotifications(readNotifications);
            setUnreadNotifications(unreadNotifications);

        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

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
        useUserInfoStore.persist.rehydrate();
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

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
                <Bell size={32} className="text-LIGHT_TEXT dark:text-DARK_TEXT" />
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
                            <h3 className="text-LIGHT_TEXT dark:text-DARK_TEXT mt-4">
                                <b>O que há de novo?</b>
                            </h3>

                            <div className="mt-2">
                                <div>
                                    {unread.length > 0 && (
                                        <div>
                                            <h3 className="text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT_SECONDARY">Não lidos</h3>
                                            <div className="py-2">
                                                {unread.map((notification) => (
                                                    <NotificationItem
                                                        wikiURL={notification.wikiURL}
                                                        id={notification.id}
                                                        title={notification.title}
                                                        message={notification.message}
                                                        isUnred
                                                        key={notification.id}
                                                        updateNotifications={getNotifications}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {read.length > 0 && unread.length > 0 && <hr className="opacity-25 m-2 border-LIGHT_TEXT dark:border-DARK_TEXT" />}
                                <div>
                                    {read.length > 0 && (
                                        <div>
                                            <h3 className="text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT_SECONDARY mt-4">Lidas</h3>
                                            <div className="py-2 px-2">
                                                {read.map((notification) => (
                                                    <NotificationItem
                                                        wikiURL={notification.wikiURL}
                                                        id={notification.id}
                                                        title={notification.title}
                                                        message={notification.message}
                                                        key={notification.id}
                                                        updateNotifications={getNotifications}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
