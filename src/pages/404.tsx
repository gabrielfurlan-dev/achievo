import Error from "@/assets/errors/404/404Alpacas"
import Planet from "@/assets/errors/404/planet"
import Ovni from "@/assets/errors/404/ovni"
import Link from "next/link";

export default function error404() {
    return (
        <div className="flex flex-col justify-between items-center m-auto">

            <div className="">
                <Ovni />
            </div>

            <div className="absolute flex top-80">

                <div>
                    <span className="text-5xl font-bold">Ei capitão!</span>
                    <p className="w-64 text-lg text-NEUTRAL_300">Parece que a página que você está acessando foi abdusida.</p>
                </div>

                <Error />

                <p className="w-64 text-lg text-NEUTRAL_300">Volte para a <Link className="underline text-NEUTRAL_100" href={"/home"}>página inicial</Link>.</p>

            </div>

            <div className="m-[-50px]">
                <Planet />
            </div>
        </div>
    )
}
