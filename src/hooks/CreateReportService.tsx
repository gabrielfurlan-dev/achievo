import firebaseConfig from "@/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default async function CreateReportService() {

    try {
        let docRef = await addDoc(collection(firebaseConfig, "reports"), {} )
        return docRef.id
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}
