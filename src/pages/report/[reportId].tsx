import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Modal from "@/components/Modal";
import { getCurrentDateString, stringToDate, getFormatedWeekInterval } from "@/helpers/dateHelper";
import { getWeek } from "date-fns";
import { NoBackgroundButton } from "@/components/Buttons";
import ProgressGoal from "@/components/goals/ProgressGoal/ProgressGoal";
import CheckInput from "@/components/goals/CheckGoal/CheckInput";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { IProgressGoal } from "@/interfaces/goals/progressGoals/iProgressGoal";
import { ICheckGoal } from "@/interfaces/goals/checkGoals/iCheckGoal";
import { createReport, IUpdateReport, getReport, updateReport } from "@/services/reports/reportService";
import { IResponseData } from "@/interfaces/iResponseData";
import { IReport } from "@/interfaces/iReport";
import { generateInvalidUniqueID } from "@/helpers/uniqueIdHelper";
import { getCheckGoalsModified, getProgressGoalsModified } from "@/helpers/report/reportHelper";
import { ConfirmToReload } from "@/components/ConfirmToReload";
import isEqual from 'lodash/isEqual';
import { normalizeProgressGoals } from "@/helpers/goalHelper";
import { CompactNavBar } from "@/layouts/NavBar/CompactNavBar";
import { getRandomMotivationalPhrase } from "@/helpers/report/motivationalPhrasesHelper";
import { Plus } from "phosphor-react";
import { ConfirmButton } from "@/components/Buttons/ConfirmButton";
import { isNumber } from "lodash";
import { ProfileImage } from "@/components/UserImage";
import { PageLoadLayout } from "@/layouts/PageLoadLayout";

export default function EditReport() {

    const router = useRouter();
    const { reportId } = router.query;
    const { userInfo } = useUserInfoStore();
    const [motivationalPhrase, setMotivationalPhrase] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [name, setName] = useState("");
    const [reportOwnerImageURL, setReportOwnerImageURL] = useState<string>("")
    const [isOwner, setIsOwner] = useState(true);
    const [isNew, setIsNew] = useState(false);
    const [modified, setModified] = useState(false);
    const [forceCancel, setForceCancel] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [selectedDate, setSelectedDate] = useState<string>("");

    const [checkGoals, setCheckGoals] = useState<ICheckGoal[]>([]);
    const [progressGoals, setProgressGoals] = useState<IProgressGoal[]>([]);

    const [originalCheckGoals, setOriginalCheckGoals] = useState<ICheckGoal[]>([]);
    const [originalProgressGoals, setOriginalProgressGoals] = useState<IProgressGoal[]>([]);

    useEffect(() => {

        setMotivationalPhrase(getRandomMotivationalPhrase());

        async function getReportData(reportId: number) {
            return (await getReport(reportId)).data as IReport;
        }

        function setReportData(report: IReport) {
            setIsOwner(userInfo.id == report.user.id);
            setName(report.user.name);
            setReportOwnerImageURL(report.user.imageURL);
            setSelectedDate(report.createdDate);

            setCheckGoals(report.checkGoals);
            setOriginalCheckGoals(report.checkGoals);

            setProgressGoals(normalizeProgressGoals(report.progressGoals));
            setOriginalProgressGoals(normalizeProgressGoals(report.progressGoals));
        }

        function handleNewReport(): boolean {
            if (reportId == 'new') {
                setIsNew(true);
                setSelectedDate(getCurrentDateString());
                return true;
            };
            return false;
        }

        async function handleReceivedReport(reportId: number) {

            if (isNumber(reportId) && userInfo) {
                const report = await getReportData(reportId);
                if (report) {
                    setReportData(report)
                }
                else {
                    router.push("/404")
                }
            }
        }

        const fetchData = () => {
            try {
                if (!handleNewReport()) {
                    handleReceivedReport(Number(reportId))
                }

            } catch (error) {
                Swal.fire("Error when fetching the report", "error");
                router.push("/list-reports")
            }
        };

        fetchData();
        setIsLoading(false);

    }, [reportId, userInfo]);

    useEffect(() => {

        const checkGoalsIsChanged = !isEqual(checkGoals, originalCheckGoals);
        const progressGoalsIsChanged = !isEqual(progressGoals, originalProgressGoals);

        setModified(checkGoalsIsChanged || progressGoalsIsChanged);

    }, [checkGoals, originalCheckGoals, progressGoals, originalProgressGoals]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (modified && !forceCancel) {
                event.preventDefault();
                event.returnValue =
                    "You have unsaved changes. Are you sure you want to quit?";
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
                title: "No title",
                updatedDate: String(new Date()),
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
                title: "No title",
                total: 0,
                value: 0,
                updatedDate: String(new Date()),
                index: progressGoals.length + 1,
            },
        ]);
    }

    async function handleCancel(force: boolean) {
        setForceCancel(force);

        if (isNew) await router.push("/home");
        else await router.push("/list-reports");
    }

    async function handleSaveReport() {

        if (!modified) {
            return Swal.fire("Oops!", "It is necessary to enter or edit a goal for the Report to be saved.", "warning");
        }

        let result: IResponseData;

        if (isNew) {
            result = await createReport({
                userId: userInfo.id,
                progressGoals,
                checkGoals
            });
        }

        else {

            const modifiedCheckGoals = getCheckGoalsModified(originalCheckGoals, checkGoals);
            const modifiedProgressGoals = getProgressGoalsModified(originalProgressGoals, progressGoals);

            result = await updateReport({
                reportId: Number(reportId),
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

        handleCancel(true);
    }

    function getTitlePage() {
        if (isNew) return "Add"
        if (isOwner) return "Edit"
        return "View"
    }

    return (
        <PageLoadLayout isLoading={isLoading} pageName={`Report - ${reportId}`}>
            {isOwner && (
                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    handleSaveButton={() => handleCancel(true)}
                    title="Unsaved changes"
                    hideDelete
                    cancelText="No"
                    confirmText="Yes"
                >
                    <p>You have unsaved changes.</p>
                    <p>Do you really want to discard them?</p>
                </Modal>
            )}

            {modified && (<ConfirmToReload />)}

            <div className="h-full">
                <CompactNavBar
                    title={`${getTitlePage()} Report`}
                    subTitle={`"${motivationalPhrase}"`}
                    goBackUrl={isNew ? "/home" : "/list-reports"}
                >
                </CompactNavBar>

                <div className="flex flex-col w-full mt-10">
                    <div className="flex gap-4 items-center">
                        <ProfileImage size={64} imageUrl={isNew ? userInfo.imageURL ?? reportOwnerImageURL : reportOwnerImageURL} rounded/>
                        <div className="flex flex-col">
                            <h2 className="text-2xl text-LIGHT_TEXT dark:text-DARK_TEXT font-bold">
                                {`Week ${getWeek(stringToDate(isNew ? new Date().toISOString() : selectedDate))}`}
                            </h2>
                            <p className="text-lg text-LIGHT_TEXT_SECONDARY md:text-DARK_TEXT_SECONDARY">
                                {getFormatedWeekInterval(isNew ? new Date().toISOString() : selectedDate)}
                            </p>
                            <p className="text-xl text-LIGHT_TEXT dark:text-DARK_TEXT">{isNew ? userInfo.name : name}</p>
                        </div>
                    </div>
                </div>

                <div id="Goals">
                    <div className="mt-12">
                        <div className="flex flex-col gap-10 mt-2">
                            <div className="rounded-md p-4">
                                <div className="flex justify-between mb-2">
                                    <p className="text-2xl font-bold text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT">
                                        Progress
                                    </p>
                                    {isOwner && (
                                        <NoBackgroundButton onClick={handleAddProgressGoal} className="w-full" >
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
                                                setProgressGoals={setProgressGoals}
                                                disabled={!isOwner}
                                            />
                                        ))
                                    ) : (
                                        <div className="p-2 px-4 rounded-md flex justify-center w-full bg-WHITE_PRINCIPAL dark:bg-DARK_BACKGROUND_SECONDARY">
                                            <div className="flex items-center text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT">
                                                {isOwner ? (
                                                    <p className="flex"> Add a goal by clicking "<Plus />"</p>
                                                ) : (
                                                    <p>No Progress Goals</p>
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
                                        <NoBackgroundButton onClick={handleAddCheckGoal} className="w-full">
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
                                                    Add a goal by clicking "<Plus />"
                                                </p>
                                            ) : (
                                                <p className="flex text-LIGHT_TEXT_SECONDARY dark:text-DARK_TEXT">
                                                    No Check Goals
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
                        <p>Cancel</p>
                    </NoBackgroundButton>
                    {isOwner && (
                        <div className="w-36 h-12">
                            <ConfirmButton onClick={handleSaveReport}>
                                {isNew ? "Add" : "Update"}
                            </ConfirmButton>
                        </div>
                    )}
                </div>
            </div>
        </PageLoadLayout>
    );
}
