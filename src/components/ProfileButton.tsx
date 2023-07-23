import { useUserInfoStore } from '@/store/userStoreInfo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserCircle } from 'phosphor-react';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
    photoURL: string;
    name: string;
    email: string;
};

export default function ProfileButton() {
    const router = useRouter()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { userInfo, cleanUserInfo } = useUserInfoStore();

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
        if (event.key === 'Escape') {
            setIsDropdownOpen(false);
        }
    };

    function handleLogout() {
        cleanUserInfo();
        router.push("/login");
    }

    useEffect(() => {

        useUserInfoStore.persist.rehydrate();

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className="relative">
            <button
                id="dropdownUserAvatarButton"
                data-dropdown-toggle="dropdownAvatar"
                className="flex mx-3 text-sm rounded-lg md:mr-0 md:hover:bg-WHITE_PRINCIPAL hover:dark:bg-DARK_BACKGROUND_SECONDARY"
                type="button"
                onClick={toggleDropdown}
                ref={buttonRef}
            >
                <span className="sr-only">Abrir menu do usuário</span>

                <div className='flex items-center gap-4 px-3 py-1'>
                    <div className='text-right hidden md:block'>
                        <p className='text-xl text-GRAY_DARK dark:text-DARK_TEXT'>{userInfo.name}</p>
                        <p className='text-sm text-GRAY dark:text-DARK_TEXT_SECONDARY'>{userInfo.email}</p>
                    </div>
                    <span className='block md:hidden w-44'></span>
                    <div className="w-10 h-10">
                        {userInfo.imageURL ? (
                            <img src={userInfo.imageURL} className="rounded-full" alt="user photo" />
                        ) : (
                            <UserCircle className="h-full w-full" />
                        )}
                    </div>
                </div>

            </button>

            {isDropdownOpen && (
                <div
                    id="dropdownAvatar"
                    className="z-10 absolute top-16 bg-white dark:bg-DARK_BACKGROUND_SECONDARY dark:divide-DARK_BACKGROUND divide-gray-100 divide-y rounded-lg shadow w-full"
                    ref={dropdownRef}
                >
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-DARK_TEXT">
                        <div>{userInfo.name}</div>
                        <div className="font-medium truncate">{userInfo.email}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                        <li>
                            <Link href={`/profile/${userInfo.email}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Meu perfil
                            </Link>
                        </li>
                    </ul>
                    <div className="py-2">
                        <button
                            onClick={() => handleLogout()}
                            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
