"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/navbar";
import {
  CheckCircle2,
  BriefcaseBusiness,
  Users,
  UserCheck,
} from "lucide-react";
import { SummaryMetricCard } from "../components/summary-card";
import TableSellers from "../components/table-sellers";

type AgendaEvent = {
  id: number;
  day: number;
  time: string;
  seller: string;
  title: string;
  type: "reuniao" | "followup" | "proposta";
};

const summaryMetrics = [
  {
    label: "Vendedores Ativos",
    value: "8",
    detail: "+1 este mês",
    progress: 68,
    icon: Users,
    iconColor: "text-[#2DD4FF]",
    badgeBg: "bg-[#12384B]",
    badgeText: "text-[#B9D8E6]",
    barColor: "bg-[#2DD4FF]",
  },
  {
    label: "Tarefas Concluídas",
    value: "72%",
    detail: "138 de 191 tarefas",
    progress: 72,
    icon: CheckCircle2,
    iconColor: "text-[#21D4FD]",
    badgeBg: "bg-[#103847]",
    badgeText: "text-[#8FE8FF]",
    barColor: "bg-[#21D4FD]",
  },
  {
    label: "Oportunidades",
    value: "31",
    detail: "Em aberto",
    progress: 54,
    icon: BriefcaseBusiness,
    iconColor: "text-[#FFB020]",
    badgeBg: "bg-[#3A2A0A]",
    badgeText: "text-[#FFD27A]",
    barColor: "bg-[#FFB020]",
  },
  {
    label: "Clientes",
    value: "64",
    detail: "Em acompanhamento",
    progress: 81,
    icon: UserCheck,
    iconColor: "text-[#00E5D0]",
    badgeBg: "bg-[#0E3536]",
    badgeText: "text-[#7EF7EA]",
    barColor: "bg-[#00E5D0]",
  },
];

const agenda: AgendaEvent[] = [
  {
    id: 1,
    day: 5,
    time: "09:00",
    seller: "Lucas Mendes",
    title: "Reunião com Alpha Log",
    type: "reuniao",
  },
  {
    id: 2,
    day: 5,
    time: "11:30",
    seller: "Amanda Souza",
    title: "Follow-up proposta BI",
    type: "followup",
  },
  {
    id: 3,
    day: 5,
    time: "14:00",
    seller: "Rafael Martins",
    title: "Apresentação comercial",
    type: "reuniao",
  },
  {
    id: 4,
    day: 8,
    time: "10:00",
    seller: "Beatriz Costa",
    title: "Envio de nova proposta",
    type: "proposta",
  },
];

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function Gerente() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const calendarDays = useMemo(() => {
    const firstDay = new Date(
      currentYear,
      currentMonth,
      1
    ).getDay();

    const numberOfDays = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();

    return [
      ...Array.from({ length: firstDay }, () => null),
      ...Array.from({ length: numberOfDays }, (_, i) => i + 1),
    ];
  }, [currentMonth, currentYear]);

  const selectedEvents = agenda.filter(
    (event) => event.day === selectedDay
  );

  function previousMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
    } else {
      setCurrentMonth((month) => month - 1);
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else {
      setCurrentMonth((month) => month + 1);
    }
  }

  return (
    <main
      className="w-full min-h-screen overflow-x-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #042133 0%, #002740 8%, #0D151A 93%)",
      }}
    >
      <nav>
        <Navbar />
      </nav>

      <section className="flex px-6 md:px-15 py-5 md:pt-15 flex-col">
        {/* INTRO */}

        <div className="mb-10">
          <div className="text-2xl font-semibold">
            Bem vindo de volta, Vitor
          </div>

          <div className="text-md text-[#B8CEDA]">
            Acompanhe o desempenho dos vendedores e sua agenda
          </div>
        </div>

        {/* RESUMO */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
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

        {/* CONTEÚDO PRINCIPAL */}

        <div className="grid grid-cols-1 xl:grid-cols-[1.65fr_1fr] mt-12">
          {/*PERFORMANCE*/}

          <TableSellers />

          {/* AGENDA */}

          <section className="mt-12 xl:mt-0 xl:border-l xl:border-[#31586C] xl:pl-12">
            <div className="mb-8">
              <p className="text-[11px] tracking-[0.18em] uppercase text-[#63BCE7] font-semibold">
                Equipe
              </p>

              <h2 className="text-xl font-semibold mt-2 text-[#F8FCFF]">
                Agenda geral
              </h2>
            </div>

            {/* MÊS */}

            <div className="flex justify-between items-center mb-8">
              <p className="font-semibold text-[#F8FCFF]">
                {months[currentMonth]} {currentYear}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={previousMonth}
                  className="
                    flex h-[38px] w-[38px]
                    items-center justify-center
                    border border-[#3B6275]
                    text-[#A6C2CF]
                    transition
                    hover:bg-white/[0.07]
                    hover:text-white
                "
                >
                  ←
                </button>

                <button
                  onClick={nextMonth}
                  className="
                    flex h-[38px] w-[38px]
                    items-center justify-center
                    border border-[#3B6275]
                    text-[#A6C2CF]
                    transition
                    hover:bg-white/[0.07]
                    hover:text-white
                 "
                >
                  →
                </button>
              </div>
            </div>

            {/* DIAS */}

            <div className="grid grid-cols-7 mb-3">
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  className="text-center text-[10px] text-[#78B8D8] font-semibold py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* CALENDÁRIO */}

            <div className="grid grid-cols-7 border-t border-l border-[#2E5264]">
              {calendarDays.map((day, index) => {
                const hasEvent =
                  day !== null &&
                  agenda.some(
                    (event) => event.day === day
                  );

                const isSelected =
                  selectedDay === day;

                return (
                  <button
                    key={index}
                    disabled={!day}
                    onClick={() =>
                      day && setSelectedDay(day)
                    }
                    className={`
                      aspect-square
                      relative
                      border-r
                      border-b
                      border-[#2E5264]
                      text-xs
                      transition

                      ${
                        day
                          ? "hover:bg-white/[0.055]"
                          : "cursor-default"
                      }

                      ${
                        isSelected
                          ? "bg-[#00D8F5]/16 text-[#2EE6FF] font-semibold"
                          : "text-[#B8CEDA]"
                      }
                    `}
                  >
                    {day}

                    {hasEvent && (
                      <span
                        className="
                          absolute
                          bottom-2
                          left-1/2
                          -translate-x-1/2
                          w-[4px]
                          h-[4px]
                          rounded-full
                          bg-[#00D8F5]
                        "
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* EVENTOS */}

            <div className="mt-8">
              <div className="flex justify-between mb-4">
                <p className="text-sm font-medium">
                  {selectedDay} de {months[currentMonth]}
                </p>

                <span className="text-[10px] text-[#89A8B7]">
                  {selectedEvents.length} compromissos
                </span>
              </div>

              {selectedEvents.length ? (
                selectedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="
                      grid
                      grid-cols-[52px_1fr]
                      gap-4
                      py-4
                      border-t
                      border-[#2E5264]
                    "
                  >
                    <span className="text-[11px] text-[#9AB6C4]">
                      {event.time}
                    </span>

                    <div>
                      <p className="text-sm text-[#E7F1F6]">
                        {event.title}
                      </p>

                      <p className="text-[10px] text-[#89A8B7] mt-1">
                        {event.seller}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="border-t border-[#2E5264] py-5">
                  <p className="text-xs text-[#89A8B7]">
                    Nenhum compromisso para este dia.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

