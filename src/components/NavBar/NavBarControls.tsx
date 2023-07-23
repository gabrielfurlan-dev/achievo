import { NotificationDropdown } from "../NotificationDropdown";
import ProfileButton from "../ProfileButton";
import { ThemeToggleButton } from "../ThemeToggleButton";

export function NavBarControls() {
    return (
        <div className="flex gap-4 items-center">
            <ProfileButton />
            <NotificationDropdown />
            <ThemeToggleButton />
        </div>
    );
}
