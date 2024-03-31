import { IResponseData } from "@/interfaces/iResponseData";
import { ICreateReportCommand } from "@/pages/api/report/create";
import { IProgressGoalRaw } from "@/interfaces/goals/progressGoals/iProgressGoalRaw";
import { ICheckGoalRaw } from "@/interfaces/goals/checkGoals/iCheckGoalRaw";
import { IUpdateReportCommand } from "@/pages/api/report/update";
import { IProgressGoal } from "@/interfaces/goals/progressGoals/iProgressGoal";
import { ICheckGoal } from "@/interfaces/goals/checkGoals/iCheckGoal";
import { getWeekInterval } from "@/helpers/dateHelper";

export interface IUpdateReport {
    reportId: number;
    progressGoals: {
        deleted: IProgressGoal[];
        inserted: IProgressGoal[];
        modified: IProgressGoal[];
    };
    checkGoals: {
        deleted: ICheckGoal[];
        inserted: ICheckGoal[];
        modified: ICheckGoal[];
    };
}

interface ICreateReport {
    userId: string;
    progressGoals: IProgressGoalRaw[];
}

export async function createReport({
    userId,
    progressGoals
}: ICreateReport) {
    try {
        const report = await fetch("/api/report/create", {
            method: "POST",
            body: JSON.stringify({
                userId: userId,
                progressGoals,
            } as ICreateReportCommand),
            headers: { "Content-Type": "application/json" },
        });

        return {
            success: true,
            message: "Relatório adicionado com sucesso.",
            data: report,
        } as IResponseData;
    } catch (error) {
        return {
            success: false,
            message: "Erro ao adicionar o relatório.",
            data: null,
        } as IResponseData;
    }
}

export async function updateReport({
    reportId,
    progressGoals,
}: IUpdateReport) {
    try {
        const report = await fetch("/api/report/update", {
            method: "PUT",
            body: JSON.stringify({
                reportId,
                progressGoals,
            } as IUpdateReportCommand),
            headers: { "Content-Type": "application/json" },
        });

        return {
            success: true,
            message: "Relatório atualizado com sucesso.",
            data: report,
        } as IResponseData;
    } catch (error) {
        return {
            success: false,
            message: "Erro ao atualizar o relatório.",
            data: null,
        } as IResponseData;
    }
}

export async function getReport(reportId: number) {
    try {
        const report = await fetch("/api/report/get?reportId=" + reportId,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        const response = await report.json() as IResponseData;

        return {
            success: true,
            message: "Relatório obtido com sucesso.",
            data: response.data,
        } as IResponseData;

    } catch (error) {
        return {
            success: false,
            message: "Erro ao obter o relatório.",
            data: null,
        } as IResponseData;
    }
}

export async function validateReportFromWeek(userId: string) {
    try {
        const { firstDayOfWeek, lastDayOfWeek } = getWeekInterval(new Date())

        const queryParams = new URLSearchParams({
            userId: userId,
            beginDateOfWeek: firstDayOfWeek.toDateString(),
            endDateOfWeek: lastDayOfWeek.toDateString(),
        });

        const apiUrl = `/api/report/get-from-period?${queryParams.toString()}`;
        const response = await fetch(apiUrl);

        return await response.json() as IResponseData;

    } catch (error) {
        return {
            success: false,
            message: "Erro ao obter o relatório.",
            data: null,
        } as IResponseData;
    }
}

export async function getLastReport(userId: string) {
    try {
        const queryParams = new URLSearchParams({ userId: userId });

        const apiUrl = `/api/report/get-latest?${queryParams.toString()}`;
        const response = await fetch(apiUrl);

        return await response.json();

    } catch (error) {
        return {
            success: false,
            message: "An error occurred while trying to get the latest report.",
            data: null,
        } as IResponseData;
    }
}
