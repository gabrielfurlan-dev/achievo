import { progressGoalRawSchema } from './progressGoalRaw';
import z from "zod";

const progressGoalSchema = progressGoalRawSchema.extend({
    reportId: z.number(),
    updatedDate: z.date(),
    id: z.number(),
})

export type progressGoal = z.infer<typeof progressGoalSchema>;
