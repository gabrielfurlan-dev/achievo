import { SimpleNavBar } from "@/layouts/NavBar/SimpleNavBar";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { getLastReportId } from "@/services/reports/reportGateway";
import { useSession } from "next-auth/react";
import { handleLoginGoogle } from "@/services/loginService";
import Swal from "sweetalert2";
import { PageLoadLayout } from "@/layouts/PageLoadLayout";
import { ListMagnifyingGlass } from "@/assets/icons/ListMagnifyingGlass";
import { ClockCounterClockwise, FilePlus, House, Icon, Users, WarningCircle } from "phosphor-react";
import { tv } from "tailwind-variants";
import { Stairs } from "@/assets/icons/Stairs";

type dialogPopup = {
    mustShow: boolean,
    title?: string,
    message?: string | ReactElement,
    icon?: ReactElement
    action?: () => {}
}

export default function home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { userInfo, setUserInfo } = useUserInfoStore();
    const { data, status } = useSession();
    const [dialogPopup, setDialogPopup] = useState<dialogPopup>()

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
                description: loginData.data.description,
                imageURL: loginData.data.imageURL,
            });
            if (!loginData.data.alreadyRegistered) {
                return router.push("/finish-signup");
            }
            setIsLoading(false);
        }
        setData();
    }, [data, status]);

    async function handleAddReport() {
        const reportId = await getLastReportId(userInfo.id)
        if (!reportId) {
            router.push("/report/new")
            return
        };
        setDialogPopup({
            mustShow: true,
            title: "Edit goal",
            message: "You already have a Report this week, do you want to view it?",
            icon: <Stairs size={86} color="#5C8A74" />,
            action: () => router.push("/report/" + reportId)
        })
    }

    async function handleGoToLatestReport() {
        const reportId = await getLastReportId(userInfo.id)
        if (!reportId) {
            setDialogPopup({
                mustShow: true,
                title: "No reports this week!",
                message: (
                    <p>
                        You don't have any reports added for this week yet. <br />
                        Do you want to create one?
                    </p>
                ),
                icon: <WarningCircle size={86} color="#5C8A74" />,
                action: () => router.push("/report/new")
            })
            return
        }
        return router.push(`report/${reportId}`)
    }

    return (
        <PageLoadLayout isLoading={isLoading} pageName="Achievo">
            <SimpleNavBar IconPage={House} title="Home" />
            <div className="flex flex-col justify-center items-center text-center h-full">
                <div>
                    <h1 className="text-4xl font-medium text-GRAY_DARK dark:text-DARK_TEXT">
                        Achievo
                    </h1>
                    <h3 className="text-GRAY_SECONDARY dark:text-DARK_TEXT_SECONDARY">
                        A next step to your progress.
                    </h3>
                </div>

                <div className="mt-10 flex gap-1">
                    <IconButton
                        IconButton={<ClockCounterClockwise weight="regular" color="#5C8A74" size={24} />}
                        name="Week"
                        method={handleGoToLatestReport}
                        newModule
                    />
                    <IconButton
                        IconButton={<FilePlus weight="regular" color="#5C8A74" size={24} />}
                        name="Add"
                        method={handleAddReport}
                    />
                    <IconButton
                        IconButton={<ListMagnifyingGlass strokeWidth={1.5} color="#5C8A74" size={28} />}
                        name="List"
                        method={() => router.push("list-reports")}
                    />
                    <IconButton
                        IconButton={<Users size={28} color="#5C8A74" />}
                        name="Friends"
                        method={() => router.push("user/friends")}
                    />
                </div>
                <Modal
                    isOpen={dialogPopup?.mustShow ?? false}
                    onClose={() => { setDialogPopup({ mustShow: false }) }}
                    title={""}
                    confirmText={"Yes"}
                    cancelText={"Cancel"}
                    handleSaveButton={dialogPopup?.action}
                    hideDelete
                >
                    <div className="flex flex-col w-full items-center">
                        {dialogPopup?.icon}
                        <h2 className="text-xl font-bold mt-10">{dialogPopup?.title}</h2>
                        <p className="mt-2 mx-4 max-w-[410px] text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT_SECONDARY">{dialogPopup?.message}</p>
                    </div>
                </Modal>
            </div>

            <span className="text-NEUTRAL_GRAY_06 w-full text-end">v 0.2.2</span>

        </PageLoadLayout>
    );
}

type props = {
    name: string;
    method: () => void;
    IconButton: ReactNode;
    newModule?: boolean;
};

function IconButton({ name, method, IconButton, newModule }: props) {
    const [isHovering, setIsHovering] = useState<boolean>(false)

    const hoverSpan = tv({
        base: "w-full h-1 animate-pulse rounded-lg",
        variants: {
            newModule: {
                true: "bg-SECONDARY_DEFAULT",
                false: "bg-PRIMARY_DEFAULT"
            }
        }
    })

    const iconStyle = tv({
        base: "",
        variants: {
            isHovering: {
                true: "text-SECONDARY_DEFAULT",
                false: "text-PRIMARY_DEFAULT"
            }
        }
    })

    return (
        <div>
            <div className="">
                {
                    newModule ?
                        <div className="group top-5 relative flex left-14">
                            <button className="bg-SECONDARY_DEFAULT p-[6px] animate-pulse rounded-full text-sm text-white shadow-sm" />
                            <span className="absolute top-5 scale-0 transition-all rounded bg-SECONDARY_DEFAULT p-2 text-xs text-white group-hover:scale-100">✨ New Feature!</span>
                        </div>
                        :
                        <div className="pt-[12px]" />
                }
                <button
                    className="rounded-xl
                                border-aanimate-spin text-GRAY
                                w-20 h-28 py-2 flex flex-col
                                text-center items-center
                                gap-2 justify-center"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={method}>
                    <div className={newModule ? iconStyle({ isHovering: isHovering ? true : false }) : ""}>
                        {IconButton}
                    </div>
                    <p className="text-neutral-800 dark:text-neutral-200 font-medium">{name}</p>
                    <span className={hoverSpan({ newModule: newModule ? true : false })}
                        style={{ backgroundColor: !isHovering ? "transparent" : "" }} />
                </button>
            </div>
        </div>
    );
}
