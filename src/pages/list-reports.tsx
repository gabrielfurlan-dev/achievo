import React, { useEffect, useState } from "react";
import { IReport } from "@/interfaces/iReport";
import { Calendar, Eye, PencilSimple } from "phosphor-react";
import Link from "next/link";
import { NoBackgroundButton } from "@/components/Buttons";
import { getWeek } from "date-fns";
import PageLayout from "@/layouts/PageLayout";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { stringToDate, getFormatedWeekInterval } from "@/helpers/dateHelper";
import { getAllReports } from "@/services/reports/reportService";
import { getUpdatedTimeElapsed } from "@/helpers/elapsedTime";
import { CompactNavBar } from "@/layouts/NavBar/CompactNavBar";
import { ProfileImage } from "@/components/profileImage";
import { tv } from "tailwind-variants";
import DatePicker from 'react-datepicker'

export default function ListReport() {
    const [reports, setReports] = useState<IReport[]>([]);
    const { userInfo } = useUserInfoStore();
    const [selectedFilterType, setSelectedFilterType] = useState<"onlyMine" | "WhoDoIFollow" | "everyone" | "none">("none")
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
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
                const result = await getAllReports();
                setReports(result.data);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };
        fetchReports();
    }, []);

    const handleButtonClick = (buttonName: "onlyMine" | "WhoDoIFollow" | "everyone" | "none") => {
        if (selectedFilterType === buttonName) {
            setSelectedFilterType("none");
        } else {
            setSelectedFilterType(buttonName);
        }
    };

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
                                    onChange={(update) => {
                                        setDateRange(update);
                                    }}
                                    placeholderText={`${new Date().toLocaleDateString()} - ${new Date().toLocaleDateString()}`}
                                />
                                <Calendar size={24} className="text-NEUTRAL_GRAY_04 dark:bg-DARK_BACKGROUND_SECONDARY"/>
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
                                className={button({ selected: selectedFilterType === 'WhoDoIFollow' })}
                                onClick={() => handleButtonClick('WhoDoIFollow')}
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
                            <Link key={data.id} href={`/report/${data.id}`}>
                                <li
                                    className="mb-4 bg-NEUTRAL_GRAY_02 dark:bg-DARK_BACKGROUND_SECONDARY rounded-lg p-2 w-full"
                                    key={data.id}
                                >
                                    <div className="flex justify-between">
                                        <div className="ml-4 flex gap-8 items-center  text-LIGHT_TEXT dark:text-DARK_TEXT">
                                            <ProfileImage imageUrl={data.user.imageURL} rounded />
                                            <div>
                                                <p className="font-bold text-xl">
                                                    Week{" "}
                                                    {getWeek(
                                                        stringToDate(data.createdDate)
                                                    )}
                                                </p>
                                                <p>{getFormatedWeekInterval(data.createdDate)}</p>
                                                <p className="text-xs font-normal">
                                                    {`${getUpdatedTimeElapsed(data.updatedDate)}`}</p>
                                                <p>{data.username}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {userInfo.id == data.user.id ? (
                                                <NoBackgroundButton children={<PencilSimple size={24} className="text-PRINCIPAL" />} />
                                            ) : (
                                                <NoBackgroundButton children={<Eye size={24} className="text-PRINCIPAL" />} />)}
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
