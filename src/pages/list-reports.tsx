import React, { useEffect, useState } from 'react';
import { IReport, IProgressGoal, ICheckGoal } from '@/Interfaces/report';
import db from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Button } from '@mui/material';
import { ArrowLeft, PencilSimple } from 'phosphor-react';
import Link from 'next/link';
import router from 'next/router';

export default function ListReport() {
    const [reports, setReports] = useState<IReport[]>([]);

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

    return (
        <div className='flex h-screen w-full'>
            <div className='flex bg-slate-100 w-full h-full m-16 rounded-xl'>
                <div className='m-12 w-full'>
                    <div className='flex items-center gap-2'>
                        <Button onClick={() => router.push('/home')}><ArrowLeft size={32}/></Button>
                        <p className='text-3xl'>Reports</p>
                    </div>
                    <ul className='mt-4 w-full'>
                        {reports.map((data) => (
                            <li className='mb-10 bg-white rounded-lg p-2 w-full'
                                key={data.id}>
                                <div className='flex justify-between'>
                                    <div className='ml-4'>
                                        <p><b>Id:</b> {data.id}</p>
                                        <p><b>Date:</b> {data.date}</p>
                                        <p><b>Title:</b> {data.username}</p>
                                        <p><b>Progress Goals: </b>{data.progressGoals.length
                                        }</p>
                                        <p><b>Check Goals:</b>{data.checkGoals.length}</p></div>
                                    <div>
                                        <Link href={`/edit-report/${data.id}`}>
                                            <Button>
                                                <PencilSimple size={28} />
                                            </Button>
                                        </Link>
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
