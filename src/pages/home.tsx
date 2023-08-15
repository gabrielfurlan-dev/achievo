import { SimpleNavBar } from "@/components/NavBar/SimpleNavBar";
import { fetchNotifications } from "@/services/anotificationsService";
import PageLayout from "@/layouts/PageLayout";
import { useNotificationStore } from "@/store/notificationsStore";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { ListMagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { FilePlus, House, Icon } from "phosphor-react";
import { useEffect } from "react";
import { INotificationData } from "@/interfaces/notifications/INotificationData";

export default function home() {
    const { userInfo } = useUserInfoStore();
    const { setReadNotifications, setUnreadNotifications } =
        useNotificationStore();

    async function getNotifications() {
        if (userInfo.id == 0) return;

        const result = await fetchNotifications(userInfo.id);

        const { unreadNotifications, readNotifications } =
            result.data as INotificationData;

        setReadNotifications(readNotifications);
        setUnreadNotifications(unreadNotifications);
    }

    useEffect(() => {
        getNotifications();
    }, [userInfo]);

    return (
        <PageLayout>
            <SimpleNavBar IconPage={House} title="Início" />
            <div className="flex flex-col justify-center items-center text-center h-full">
                <div>
                    <h1 className="text-4xl font-medium text-GRAY_DARK dark:text-DARK_TEXT">
                        Weekly Report
                    </h1>
                    <h3 className="text-GRAY_SECONDARY dark:text-DARK_TEXT_SECONDARY">
                        Um novo passo para seu progresso.
                    </h3>
                </div>

                <div className="mt-10 flex gap-1 h-12">
                    <IconButton
                        IconButton={FilePlus}
                        name="Add"
                        route="report/new"
                    />
                    <IconButton
                        IconButton={ListMagnifyingGlass}
                        name="Listar"
                        route="list-reports"
                    />
                </div>
            </div>
        </PageLayout>
    );
}

type props = {
    name: string;
    route: string;
    IconButton: Icon;
};

function IconButton({ name, route, IconButton }: props) {
    const router = useRouter();

    return (
        <div className="">
            <button
                className="rounded-xl hover:bg-WHITE_PRINCIPAL dark:hover:bg-DARK_BACKGROUND_SECONDARY w-20 h-20 flex flex-col text-center items-center gap-2 justify-center text-GRAY"
                onClick={() => router.push(route)}
            >
                <IconButton className="text-PRINCIPAL" size={32} />
                <p>{name}</p>
            </button>
        </div>
    );
}
