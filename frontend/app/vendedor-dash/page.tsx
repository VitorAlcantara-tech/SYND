'use client'

import SentimentDashboard from "../components/chart"
import Navbar from "../components/navbar"
import CardResult from "../components/cardResult"
import InsightTabsCard from "../components/InsightTabsCard"
import TasksCard from "../components/TasksCard"
import { SummaryMetricCard } from "../components/summary-card"
import TableClient from "../components/table-clients"

import { Users, CheckCircle2, BriefcaseBusiness, UserCheck, HeartCrack, Heart } from "lucide-react";
export default function Vendedor() {

    const summaryMetrics = [
        {
            label: "Sentimento Médio",
            value: "8 / 10",
            detail: "Excelente",
            progress: 80,
            icon: Heart,
            iconColor: "text-[#2DD4FF]",
            badgeBg: "bg-[#12384B]",
            badgeText: "text-[#B9D8E6]",
            barColor: "bg-[#2DD4FF]",
        },
        {
            label: "Tarefas Concluídas",
            value: "70%",
            detail: "7 de 10 tarefas",
            progress: 72,
            icon: CheckCircle2,
            iconColor: "text-[#21D4FD]",
            badgeBg: "bg-[#103847]",
            badgeText: "text-[#8FE8FF]",
            barColor: "bg-[#21D4FD]",
        },
        {
            label: "Oportunidades",
            value: "3",
            detail: "Identificadas",
            progress: 100,
            icon: BriefcaseBusiness,
            iconColor: "text-[#FFB020]",
            badgeBg: "bg-[#3A2A0A]",
            badgeText: "text-[#FFD27A]",
            barColor: "bg-[#FFB020]",
        },
        {
            label: "Dores",
            value: "6",
            detail: "Identificadas",
            progress: 100,
            icon: HeartCrack,
            iconColor: "text-[#E5534B]",
            badgeBg: "bg-[rgba(127,29,29,0.3)]",
            badgeText: "text-[#EF4444]",
            barColor: "bg-[#EF4444]",
        },
    ];


    return (
        <main className="w-full min-h-screen overflow-x-hidden text-white" style={{
            background: "linear-gradient(135deg, #042133 0%, #002740 8%, #0D151A 93%)"
        }}>
            <nav>
                <Navbar />
            </nav>
            <div className="flex md:px-15 py-5 md:pt-15 flex-col">

                <div className="mb-1 md:mb-6">
                    <div className=" text-lg lg:text-2xl font-semibold text-center md:text-left">Bem vindo de volta, Tadeu</div>
                    <div className=" text-sm lg:text-base font-light text-center md:text-left">Acompanhe suas métricas comerciais</div>
                </div>

                <div className="flex justify-center md:hidden">
                    <div className="w-full mx-15 rounded-2xl h-[1px] bg-white/20 mb-2"></div>
                </div>

                <section className="flex flex-wrap justify-between md:bg-black/20 mb-5 md:mb-15 rounded-sm">

                    <article className="w-full md:w-[50%]">
                        <CardResult />
                    </article>

                    <article className="flex w-full md:w-[50%]">
                        <InsightTabsCard />
                    </article>


                </section>

                <div className="flex justify-center">
                    <div className="w-full mx-15 rounded-2xl h-[1px] bg-white/20 mb-5"></div>
                </div>

                <section>

                    <div className="flex flex-row flex-wrap md:flex-nowrap justify-center mb-12">
                        {summaryMetrics.map((item) => (
                            <SummaryMetricCard
                                key={item.label}
                                label={item.label}
                                value={item.value}
                                detail={item.detail}
                                progress={item.progress}
                                icon={item.icon}
                                iconColor={item.iconColor}
                                badgeBg={item.badgeBg}
                                badgeText={item.badgeText}
                                barColor={item.barColor}
                            />
                        ))}
                    </div>

                </section>

                <section className="flex justify-start flex-row flex-nowrap gap-6 mb-15">
                    <article className="hidden md:flex w-[40%] ">
                        <SentimentDashboard />
                    </article>

                    <article className="flex w-full md:w-[60%] h-[380px] overflow-x-hidden rounded-sm">
                        <TasksCard />
                    </article>

                </section>

                <div className="flex justify-center">
                    <div className="w-full mx-15 rounded-2xl h-[1px] bg-white/20 mb-5"></div>
                </div>

                <section className="flex w-full mt-10">
                    <TableClient/>
                </section>

            </div>
        </main>
    )

}