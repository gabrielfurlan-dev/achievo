import React, { useState } from "react";
import { Moon, Sun } from "phosphor-react";
import { useThemeStore } from "@/store/themeStore";

const ToggleButton: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
    const { theme, setTheme } = useThemeStore();

    function onToggle() {
        document.body.classList.toggle("dark");
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    }

    return (
        <button
            onClick={() => onToggle()}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="bg-transparent focus:outline-none"
        >
            {theme == "dark" ? (
                <Sun size={32} color={isHovering ? "yellow" : "white"} />
            ) : (
                <Moon size={32} color={isHovering ? "gray" : "black"} />
            )}
        </button>
    );
};

export default ToggleButton;
