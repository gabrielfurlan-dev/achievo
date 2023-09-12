import { NotificationDropdown } from "../NotificationDropdown";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import { ThemeToggleButton } from "../ThemeToggleButton";

export function NavBarControls() {
    return (
        <div className="flex justify-end gap-4 items-center w-full">
            <NotificationDropdown />
            <ThemeToggleButton />
            <ProfileDropdown />
        </div>
    );
}
