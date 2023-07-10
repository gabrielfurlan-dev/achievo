import { ICheckGoal, IProgressGoal, IReport } from "@/Interfaces/report";
import firebaseConfig from "@/firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, getDoc, Firestore } from "firebase/firestore";

type createReportProps = {
    selectedDate: string;
    name: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    userPhotoURL: string;
}

export async function CreateReport({ selectedDate, name, progressGoals, checkGoals, userPhotoURL }: createReportProps) {
    try {
        const reportData: IReport = {
            id: Date.now().toString(),
            date: selectedDate,
            username: name,
            progressGoals,
            checkGoals,
            userPhotoURL
        };

        const collectionRef = collection(firebaseConfig, "reports");
        const docRef = await addDoc(collectionRef, reportData);
        const docId = docRef.id;
        const docToUpdate = doc(collectionRef, docId);

        await updateDoc(docToUpdate, { id: docId });

        return { data: "Relatório adicionado com sucesso!", error: "", type: 'success' };

    } catch (error) {
        return { data: "Erro ao adicionar o relatório:", error: String(error), type: "error" };
    }
}

export async function ListReportService({ selectedDate, name: title, progressGoals, checkGoals }: createReportProps) {

    try {
        let docRef = await addDoc(collection(firebaseConfig, "reports"), { date: selectedDate, title, progresGoals: progressGoals, checkGoal: checkGoals })
        return docRef.id
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

export async function GetReportById(id: String | string[] | undefined, db: Firestore) {
    try {
        const docRef = doc(db, "reports/" + id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as IReport
        } else {
            console.log("Documento não encontrado!");
        }
    } catch (error) {
        console.error("Erro ao buscar os dados do relatório:", error);
    }
}

export async function UpdateReport(id: String | string[] | undefined, db: Firestore, report: IReport) {
    try {
        const docRef = doc(db, "reports/" + id);

        await updateDoc(docRef, {
            username: report.username,
            date: report.date,
            checkGoals: report.checkGoals,
            progressGoals: report.progressGoals,
        });

        return { data: "Relatório atualizado com sucesso!", error: "", type: 'success' };
    } catch (error) {
        return { data: "Erro ao salvar o relatório:", error: String(error), type: "error" };
    }
}
