
import ProgressBar from "../../components/Buttons/LoginButton/goals/ProgressBar";
import CheckInput from "../../components/Buttons/LoginButton/goals/CheckInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { ICheckGoal, IProgressGoal } from "@/Interfaces/report";
import { InputText } from "@/components/Buttons/InputText";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "@/firebaseConfig";
import Swal from "sweetalert2";
import { ReadCvLogo } from "@phosphor-icons/react";
import { ArrowLeft, Plus } from "phosphor-react";

export default function EditReport() {
    const router = useRouter();
    const { id } = router.query;
    const [checkGoals, setCheckGoals] = useState<ICheckGoal[]>([]);
    const [progressGoals, setProgressGoals] = useState<IProgressGoal[]>([]);
    const [title, setTitle] = useState("");
    const [selectedDate, setSelectedDate] = useState<string>("");

    const getCurrentDate = (): string => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = String(currentDate.getMonth() + 1);
        let day = String(currentDate.getDate());

        if (month.length === 1) {
            month = '0' + month;
        }
        if (day.length === 1) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const docRef = doc(db, "reports/" + id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const reportData = docSnap.data();
                    console.log(reportData)
                    setTitle(reportData.username);
                    setSelectedDate(reportData.date);
                    setCheckGoals(reportData.checkGoals);
                    setProgressGoals(reportData.progressGoals);
                } else {
                    console.log("Documento não encontrado!");
                }
            } catch (error) {
                console.error("Erro ao buscar os dados do relatório:", error);
            }
        };

        if (id) {
            fetchReportData();
        }
    }, [id]);

    async function handleSaveReport() {
        try {
            const docRef = doc(db, "reports/" + id);
            await updateDoc(docRef, {
                username: title,
                date: selectedDate,
                checkGoals,
                progressGoals,
            });
            Swal.fire("Relatório atualizado com sucesso!", "", 'success');
        } catch (error) {
            Swal.fire("Erro ao salvar o relatório:", String(error), "error");
        }
    };

    async function handleDeleteReport() {
        try {
            await deleteDoc(doc(db, "reports/" + id));
            Swal.fire("Relatório deletado com sucesso!");
            router.push('/list-reports')
        } catch (error) {
            Swal.fire("Erro ao deletar o relatório", String(error), 'error');
        }
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    function handleAddCheckGoal() {
        setCheckGoals([...checkGoals, { id: checkGoals.length, title: "Check Goal", checked: false, indice: checkGoals.length }])
    }

    function handleAddProgressGoal() {
        setProgressGoals([...progressGoals, { id: progressGoals.length, title: "Check Goal", total: 0, value: 0, indice: progressGoals.length }])
    }

    return (
        <div className="w-4/6 m-auto mt-16">

            <div>
                <div className="flex gap-2">
                    <Button onClick={() => router.push('/list-reports')}><ArrowLeft size={32} /></Button>
                    <div id="Header">
                        <div className="flex gap-3">
                            <ReadCvLogo size={32} />
                            <div>
                                <h1 className="text-4xl font-bold">Week Report</h1>
                            </div>
                        </div>
                        <h2 className="text-2xl"><InputText placeHolder="Seu nome..." onChange={setTitle} value={title} /></h2>
                        <h3>
                            <input
                                type="date"
                                id="dateInput"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </h3>
                    </div>
                </div>
                <div id="Goals">
                    <div className="mt-12">
                        <h3 className="text-3xl font-bold">Metas</h3>
                        <div className="flex flex-col gap-2 mt-2 bg-gray-50 rounded-md p-4">
                            {Array.isArray(progressGoals) && progressGoals.map((goal) => (
                                <ProgressBar key={goal.id} id={goal.id} title={goal.title} total={goal.total} atualValue={goal.value} setProgressGoals={setProgressGoals} />
                            ))}
                            <div>
                                <Button onClick={handleAddProgressGoal}><Plus /></Button>
                            </div>
                            {Array.isArray(checkGoals) && checkGoals.map((goal) => (
                                <CheckInput key={goal.id} id={goal.id} title={goal.title} checked={goal.checked} setCheckGoals={setCheckGoals} />
                            ))}
                            <div>
                                <Button onClick={handleAddCheckGoal}><Plus /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-2">
                <button className="bg-green-400 p-2 rounded-lg text-white my-10" onClick={handleSaveReport} >Atualizar</button>
                <button className="bg-red-400 p-2 rounded-lg text-white my-10" onClick={handleDeleteReport} >Excluir</button>
            </div>

        </div>
    );
}
