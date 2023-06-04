import { FacesProps } from "@/Interfaces/FaceProps"
import { EHumourStatus } from "@/enums/EHumourStatus"

type SvgProps = {
    humourValue: EHumourStatus
    children: JSX.Element
    faceProps: FacesProps
}

export default function SvgWrapper({ humourValue, children, faceProps }: SvgProps) {
    return (
        <div>
            <svg
                width={faceProps.width || 36}
                height={faceProps.height || 36}
                viewBox="0 0 36 36"
                fill={faceProps.humour == humourValue ? "#FFCC4D" : "none"}
                xmlns="http://www.w3.org/2000/svg">

                {children}

            </svg >
        </div>
    )
}
