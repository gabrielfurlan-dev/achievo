import { ReportFilterOptions } from "@/interfaces/reports/types/reportFilterOptions";

interface IReportFilter {
    userId: string,
    startDate: Date,
    endDate: Date,
    option: ReportFilterOptions,
}

export async function getAllReports(filter: IReportFilter) {

    const queryParams = new URLSearchParams({
        userId: filter.userId,
        startDate: filter.startDate.toDateString(),
        endDate: filter.endDate.toDateString(),
        option: filter.option
    });

    const report = await fetch(`/api/report/get-all?${queryParams.toString()}`)

    return await report.json();
}
