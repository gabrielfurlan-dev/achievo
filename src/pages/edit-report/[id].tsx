
import ProgressGoal from "../../components/Buttons/LoginButton/goals/ProgressGoal/ProgressGoal";
import CheckInput from "../../components/Buttons/LoginButton/goals/CheckGoal/CheckInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ICheckGoal, IProgressGoal } from "@/Interfaces/report";
import { InputField } from "@/components/Buttons/InputField";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "@/firebaseConfig";
import Swal from "sweetalert2";
import { ReadCvLogo } from "@phosphor-icons/react";
import { Plus } from "phosphor-react";
import { ConfirmButton, NoBackgroundButton } from "@/components/Buttons/Buttons";
import PageHeader from "@/components/PageHeader";
import Modal from "@/components/Modal";

export default function EditReport() {
    const router = useRouter();
    const { id } = router.query;

    const [name, setName] = useState("");
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [isOwner, setIsOwner] = useState(true)
    const [checkGoals, setCheckGoals] = useState<ICheckGoal[]>([]);
    const [progressGoals, setProgressGoals] = useState<IProgressGoal[]>([]);

    const [originalCheckGoals, setOriginalCheckGoals] = useState<ICheckGoal[]>([]);
    const [originalProgressGoals, setOriginalProgressGoals] = useState<IProgressGoal[]>([]);
    const [modified, setModified] = useState(false);
    const [forceCancel, setForceCancel] = useState(false);

    const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal

    async function handleCancel(force: boolean) {
        await setForceCancel(force)
        await router.push('/list-reports')
    }

    useEffect(() => {
        let checkGoalsIsChanged = JSON.stringify(checkGoals) !== JSON.stringify(originalCheckGoals);
        let progressGoalsIsChanged = JSON.stringify(progressGoals) !== JSON.stringify(originalProgressGoals);

        setModified(checkGoalsIsChanged || progressGoalsIsChanged);
    }, [progressGoals, checkGoals]);

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
                    setIsOwner(localStorage.getItem('userName') == reportData.username)

                    setOriginalCheckGoals(reportData.checkGoals);
                    setOriginalProgressGoals(reportData.progressGoals);
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
                username: name,
                date: selectedDate,
                checkGoals: checkGoals,
                progressGoals: progressGoals,
            });
            setOriginalCheckGoals(checkGoals)
            setOriginalProgressGoals(progressGoals)

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
        setCheckGoals([...checkGoals, { id: checkGoals.length, title: "", checked: false, indice: checkGoals.length }])
    }

    function handleAddProgressGoal() {
        setProgressGoals([...progressGoals, { id: progressGoals.length, title: "", total: 0, value: 0, indice: progressGoals.length }])
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
                    <PageHeader IconPage={ReadCvLogo} title="Weekly Report" goBackUrl="/list-reports">
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
                                <ConfirmButton onClick={handleSaveReport}>Atualizar</ConfirmButton>
                            </div>
                        }
                    </div>
                </div>
            </div >
        </div >
    );
}
