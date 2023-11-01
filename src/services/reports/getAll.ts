import { IResponseData } from "@/interfaces/iResponseData";
import { ReportFilterOptions } from "@/interfaces/reports/types/reportFilterOptions";

interface IReportFilter {
    userId: string,
    startDate: Date,
    endDate: Date,
    option: ReportFilterOptions,
}

export async function getAllReports(filter: IReportFilter) {
    try {

        const queryParams = new URLSearchParams({
            userId: filter.userId,
            startDate: filter.startDate.toDateString(),
            endDate: filter.endDate.toDateString(),
            option: filter.option
        });

        const report = await fetch(`/api/report/get-all?${queryParams.toString()}`)
        const response = await report.json();

        return {
            success: true,
            message: "Relatórios obtidos com sucesso.",
            data: response.data,
        } as IResponseData;
    } catch (error) {
        return {
            success: false,
            message: "Erro ao obter os relatórios.",
            data: null,
        } as IResponseData;
    }
}
