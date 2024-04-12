import React, { useEffect, useState } from "react";
import { Binoculars, Calendar, PencilSimple } from "phosphor-react";
import Link from "next/link";
import PageLayout from "@/layouts/PageLayout";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { getFormatedWeekInterval } from "@/helpers/dateHelper";
import { getUpdatedTimeElapsed } from "@/helpers/elapsedTime";
import { CompactNavBar } from "@/layouts/NavBar/CompactNavBar";
import { ProfileImage } from "@/components/UserImage";
import { tv } from "tailwind-variants";
import DatePicker from "react-datepicker";
import { Rocket } from "@/assets/icons/Rocket";
import { ReportFilterOptions } from "@/interfaces/reports/types/reportFilterOptions";
import { startOfToday, startOfTomorrow, subMonths } from "date-fns";
import { CircularProgress } from "@mui/material";
import { getAllReports } from "@/services/reports/reportGateway";
import { ResumedReportResult } from "@/types/Result/ResumedReportResult";

export default function ListReport() {
    const [reports, setReports] = useState<ResumedReportResult[]>([]);
    const { userInfo } = useUserInfoStore();
    const [selectedFilterType, setSelectedFilterType] =
        useState<ReportFilterOptions>("everyone");
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
        null,
        null,
    ]);
    const [startDate, endDate] = dateRange;
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const button = tv({
        base: "min-w-28 rounded-full border-2 px-4 py-2 border-SECONDARY_DEFAULT font-semibold text-xs md:text-sm",
        variants: {
            selected: {
                true: "bg-SECONDARY_DEFAULT text-white",
                false: "bg-transparent text-SECONDARY_DEFAULT",
            },
        },
    });

    useEffect(() => {
        const tomorrow = startOfTomorrow();
        const oneMonthAgo = subMonths(startOfToday(), 1);
        setDateRange([oneMonthAgo, tomorrow]);
    }, []);

    async function fetchReports() {
        setIsLoaded(false);

        try {
            const reports = await getAllReports({
                userId: userInfo.id,
                startDate: startDate ?? new Date(),
                endDate: endDate ?? new Date(),
                option: selectedFilterType,
                searchName: ""
            });

            setReports(reports);
            setIsLoaded(true);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    }

    useEffect(() => {
        if (!userInfo.id || !startDate || !endDate) return;
        fetchReports();
    }, [userInfo.id, selectedFilterType, startDate, endDate]);

    function getWeeklyProgressText(
        value: number,
        total: number,
        reportId: string
    ) {
        let percentage = ((value / total) * 100).toFixed(0);

        if (!parseInt(percentage)) {
            return (
                <div
                    id={reportId}
                    className={"flex text-NEUTRAL_GRAY_07 items-center gap-2"}
                >
                    <Rocket
                        size={24}
                        color={"rgb(73 80 87 / var(--tw-text-opacity))"}
                    />
                    <span>Weekly progress not updated yet</span>
                </div>
            );
        }

        if (parseInt(percentage) > 100) {
            percentage = "100";
        }

        const style = tv({
            base: "flex items-center gap-2",
            variants: {
                conclued: {
                    true: "text-PRIMARY_DEFAULT",
                    false: "text-SECONDARY_DEFAULT",
                },
            },
        });

        return (
            <div
                id={reportId}
                className={style({ conclued: percentage == "100" })}
            >
                <Rocket
                    size={24}
                    color={percentage == "100" ? "#5C8A74" : "#D97251"}
                />
                <span>Weekly Progress {percentage}%</span>
            </div>
        );
    }

    return (
        <PageLayout pageName="Reports">
            <CompactNavBar
                title="Reports"
                subTitle="Everything here"
                goBackUrl="/home"
            />
            <div className="w-full h-full pt-14">
                <div className="w-full h-full px-2 bg-NEUTRAL_GRAY_0 dark:bg-NEUTRAL_DARK_100 rounded-3xl pt-14 md:px-24">
                    <div className="flex flex-col items-center justify-between w-full gap-6 md:flex-row">
                        <div className="w-full px-4 py-3 rounded-lg md:w-fit bg-NEUTRAL_GRAY_02 dark:bg-DARK_BACKGROUND_SECONDARY text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_06">
                            <div className="flex items-center justify-between w-full gap-2">
                                <DatePicker
                                    className="w-full bg-transparent outline-none"
                                    selectsRange={true}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={update => setDateRange(update)}
                                    placeholderText={`${new Date().toLocaleDateString()} - ${new Date().toLocaleDateString()}`}
                                />
                                <Calendar
                                    size={24}
                                    className="text-NEUTRAL_GRAY_06 dark:bg-DARK_BACKGROUND_SECONDARY"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <button
                                className={button({
                                    selected: selectedFilterType === "onlyMine",
                                })}
                                onClick={() =>
                                    setSelectedFilterType("onlyMine")
                                }
                            >
                                Only mine
                            </button>
                            <button
                                className={button({
                                    selected:
                                        selectedFilterType === "whoDoIFollow",
                                })}
                                onClick={() =>
                                    setSelectedFilterType("whoDoIFollow")
                                }
                            >
                                Who do I follow
                            </button>
                            <button
                                className={button({
                                    selected: selectedFilterType === "everyone",
                                })}
                                onClick={() =>
                                    setSelectedFilterType("everyone")
                                }
                            >
                                Everyone
                            </button>
                        </div>
                    </div>
                    {reports.length === 0 && (
                        <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden">
                            {isLoaded ? (
                                <div className="flex flex-col items-center justify-center text-center">
                                    <Binoculars size={56} />
                                    <p>No reports found!</p>
                                </div>
                            ) : (
                                <CircularProgress className="text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_02" />
                            )}
                        </div>
                    )}
                    <ul className="w-full pt-10 pb-1 md:pb-10">
                        {
                            reports &&
                            reports.sort((a, b) => b.reportId - a.reportId)
                                .map(data => (
                                    <Link
                                        key={data.reportId}
                                        href={`/report/${data.reportId}`}
                                    >
                                        <li
                                            className="w-full p-2 mb-4 transition duration-150 border-2 border-transparent rounded-lg hover:border-PRIMARY_DEFAULT hover:border-opacity-10 bg-NEUTRAL_GRAY_02 hover:bg-PRIMARY_DEFAULT hover:bg-opacity-25 dark:bg-DARK_BACKGROUND_SECONDARY dark:hover:bg-PRINCIPAL dark:hover:bg-opacity-40"
                                            key={data.reportId}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 md:ml-4 text-LIGHT_TEXT dark:text-DARK_TEXT ">
                                                    <ProfileImage
                                                        imageUrl={data.userImageURL}
                                                        rounded
                                                        size={48}
                                                    />
                                                    <div>
                                                        <div className="flex flex-wrap">
                                                            <span className="mr-2 text-lg font-bold text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_WHITE">
                                                                {data.userName}
                                                            </span>
                                                            <span className="text-base text-NEUTRAL_GRAY_06">
                                                                @{data.userUsername}
                                                            </span>
                                                        </div>
                                                        <p className="text-NEUTRAL_GRAY_06">
                                                            {getFormatedWeekInterval(data.createdDate.toString())}
                                                        </p>
                                                        {`weekly progress ${data.progress}%`}
                                                        <p className="flex items-center w-full h-full pt-2 text-xs font-normal md:hidden text-NEUTRAL_GRAY_06 ">
                                                            {`${getUpdatedTimeElapsed(data.updatedDate.toString())}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col md:w-[120px] h-full items-center text-center mr-4 md:px-6">
                                                    {userInfo.id ==
                                                        data.userId && (
                                                            <button className="py-2">
                                                                <PencilSimple
                                                                    size={24}
                                                                    className="text-PRINCIPAL"
                                                                />
                                                            </button>
                                                        )}
                                                    <p className="items-center hidden h-full text-xs font-normal md:flex text-NEUTRAL_GRAY_06 ">
                                                        {`${getUpdatedTimeElapsed(data.updatedDate.toString())}`}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                )
                                )
                        }
                    </ul>
                </div>
            </div>
        </PageLayout>
    );
}
