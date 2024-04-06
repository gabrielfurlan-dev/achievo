import { z } from "zod";
import { TaskSchema } from "@/types/Entities/Task";

export const CreateNewReportCommandSchema = z.object({
    userId: z.string(),
    tasks: z.array(TaskSchema)
})

export type CreateNewReportCommand = z.infer<typeof CreateNewReportCommandSchema>;
