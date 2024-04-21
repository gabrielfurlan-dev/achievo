import React, { useEffect, useState } from "react";
import { Moon, Sun } from "phosphor-react";
import { useThemeStore } from "@/store/themeStore";

export const ThemeToggleButton: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
    const { theme, setTheme } = useThemeStore();

    function onToggle() {
        if (theme == "light") {
            document.body.classList.add("dark");
            setTheme("dark");
        } else {
            document.body.classList.remove("dark");
            setTheme("light");
        }
    }

    useEffect(() => {
        useThemeStore.persist.rehydrate();
    }, []);

    return (
        <button
            onClick={() => onToggle()}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="bg-transparent focus:outline-none p-2 rounded-lg
            md:hover:bg-WHITE_PRINCIPAL hover:dark:bg-DARK_BACKGROUND_SECONDARY"
        >
            {theme == "dark" ? (
                <Sun size={32} color={isHovering ? "#F1E57A" : "white"} />
            ) : (
                <Moon size={32} color={isHovering ? "#6685D5" : "black"} />
            )}
        </button>
    );
};
