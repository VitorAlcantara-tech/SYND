import React, { useState } from "react";

export interface InsightItem {
  title: string;
  description: string;
}

const TABS = [
  { key: "oportunidades", label: "Oportunidades", color: "#FFB020" },
  { key: "dores", label: "Dores", color: "#EF4444" },
  { key: "churn", label: "Churn", color: "#EF4444" },
  { key: "task", label: "Task", color: "#21D4FD" },
] as const;

export interface InsightTabsCardProps {
  oportunidades?: InsightItem[];
  dores?: InsightItem[];
  churn?: InsightItem[];
  task?: InsightItem[];
  defaultTabKey?: string;
}

export default function InsightTabsCard({
  oportunidades = [],
  dores = [],
  churn = [],
  task = [],
  defaultTabKey,
}: InsightTabsCardProps) {
  const [activeKey, setActiveKey] = useState(defaultTabKey ?? TABS[0].key);

  const itemsByKey: Record<string, InsightItem[]> = {
    oportunidades,
    dores,
    churn,
    task,
  };

  const activeIndex = TABS.findIndex((t) => t.key === activeKey);
  const activeTab = TABS[activeIndex] ?? TABS[0];
  const activeItems = itemsByKey[activeKey] ?? [];

  return (
    <div className="w-full px-3 md:px-7 pb-7 pt-6 font-sans text-[#E6EDF3] rounded-sm">
      {/* Tabs */}
      <div className="relative mb-[22px] flex border-b border-white/10">
        {TABS.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveKey(tab.key)}
              className={`flex-1 bg-transparent pb-3.5 text-[15px] font-semibold transition-colors ${
                isActive ? "text-[#F5F8FA]" : "text-[#7C93A8]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}

        {/* Marcador deslizante */}
        <div
          className={`absolute bottom-0 h-[2px] bg-[${activeTab.color}] transition-transform duration-300 ease-out`}
          style={{
            width: `${100 / TABS.length}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
      </div>

      {/* Items */}
      <div className="flex flex-col gap-5">
        {activeItems.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-3.5 border-l-[3px] pl-3.5"
            style={{ borderColor: activeTab.color }}
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