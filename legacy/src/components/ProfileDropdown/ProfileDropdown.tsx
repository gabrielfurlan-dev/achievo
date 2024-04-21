import { useUserInfoStore } from "@/store/userStoreInfo";
import { CaretDown, PencilSimple, SignOut, User } from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";
import { ProfileDropdownItem } from "./ProfileDropdownItem";
import { signOut } from "next-auth/react";
import CircularProgress from "@mui/material/CircularProgress";
import { ProfileImage } from "../UserImage";

export default function ProfileDropdown() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { userInfo, cleanUserInfo } = useUserInfoStore();

    function handleSignOut() {
        setIsDropdownOpen(false);
        cleanUserInfo()
        signOut({ callbackUrl: "/login" })
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
                id="dropdownUserAvatarButton"
                data-dropdown-toggle="dropdownAvatar"
                className=" W-full p-2 flex text-sm rounded-lg hover:bg-WHITE_PRINCIPAL hover:dark:bg-DARK_BACKGROUND_SECONDARY"
                type="button"
                onClick={toggleDropdown}
                ref={buttonRef} >
                <span className="sr-only">Abrir menu do usuário</span>
                <div>
                    <div className="flex justify-end items-center gap-2 rounded-full">
                        <div className="w-12 h-12">
                            <ProfileImage imageUrl={userInfo.imageURL} rounded />
                        </div>
                        <CaretDown size={24} className="text-LIGHT_TEXT dark:text-DARK_TEXT" />
                    </div>
                </div>
            </button>

            {isDropdownOpen && (
                <div
                    id="dropdownAvatar"
                    className="
                        z-10 absolute
                        top-20
                        right-0
                        bg-NEUTRAL_600
                        dark:bg-NEUTRAL_DARK_200
                        divide-NEUTRAL_550
                        dark:divide-NEUTRAL_150
                        rounded-lg shadow-md w-full"
                    ref={dropdownRef}
                    style={{ width: isDropdownOpen ? '242px' : "" }}>

                    <div className="px-4 py-3 text-NEUTRAL_100 dark:text-NEUTRAL_600 m-2">
                        <div className="flex justify-between items-center">
                            <div className="text-lg font-medium">{userInfo.name}</div>
                            <a
                                href={`/update-profile`}
                                className="p-1 rounded-lg
                            hover:bg-NEUTRAL_500
                            hover:text-NEUTRAL_100
                            dark:hover:bg-NEUTRAL_150
                            dark:hover:text-NEUTRAL_500"
                            >
                                <PencilSimple size={20} />
                            </a>
                        </div>
                        <div className="text-xs text-NEUTRAL_200 dark:text-NEUTRAL_300"> {`@${userInfo.username}`} </div>
                    </div>

                    <hr className="m-auto w-[80%]" />

                    <ul className="py-2 text-sm text-NEUTRAL_100 dark:text-NEUTRAL_550"
                        aria-labelledby="dropdownUserAvatarButton">
                        <ProfileDropdownItem text={"Meu Perfil"} Icon={User} url={`/profile/${userInfo.username}`} />
                    </ul>

                    <hr className="m-auto w-[80%]" />

                    <ul className="py-2 text-sm text-NEUTRAL_100 dark:text-NEUTRAL_550"
                        aria-labelledby="dropdownUserAvatarButton" >
                        <ProfileDropdownItem text={"Sair"} Icon={SignOut} onClick={handleSignOut} url="/login"
                            className="rounded-lg mx-4 hover:bg-SECONDARY hover:text-NEUTRAL_550 transition hover:duration-200"
                        />
                    </ul>
                </div>
            )}
        </div>
    );
}
