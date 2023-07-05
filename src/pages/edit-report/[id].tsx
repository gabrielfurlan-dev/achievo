
import ProgressGoal from "../../components/Buttons/LoginButton/goals/ProgressGoal/ProgressGoal";
import CheckInput from "../../components/Buttons/LoginButton/goals/CheckGoal/CheckInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { ICheckGoal, IProgressGoal } from "@/Interfaces/report";
import { InputField } from "@/components/Buttons/InputField";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "@/firebaseConfig";
import Swal from "sweetalert2";
import { ReadCvLogo } from "@phosphor-icons/react";
import { ArrowLeft, Plus } from "phosphor-react";
import { ConfirmButton, NoBackgroundButton } from "@/components/Buttons/Buttons";
import PageHeader from "@/components/PageHeader";

export default function EditReport() {
    const router = useRouter();
    const { id } = router.query;
    const [checkGoals, setCheckGoals] = useState<ICheckGoal[]>([]);
    const [progressGoals, setProgressGoals] = useState<IProgressGoal[]>([]);
    const [name, setName] = useState("");
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [userName, setUserName] = useState("")

    useEffect(() => {
        setUserName(localStorage.getItem('userName') ?? "")
    }, [])

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const docRef = doc(db, "reports/" + id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const reportData = docSnap.data();
                    console.log(reportData)
                    setName(reportData.username);
                    setSelectedDate(reportData.date);
                    setCheckGoals(reportData.checkGoals);
                    setProgressGoals(reportData.progressGoals);
                    console.log(reportData.checkGoals)
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

        console.log(checkGoals)

        try {
            const docRef = doc(db, "reports/" + id);
            await updateDoc(docRef, {
                username: name,
                date: selectedDate,
                checkGoals: checkGoals,
                progressGoals: progressGoals,
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

    function handleAddCheckGoal() {
        setCheckGoals([...checkGoals, { id: checkGoals.length, title: "Check Goal", checked: false, indice: checkGoals.length }])
    }

    function handleAddProgressGoal() {
        setProgressGoals([...progressGoals, { id: progressGoals.length, title: "Check Goal", total: 0, value: 0, indice: progressGoals.length }])
    }

    return (
        <div className="w-5/6 md:w-4/6 mx-auto flex flex-col justify-between min-h-screen">
            <div className="h-full flex flex-col justify-between my-4 md:my-16">
                <div>
                    <PageHeader IconPage={ReadCvLogo} title="Weekly Report">
                        <div id="Header">
                            <h2 className="text-xl">{name}</h2>
                            <InputField onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} type="date" noBackground widhtAuto disabled noPadding />
                        </div>
                    </PageHeader>

                    <div id="Goals">
                        <div className="mt-12">
                            <div className="flex flex-col gap-10 mt-2">
                                <div className="rounded-md p-4">
                                    <div className="flex justify-between mb-2">
                                        <p className="text-2xl font-bold">Check List</p>
                                        <NoBackgroundButton onClick={handleAddProgressGoal} className="w-full"><Plus /></NoBackgroundButton>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {
                                            progressGoals.length ?
                                                Array.isArray(progressGoals) && progressGoals.map((goal) => (
                                                    <ProgressGoal key={goal.id} progressGoal={goal} setProgressGoals={setProgressGoals} />
                                                )) :
                                                <div className="p-2 px-4 rounded-md flex justify-center w-full bg-WHITE_PRINCIPAL">
                                                    <div className="flex items-center">
                                                        {name == userName ? (<p className="flex">Adicione um progresso no icone"<Plus className="text-GRAY_DARK" />"</p>)
                                                            : <p>Sem metas de progresso</p>
                                                        }
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className="  rounded-md p-4">
                                    <div className="flex justify-between mb-2">
                                        <p className="text-2xl font-bold">Progresso</p>
                                        <NoBackgroundButton onClick={handleAddCheckGoal} className="w-full"><Plus /></NoBackgroundButton>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {
                                            checkGoals.length ?
                                                Array.isArray(checkGoals) && checkGoals.map((goal) => (
                                                    <CheckInput key={goal.id} checkGoal={goal} setCheckGoals={setCheckGoals} />
                                                )) :
                                                <div className="p-2 px-4 rounded-md flex justify-center w-full bg-WHITE_PRINCIPAL">
                                                    {name != userName ? (<p className="flex">Adicione um <i>check goal&nbsp;</i> no icone "<Plus className="text-GRAY_DARK" />"</p>)
                                                        : <p>Sem metas de <i>check</i></p>
                                                    }
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-10">
                    <div className="flex gap-2 px-4">
                        <NoBackgroundButton onClick={() => router.push('/home')} >
                            <p>Cancelar</p>
                        </NoBackgroundButton>
                        {name == userName &&
                            <div className="w-36">
                                <ConfirmButton onClick={handleSaveReport}>Atualizar</ConfirmButton>
                            </div>
                        }
                    </div>
                </div>
            </div >
        </div >
    );
}
