import { SimpleNavBar } from "@/components/NavBar/SimpleNavBar";
import PageLayout from "@/layouts/PageLayout";
import { ListMagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { FilePlus, House, Icon } from "phosphor-react";
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
        <PageLayout>
            <SimpleNavBar IconPage={House} title="Início" />
            <div className="flex flex-col justify-center items-center text-center h-full">
                <div>
                    <h1 className="text-4xl font-medium text-GRAY_DARK dark:text-DARK_TEXT">Weekly Report</h1>
                    <h3 className="text-GRAY_SECONDARY dark:text-DARK_TEXT_SECONDARY">Um novo passo para seu progresso.</h3>
                </div>

                <div className="mt-10 flex gap-1 h-12">
                    <IconButton IconButton={FilePlus} name="Add" route="report/new" />
                    <IconButton IconButton={ListMagnifyingGlass} name="Listar" route="list-reports" />
                </div>
            </div>
        </PageLayout>

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
            <button className="rounded-xl hover:bg-WHITE_PRINCIPAL dark:hover:bg-DARK_BACKGROUND_SECONDARY w-20 h-20 flex flex-col text-center items-center gap-2 justify-center text-GRAY" onClick={() => router.push(route)}>
                <IconButton className="text-PRINCIPAL" size={32} />
                <p>{name}</p>
            </button>
        </div>
    );
}
