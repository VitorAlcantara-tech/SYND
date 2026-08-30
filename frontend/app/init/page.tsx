import Image from "next/image"
import synd from "@/public/images/synd_logo.png"
import box from "@/public/images/box_synd.png"
import cards from "@/public/images/cards-blue.png"
import { ArrowRight } from "lucide-react"

export default function Init() {
    return (
        <main className="w-full min-h-screen overflow-x-hidden" style={{
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
                <div className="hidden md:flex flex-row gap-10">
                    <div className="btn-light-hover"> Produtos </div>
                    <div className="btn-light-hover"> Recursos </div>
                    <div className="btn-light-hover"> Preços </div>
                    <div className="btn-light-hover"> Contato </div>
                </div>
                <button className="h-full py-1 px-2 bg-[#05708d] rounded-md font-md font-light shadow-[0px_5px_1px_-2px_rgba(0,0,0,0.3)] btn-light-hover">
                    Login
                </button>
            </nav>
            <div className="flex flex-col-reverse md:flex-row" >
                <section className="flex flex-col justify-start md:justify-center w-full md:w-[65%] min-h-[40vh] md:min-h-screen pl-6 md:pl-25 pb-10 md:pb-40">
                    <div className="text-2xl lg:text-4xl font-semibold leading-tight md:leading-11.0" style={{ textShadow: "0 0 50px rgba(255, 255, 255, 0.2)" }}>REUNIÕES COMERCIAIS TRANSFORMADAS EM DADOS</div>
                    <div className="text-md mt-2 font-light">Analise transcrições e decifre o valor oculto</div>
                    <div className="flex font-md gap-1 text-lg items-center btn-light-right-hover">Fazer upload <ArrowRight className="btn-light-right-hover" /></div>
                </section>
                <section className="flex w-full justify-center md:justify-start items-center min-h-[40vh] md:min-h-screen">
                    <div className="pt-10 md:pt-0 md:pl-30 pb-10 md:pb-40 relative">
                        <Image
                            src={box}
                            width={500}
                            height={500}
                            className="relative z-20 w-[80%] md:w-[500px] h-auto"
                        />
                        <Image
                            src={cards}
                            width={350}
                            height={350}
                            className="absolute bottom-10 right-5 md:bottom-30 md:-right-20 z-10 w-[55%] md:w-[350px] h-auto"
                        />
                    </div>
                </section>
            </div>
        </main>

    )
}