import ProgressBar from "../components/Buttons/LoginButton/goals/ProgressBar";
import CheckInput from "../components/Buttons/LoginButton/goals/CheckInput";
import { ReadCvLogo } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Flag } from "phosphor-react";
import { AddCheckGoal } from "@/components/Buttons/LoginButton/goals/AddCheckGoal";
import { IReport, ICheckGoal, IProgressGoal } from "@/Interfaces/report";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import firebaseConfig from "@/firebaseConfig";
import { useRouter } from "next/router";

export default function App() {
    const router = useRouter()

    // const idReport = typeof router.query.idReport === 'string' ? router.query.idReport : '';
    const idReport = "reports"

    const [checkGoals, setCheckGoals] = useState<ICheckGoal[] | null>([])
    const [progressGoals, setProgressGoals] = useState<IProgressGoal[] | null>([])

    console.log(idReport);

    try {
        const fetchReports = async () => {
            const docRef = doc(collection(firebaseConfig, "reports"), idReport);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const reportData = { id: Number(docSnapshot.id), ...docSnapshot.data() } as IReport;

                if (!reportData.reportContent) return;

                const { checkGoals, progressGoals } = reportData.reportContent;
                setCheckGoals(checkGoals);
                setProgressGoals(progressGoals);
            } else { }
        }

        const updateCheckGoals = async () => {
            try {
                const docRef = doc(firebaseConfig, "reports", idReport);
                await setDoc(docRef, {
                    reportContent: {
                        checkGoals: checkGoals
                    }
                }, { merge: true });

                console.log("Check goal added successfully to Firestore!");

            } catch (error) {
                console.error("Error adding check goal to Firestore:", error);
            }
        }

        useEffect(() => {
            fetchReports();
        }, [])

        useEffect(() => {
            updateCheckGoals()
            fetchReports()
        }, [])

    } catch (error) {

    }

    // if (!report) {
    //     return <p className="text-center justify-center items-center">Loading...</p>;
    // }

    return (
        <div className="w-4/6 m-auto mt-16">

            <div id="Header">
                <div className="flex gap-3">
                    <ReadCvLogo size={32} />
                    <div>
                        <h1 className="text-4xl font-bold">Week Report</h1>
                    </div>
                </div>
                <h2 className="text-2xl"><input type="Name" placeholder="Seu nome..." /></h2>
                <h3><input type="date" name="" id="" /></h3>
            </div>

            <div id="Goals">

                <div className="mt-12">
                    <h3 className="text-3xl font-bold">Metas</h3>

                    <div className="flex flex-col gap-2 mt-2 bg-gray-50 rounded-md p-4">

                        {Array.isArray(progressGoals) && progressGoals.map((goal) => (
                            <ProgressBar key={goal.id} title={goal.title} total={goal.total} atualValue={goal.value} />
                        ))}

                        {Array.isArray(checkGoals) && checkGoals.map((goal) => (
                            <CheckInput key={goal.id} title={goal.title} checked={goal.checked} />
                        ))}

                    </div>

                </div>

                <div className="mt-2 gap-2 flex">
                    <AddCheckGoal goal={checkGoals} setGoal={setCheckGoals}/>
                    <div className="bg-CINZA rounded-md"><Button><Flag size={24} color="#111" /></Button></div>
                </div>
            </div>
        </div>
    );
}

