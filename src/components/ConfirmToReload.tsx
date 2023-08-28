import { useEffect } from "react";

export function ConfirmToReload() {
    const confirmBeforeReload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = '';
    };

    useEffect(() => {
        window.addEventListener('beforeunload', confirmBeforeReload);

        return () => {
            window.removeEventListener('beforeunload', confirmBeforeReload);
        };
    }, []);

    return null;
}