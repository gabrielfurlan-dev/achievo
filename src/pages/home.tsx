import { Button } from "@mui/material";
import { ListMagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { FilePlus, List } from "phosphor-react";

export default function home() {
    const router = useRouter()
    return (
        <div className="flex flex-col justify-center items-center text-center h-screen w-full">
            <div>
                <h1 className="text-3xl">Weekly Report</h1>
                <h3>Um novo passo para seu progresso.</h3>
            </div>

            <div className="mt-10 flex gap-2 h-12">
                <div className="flex">
                    <Button className="rounded-lg bg-slate-100" onClick={() => router.push("/new-report")}><FilePlus size={32} /></Button>
                </div>

                <div className="flex">
                    <Button className="rounded-lg bg-slate-100" onClick={() => router.push("/list-reports")}><ListMagnifyingGlass  size={32} /></Button>
                </div>
            </div>
        </div>
    );
}
