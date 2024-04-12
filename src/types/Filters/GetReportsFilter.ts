import { z } from "zod"

export const ReportFilterSchema = z.object({
    userId: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    option: z.enum(["onlyMine", "whoDoIFollow", "everyone"]),
    searchName: z.string()
})

export type ReportFilter = z.infer<typeof ReportFilterSchema>
