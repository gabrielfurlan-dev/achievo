import ProgressGoal from "../components/Buttons/LoginButton/goals/ProgressGoal/ProgressGoal";
import CheckInput from "../components/Buttons/LoginButton/goals/CheckInput";
import { ReadCvLogo } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ArrowLeft, Plus } from "phosphor-react";
import { ICheckGoal, IProgressGoal } from "@/Interfaces/report";
import { useRouter } from "next/router";
import { InputField } from "@/components/Buttons/InputField";
import { CreateReport } from "@/hooks/ReportService";
import Swal from "sweetalert2";
import PageHeader from "@/components/PageHeader";

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
    const [selectedDate, setSelectedDate] = useState<string>('');
    const name = localStorage.getItem('userName')

    useEffect(() => {
        setSelectedDate(getCurrentDate())
    }, [])

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    function handleAddCheckGoal() {
        setCheckGoals([...checkGoals, { id: checkGoals.length, title: "Check Goal", checked: false, indice: checkGoals.length }])
    }

    function handleAddProgressGoal() {
        setProgressGoals([...progressGoals, { id: progressGoals.length, title: "Check Goal", total: 0, value: 0, indice: progressGoals.length }])
    }

    async function handleSaveReport() {
        const idReport = await CreateReport({ selectedDate, title: name ?? "", progressGoals, checkGoals })
        Swal.fire('Good Job!', 'Relatório adicionado com sucesso!', 'success')
        router.push('/home')
    }

    return (
        <div className="w-4/6 m-auto mt-16">

            <div>
                <div className="gap-2">
                    <PageHeader/>
                    <div id="Header">
                        <h2 className="text-2xl">{name}</h2>
                        <h3 className="w-36">
                            <InputField onChange={handleDateChange} value={selectedDate} type="date" noBackground />
                        </h3>
                    </div>
                </div>

                <div id="Goals">
                    <div className="mt-12">
                        <h3 className="text-3xl font-bold">Metas</h3>
                        <div className="flex flex-col gap-2 mt-2 bg-gray-50 rounded-md p-4">
                            {Array.isArray(progressGoals) && progressGoals.map((goal) => (
                                <ProgressGoal key={goal.id} progressGoal={goal} setProgressGoals={setProgressGoals} />
                            ))}
                            <div>
                                <Button onClick={handleAddProgressGoal} className="w-full">
                                    <div className="flex gap-2 items-center">
                                        <Plus />
                                        <p>Progress Goal</p>
                                    </div></Button>
                            </div>
                            {Array.isArray(checkGoals) && checkGoals.map((goal) => (
                                <CheckInput key={goal.id} id={goal.id} title={goal.title} checked={goal.checked} setCheckGoals={setCheckGoals} />
                            ))}
                            <div>
                                <Button onClick={handleAddCheckGoal} className="w-full">
                                    <div className="flex gap-2 items-center">
                                        <Plus />
                                        <p>CheckGoal</p>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <button
                    className="bg-green-400 p-2 rounded-lg text-white my-10"
                    onClick={handleSaveReport}
                >
                    Salvar
                </button>
            </div>

        </div>
    );
}

