import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/router";
import { User } from "phosphor-react";
import { useEffect, useState } from "react";

export default function profile() {
    const router = useRouter();
    const { id } = router.query;

    const [userName, setUserName] = useState("")
    const [userPhotoURL, setUserPhotoURL] = useState("")
    const [userEmail, setUserEmail] = useState("")

    useEffect(() => {
        setUserName(localStorage.getItem('userName') ?? "")
        setUserPhotoURL(localStorage.getItem('userPhotoURL') ?? "")
        setUserEmail(localStorage.getItem('userEmail') ?? "")
    }, [])

    return (
        <div className='flex h-screen w-full'>
            <div className='flex w-full h-full md:m-16'>
                <div className='m-12 w-full'>
                    <PageHeader
                        IconPage={User}
                        goBackUrl="/home"
                        title="Meu perfil"
                        subTitle="Seus dados e resultados"
                    />

                    <div className="flex h-[50%] items-center justify-center">
                        <div className="flex flex-col md:flex-row gap-4 items-center text-center md:text-left">
                            <img
                                src={userPhotoURL}
                                alt="Foto do usuário"
                                className="rounded-full w-44 h-44"
                            />
                            <div className="flex flex-col">
                                <p className="text-4xl text-GRAY_DARK">{userName}</p>
                                <p className="text-xl text-GRAY">{userEmail}</p>
                                <p className="max-w-lg mt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus ipsa vel eos, iure culpa earum modi assumenda nemo perferendis consectetur obcaecati quia, tenetur explicabo? Sed ratione velit debitis voluptates qui?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
