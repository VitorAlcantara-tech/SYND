import React, { useState } from "react";

export interface InsightItem {
  title: string;
  description: string;
}

export interface InsightTab {
  key: string;
  label: string;
  items: InsightItem[];
}

export interface InsightTabsCardProps {
  tabs?: InsightTab[];
  defaultTabKey?: string;
}

const defaultTabs: InsightTab[] = [
  {
    key: "oportunidades",
    label: "Oportunidades",
    items: [
      {
        title: "Enviar proposta do módulo de BI",
        description:
          "Não vejo a hora de desligar o computador e esquecer que essa semana existiu. Nem me fale, se meu chefe pedir mais uma reunião rápida hoje eu tenho um surto",
      },
    ],
  },
  {
    key: "dores",
    label: "Dores",
    items: [
      {
        title: "Rever Contatos",
        description:
          "Você jura que não contou pra ninguém sobre o que aconteceu no sábado? Claro que não, minha boca é um túmulo! Mas me conta, já tem novidade?",
      },
    ],
  },
  {
    key: "churn",
    label: "Churn",
    items: [
      {
        title: "Reiniciar Roteador",
        description:
          "Cara, tenta só reiniciar o roteador antes de ligar pra operadora de novo. Já fiz isso três vezes e continuo sem sinal, tô quase jogando esse aparelho pela janela.",
      },{
        title: "Rever Contatos",
        description:
          "Você jura que não contou pra ninguém sobre o que aconteceu no sábado? Claro que não, minha boca é um túmulo! Mas me conta, já tem novidade?",
      },{
        title: "Enviar proposta do módulo de BI",
        description:
          "Não vejo a hora de desligar o computador e esquecer que essa semana existiu. Nem me fale, se meu chefe pedir mais uma reunião rápida hoje eu tenho um surto",
      }
    ],
  },
];

export default function InsightTabsCard({
  tabs = defaultTabs,
  defaultTabKey,
}: InsightTabsCardProps) {
  const [activeKey, setActiveKey] = useState(defaultTabKey ?? tabs[0]?.key);

  const activeTab = tabs.find((t) => t.key === activeKey) ?? tabs[0];

  return (
    <div className="w-full px-3 md:px-7 pb-7 pt-6 font-sans text-[#E6EDF3] rounded-sm">
      {/* Tabs */}
      <div className="mb-[22px] flex justify-between border-b border-white/10">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab?.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveKey(tab.key)}
              className={`flex-1 border-b-2 bg-transparent pb-3.5 text-[15px] font-semibold transition-colors ${
                isActive
                  ? "border-[#F5F8FA] text-[#F5F8FA]"
                  : "border-transparent text-[#7C93A8]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Items */}
      <div className="flex flex-col gap-5">
        {activeTab?.items.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-3.5 border-l-[3px] border-[#3FD0F5] pl-3.5"
          >
            <div>
              <div className="mb-1.5 text-[15px] font-bold text-[#F5F8FA]">
                {item.title}
              </div>
              <p className="m-0 text-sm leading-relaxed text-[#C7D3DD]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}