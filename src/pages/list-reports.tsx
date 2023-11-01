import React, { useEffect, useState } from "react";
import { Calendar, Eye, PencilSimple } from "phosphor-react";
import Link from "next/link";
import PageLayout from "@/layouts/PageLayout";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { getFormatedWeekInterval } from "@/helpers/dateHelper";
import { getUpdatedTimeElapsed } from "@/helpers/elapsedTime";
import { CompactNavBar } from "@/layouts/NavBar/CompactNavBar";
import { ProfileImage } from "@/components/profileImage";
import { tv } from "tailwind-variants";
import DatePicker from 'react-datepicker'
import { IReportItem } from "@/interfaces/reports/IReportItem";
import { Rocket } from "@/assets/icons/Rocket";
import { getElementStyle } from "@/helpers/ElementHelper";
import { getAllReports } from "@/services/reports/getAll";
import { ReportFilterOptions } from "@/interfaces/reports/types/reportFilterOptions";

export default function ListReport() {
    const [reports, setReports] = useState<IReportItem[]>([]);
    const { userInfo } = useUserInfoStore();
    const [selectedFilterType, setSelectedFilterType] = useState<"onlyMine" | "whoDoIFollow" | "everyone" | "none">("none")
    const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);
    const [startDate, endDate] = dateRange;

    const button = tv({
        base: "min-w-28 h-10 rounded-full border-2 px-2 border-SECONDARY_DEFAULT font-semibold text-sm",
        variants: {
            selected: {
                true: "bg-SECONDARY_DEFAULT text-white",
                false: "bg-transparent text-SECONDARY_DEFAULT"
            }
        }
    })

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const result = await getAllReports({ userId: userInfo.id, startDate: startDate, endDate: endDate, option: selectedFilterType });
                setReports(result.data);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };
        fetchReports();
    }, [selectedFilterType, startDate, endDate]);

    const handleButtonClick = (buttonName: ReportFilterOptions) => {
        if (selectedFilterType === buttonName) {
            setSelectedFilterType("none");
        } else {
            setSelectedFilterType(buttonName);
        }
    };

    function getWeeklyProgressText(value: number, total: number, reportId: string) {
        const percentage = ((value / total) * 100).toFixed(0)
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
                <Rocket size={24} color={getElementStyle(reportId)?.color} />
                <span>Weekly Progress {percentage}%</span>
            </div>
        )
    }

    function handleSetDate(update: [Date | null, Date | null]) {
        if (update[0] == null || update[1] == null) return;
        setDateRange([update[0], update[1]]);
    }

    return (
        <PageLayout>
            <CompactNavBar
                title="Relatórios"
                subTitle="Todos os Reports estão aqui"
                goBackUrl="/home"
            />

            <div className="pt-14 h-full">
                <div className="bg-NEUTRAL_GRAY_0 h-full w-full dark:bg-NEUTRAL_DARK_100 rounded-3xl pt-14 px-4 md:px-24">
                    <div className="flex w-full justify-between items-center">
                        <div className="bg-NEUTRAL_GRAY_02 dark:bg-DARK_BACKGROUND_SECONDARY py-3 px-4 rounded-lg text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_GRAY_06">

                            <div date-rangepicker className="flex gap-2 items-center">
                                <DatePicker
                                    className="outline-none bg-transparent"
                                    selectsRange={true}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={(update) => handleSetDate(update)}
                                    placeholderText={`${new Date().toLocaleDateString()} - ${new Date().toLocaleDateString()}`}
                                />
                                <Calendar size={24} className="text-NEUTRAL_GRAY_06 dark:bg-DARK_BACKGROUND_SECONDARY" />
                            </div>

                        </div>
                        <div className="flex flex-row gap-2">
                            <button
                                className={button({ selected: selectedFilterType === 'onlyMine' })}
                                onClick={() => handleButtonClick('onlyMine')}
                            >
                                Only mine
                            </button>
                            <button
                                className={button({ selected: selectedFilterType === 'whoDoIFollow' })}
                                onClick={() => handleButtonClick('whoDoIFollow')}
                            >
                                Who do I follow
                            </button>
                            <button
                                className={button({ selected: selectedFilterType === 'everyone' })}
                                onClick={() => handleButtonClick('everyone')}
                            >
                                Everyone
                            </button>
                        </div>
                    </div>
                    <ul className="mt-10 w-full">
                        {reports && reports.map(data => (
                            <Link key={data.reportId} href={`/report/${data.reportId}`}>
                                <li
                                    className="mb-4 bg-NEUTRAL_GRAY_02 dark:bg-DARK_BACKGROUND_SECONDARY rounded-lg p-2 w-full"
                                    key={data.reportId}
                                >
                                    <div className="flex justify-between">
                                        <div className="ml-4 flex gap-4 items-center  text-LIGHT_TEXT dark:text-DARK_TEXT">
                                            <ProfileImage imageUrl={data.imageURL} rounded size={48} />
                                            <div>
                                                <div className="flex flex-row gap-2">
                                                    <span className="text-lg font-bold text-NEUTRAL_GRAY_09 dark:text-NEUTRAL_WHITE">{data.name}</span>
                                                    <span className="text-base text-NEUTRAL_GRAY_06">@{data.username}</span>
                                                </div>
                                                <p>{data.description}</p>
                                                <p className="text-NEUTRAL_GRAY_06">{getFormatedWeekInterval(data.createdDate)}</p>
                                                {getWeeklyProgressText(data.value, data.total, data.reportId.toString())}
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-[120px] items-center text-center px-6">

                                            {userInfo.id == data.userId ? (
                                                <button className="py-2"><PencilSimple size={24} className="text-PRINCIPAL" /></button>)
                                                : (<button className="py-2" children={<Eye size={24} className="text-PRINCIPAL" />} />)
                                            }

                                            <p className="text-xs text-NEUTRAL_GRAY_06 font-normal">
                                                {`${getUpdatedTimeElapsed(data.updatedDate)}`}</p>
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
