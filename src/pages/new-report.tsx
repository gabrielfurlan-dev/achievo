import ProgressGoal from "../components/Buttons/LoginButton/goals/ProgressGoal/ProgressGoal";
import CheckInput from "../components/Buttons/LoginButton/goals/CheckGoal/CheckInput";
import { ReadCvLogo } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Plus } from "phosphor-react";
import { ICheckGoal, IProgressGoal } from "@/Interfaces/report";
import { useRouter } from "next/router";
import { InputField } from "@/components/Buttons/InputField";
import { CreateReport } from "@/hooks/ReportService";
import Swal from "sweetalert2";
import PageHeader from "@/components/PageHeader";
import { ConfirmButton, NoBackgroundButton } from "@/components/Buttons/Buttons";

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

export default function NewReport() {

    const router = useRouter()
    const [checkGoals, setCheckGoals] = useState<ICheckGoal[]>([])
    const [progressGoals, setProgressGoals] = useState<IProgressGoal[]>([])
    const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());
    const [name, setName] = useState("")
    const [userPhotoURL, setUserPhotoURL] = useState("")


    useEffect(() => {
        setName(localStorage.getItem('userName') ?? "")
        setUserPhotoURL(localStorage.getItem('userPhotoURL') ?? "")
    }, [])

    function handleAddCheckGoal() {
        setCheckGoals([...checkGoals, { id: checkGoals.length, title: "Check Goal", checked: false, indice: checkGoals.length }])
    }

    function handleAddProgressGoal() {
        setProgressGoals([...progressGoals, { id: progressGoals.length, title: "Check Goal", total: 0, value: 0, indice: progressGoals.length }])
    }

    async function handleSaveReport() {
        const idReport = await CreateReport({ selectedDate, title: name ?? "", progressGoals, checkGoals, userPhotoURL })
        Swal.fire('Good Job!', 'Relatório adicionado com sucesso!', 'success')
        router.push('/home')
    }

    return (
        <div className="w-5/6 md:w-4/6 mx-auto flex flex-col justify-between min-h-screen">
            <div className="h-full flex flex-col justify-between my-12 md:my-16">
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
                                <div className="  rounded-md p-4">
                                    <div className="flex justify-between mb-2">
                                        <p className="text-2xl font-bold">Progresso</p>
                                        <NoBackgroundButton onClick={handleAddProgressGoal} className="w-full"><Plus /></NoBackgroundButton>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {
                                            progressGoals.length ?
                                                Array.isArray(progressGoals) && progressGoals.map((goal) => (
                                                    <ProgressGoal
                                                        key={goal.id}
                                                        progressGoal={goal}
                                                        setProgressGoals={setProgressGoals}
                                                    />
                                                )) :
                                                <div className="p-2 px-4 rounded-md flex justify-center w-full bg-WHITE_PRINCIPAL">
                                                    <p className="flex items-center">Adicione um check goal no icone "<Plus className="text-GRAY_DARK" />"</p>
                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className="  rounded-md p-4">
                                    <div className="flex justify-between mb-2">
                                        <p className="text-2xl font-bold">Check List</p>
                                        <NoBackgroundButton onClick={handleAddCheckGoal} className="w-full"><Plus /></NoBackgroundButton>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {
                                            checkGoals.length ?
                                                Array.isArray(checkGoals) && checkGoals.map((goal) => (
                                                    <CheckInput
                                                        key={goal.id}
                                                        checkGoal={goal}
                                                        setCheckGoals={setCheckGoals}
                                                    />
                                                )) :
                                                <div className="p-2 px-4 rounded-md flex justify-center w-full bg-WHITE_PRINCIPAL">
                                                    <p className="flex items-center">Adicione um progresso no icone "<Plus className="text-GRAY_DARK" />"</p>
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
                        <div className="w-36"><ConfirmButton onClick={handleSaveReport}>Salvar</ConfirmButton>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
