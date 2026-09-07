'use client'

import { useEffect, useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import SentimentDashboard from "../components/chart"
import Navbar from "../components/navbar"
import CardResult from "../components/cardResult"
import InsightTabsCard from "../components/InsightTabsCard"
import TasksCard from "../components/TasksCard"
import { SummaryMetricCard } from "../components/summary-card"
import TableClient from "../components/table-clients"

import {
    Users,
    CheckCircle2,
    BriefcaseBusiness,
    UserCheck,
    HeartCrack,
    Heart,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function Vendedor() {

    // cada item = uma reunião, com os dados de CardResult e InsightTabsCard juntos
    const meetings = [
        {
            id: 1,
            card: {
                meetingLabel: "REUNIÃO",
                meetingTitle: "Renovação de contrato - Alpha Log",
                duration: "48 min",
                speakers: "3 locutores",
                sentimentLabel: "Positivo",
                sentimentScore: 9,
                summaryLabel: "RESUMO",
                summary: "Cliente satisfeito com a operação atual, demonstrando total confiança nos serviços prestados. A relação consolidada abre oportunidade estratégica para expansão contratual. No próximo trimestre, o foco será ampliar o escopo para logística reversa. A iniciativa visa otimizar processos e agregar ainda mais valor à parceria."
            },
            insights: {
                oportunidades: [
                    {
                        title: "Enviar proposta do módulo de BI",
                        description: "Cliente demonstrou interesse em expandir o escopo do contrato.",
                    },
                ],
                dores: [
                    {
                        title: "Rever Contatos",
                        description: "Cliente relatou dificuldade em falar com o time de suporte.",
                    },
                ],
                churn: [
                    {
                        title: "Reiniciar Roteador",
                        description: "Cliente com instabilidade recorrente de conexão.",
                    },
                    {
                        title: "Rever Contatos",
                        description: "Cliente relatou dificuldade em falar com o time de suporte.",
                    },
                ],
                task: [
                    {
                        title: "Agendar follow-up",
                        description: "Confirmar retorno do cliente até sexta-feira.",
                    },
                ],
            },
        },
        {
            id: 2,
            card: {
                meetingLabel: "REUNIÃO",
                meetingTitle: "Onboarding - Nexus Log铃ística",
                duration: "35 min",
                speakers: "2 locutores",
                sentimentLabel: "Neutro",
                sentimentScore: 6,
                summaryLabel: "RESUMO",
                summary: "Cliente novo em processo de implantação. Demonstrou dúvidas sobre o fluxo de integração com o ERP atual e solicitou material de apoio adicional. Equipe alinhou próximos passos e cronograma de treinamento para as próximas duas semanas."
            },
            insights: {
                oportunidades: [
                    {
                        title: "Oferecer módulo de treinamento avançado",
                        description: "Cliente demonstrou interesse em capacitar mais usuários do time.",
                    },
                ],
                dores: [
                    {
                        title: "Falta de clareza no fluxo de integração",
                        description: "Cliente reportou dificuldade em entender a integração com o ERP.",
                    },
                    {
                        title: "Documentação insuficiente",
                        description: "Solicitou materiais de apoio mais detalhados.",
                    },
                ],
                churn: [],
                task: [
                    {
                        title: "Enviar cronograma de treinamento",
                        description: "Compartilhar agenda das próximas duas semanas até amanhã.",
                    },
                ],
            },
        },
        {
            id: 3,
            card: {
                meetingLabel: "REUNIÃO",
                meetingTitle: "Revisão trimestral - Beta Transportes",
                duration: "52 min",
                speakers: "4 locutores",
                sentimentLabel: "Negativo",
                sentimentScore: 3,
                summaryLabel: "RESUMO",
                summary: "Cliente insatisfeito com instabilidades recorrentes na plataforma no último trimestre. Relatou impacto direto nas operações diárias e ameaçou reavaliar a renovação do contrato. Equipe comprometeu-se a escalar o caso internamente e apresentar plano de ação em 48h."
            },
            insights: {
                oportunidades: [],
                dores: [
                    {
                        title: "Instabilidade recorrente da plataforma",
                        description: "Impactou diretamente as operações do cliente no trimestre.",
                    },
                ],
                churn: [
                    {
                        title: "Risco de não renovação",
                        description: "Cliente sinalizou possível cancelamento se o problema persistir.",
                    },
                ],
                task: [
                    {
                        title: "Escalar caso para engenharia",
                        description: "Priorizar investigação técnica ainda esta semana.",
                    },
                    {
                        title: "Apresentar plano de ação",
                        description: "Retornar ao cliente em até 48h com plano formal.",
                    },
                ],
            },
        },
        // adicione mais objetos aqui, no mesmo formato (card + insights)
    ]

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

    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
            setCanScrollPrev(emblaApi.canScrollPrev())
            setCanScrollNext(emblaApi.canScrollNext())
        }

        onSelect()
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", onSelect)
    }, [emblaApi])

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

                <div className="relative mb-2">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {meetings.map((meeting) => (
                                <section
                                    key={meeting.id}
                                    className="flex-[0_0_100%] min-w-0 flex flex-wrap justify-between md:bg-black/20 rounded-sm"
                                >
                                    <article className="w-full md:w-[50%]">
                                        <CardResult {...meeting.card} />
                                    </article>

                                    <article className="flex w-full md:w-[50%]">
                                        <InsightTabsCard {...meeting.insights} />
                                    </article>
                                </section>
                            ))}
                        </div>
                    </div>

                    {meetings.length > 1 && (
                        <>
                            <button
                                onClick={scrollPrev}
                                disabled={!canScrollPrev}
                                aria-label="Reunião anterior"
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-9 w-9 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/70 transition-colors"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>

                            <button
                                onClick={scrollNext}
                                disabled={!canScrollNext}
                                aria-label="Próxima reunião"
                                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-9 w-9 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/70 transition-colors"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </>
                    )}
                </div>

                {meetings.length > 1 && (
                    <div className="flex justify-center gap-2 mb-5 md:mb-15">
                        {meetings.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => emblaApi?.scrollTo(i)}
                                aria-label={`Ir para reunião ${i + 1}`}
                                className={`h-2 w-2 rounded-full transition-colors ${
                                    selectedIndex === i ? "bg-white" : "bg-white/30"
                                }`}
                            />
                        ))}
                    </div>
                )}

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
                    <TableClient />
                </section>

            </div>
        </main>
    )

}