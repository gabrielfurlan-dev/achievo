import { db } from "@/db";

export interface ICreateProgressGoalCommand {
    goals: [
        {
            reportId: number;
            title: string;
            index: number;
            value: number;
            total: number;
        }
    ];
}

export default async function handler({ goals }: ICreateProgressGoalCommand) {
    try {
        await db.progressGoal.createMany({
            data: goals.map(goal => ({
                title: goal.title,
                index: goal.index,
                total: goal.total,
                value: goal.value,
                reportId: goal.reportId,
            })),
        });

        return {
            data: "Relatório adicionado com sucesso!",
            error: "",
            type: "success",
        };
    } catch (error) {
        return {
            data: "Erro ao adicionar o relatório:",
            error: String(error),
            type: "error",
        };
    }
}
