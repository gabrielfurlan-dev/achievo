import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import ProfileDropdown from "@/components/ProfileDropdown/ProfileDropdown";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

export function NavBarControls() {
    return (
        <div className="flex justify-end gap-4 items-center w-full">
            <NotificationDropdown />
            <ThemeToggleButton />
            <ProfileDropdown />
        </div>
    );
}
