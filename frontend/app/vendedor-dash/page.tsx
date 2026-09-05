'use client'

import SentimentDashboard from "../components/chart"
import Navbar from "../components/navbar"
import CardResult from "../components/cardResult"
import InsightTabsCard from "../components/InsightTabsCard"
import TasksCard from "../components/TasksCard"


export default function Vendedor() {

    return (
        <main className="w-full min-h-screen overflow-x-hidden text-white" style={{
            background: "linear-gradient(135deg, #042133 0%, #002740 8%, #0D151A 93%)"
        }}>
            <nav>
                <Navbar />
            </nav>
            <div className="flex md:px-15 py-5 md:pt-15 flex-col">

                <div className="mb-8">
                    <div className=" text-lg lg:text-2xl font-semibold text-center md:text-left">Bem vindo de volta, Tadeu</div>
                    <div className=" text-sm lg:text-base font-light text-center md:text-left">Acompanhe suas métricas comerciais</div>
                </div>

                <section className="flex flex-wrap justify-between bg-black/20 mb-15 rounded-sm">

                    <article className="w-full md:w-[50%]">
                        <CardResult />
                    </article>

                    <article className="flex w-full md:w-[50%]">
                        <InsightTabsCard/>
                    </article>


                </section>

                <div className="flex justify-center">
                <div className="w-full mx-15 rounded-2xl h-[1px] bg-white/20 mb-15"></div>
                </div>

                <section className="flex justify-start flex-row flex-nowrap gap-6">
                <article className="hidden md:flex w-[40%] ">
                    <SentimentDashboard />
                </article>

                <article className="flex w-full md:w-[60%] h-[380px] overflow-x-hidden rounded-sm">
                    <TasksCard/>
                </article>

                </section>

            </div>
        </main>
    )

}