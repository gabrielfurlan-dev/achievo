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
import DatePicker from 'react-datepicker'
import { IReportItem } from "@/interfaces/reports/IReportItem";
import { Rocket } from "@/assets/icons/Rocket";
import { getAllReports } from "@/services/reports/getAll";
import { ReportFilterOptions } from "@/interfaces/reports/types/reportFilterOptions";
import { startOfToday, startOfTomorrow, subMonths } from "date-fns";
import { IResponseData } from "@/interfaces/iResponseData";

export default function ListReport() {
    const [reports, setReports] = useState<IReportItem[]>([]);
    const { userInfo } = useUserInfoStore();
    const [selectedFilterType, setSelectedFilterType] = useState<ReportFilterOptions>("everyone")
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    const button = tv({
        base: "min-w-28 rounded-full border-2 px-4 py-2 border-SECONDARY_DEFAULT font-semibold text-xs md:text-sm",
        variants: {
            selected: {
                true: "bg-SECONDARY_DEFAULT text-white",
                false: "bg-transparent text-SECONDARY_DEFAULT"
            }
        }
    })

    useEffect(() => {
        const tomorrow = startOfTomorrow();
        const oneMonthAgo = subMonths(startOfToday(), 1);
        setDateRange([oneMonthAgo, tomorrow]);
    }, [])

    async function fetchReports() {
        try {
            const result = await getAllReports({
                userId: userInfo.id,
                startDate: startDate ?? new Date(),
                endDate: endDate ?? new Date(),
                option: selectedFilterType
            }) as IResponseData;

            setReports(result.data as IReportItem[]);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    useEffect(() => {
        if (!userInfo.id || !startDate || !endDate) return;
        fetchReports();
    }, [userInfo.id, selectedFilterType, startDate, endDate]);

    function getWeeklyProgressText(value: number, total: number, reportId: string) {

        let percentage = ((value / total) * 100).toFixed(0)

        if (!parseInt(percentage)) {
            return (
                <div id={reportId} className={"flex text-NEUTRAL_GRAY_07 items-center gap-2"}>
                    <Rocket size={24} color={"rgb(73 80 87 / var(--tw-text-opacity))"} />
                    <span>Weekly progress not updated yet</span>
                </div>
            )
        }

        if (parseInt(percentage) > 100) {
            percentage = "100"
        }

        const style = tv({
            base: "flex items-center gap-2",
            variants: {
                conclued: {
                    true: "text-PRIMARY_DEFAULT",
                    false: "text-SECONDARY_DEFAULT"
                }
            }
        })

        return (
            <div id={reportId} className={style({ conclued: percentage == "100" })}>
                <Rocket size={24} color={percentage == "100" ? "#5C8A74" : "#D97251"} />
                <span>Weekly Progress {percentage}%</span>
            </div>
        )
    }

    return (
        <PageLayout pageName="Reports">
            <CompactNavBar
                title="Reports"
                subTitle="Everything here"
                goBackUrl="/home"
            />
            <div className="pt-14 h-full w-full">
                <div className="bg-NEUTRAL_GRAY_0 h-full w-full dark:bg-NEUTRAL_DARK_100 rounded-3xl pt-14 px-2 md:px-24">
                    <div className="flex flex-col gap-6 md:flex-row w-full justify-between items-center">
                        <div className="w-full md:w-fit bg-NEUTRAL_GRAY_02 dark:bg-DARK_BACKGROUND_SECONDARY py-3 px-4 rounded-lg text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_06">
                            <div date-rangepicker className="flex justify-between gap-2 items-center w-full">
                                <DatePicker
                                    className="outline-none bg-transparent w-full"
                                    selectsRange={true}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={(update) => setDateRange(update)}
                                    placeholderText={`${new Date().toLocaleDateString()} - ${new Date().toLocaleDateString()}`}
                                />
                                <Calendar size={24} className="text-NEUTRAL_GRAY_06 dark:bg-DARK_BACKGROUND_SECONDARY" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <button
                                className={button({ selected: selectedFilterType === 'onlyMine' })}
                                onClick={() => setSelectedFilterType('onlyMine')} children={"Only mine"}
                            />
                            <button
                                className={button({ selected: selectedFilterType === 'whoDoIFollow' })}
                                onClick={() => setSelectedFilterType('whoDoIFollow')} children={"Who do I follow"}
                            />
                            <button
                                className={button({ selected: selectedFilterType === 'everyone' })}
                                onClick={() => setSelectedFilterType('everyone')} children={"Everyone"}
                            />
                        </div>
                    </div>
                    <ul className="pt-10 pb-1 md:pb-10 h-full w-full" >
                        {
                            reports.length == 0 && (
                                <div className="w-full h-full flex m-auto flex-col justify-center items-center text-NEUTRAL_GRAY_04 dark:text-NEUTRAL_GRAY_07">
                                    <Binoculars size={56} />
                                    <p>No reports found!</p>
                                </div>
                            )
                        }
                        {reports && reports.map(data => (
                            <Link key={data.reportId} href={`/report/${data.reportId}`}>
                                <li
                                    className="mb-4 transition duration-150 rounded-lg p-2 w-full
                                              border-transparent border-2 hover:border-PRIMARY_DEFAULT hover:border-opacity-10
                                                bg-NEUTRAL_GRAY_02 hover:bg-PRIMARY_DEFAULT hover:bg-opacity-25
                                                dark:bg-DARK_BACKGROUND_SECONDARY dark:hover:bg-PRINCIPAL dark:hover:bg-opacity-40"
                                    key={data.reportId}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="md:ml-4 flex gap-4 items-center  text-LIGHT_TEXT dark:text-DARK_TEXT ">
                                            <ProfileImage imageUrl={data.imageURL} rounded size={48} />
                                            <div>
                                                <div className="flex flex-wrap">
                                                    <span className="text-lg font-bold text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_WHITE mr-2">{data.name}</span>
                                                    <span className="text-base text-NEUTRAL_GRAY_06">@{data.username}</span>
                                                </div>
                                                <p className="text-NEUTRAL_GRAY_06">{getFormatedWeekInterval(data.createdDate)}</p>
                                                {getWeeklyProgressText(data.value, data.total, data.reportId.toString())}
                                                <p className="flex md:hidden text-xs text-NEUTRAL_GRAY_06 font-normal h-full w-full pt-2 items-center ">
                                                    {`${getUpdatedTimeElapsed(data.updatedDate)}`}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:w-[120px] h-full items-center text-center mr-4 md:px-6">
                                            {
                                                userInfo.id == data.userId &&
                                                (<button className="py-2" children={<PencilSimple size={24} className="text-PRINCIPAL" />} />)
                                            }
                                            <p className="hidden md:flex text-xs text-NEUTRAL_GRAY_06 font-normal h-full items-center ">
                                                {`${getUpdatedTimeElapsed(data.updatedDate)}`}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </PageLayout >
    );
}
