import { z } from "zod";
import { TaskDTOSchema } from "@/types/Entities/task";

export const CreateNewReportCommandSchema = z.object({
    userId: z.string(),
    tasks: z.array(TaskDTOSchema)
})

export type CreateNewReportCommand = z.infer<typeof CreateNewReportCommandSchema>;
