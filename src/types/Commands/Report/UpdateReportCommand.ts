import { z } from "zod";
import { TaskSchema } from "@/types/Entities/Task";

export const UpdateReportCommandSchema = z.object({
    id: z.number(),
    inserted: z.array(TaskSchema),
    modified: z.array(TaskSchema),
    deleted: z.array(TaskSchema)
})

export type UpdateReportCommand = z.infer<typeof UpdateReportCommandSchema>;
