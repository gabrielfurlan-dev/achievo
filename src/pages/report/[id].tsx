
import ProgressGoal from "../../components/Buttons/LoginButton/goals/ProgressGoal/ProgressGoal";
import CheckInput from "../../components/Buttons/LoginButton/goals/CheckGoal/CheckInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ICheckGoal, IProgressGoal, IReport } from "@/Interfaces/report";
import { InputField } from "@/components/Buttons/InputField";
import { doc, deleteDoc } from "firebase/firestore";
import db from "@/firebaseConfig";
import Swal from "sweetalert2";
import { ReadCvLogo } from "@phosphor-icons/react";
import { Plus } from "phosphor-react";
import { ConfirmButton, NoBackgroundButton } from "@/components/Buttons/Buttons";
import PageHeader from "@/components/PageHeader";
import Modal from "@/components/Modal";
import { GetReportById, UpdateReport, CreateReport } from '@/hooks/ReportService'
import { getCurrentDate, getWeekInterval, stringToDate, getFormatedWeekInterval } from "@/hooks/DateService";
import { getWeek } from "date-fns";


export default function EditReport() {
    const router = useRouter();

    const { id } = router.query;
    const [name, setName] = useState("");
    const [userPhotoURL, setUserPhotoURL] = useState("")
    const [isOwner, setIsOwner] = useState(true)
    const [isNew, setIsNew] = useState(false)
    const [modified, setModified] = useState(false);
    const [forceCancel, setForceCancel] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [selectedDate, setSelectedDate] = useState<string>("");
    const [weekInterval, setWeekInterval] = useState<string>("");

    const [checkGoals, setCheckGoals] = useState<ICheckGoal[]>([]);
    const [progressGoals, setProgressGoals] = useState<IProgressGoal[]>([]);

    const [originalCheckGoals, setOriginalCheckGoals] = useState<ICheckGoal[]>([]);
    const [originalProgressGoals, setOriginalProgressGoals] = useState<IProgressGoal[]>([]);

    useEffect(() => {
        if (id == 'new') {
            setIsNew(true)
            setName(localStorage.getItem('userName') ?? "")
            setUserPhotoURL(localStorage.getItem('userPhotoURL') ?? "")
            setSelectedDate(getCurrentDate())
        }
        else {
            setReportData();
        }
    }, [id]);

    useEffect(() => {
        setWeekInterval(getFormatedWeekInterval(selectedDate))
    }, [selectedDate])

    useEffect(() => {
        let checkGoalsIsChanged = JSON.stringify(checkGoals) !== JSON.stringify(originalCheckGoals);
        let progressGoalsIsChanged = JSON.stringify(progressGoals) !== JSON.stringify(originalProgressGoals);

        setModified(checkGoalsIsChanged || progressGoalsIsChanged);
    }, [progressGoals, checkGoals, originalProgressGoals, originalCheckGoals]);

    useEffect(() => {

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (modified && !forceCancel) {
                event.preventDefault();
                event.returnValue = 'Você tem alterações não salvas. Tem certeza que deseja sair?';
            }
        };

        const handleRouteChangeStart = (url: string) => {
            if ((modified && !forceCancel) && router.asPath !== url) {
                setShowModal(true);
                router.events.emit('routeChangeError');
                throw 'routeChange aborted.';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        router.events.on('routeChangeStart', handleRouteChangeStart);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            router.events.off('routeChangeStart', handleRouteChangeStart);
        };

    }, [modified, router, forceCancel]);

    function handleAddCheckGoal() {
        setCheckGoals([...checkGoals, { id: checkGoals.length, title: "Sem título", checked: false, indice: checkGoals.length }])
    }

    function handleAddProgressGoal() {
        setProgressGoals([...progressGoals, { id: progressGoals.length, title: "Sem título", total: 0, value: 0, indice: progressGoals.length }])
    }

    async function handleCancel(force: boolean) {
        await setForceCancel(force)

        if (isNew)
            await router.push('/home')
        else
            await router.push('/list-reports')
    }

    async function handleSaveReport() {

        let sucess: { data: string; error: string; type: string; }

        if (isNew)
            sucess = await CreateReport({ selectedDate, name, progressGoals, checkGoals, userPhotoURL })
        else
            sucess = await UpdateReport(id, db, { username: name, date: selectedDate, checkGoals, progressGoals } as IReport)

        if (sucess.type == 'success') {
            setOriginalCheckGoals(checkGoals)
            setOriginalProgressGoals(progressGoals)
        }

        await Swal.fire(sucess.data, sucess.error, sucess.error == "" ? 'success' : 'error')

        handleCancel(false)
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

    async function setReportData() {
        const reportData = await GetReportById(id, db)

        if (reportData) {
            setName(reportData.username);
            setSelectedDate(reportData.date);
            setCheckGoals(reportData.checkGoals);
            setProgressGoals(reportData.progressGoals);
            setIsOwner(localStorage.getItem('userName') == reportData.username)
            setOriginalCheckGoals(reportData.checkGoals);
            setOriginalProgressGoals(reportData.progressGoals);
        }
    }

    return (
        <div className="w-5/6 md:w-4/6 mx-auto flex flex-col justify-between min-h-screen">
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                handleSaveButton={() => handleCancel(true)}
                title="Alterações não salvas"
                hideDelete
                cancelText="Não"
                confirmText="Sim"
            >
                <p>Você possuí alterações não salvas.</p>
                <p>Deseja mesmo descartá-las?</p>
            </Modal>


            <div className="h-full flex flex-col justify-between my-12 md:my-16">
                <div>
                    <PageHeader IconPage={ReadCvLogo} title={'Week ' + getWeek(stringToDate(selectedDate))} goBackUrl="/list-reports">
                        <div className="flex flex-col w-full">
                            <InputField type="text" onChange={() => { }} value={weekInterval} noBackground widhtAuto disabled noPadding />
                            <h2 className="text-xl">{name}</h2>
                        </div>
                    </PageHeader>

                    <div id="Goals">
                        <div className="mt-12">
                            <div className="flex flex-col gap-10 mt-2">
                                <div className="rounded-md p-4">
                                    <div className="flex justify-between mb-2">
                                        <p className="text-2xl font-bold">Progresso</p>
                                        {isOwner && <NoBackgroundButton onClick={handleAddProgressGoal} className="w-full"><Plus /></NoBackgroundButton>}
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {
                                            progressGoals.length ?
                                                Array.isArray(progressGoals) && progressGoals.map((goal) => (
                                                    <ProgressGoal
                                                        key={goal.id}
                                                        progressGoal={goal}
                                                        setProgressGoals={setProgressGoals}
                                                        disabled={!isOwner}
                                                    />
                                                )) :
                                                <div className="p-2 px-4 rounded-md flex justify-center w-full bg-WHITE_PRINCIPAL">
                                                    <div className="flex items-center">
                                                        {isOwner ? (<p className="flex">Adicione um progresso no icone"<Plus className="text-GRAY_DARK" />"</p>)
                                                            : <p>Sem metas de progresso</p>
                                                        }
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className="  rounded-md p-4">
                                    <div className="flex justify-between mb-2">
                                        <p className="text-2xl font-bold">Check List</p>
                                        {isOwner && <NoBackgroundButton onClick={handleAddCheckGoal} className="w-full"><Plus /></NoBackgroundButton>}
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {
                                            checkGoals.length ?
                                                Array.isArray(checkGoals) && checkGoals.map((goal) => (
                                                    <CheckInput
                                                        key={goal.id}
                                                        checkGoal={goal}
                                                        setCheckGoals={setCheckGoals}
                                                        disabled={!isOwner}
                                                    />
                                                )) :
                                                <div className="p-2 px-4 rounded-md flex justify-center w-full bg-WHITE_PRINCIPAL">
                                                    {isOwner ? (<p className="flex">Adicione um <i>check goal&nbsp;</i> no icone "<Plus className="text-GRAY_DARK" />"</p>)
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
                        <NoBackgroundButton onClick={() => handleCancel(false)} >
                            <p>Cancelar</p>
                        </NoBackgroundButton>
                        {isOwner &&
                            <div className="w-36">
                                <ConfirmButton onClick={handleSaveReport}>{isNew ? 'Adicionar' : 'Atualizar'}</ConfirmButton>
                            </div>
                        }
                    </div>
                </div>
            </div >
        </div >
    );
}
