import Link from "next/link";
import Alpaca from "../../public/svg/errors/404/alpaca404.svg"
import ArrowRightTop from "../../public/svg/assets/arrowRightTop.svg"

export default function error404() {
    return (
        <div className="flex items-center justify-center w-screen h-screen">

            {/* <div className="flex-col justify-between items-center m-auto hidden md:flex"> */}

            {/* <div className=""><Ovni /></div> */}

            <div className="flex flex-col w-full items-center lg:gap-10 xl:flex-row m-auto mx-24 xl:mx-40" >

                <div>
                    <span className="text-5xl font-bold">Ei capitão!</span>
                    <p className=" w-64 text-lg text-NEUTRAL_300">Parece que a página que você está acessando foi abdusida.</p>
                </div>

                <Alpaca className="m-auto scale-[60%] md:scale-[70%] lg:scale-100" />


                <div className=" flex flex-col gap-4">
                    <p className="w-full text-2xl text-NEUTRAL_300">
                        Volte para a <Link className="underline text-NEUTRAL_100" href={"/home"}>página inicial</Link>.
                    </p>
                    <ArrowRightTop className="hidden xl:block" alt="Error 404 image" />
                </div>

            </div>

            {/* <div className="m-[-50px]">
                    <Planet />
                </div> */}

            {/* </div> */}

        </div>
    )
}
