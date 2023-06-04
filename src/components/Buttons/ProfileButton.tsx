import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { CaretDown, UserCircle } from "phosphor-react";
import { useState } from "react";

export function ProfileButton() {
    const supabase = useSupabaseClient();
    const router = useRouter();
    const [dropDownEnable, setDropDownEnable] = useState(false)

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
            router.push("/login");
            localStorage.clear();

        } catch (error) {
            console.error("Error signing out");
        }
    };

    return (
        <div className="m">
            <button
                id="dropdownAvatarNameButton"
                data-dropdown-toggle="dropdownAvatarName"
                className={`
                        flex items-center transition
                        text-sm font-medium
                        text-gray-900 dark:text-white
                        hover:text-blue-600
                        hover:bg-LIGHT_THEME_HOVER dark:hover:bg-DARK_THEME_HOVER
                        px-2 md:mr-2 focus:ring-4 p-2 rounded-lg
                        focus:ring-gray-100 dark:focus:ring-gray-700`}

                type="button"
                onClick={() => setDropDownEnable(!dropDownEnable)}
            >
                <UserCircle size={32} className="mr-2" />
                <span className="sr-only">Open user menu</span>
                Bonnie Green
                <CaretDown className="ml-2" />
            </button>

            {
                dropDownEnable ? (
                    <div id="dropdownAvatarName" className="mt-3 dropEnableTransition border z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-DARK_THEME_BACKGROUND dark:divide-gray-600"
                    >
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div className="truncate">name@email.com</div>
                        </div>

                        <div className="py-2">
                            <button onClick={handleSignOut} className="flex w-40 mx-2 rounded px-4 py-2 text-sm text-gray-700
                            hover:bg-red-50 dark:hover:bg-DARK_THEME_HOVER_RED transition dark:text-gray-200 dark:hover:text-white">Sair</button>
                        </div>

                    </div>
                ) : ''
            }
        </div>
    );
}
