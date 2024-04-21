import z from "zod";

const createReportSchema = z.object({

});

const createReport = createReportSchema.safeParse({

});

export type createReport = z.infer<typeof createReportSchema>;
