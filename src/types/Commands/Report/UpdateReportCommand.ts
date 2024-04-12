import { z } from "zod";
import { TaskDTOSchema } from "@/types/Entities/task";

export const UpdateReportCommandSchema = z.object({
    id: z.number(),
    inserted: z.array(TaskDTOSchema),
    modified: z.array(TaskDTOSchema),
    deleted: z.array(TaskDTOSchema)
})

export type UpdateReportCommand = z.infer<typeof UpdateReportCommandSchema>;
