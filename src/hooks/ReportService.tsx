import { ICheckGoal, IProgressGoal, IReport } from "@/Interfaces/report";
import firebaseConfig from "@/firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";

type createReportProps = {
    selectedDate: string;
    title: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    userPhotoURL: string;
}

export async function CreateReport({ selectedDate, title, progressGoals, checkGoals, userPhotoURL }: createReportProps) {
    try {
        const reportData: IReport = {
            id: Date.now().toString(),
            date: selectedDate,
            username: title,
            progressGoals,
            checkGoals,
            userPhotoURL
        };

        const collectionRef = collection(firebaseConfig, "reports");

        // Adiciona o documento ao Firestore
        const docRef = await addDoc(collectionRef, reportData);

        // Obtém o ID gerado pelo Firestore
        const docId = docRef.id;

        // Atualiza o documento com o ID
        const docToUpdate = doc(collectionRef, docId);
        await updateDoc(docToUpdate, { id: docId });

        return docId;

    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

export async function ListReportService({ selectedDate, title, progressGoals, checkGoals }: createReportProps) {

    try {
        let docRef = await addDoc(collection(firebaseConfig, "reports"), { date: selectedDate, title, progresGoals: progressGoals, checkGoal: checkGoals })
        return docRef.id
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

export async function UpdateReport(id: string, reportData: Partial<IReport>) {
    const reportRef = doc(firebaseConfig, "reports", id);

    try {
      await updateDoc(reportRef, reportData);
    } catch (error) {
      console.error("Erro ao atualizar o relatório:", error);
      throw error;
    }
  }

  export async function GetReportById(id: string): Promise<IReport | null> {
    const reportRef = doc(firebaseConfig, "reports", id);

    try {
      const reportSnapshot = await getDoc(reportRef);

      if (reportSnapshot.exists()) {
        const reportData = reportSnapshot.data() as IReport;
        return { ...reportData };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao obter o relatório pelo ID:", error);
      throw error;
    }
  }
