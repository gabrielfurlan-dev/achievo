import ProfileButton from "@/components/ProfileButton";
import { ListMagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FilePlus, Icon, List, UserCircle } from "phosphor-react";
import { useEffect, useState } from "react";

export default function home() {
    const [userName, setUserName] = useState("")
    const [userPhotoURL, setUserPhotoURL] = useState("")
    const [userEmail, setUserEmail] = useState("")

    useEffect(() => {
        setUserName(localStorage.getItem('userName') ?? "")
        setUserPhotoURL(localStorage.getItem('userPhotoURL') ?? "")
        setUserEmail(localStorage.getItem('userEmail') ?? "")
    }, [])

    return (
        <div className="w-full h-full">
            <div className="flex w-full justify-end absolute mt-4 right-2 md:right-8 md:mt-10">
                <ProfileButton />
            </div>

            <div className="flex flex-col justify-center items-center text-center h-screen w-full">
                <div className="text-GRAY_DARK">
                    <h1 className="text-4xl font-medium">Weekly Report</h1>
                    <h3>Um novo passo para seu progresso.</h3>
                </div>

                <div className="mt-10 flex gap-1 h-12">
                    <IconButton IconButton={FilePlus} name="Add" route="report/new" />
                    <IconButton IconButton={ListMagnifyingGlass} name="Listar" route="list-reports" />
                </div>
            </div>
        </div>
    );
}

type props = {
    name: string;
    route: string;
    IconButton: Icon;
}

function IconButton({ name, route, IconButton }: props) {

    const router = useRouter()

    return (
        <div className="">
            <button className="rounded-xl hover:bg-WHITE_PRINCIPAL w-20 h-20 flex flex-col text-center items-center gap-2 justify-center text-GRAY" onClick={() => router.push(route)}>
                <IconButton className="text-PRINCIPAL" size={32} />
                <p>{name}</p>
            </button>
        </div>
    );
}
