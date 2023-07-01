import { Button } from "@mui/material"
import { ArrowLeft, ReadCvLogo } from "@phosphor-icons/react"
import router from "next/router"

export default function PageHeader() {

    function goBack() {
        window.history.back()
    }

    return (
        <div className="flex">
            <Button onClick={() => router.push('/home')}><ArrowLeft size={32} /></Button>
            <div className="flex gap-3">
                <ReadCvLogo size={32} />
                <div>
                    <h1 className="text-4xl font-bold">Weekly Report</h1>
                </div>
            </div>
        </div>
    )
}
