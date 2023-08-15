import { IResponseData } from "@/Interfaces/IResponseData";
import api from "@/lib/api";
import { ICreateReportCommand } from "@/pages/api/report/create";
import { IProgressGoalRaw } from "@/Interfaces/goals/progressGoals/IProgressGoalRaw";
import { ICheckGoalRaw } from "@/Interfaces/goals/checkGoals/ICheckGoalRaw";
import { IUpdateReportCommand } from "@/pages/api/report/update";
import IProgressGoal from "@/Interfaces/goals/progressGoals/IProgressGoal";
import ICheckGoal from "@/Interfaces/goals/checkGoals/ICheckGoal";

interface ICreateReport {
    userRef: number;
    progressGoals: IProgressGoalRaw[];
    checkGoals: ICheckGoalRaw[];
}

export async function CreateReport({
    userRef,
    progressGoals,
    checkGoals,
}: ICreateReport) {
    try {
        const report = await fetch(api.concat("/api/report/create"), {
            method: "POST",
            body: JSON.stringify({
                userRef,
                checkGoals,
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

export async function updateReport({
    reportId,
    progressGoals,
    checkGoals,
}: IUpdateReport) {
    try {
        const report = await fetch(api.concat("/api/report/update"), {
            method: "PUT",
            body: JSON.stringify({
                reportId,
                checkGoals,
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

export async function getAllReports() {
    try {
        const report = await fetch(api.concat("/api/report/get-all"), {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await report.json();

        return {
            success: true,
            message: "Relatórios obtidos com sucesso.",
            data: data.data,
        } as IResponseData;
    } catch (error) {
        return {
            success: false,
            message: "Erro ao obter os relatórios.",
            data: null,
        } as IResponseData;
    }
}

export async function getReport(reportId: number) {
    try {
        const report = await fetch(
            api.concat("/api/report/get?reportId=" + reportId),
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        const data = await report.json();

        return {
            success: true,
            message: "Relatório obtido com sucesso.",
            data: data.data,
        } as IResponseData;
    } catch (error) {
        return {
            success: false,
            message: "Erro ao obter o relatório.",
            data: null,
        } as IResponseData;
    }
}
