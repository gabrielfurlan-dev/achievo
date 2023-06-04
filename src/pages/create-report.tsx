import { Plus } from "phosphor-react";
import CreateReportService from "@/hooks/CreateReportService";
import { useRouter } from "next/router";

export default function CreateReport() {

    const router = useRouter()

    async function handleCreateReport(){

        const idReport = await CreateReportService()

        router.push({pathname: "new-report", query: {idReport}})
    }

    return (
        <div className="flex flex-col gap-4 h-screen w-screen items-center justify-center">
            <h3 className="text-2xl bold">New Report</h3>
            <div className="flex gap-2 items-center">
                <p>Create</p>
                <button
                    className="flex bg-emerald-600 w-12 h-12 items-center justify-center rounded-lg"
                    onClick={() => handleCreateReport()}
                >
                    <Plus color="white" />
                </button>
            </div>
        </div>
    );
}
