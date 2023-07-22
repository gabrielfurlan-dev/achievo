import ProfileButton from "./ProfileButton";
import { ThemeToggleButton } from "./ThemeToggleButton";

export function NavBarControls() {
    return (
        <div className="flex gap-4">
            <ProfileButton />
            <ThemeToggleButton />
        </div>
    );
}
