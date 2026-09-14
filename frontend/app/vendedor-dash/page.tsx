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
import MeetingCardSkeleton from "../components/MeetingCardSkeleton"

import {
    Users,
    CheckCircle2,
    BriefcaseBusiness,
    UserCheck,
    HeartCrack,
    Heart,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Download,
    Search
} from "lucide-react";

import { ReuniaoRaw } from "../components/cardResult";

interface AnaliseParsed {
    resumo_geral: string;
    sentimento: number;
    dores: { texto: string; trecho: string }[];
    oportunidades: { texto: string; trecho: string }[];
    evidencias_churn: { texto: string; trecho: string }[];
    tarefas: { nome: string; trecho: string; data_prevista: string | null }[];
}

interface MetricasCalculadas {
    sentimentoMedio: number; // 0 a 10
    totalOportunidades: number;
    totalDores: number;
}

function parseAnalise(analise: string): AnaliseParsed | null {
    try {
        return JSON.parse(analise) as AnaliseParsed;
    } catch {
        return null;
    }
}

function calcularMetricas(reunioes: ReuniaoRaw[]): MetricasCalculadas {
    let somaSentimento = 0;
    let qtdSentimentosValidos = 0;
    let totalOportunidades = 0;
    let totalDores = 0;

    for (const reuniao of reunioes) {
        const analise = parseAnalise(reuniao.Analise);
        if (analise) {
            if (typeof analise.sentimento === "number" && !isNaN(analise.sentimento)) {
                somaSentimento += analise.sentimento;
                qtdSentimentosValidos++;
            }
            totalOportunidades += analise.oportunidades?.length ?? 0;
            totalDores += analise.dores?.length ?? 0;
        }
    }

    const sentimentoMedio =
        qtdSentimentosValidos > 0
            ? Number((somaSentimento / qtdSentimentosValidos).toFixed(1))
            : 0;

    return {
        sentimentoMedio,
        totalOportunidades,
        totalDores,
    };
}

export default function Vendedor() {

    const [reunioesState, setReunioes] = useState<ReuniaoRaw[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingReq, setIsLoadingReq] = useState(false);

    useEffect(() => {
        const carregarReunioes = () => {
            const rawStr = localStorage.getItem("Reuniao")
            if (!rawStr) {
                setIsLoading(false)
                return
            }

            try {
                const data: ReuniaoRaw[] = JSON.parse(rawStr)
                if (Array.isArray(data)) {
                    setReunioes(data)
                }
            } catch (e) {
                console.error("Erro ao parsear reunião do localStorage", e)
            } finally {
                setIsLoading(false)
            }
        }

        carregarReunioes()

        window.addEventListener("reuniaoAtualizada", carregarReunioes)
        window.addEventListener("storage", carregarReunioes) // cobre outras abas

        return () => {
            window.removeEventListener("reuniaoAtualizada", carregarReunioes)
            window.removeEventListener("storage", carregarReunioes)
        }
    }, [])

    const metricas = calcularMetricas(reunioesState);
    const [stats, setStats] = useState({ total: 0, pending: 0, activeTab: 'tarefas' });

    const summaryMetrics = [
        {
            label: "Sentimento Médio",
            value: `${metricas.sentimentoMedio} / 10`,
            detail: metricas.sentimentoMedio >= 7
                ? "Excelente"
                : metricas.sentimentoMedio >= 4
                    ? "Neutro"
                    : "Precisa de atenção",
            progress: (metricas.sentimentoMedio / 10) * 100,
            icon: Heart,
            iconColor: "text-[#2DD4FF]",
            badgeBg: "bg-[#12384B]",
            badgeText: "text-[#B9D8E6]",
            barColor: "bg-[#2DD4FF]",
        },
        {
            label: `${stats.activeTab == "tarefas" ? "Tarefas Concluídas" : "Uploads Concluídos"}`,
            value: `${((stats.total - stats.pending) / stats.total * 100).toFixed(0)}%`,
            detail: `${(stats.total - stats.pending)} de ${stats.total} concluídas`,
            progress: (stats.total - stats.pending) / stats.total * 100,
            icon: CheckCircle2,
            iconColor: "text-[#21D4FD]",
            badgeBg: "bg-[#103847]",
            badgeText: "text-[#8FE8FF]",
            barColor: "bg-[#21D4FD]",
        },
        {
            label: "Oportunidades",
            value: `${metricas.totalOportunidades}`,
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
            value: `${metricas.totalDores}`,
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
    const [showInsightMobile, setShowInsightMobile] = useState(false)

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
            setCanScrollPrev(emblaApi.canScrollPrev())
            setCanScrollNext(emblaApi.canScrollNext())
            setShowInsightMobile(false) // fecha o insight ao trocar de reunião
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
            <div className="flex md:px-15 py-5 md:pt-10 flex-col">

                <div className="flex flex-col mb-1 md:mb-10 justify-start items-center md:items-start">
                    <div className="mb-1 md:mb-5 ">
                        <div className=" text-lg lg:text-2xl font-semibold">Bem vindo de volta, Tadeu</div>
                        <div className=" text-sm lg:text-base font-light tracking-wide text-[#bac4ce] mb-3 md:mb-0">Acompanhe suas métricas comerciais</div>
                    </div>
                    <div className="flex justify-center items-center gap-3 border-l-1">
                        <input
                            type="text"
                            className="bg-black/15 rounded-sm p-2 text-white/90 outline-none text-xs md:text-base"
                            placeholder="Buscar Transcrição"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setIsLoadingReq(true)

                                    setTimeout(() => {
                                    const parsed = {'ID': '123', 'Data': '2026-09-14 19:37:00', 'Formato da reunião': 'PRESENCIAL', 'ID status da reunião': '3', 'Status': 'COMPLETED', 'Duração': '00:04:18', 'CODT': '123', 'Tipo de recurso': 'lead', 'Reunião externa': true, 'Data de criação': '2026-09-14 19:30:00', 'UF': 'SP', 'CNAE': '1032599', 'Nome da unidade': 'FIAP - BANCA CHALLENGE', 'Segmento': 'PROJETOS', 'Faixa de faturamento do cliente': 'PROJETO ACADÊMICO', 'Data da última pesquisa': '2025-11', 'Nota NPS': '10', 'Transcrição': '(0:26) Boa noite a todos, meu nome é Vítor Fernandes e eu sou o representante comercial da Synd, (0:31) a proposta que vai conectar as vozes da todos para construir resultados. (0:36) Uma breve janela de contexto aqui, estamos falando da maior empresa de tecnologia do Brasil, (0:41) com mais de 70 mil clientes, e o modelo de negócio, o ERP, ele exige uma atenção individualizada para cada cliente. (0:49) Isso faz com que as equipes comerciais tenham que realizar milhares de reuniões mentalmente. (0:55) Se esses dados não forem muito bem tratados, muitos insights vão ser perdidos no meio dessas transcrições. (1:02) Pensando justamente nisso, a nossa proposta é um ecossistema de gestão, pautado em quatro objetivos principais. (1:09) O primeiro é encontrar o ouro perdido nas reuniões. (1:13) O segundo, otimizar a eficiência operacional dos vendedores, centralizando todas as ferramentas e a operação num único lugar. (1:21) O terceiro é criar a cultura de data driving decision, decisão baseada em dados. (1:26) E por fim, consequentemente, alavancar a receita da empresa. (1:31) Para vocês entenderem a nossa proposta, eu vou apresentar três pessoas principais. (1:36) O Tadeu Filipe, que é o representante de vendas. (1:38) A Vânia Soares, que é a gerente da filial de Santana. (1:41) E o Laércio Sobral, que é o diretor comercial. (1:44) O Tadeu vai usar a Synd diariamente, para fazer o controle das tarefas e da agenda dele. (1:51) No módulo de agenda, cada vez que ele precisar fazer uma reunião, ele vai marcar aqui no calendário. (1:57) Isso vai gerar uma pendência de upload. (2:00) E quando o upload for concluído, a Synd vai devolver um card com os principais insights extraídos e um resumo da reunião. (2:09) Cada insight, cada bullet, ele vai estar seguido por um trecho da reunião. (2:14) Isso serve para comprovar que a IA não delirou ao sugerir essa extração. (2:20) A Vânia não está muito preocupada com o resultado de cada reunião individual. (2:26) Ela quer saber mais do desempenho da equipe comercial. (2:29) Por isso que as métricas dela exibem status individuais para cada vendedor. (2:34) Se ela consegue saber quem está desempenhando mal e quem está desempenhando bem, (2:37) ela tem que pensar em formas de contornar isso. (2:39) Através de um componente de agenda, ela também consegue ver como está a distribuição das tarefas (2:43) e o que está marcado para cada um entregar em cada dia. (2:49) Já o da Hércio, ele vai ter uma visão mais holística do negócio. (2:52) Então o dashboard dele está voltado para decisões contratuais, quantidade de clientes federalizados, (2:58) produtos mais criticados e mais populares, total de clientes por unidade, oportunidade por tipo, (3:05) para saber por onde invertir. (3:07) E também uma visão segmentada, separada por filiais. (3:11) Assim ele consegue ver qual é a que está com mais oportunidades, qual está gerando mais dores (3:15) e qual apresenta o maior risco de churn. (3:18) Mas eu, como gerente comercial da CIND, durante esse projeto, (3:23) eu identifiquei uma dor que os representantes de vendas da TOTS com certeza iriam passar. (3:29) Eu queria que essa reunião presencial, que está sendo feita agora, (3:32) estivesse sendo gravada. (3:34) E pensando nisso, a gente desenvolveu um módulo de IoT, (3:39) que ao clicar uma vez nesse botão, (3:41) começa a captar a transcrição do que está sendo falado presencialmente. (3:45) Clicando pela segunda vez, ele vai liberar um código, (3:48) coloca aí, Victor, 783B, (3:51) que ao ser inserido na CIND, vai retornar a busca dessa transcrição no nosso banco de dados. (3:57) E vai aplicar também o modelo de análise da IA, (3:59) para devolver os insights dessa reunião presencial. (4:02) Mas a nossa proposta, o nosso diferencial, não se resume a isso. (4:06) A gente também pretende expandir, (4:09) colocando uma integração com o Outlook, (4:11) dentro de uma API que capta e-mails da caixa de entrada dos representantes de vendas, (4:15) e adiciona no histórico do cliente, (4:17) e um chatbot analista alimentado com todo o histórico de reuniões. (4:21) Assim ele pode responder qualquer dúvida sobre qualquer reunião que tenha existido. (4:26) Agora eu tenho uma pergunta sincera para vocês. (4:29) O que nós podemos melhorar? (4:31) Nos mostre o caminho e nós entregaremos o resultado. (4:35) Muito obrigado.', 'Analise': '{\n  "resumo_geral": "Apresentação da solução Synd (sistema de gestão de reuniões e insights para equipes comerciais) focada no contexto de atendimento e gestão da TOTVS, detalhando módulos para vendedores, gerência de filial, diretoria comercial, além de funcionalidades para captação de reuniões presenciais.",\n  "principais_assuntos": "Apresentação comercial da plataforma Synd, automação de análise de transcrições de reuniões, gestão de força de vendas, controle de tarefas e agenda, métricas de desempenho para gerência, dashboard holístico e visão de churn para diretoria, e captação de áudio em reuniões presenciais.",\n  "dores": [],\n  "oportunidades": [\n    {\n      "texto": "Implementação da plataforma Synd para otimizar a gestão de reuniões e análise de dados comerciais da TOTVS",\n      "trecho": "Pensando justamente nisso, a nossa proposta é um ecossistema de gestão, pautado em quatro objetivos principais. O primeiro é encontrar o ouro perdido nas reuniões."\n    }], "risco_churn": "baixo",\n  "evidencias_churn": [],\n  "sentimento": 10.0,\n  "tarefas": []\n}'}

                                    const existenteStr = window.localStorage?.getItem("Reuniao");
                                    let lista: unknown[] = [];

                                    if (existenteStr) {
                                        try {
                                        const existente = JSON.parse(existenteStr);
                                        lista = Array.isArray(existente) ? existente : [existente];
                                        } catch {
                                        lista = [];
                                        }
                                    }

                                    

                                    lista.push(parsed);
                                    window.localStorage?.setItem("Reuniao", JSON.stringify(lista));
                                    window.dispatchEvent(new Event("reuniaoAtualizada"));
                                    setIsLoadingReq(false)
                                    }, 1500)

                                }
                            }}
                        />
                        <button className="btn-light-hover ">
                        <Search />
                        </button>
                    </div>
                </div>

                <div className="flex justify-center md:hidden">
                    <div className="w-full mx-15 rounded-2xl h-[1px] bg-white/20 mb-2"></div>
                </div>

                <div className="relative">
                    <div className="overflow-hidden md:shadow-[0px_25px_20px_-20px_rgba(255,255,255,0.02)]" ref={emblaRef}>
                        <div className="flex">
                            {(!isLoading && reunioesState.length > 0 && !isLoadingReq) &&
                                reunioesState.map((reuniao) => (
                                    <div key={reuniao.ID} className="flex-[0_0_100%] min-w-0 flex flex-col md:flex-row md:bg-black/15 rounded-md justify-end animate-fade-in-metric2">
                                        <article className="w-full md:w-[50%]">
                                            <CardResult {...reuniao} />
                                        </article>
                                        <div className="relative w-full h-5 md:hidden">
                                            <span
                                                className={`absolute inset-0 flex w-full items-end justify-center font-light text-sm tracking-wide text-[#c0d8f0] transition-opacity duration-200 ease-in-out ${showInsightMobile ? "opacity-0" : "opacity-100"
                                                    }`}
                                            >
                                                Ver insights
                                            </span>

                                            <span
                                                className={`absolute inset-0 flex w-full items-end justify-center font-light text-sm tracking-wide text-[#c0d8f0] transition-opacity duration-200 ease-in-out ${showInsightMobile ? "opacity-100" : "opacity-0"
                                                    }`}
                                            >
                                                Ocultar insights
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setShowInsightMobile((prev) => !prev)}
                                            aria-label={showInsightMobile ? "Ocultar insights" : "Ver insights"}
                                            className="md:hidden flex items-center justify-center mx-auto mt-2 mb-1 h-8 w-8 rounded-full hover:bg-white/20 transition-colors"
                                        >
                                            <ChevronDown
                                                className={`h-5 w-5 transition-transform duration-300 ${showInsightMobile ? "rotate-180" : ""}`}
                                            />
                                        </button>

                                        <article
                                            className={`w-full md:w-[50%] flex flex-col overflow-hidden transition-all duration-700 ease-in-out md:!max-h-none md:!opacity-100 ${showInsightMobile ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            <InsightTabsCard {...reuniao} />
                                        </article>
                                    </div>
                                ))}

                            {(isLoading || isLoadingReq) && (
                                <MeetingCardSkeleton />
                            )}

                            {(!isLoading && (reunioesState.length <= 0)) && !isLoadingReq && <div className="flex justify-center w-full p-6">

                                <div className="flex justify-center items-center flex-col font-light">

                                    <p className="mb-1"> Para começar...</p>
                                    <div className="flex flex-row flex-nowrap justify-center items-center gap-2 h-full mb-5 rounded-sm bg-[#064758] text-sm md:text-lg shadow-[0px_5px_1px_-3px_rgba(0,0,0,0.3)] hover:shadow-[0px_1px_5px_-3px_rgba(0,0,0,0.3)] btn-light-hover">


                                        <a className="flex flex-row flex-nowrap justify-center items-center gap-2 py-2 px-3 " href="../Exemplo_Transcricao.json" download="Exemplo_Transcricao.json">
                                            <Download />
                                            <p className=""> Baixe um Exemplo</p>
                                        </a>

                                    </div>

                                    <p className="text-center">E faça upload da transcrição na Agenda</p>

                                </div>

                            </div>}
                        </div>
                    </div>

                    {reunioesState.length > 1 && (
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

                {reunioesState.length > 1 && (
                    <div className="flex justify-center gap-2 mb-5 mt-5 md:mb-7">
                        {reunioesState.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => emblaApi?.scrollTo(i)}
                                aria-label={`Ir para reunião ${i + 1}`}
                                className={`h-2 w-2 rounded-full transition-colors ${selectedIndex === i ? "bg-white" : "bg-white/30"
                                    }`}
                            />
                        ))}
                    </div>
                )}

                <div className="flex justify-center">
                    <div className="w-full mx-15 rounded-2xl h-[1px] bg-white/20 my-5"></div>
                </div>

                <section>
                    <div className="flex flex-row flex-wrap md:flex-nowrap justify-center mb-12 ">
                        {summaryMetrics.map((item) => (
                            <SummaryMetricCard
                                key={item.label == "Tarefas Concluídas" || item.label == "Uploads Concluídos" ? `${stats.activeTab}-${item.label}` : item.label}
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
                        <TasksCard onStatsChange={setStats} />
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