import React, { useEffect, useState } from 'react';
import { IReport } from '@/Interfaces/report';
import db from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Button } from '@mui/material';
import { Eye, PencilSimple } from 'phosphor-react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { ListMagnifyingGlass } from '@phosphor-icons/react';
import { format, parseISO } from 'date-fns';

export default function ListReport() {
    const [reports, setReports] = useState<IReport[]>([]);
    const [name, setName] = useState("")

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const reportsCollection = collection(db, "reports");
                const snapshot = await getDocs(reportsCollection);
                const reportsData = snapshot.docs.map((doc) => doc.data() as IReport);
                setReports(reportsData);
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
                    <PageHeader IconPage={ListMagnifyingGlass} title='Relatórios' subTitle='Todos os Reports aqui' />
                    <ul className='mt-10 w-full'>
                        {
                        reports.sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime()).map((data) => (
                            <li className='mb-10 bg-WHITE_PRINCIPAL rounded-lg p-2 w-full'
                                key={data.id}>
                                <div className='flex justify-between'>
                                    <div className='ml-4 flex gap-4'>
                                        <img src={data.userPhotoURL} className='w-12 h-12 rounded-full' />
                                        <div>
                                            <p>{format(parseISO(data.date), 'dd/MM/yyyy')}</p>
                                            <p>{data.username}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        {name == data.username ?
                                            <Link href={`/edit-report/${data.id}`}>
                                                <Button>
                                                    <PencilSimple size={24} className='text-PRINCIPAL' />
                                                </Button>
                                            </Link>
                                            :
                                            <Link href={`/edit-report/${data.id}`}>
                                                <Button>
                                                    <Eye size={24} className='text-PRINCIPAL' />
                                                </Button>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
