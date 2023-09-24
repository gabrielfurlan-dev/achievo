import React, { useEffect, useState } from "react";
import { IReport } from "@/interfaces/iReport";
import { Eye, PencilSimple } from "phosphor-react";
import Link from "next/link";
import { ListMagnifyingGlass } from "@phosphor-icons/react";
import { NoBackgroundButton } from "@/components/Buttons";
import { getWeek } from "date-fns";
import PageLayout from "@/layouts/PageLayout";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { stringToDate, getFormatedWeekInterval } from "@/helpers/dateHelper";
import { getAllReports } from "@/services/reports/reportService";
import { getUpdatedTimeElapsed } from "@/helpers/elapsedTime";
import { CompactNavBar } from "@/layouts/NavBar/CompactNavBar";

export default function ListReport() {
    const [reports, setReports] = useState<IReport[]>([]);
    const { userInfo } = useUserInfoStore();

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

    return (
        <PageLayout>
            <CompactNavBar
                IconPage={ListMagnifyingGlass}
                title="Relatórios"
                subTitle="Todos os Reports estão aqui"
                goBackUrl="/home"
            />
            <ul className="mt-10 w-full">
                {reports.map(data => (
                    <Link key={data.id} href={`/report/${data.id}`}>
                        <li
                            className="mb-4 bg-WHITE_PRINCIPAL dark:bg-DARK_BACKGROUND_SECONDARY rounded-lg p-2 w-full"
                            key={data.id}
                        >
                            <div className="flex justify-between">
                                <div className="ml-4 flex gap-8 items-center  text-LIGHT_TEXT dark:text-DARK_TEXT">
                                    <img
                                        src={data.user.imageURL}
                                        className="w-10 h-10 rounded-full"
                                    />
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
        </PageLayout >
    );
}
