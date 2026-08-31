import Image from "next/image"
import synd from "@/public/images/synd_logo.png"
import box from "@/public/images/box_synd.png"
import cards from "@/public/images/cards-blue.png"
import { ArrowRight } from "lucide-react"
import Synd3D from "./Synd3D"

import Link from 'next/link'

export default function Init() {
    return (
        <main className="w-full min-h-screen overflow-x-hidden text-white" style={{
            background: "linear-gradient(139deg, #002740 0%, #06486C 53%, #06486C 98%)"
        }}>

            <nav className="w-full flex flex-row flex-wrap justify-between gap-4 px-6 md:px-15 pt-6 md:pt-10">
                <Image
                    alt={"Logo escrito SYND"}
                    src={synd}
                    width={120}
                    height={120}
                    className="w-20 md:w-[120px] h-auto"
                />
                <div className="hidden md:flex flex-row gap-10 text-lg items-center cursor-pointer">
                    <div className="btn-light-hover"> Produtos </div>
                    <div className="btn-light-hover"> Recursos </div>
                    <div className="btn-light-hover"> Preços </div>
                    <div className="btn-light-hover"> Contato </div>
                </div>
                <Link href={"/vendedor-dash"} className="h-full py-1 px-2 rounded-sm bg-[#05708d] font-md font-light shadow-[0px_5px_1px_-2px_rgba(0,0,0,0.3)] btn-light-hover">
                    Login
                </Link>
            </nav>
            <div className="flex flex-col-reverse md:flex-row" >
                <section className="flex flex-col justify-start md:justify-center w-full md:w-[65%] min-h-[40vh] md:min-h-screen pl-6 md:pl-25 pb-10 md:pb-40">
                    <div className="text-2xl lg:text-4xl font-semibold leading-tight md:leading-11.0" style={{ textShadow: "0 0 50px rgba(255, 255, 255, 0.2)" }}>REUNIÕES COMERCIAIS TRANSFORMADAS EM DADOS</div>
                    <p
                        className="
                            mt-3 max-w-xl
                            text-base text-white/80
                            sm:text-lg
                        "
                        >
                        Insights claros sobre clientes,
                        oportunidades de melhoria e decisões comerciais.
                    </p>
                    <Link href={"/init"} className="flex font-md gap-1 text-lg items-center btn-light-right-hover">
                        Fazer upload <ArrowRight className="btn-light-right-hover" />
                    </Link>
                </section>
                <section className="relative flex w-full items-center justify-center">
                    <div className="relative h-[600px] w-full">

                        {/* Card decorativo */}
                        <Image
                        src={cards}
                        alt=""
                        aria-hidden="true"
                        width={400}
                        height={400}
                        className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-1/2
                            z-0
                            w-[350px]
                            -translate-x-[5%]
                            -translate-y-1/2
                        "
                        />

                        {/* OBJETO 3D */}
                        <div
                        className="
                            pointer-events-auto
                            absolute
                            inset-0
                            z-10
                        "
                        >
                        <Synd3D />
                        </div>

                    </div>
                </section>
            </div>
        </main>

    )
}