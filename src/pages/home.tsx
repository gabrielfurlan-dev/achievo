import { SimpleNavBar } from "@/components/NavBar/SimpleNavBar";
import { fetchNotifications } from "@/services/notificationsService";
import { useNotificationStore } from "@/store/notificationsStore";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { ListMagnifyingGlass, Stairs } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { FilePlus, House, Icon } from "phosphor-react";
import { useEffect, useState } from "react";
import { INotificationData } from "@/interfaces/notifications/iNotificationData";
import Modal from "@/components/Modal";
import { validateReportFromWeek } from "@/services/reports/reportService";
import { useSession } from "next-auth/react";
import { handleLoginGoogle } from "@/services/loginService";
import Swal from "sweetalert2";
import { PageLoadLayout } from "@/layouts/PageLoadLayout";

export default function home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { userInfo, setUserInfo } = useUserInfoStore();
    const { setReadNotifications, setUnreadNotifications } = useNotificationStore();
    const [mustShowDialog, setMustShowDialog] = useState(false)
    const [reportIdOfCurrentWeek, setReportIdOfCurrentWeek] = useState<number>(0);
    const { data, status } = useSession();

    useEffect(() => {
        async function setData() {

            if (status !== "authenticated" || !data || !data.user) {
                return router.push("/login");
            }

            const { name, email, image } = data.user;

            if (!name || !email || !image)
                return;

            const loginData = await handleLoginGoogle(name, email, image);

            if (!loginData.success) {
                Swal.fire("Oops!", "Não foi possível realizar o login.");
                return;
            }

            setUserInfo({
                alreadyRegistered: loginData.data.alreadyRegistered,
                id: loginData.data.id,
                email: loginData.data.email,
                name: loginData.data.name,
                username: loginData.data.username,
                imageURL: loginData.data.imageURL,
            });

            if (!loginData.data.alreadyRegistered) {
                return router.push("/finish-signup");
            }

            setIsLoading(false);

        }

        setData();
    }, [data, status]);


    async function alreadyExistsReportsOnCurrentWeek() {
        const response = await validateReportFromWeek(userInfo.id)

        if (!response.success) return false;

        if (response.data) {
            setReportIdOfCurrentWeek(response.data);
            setMustShowDialog(true);
            return true;
        }
        return false;
    }

    async function getNotifications() {
        if (userInfo.id == "") return;

        const result = await fetchNotifications(userInfo.id);

        const { unreadNotifications, readNotifications } = result.data as INotificationData;

        setReadNotifications(readNotifications);
        setUnreadNotifications(unreadNotifications);
    }

    useEffect(() => {
        getNotifications();
    }, [userInfo]);

    return (
        <PageLoadLayout isLoading={isLoading}>
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
                        method={async () => {
                            if (!await alreadyExistsReportsOnCurrentWeek())
                                return router.push("report/new")
                        }}
                    />
                    <IconButton
                        IconButton={ListMagnifyingGlass}
                        name="Listar"
                        method={() => router.push("list-reports")}
                    />
                </div>
                <Modal
                    isOpen={mustShowDialog}
                    onClose={() => { setMustShowDialog(false) }}
                    title={""}
                    confirmText={"Sim"}
                    cancelText={"Cancelar"}
                    handleSaveButton={() => router.push("/report/" + reportIdOfCurrentWeek)}
                    hideDelete
                >
                    <div className="flex flex-col w-full items-center">
                        <Stairs size={56} className="text-PRINCIPAL" />
                        <h2 className="text-xl font-bold mt-10">Editar Meta</h2>
                        <p className="mt-2">Você já possui um Report essa semana, deseja visualiza-lo?</p>
                    </div>
                </Modal>
            </div>
        </PageLoadLayout>
    );
}

type props = {
    name: string;
    method: () => void;
    IconButton: Icon;
};

function IconButton({ name, method, IconButton }: props) {
    return (
        <div className="">
            <button
                className="rounded-xl hover:bg-WHITE_PRINCIPAL dark:hover:bg-DARK_BACKGROUND_SECONDARY w-20 h-20 flex flex-col text-center items-center gap-2 justify-center text-GRAY"
                onClick={method}
            >
                <IconButton className="text-PRINCIPAL" size={32} />
                <p>{name}</p>
            </button>
        </div>
    );
}
