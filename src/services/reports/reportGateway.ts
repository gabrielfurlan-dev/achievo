import { z } from 'zod';
import { sb } from '@/spellBinder';
import { ReportFilter } from '@/types/Filters/GetReportsFilter';
import { CreateNewReportCommand, CreateNewReportCommandSchema } from '@/types/Commands/Report/createNewReportCommand';
import { UpdateReportCommand } from '@/types/Commands/Report/updateReportCommand';
import { ReportSchema } from '@/types/Entities/report';
import { ResumedReportResultSchema } from '@/types/Result/ResumedReportResult';

export async function createReport(command: CreateNewReportCommand) {
    return await sb.post({
        url: "/reports",
        schema: ReportSchema,
        body: command
    });
}

export async function updateReport(command: UpdateReportCommand) {
    return await sb.put({
        url: "/reports",
        schema: CreateNewReportCommandSchema,
        body: command
    });
}

export async function getReport(reportId: number) {
    return await sb.get({
        url: '/reports/' + reportId,
        schema: ReportSchema,
    });
}

export async function getLastReportId(userId: string) {
    return await sb.get({
        url: '/reports/current-week',
        params: { userId },
        schema: z.number(),
    });
}

export async function getAllReports(filter: ReportFilter) {
    return await sb.get({
        url: '/reports/resumed',
        params: {
            userId: filter.userId,
            startDate: filter.startDate.toDateString(),
            endDate: filter.endDate.toDateString(),
            option: filter.option
        },
        schema: z.array(ResumedReportResultSchema)
    })
}
