import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { ReadCvLogo } from "@phosphor-icons/react";
import { Plus } from "phosphor-react";
import NavBar from "@/components/NavBar/NavBar";
import Modal from "@/components/Modal";
import {
    getCurrentDate,
    stringToDate,
    getFormatedWeekInterval,
} from "@/helpers/dateHelper";
import { getWeek } from "date-fns";
import { InputField } from "@/components/InputField";
import { ConfirmButton, NoBackgroundButton } from "@/components/Buttons";
import ProgressGoal from "@/components/goals/ProgressGoal/ProgressGoal";
import CheckInput from "@/components/goals/CheckGoal/CheckInput";
import PageLayout from "@/layouts/PageLayout";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { IProgressGoal } from "@/interfaces/goals/progressGoals/iProgressGoal";
import { ICheckGoal } from "@/interfaces/goals/checkGoals/iCheckGoal";
import {
    createReport,
    IUpdateReport,
    getReport,
    updateReport,
} from "@/services/reports/reportService";
import { IResponseData } from "@/interfaces/iResponseData";
import { IReport } from "@/interfaces/iReport";
import { generateInvalidUniqueID } from "@/helpers/uniqueIdHelper";
import {
    getCheckGoalsModified,
    getProgressGoalsModified,
} from "@/helpers/reportHelper";

export default function EditReport() {
    const router = useRouter();
    const { userInfo } = useUserInfoStore();
    const { id } = router.query;

    const [name, setName] = useState("");
    const [isOwner, setIsOwner] = useState(true);
    const [isNew, setIsNew] = useState(false);
    const [modified, setModified] = useState(false);
    const [forceCancel, setForceCancel] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [selectedDate, setSelectedDate] = useState<string>("");
    const [weekInterval, setWeekInterval] = useState<string>("");

    const [checkGoals, setCheckGoals] = useState<ICheckGoal[]>([]);
    const [progressGoals, setProgressGoals] = useState<IProgressGoal[]>([]);

    const [originalCheckGoals, setOriginalCheckGoals] = useState<ICheckGoal[]>(
        []
    );
    const [originalProgressGoals, setOriginalProgressGoals] = useState<
        IProgressGoal[]
    >([]);

    useEffect(() => {
        if (id == "new") {
            setIsNew(true);
            setSelectedDate(getCurrentDate());
        } else {
            setReportData();
        }
    }, [id]);

    useEffect(() => {
        setWeekInterval(getFormatedWeekInterval(selectedDate));
    }, [selectedDate]);

    useEffect(() => {
        const checkGoalsIsChanged =
            JSON.stringify(checkGoals) !== JSON.stringify(originalCheckGoals);
        const progressGoalsIsChanged =
            JSON.stringify(progressGoals) !==
            JSON.stringify(originalProgressGoals);

        setModified(checkGoalsIsChanged || progressGoalsIsChanged);
    }, [progressGoals, checkGoals, originalProgressGoals, originalCheckGoals]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (modified && !forceCancel) {
                event.preventDefault();
                event.returnValue =
                    "Você tem alterações não salvas. Tem certeza que deseja sair?";
            }
        };

        const handleRouteChangeStart = (url: string) => {
            if (modified && !forceCancel && router.asPath !== url) {
                setShowModal(true);
                router.events.emit("routeChangeError");
                throw "routeChange aborted.";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        router.events.on("routeChangeStart", handleRouteChangeStart);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            router.events.off("routeChangeStart", handleRouteChangeStart);
        };
    }, [modified, router, forceCancel]);

    function handleAddCheckGoal() {
        setCheckGoals([
            ...checkGoals,
            {
                id: generateInvalidUniqueID(),
                reportId: 0,
                title: "Sem título",
                checked: false,
                index: checkGoals.length + 1,
            },
        ]);
    }

    function handleAddProgressGoal() {
        setProgressGoals([
            ...progressGoals,
            {
                id: generateInvalidUniqueID(),
                reportId: 0,
                title: "Sem título",
                total: 0,
                value: 0,
                index: progressGoals.length + 1,
            },
        ]);
    }

    async function handleCancel(force: boolean) {
        await setForceCancel(force);

        if (isNew) await router.push("/home");
        else await router.push("/list-reports");
    }

    async function handleSaveReport() {
        let result: IResponseData;

        if (isNew) {
            result = await createReport({
                userRef: userInfo.id,
                progressGoals,
                checkGoals,
            });
        } else {
            const modifiedCheckGoals = getCheckGoalsModified(
                originalCheckGoals,
                checkGoals
            );
            const modifiedProgressGoals = getProgressGoalsModified(
                originalProgressGoals,
                progressGoals
            );

            result = await updateReport({
                reportId: Number(id),
                progressGoals: modifiedProgressGoals,
                checkGoals: modifiedCheckGoals,
            } as IUpdateReport);
        }

        if (result.success) {
            setOriginalCheckGoals(checkGoals);
            setOriginalProgressGoals(progressGoals);
        }

        await Swal.fire(
            result.success ? "Good Job!" : "Oops!",
            result.message,
            result.success ? "success" : "error"
        );

        handleCancel(false);
    }

    async function setReportData() {
        const reportId = Number(id);

        if (!reportId) return;

        const result = await getReport(reportId);

        const report: IReport = result.data;

        if (report) {
            setName(report.user.name);
            setSelectedDate(report.createdDate);
            setCheckGoals(report.checkGoals);
            setProgressGoals(report.progressGoals);
            setIsOwner(userInfo.id == report.user.id);
            setOriginalCheckGoals(report.checkGoals);
            setOriginalProgressGoals(report.progressGoals);
        }
    }

    return (
        <PageLayout>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                handleSaveButton={() => handleCancel(true)}
                title="Alterações não salvas"
                hideDelete
                cancelText="Não"
                confirmText="Sim"
            >
                <p>Você possui alterações não salvas.</p>
                <p>Deseja mesmo descartá-las?</p>
            </Modal>

            <div className="h-full">
                <NavBar
                    IconPage={ReadCvLogo}
                    title={"Week " + getWeek(stringToDate(selectedDate))}
                    goBackUrl="/list-reports"
                >
                    <div className="flex flex-col w-full">
                        <InputField
                            type="text"
                            onChange={() => { }}
                            value={weekInterval}
                            noBackground
                            widthAuto
                            disabled
                            noPadding
                        />
                        <h2 className="text-xl">{name}</h2>
                    </div>
                </NavBar>

                <div id="Goals">
                    <div className="mt-12">
                        <div className="flex flex-col gap-10 mt-2">
                            <div className="rounded-md p-4">
                                <div className="flex justify-between mb-2">
                                    <p className="text-2xl font-bold text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT">
                                        Progresso
                                    </p>
                                    {isOwner && (
                                        <NoBackgroundButton
                                            onClick={handleAddProgressGoal}
                                            className="w-full"
                                        >
                                            <Plus />
                                        </NoBackgroundButton>
                                    )}
                                </div>
                                <div className="flex flex-col gap-4">
                                    {progressGoals.length ? (
                                        Array.isArray(progressGoals) &&
                                        progressGoals.map(goal => (
                                            <ProgressGoal
                                                key={goal.id}
                                                progressGoal={goal}
                                                setProgressGoals={
                                                    setProgressGoals
                                                }
                                                disabled={!isOwner}
                                            />
                                        ))
                                    ) : (
                                        <div className="p-2 px-4 rounded-md flex justify-center w-full bg-WHITE_PRINCIPAL dark:bg-DARK_BACKGROUND_SECONDARY">
                                            <div className="flex items-center text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT">
                                                {isOwner ? (
                                                    <p className="flex">
                                                        Adicione um progresso no
                                                        icone"
                                                        <Plus />"
                                                    </p>
                                                ) : (
                                                    <p>
                                                        Sem metas de progresso
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="  rounded-md p-4">
                                <div className="flex justify-between mb-2">
                                    <p className="text-2xl font-bold text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT">
                                        Check List
                                    </p>
                                    {isOwner && (
                                        <NoBackgroundButton
                                            onClick={handleAddCheckGoal}
                                            className="w-full"
                                        >
                                            <Plus />
                                        </NoBackgroundButton>
                                    )}
                                </div>
                                <div className="flex flex-col gap-4">
                                    {checkGoals.length ? (
                                        Array.isArray(checkGoals) &&
                                        checkGoals.map(goal => (
                                            <CheckInput
                                                key={goal.id}
                                                checkGoal={goal}
                                                setCheckGoals={setCheckGoals}
                                                disabled={!isOwner}
                                            />
                                        ))
                                    ) : (
                                        <div className="p-2 px-4 rounded-md flex justify-center w-full bg-WHITE_PRINCIPAL dark:bg-DARK_BACKGROUND_SECONDARY ">
                                            {isOwner ? (
                                                <p className="flex text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT">
                                                    Adicione um{" "}
                                                    <i>check goal&nbsp;</i> no
                                                    icone "<Plus />"
                                                </p>
                                            ) : (
                                                <p>
                                                    Sem metas de <i>check</i>
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-10">
                <div className="flex gap-2 px-4">
                    <NoBackgroundButton onClick={() => handleCancel(false)}>
                        <p>Cancelar</p>
                    </NoBackgroundButton>
                    {isOwner && (
                        <div className="w-36">
                            <ConfirmButton onClick={handleSaveReport}>
                                {isNew ? "Adicionar" : "Atualizar"}
                            </ConfirmButton>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
}
