import { useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";

export function DarkThemeProvider({ children }: { children: React.ReactNode }) {

    const { theme } = useThemeStore()

    useEffect(() => {

        if (theme == "dark") {
            document.body.classList.add("dark");
        }
        else {
            document.body.classList.remove("dark");
        }

    }, [theme])

    return <>{children}</>;
}
