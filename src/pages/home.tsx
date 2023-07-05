import { Button } from "@mui/material";
import { ListMagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { FilePlus, Icon, List } from "phosphor-react";

export default function home() {
    return (
        <div className="flex flex-col justify-center items-center text-center h-screen w-full">
            <div className="text-GRAY_DARK">
                <h1 className="text-4xl font-medium">Weekly Report</h1>
                <h3>Um novo passo para seu progresso.</h3>
            </div>

            <div className="mt-10 flex gap-1 h-12">
                <IconButton IconButton={FilePlus} name="Add" route="new-report" />
                <IconButton IconButton={ListMagnifyingGlass} name="Listar" route="list-reports" />
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
