import synd from "@/public/images/synd_logo.png"
import Image from "next/image"
import cards from "@/public/images/cards-blue.png"
import { ArrowRight } from "lucide-react"
import Synd3D from "../components/Synd3D"

import Link from 'next/link'
import NavbarLandingPage from "../components/navbar-LandingPage"

export default function LandingPage() {
    return (
    <main className="w-full min-h-screen overflow-x-hidden text-white" style={{
                background: "linear-gradient(139deg, #002740 0%, #06486C 53%, #06486C 98%)"
            }}>

                <NavbarLandingPage />
                <div className="flex flex-col-reverse md:flex-row" >
                    <section className="flex flex-col justify-start md:justify-center w-full md:w-[65%] min-h-[40vh] md:min-h-screen px-6 md:pl-25 pb-10 md:pb-40">
                        <div className="text-xl lg:text-4xl font-semibold leading-tight md:leading-11.0" style={{ textShadow: "0 0 50px rgba(255, 255, 255, 0.2)" }}>REUNIÕES COMERCIAIS TRANSFORMADAS EM DADOS</div>
                        <p
                            className="
                                my-3 max-w-xl
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
                        <div className="relative h-[400px] md:h-[600px] w-full">

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
                                -z-10
                                md:z-1
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
                            
                                z-100
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