import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Modal from "@/components/Modal";
import { getCurrentDateString, stringToDate, getFormatedWeekInterval } from "@/helpers/dateHelper";
import { getWeek } from "date-fns";
import { NoBackgroundButton } from "@/components/Buttons";
import TaskItem from "@/components/goals/ProgressGoal/TaskItem";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { createReport, getReport, updateReport } from "@/services/reports/reportService";
import { generateInvalidUniqueID } from "@/helpers/uniqueIdHelper";
import { ConfirmToReload } from "@/components/ConfirmToReload";
import isEqual from 'lodash/isEqual';
import { CompactNavBar } from "@/layouts/NavBar/CompactNavBar";
import { getRandomMotivationalPhrase } from "@/helpers/report/motivationalPhrasesHelper";
import { Plus } from "phosphor-react";
import { ConfirmButton } from "@/components/Buttons/ConfirmButton";
import { isNumber } from "lodash";
import { ProfileImage } from "@/components/UserImage";
import { PageLoadLayout } from "@/layouts/PageLoadLayout";
import { getProgressGoalsModified } from "@/helpers/report/reportHelper";
import { Report } from "@/types/Entities/Report";
import { Task } from "@/types/Entities/Task";
import { CreateNewReportCommand } from "@/types/Commands/Report/CreateNewReportCommand";
import { UpdateReportCommand } from "@/types/Commands/Report/UpdateReportCommand";

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

    const [selectedDate, setDisplayDate] = useState<string>("Week Interval");

    const [tasks, setTasks] = useState<Task[]>([]);
    const [originalTasks, setOriginalTasks] = useState<Task[]>([]);

    useEffect(() => {

        setMotivationalPhrase(getRandomMotivationalPhrase());

        function setReportData(report: Report) {
            setIsOwner(userInfo.id == report.user.id);
            setName(report.user.name);
            setReportOwnerImageURL(report.user.imageUrl);
            // setDisplayDate(report.createdDate);
            setTasks(report.tasks);
            setOriginalTasks(report.tasks);
        }

        function handleNewReport(): boolean {
            if (reportId == 'new') {
                setIsNew(true);
                setDisplayDate(getCurrentDateString());
                return true;
            };
            return false;
        }

        async function handleReceivedReport(reportId: number) {

            if (!isNumber(reportId) && !userInfo) return;

            const report = await getReport(reportId);
            if (report)
                setReportData(report)
            else
                router.push("/404")
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

        const progressGoalsIsChanged = !isEqual(tasks, originalTasks);

        setModified(progressGoalsIsChanged);

    }, [tasks, originalTasks]);

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

    function handleAddProgressGoal() {
        setTasks([
            ...tasks,
            {
                id: generateInvalidUniqueID(),
                reportId: 0,
                title: "No title",
                total: 0,
                value: 0,
                progress: 0,
                updatedDate: new Date()
            },
        ]);
    }

    async function handleCancel(force: boolean) {
        setForceCancel(force);

        if (isNew) await router.push("/home");
        else await router.push("/list-reports");
    }

    async function handleSaveReport() {

        if (!modified)
            return Swal.fire("Oops!", "It is necessary to enter or edit a goal for the Report to be saved.", "warning");

        try {
            if (isNew) {
                const command: CreateNewReportCommand = { userId: userInfo.id, tasks: tasks };
                await createReport(command);
            }
            else {
                const modifiedProgressGoals = getProgressGoalsModified(originalTasks, tasks);
                const command: UpdateReportCommand = {
                    id: Number(reportId),
                    inserted: modifiedProgressGoals.inserted,
                    deleted: modifiedProgressGoals.deleted,
                    modified: modifiedProgressGoals.modified,
                }
                await updateReport(command);
                setOriginalTasks(tasks);
            }
            await Swal.fire("Good Job!", "Report created.", "success")
        } catch (error) {
            await Swal.fire("Ops!", `Something went wrong.\n${error}`, "error")
        }
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
                        <ProfileImage size={64} imageUrl={isNew ? userInfo.imageURL ?? reportOwnerImageURL : reportOwnerImageURL} rounded />
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
                                    {tasks.length ? (
                                        Array.isArray(tasks) &&
                                        tasks.map(task => (
                                            <TaskItem
                                                key={task.id}
                                                task={task}
                                                setTask={setTasks}
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
