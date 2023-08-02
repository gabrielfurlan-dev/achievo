import { ICheckGoal, IProgressGoal, IReport } from "@/Interfaces/report";
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

type createReportProps = {
    selectedDate: string;
    userRef: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    userPhotoURL: string;
}

export async function CreateReport({ selectedDate, userRef, progressGoals, checkGoals, userPhotoURL }: createReportProps) {
    try {

        checkGoals.forEach(async goal => {
            await prisma.checkGoal.create({
                data: {
                    index: goal.indice,
                    title: goal.title,
                    checked: goal.checked,
                }
            })
        });

        const report = await prisma.report.create({
            data: {
                user: {

                }
            }
        })

        return { data: "Relatório adicionado com sucesso!", error: "", type: 'success' };

    } catch (error) {
        return { data: "Erro ao adicionar o relatório:", error: String(error), type: "error" };
    }
}
