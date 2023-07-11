import React, { useEffect, useState } from 'react';
import { IReport } from '@/Interfaces/report';
import db from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Button } from '@mui/material';
import { Eye, PencilSimple } from 'phosphor-react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { ListMagnifyingGlass } from '@phosphor-icons/react';
import { NoBackgroundButton } from '@/components/Buttons/Buttons';
import { getFormatedDate, getFormatedWeekInterval, stringToDate } from '@/hooks/DateService';
import { getWeek } from 'date-fns';

export default function ListReport() {
    const [reports, setReports] = useState<IReport[]>([]);
    const [name, setName] = useState("")

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

    useEffect(() => {
        setName(localStorage.getItem('userName') ?? "")
    }, [])

    return (
        <div className='flex h-screen w-full'>
            <div className='flex w-full h-full md:m-16 rounded-xl'>
                <div className='m-12 w-full'>
                    <PageHeader IconPage={ListMagnifyingGlass} title='Relatórios' subTitle='Todos os Reports aqui' goBackUrl='/home' />
                    <ul className='mt-10 w-full'>
                        {
                            reports.map((data) => (
                                <Link key={data.id} href={`/report/${data.id}`}>
                                    <li className='mb-4 bg-WHITE_PRINCIPAL rounded-lg p-2 w-full'
                                        key={data.id}>
                                        <div className='flex justify-between'>
                                            <div className='ml-4 flex gap-8 items-center'>
                                                <img src={data.userPhotoURL} className='w-10 h-10 rounded-full' />
                                                <div>
                                                    <p className='font-bold text-xl'>Week {getWeek(stringToDate(data.date))}</p>
                                                    <p className='text-GRAY text-s'>{getFormatedWeekInterval(data.date)}</p>
                                                    <p>{data.username}</p>
                                                </div>
                                            </div>
                                            <div className='flex items-center'>
                                                {name == data.username ?
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
                </div>
            </div>
        </div>
    );
};
