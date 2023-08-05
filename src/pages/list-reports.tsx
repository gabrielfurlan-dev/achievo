import React, { useEffect, useState } from 'react';
import { IReport } from '@/Interfaces/Reports/IReport';
import db from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Eye, PencilSimple } from 'phosphor-react';
import Link from 'next/link';
import NavBar from '@/components/NavBar/NavBar';
import { ListMagnifyingGlass } from '@phosphor-icons/react';
import { NoBackgroundButton } from '@/components/Buttons';
import { getFormatedWeekInterval, stringToDate } from '@/hooks/DateService';
import { getWeek } from 'date-fns';
import PageLayout from '@/layouts/PageLayout';
import { useUserInfoStore } from '@/store/userStoreInfo';

export default function ListReport() {
    const [reports, setReports] = useState<IReport[]>([]);

    const { userInfo } = useUserInfoStore()

    useEffect(() => {
        const fetchReports = async () => {
            try {

                const reportsCollection = collection(db, "reports");
                const snapshot = await getDocs(reportsCollection);
                const reportsData = snapshot.docs.map((doc) => doc.data() as IReport);
                setReports(reportsData.sort((a, b) => stringToDate(b.date).getTime() - stringToDate(a.date).getTime()));

            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, []);

    return (
        <PageLayout>
            <NavBar IconPage={ListMagnifyingGlass} title='Relatórios' subTitle='Todos os Reports aqui' goBackUrl='/home' />
            <ul className='mt-10 w-full'>
                {
                    reports.map((data) => (
                        <Link key={data.id} href={`/report/${data.id}`}>
                            <li className='mb-4 bg-WHITE_PRINCIPAL dark:bg-DARK_BACKGROUND_SECONDARY rounded-lg p-2 w-full'
                                key={data.id}>
                                <div className='flex justify-between'>
                                    <div className='ml-4 flex gap-8 items-center  text-LIGHT_TEXT dark:text-DARK_TEXT'>
                                        <img src={data.userPhotoURL} className='w-10 h-10 rounded-full' />
                                        <div>
                                            <p className='font-bold text-xl'>Week {getWeek(stringToDate(data.date))}</p>
                                            <p>{getFormatedWeekInterval(data.date)}</p>
                                            <p>{data.username}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        {userInfo.name == data.username ?
                                            <NoBackgroundButton>
                                                <PencilSimple size={24} className='text-PRINCIPAL' />
                                            </NoBackgroundButton>
                                            :
                                            <NoBackgroundButton>
                                                <Eye size={24} className='text-PRINCIPAL' />
                                            </NoBackgroundButton>
                                        }
                                    </div>
                                </div>
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </PageLayout>
    );
};
