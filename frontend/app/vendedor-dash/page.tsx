'use client'

import SentimentDashboard from "../components/chart"
import Navbar from "../components/navbar"


export default function Vendedor() {

    return (
        <main className="w-full min-h-screen overflow-x-hidden text-white" style={{
            background: "linear-gradient(-23deg, #002740 1%, #06486C 44%, #06486C 88%)"
        }}>
            <nav>
                <Navbar />
            </nav>
            <section className="flex px-6 md:px-15 py-5 md:pt-15 flex-col">
                
                <div className="mb-8">
                <div className=" text-2xl font-semibold">Bem vindo de volta, Tadeu</div>
                <div className=" text-md">Acompanhe suas métricas comerciais</div>
                </div>

                <article className="">
                    <SentimentDashboard />
                </article>
                

            </section>
        </main>
    )

}