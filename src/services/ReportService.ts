import { ICheckGoalRaw, IProgressGoalRaw } from "@/Interfaces/Reports/IReport";
import { ICreateCheckGoalCommand } from "@/pages/api/goals/check/create";
import { ICreateProgressGoalCommand } from "@/pages/api/goals/progress/create";
import { IResponseData } from "@/Interfaces/IResponseData";
import api from "@/lib/api";
import { ICreateReportCommand } from "@/pages/api/report/create";

interface ICreateReport {
    userRef: number,
    progressGoals: IProgressGoalRaw[];
    checkGoals: ICheckGoalRaw[];
}

export async function CreateReport({ userRef, progressGoals, checkGoals }: ICreateReport) {
    try {

        const report = await fetch(api.concat('/api/report/create'), {
            method: 'POST',
            body: JSON.stringify({
                userRef,
                checkGoals,
                progressGoals
            }as ICreateReportCommand ) ,
            headers: { 'Content-Type': 'application/json' }
        })

        return { success: true, message: "Relatório adicionado com sucesso.", data: report } as IResponseData;

    } catch (error) {
        return { success: true, message: `Erro ao adicionar o relatório.`, data: null } as IResponseData;
    }
}

// export async function ListReportService({ selectedDate, name: title, progressGoals, checkGoals }: createReportProps) {
//     try {
//         let docRef = await addDoc(collection(firebaseConfig, "reports"), { date: selectedDate, title, progresGoals: progressGoals, checkGoal: checkGoals })
//         return docRef.id
//     } catch (error) {
//         console.log(`Erro: ${error}`)
//     }
// }

// export async function GetReportById(id: String | string[] | undefined, db: Firestore) {
//     try {
//         const docRef = doc(db, "reports/" + id);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//             return docSnap.data() as IReport
//         } else {
//             console.log("Documento não encontrado!");
//         }
//     } catch (error) {
//         console.error("Erro ao buscar os dados do relatório:", error);
//     }
// }

// export async function UpdateReport(id: String | string[] | undefined, db: Firestore, report: IReport) {
//     try {
//         const docRef = doc(db, "reports/" + id);

//         await updateDoc(docRef, {
//             username: report.username,
//             date: report.date,
//             checkGoals: report.checkGoals,
//             progressGoals: report.progressGoals,
//         });

//         return { data: "Relatório atualizado com sucesso!", error: "", type: 'success' };
//     } catch (error) {
//         return { data: "Erro ao salvar o relatório:", error: String(error), type: "error" };
//     }
// }
