import React from "react";
import { Calendar, SlidersHorizontal, LucideIcon, HeartHandshake } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 28 },
  { month: "Mar", value: 42 },
  { month: "Apr", value: 40 },
  { month: "May", value: 58 },
  { month: "Jun", value: 55 },
  { month: "Jul", value: 62 },
  { month: "Aug", value: 45 },
  { month: "Sep", value: 48 },
  { month: "Oct", value: 56 },
  { month: "Nov", value: 54 },
  { month: "Dec", value: 30 },
];

interface BadgeProps {
  icon?: LucideIcon;
  children: React.ReactNode;
}

function Badge({ icon: Icon, children }: BadgeProps) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        background: "rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.85)",
        fontSize: "12px",
        padding: "6px 12px",
        borderRadius: "5px",
        border: "1px solid rgba(255,255,255,0.1)",
        whiteSpace: "nowrap",
      }}
    >
      {Icon && <Icon size={13} />}
      {children}
    </span>
  );
}

function DashboardHeader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      <Badge>12 months</Badge>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Badge icon={Calendar}>Jan 8, 2027 – Jan 8, 2029</Badge>
        <Badge icon={SlidersHorizontal}>Filters</Badge>
      </div>
    </div>
  );
}

function SentimentDashboard() {
  return (
    <div
      style={{
        borderRadius: "12px",
        color: "#fff",
        fontFamily: "sans-serif",
        width: "100%",
        userSelect: "none",
      }}
    >
      {/* <DashboardHeader />

      <style>{`
        .recharts-wrapper:focus,
        .recharts-wrapper *:focus,
        .recharts-surface:focus {
          outline: none !important;
        }
      `}</style> */}

      <h3
        style={{
          margin: "0 0 16px 0",
          fontWeight: 500,
          fontSize: '25px',
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        Evolução do Sentimento <HeartHandshake color="#04d5f9"/>
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <ReferenceLine y={20} stroke="rgba(255,255,255,0.35)" strokeWidth={1} />
          <ReferenceLine y={40} stroke="rgba(255,255,255,0.35)" strokeWidth={1} />
          <ReferenceLine y={60} stroke="rgba(255,255,255,0.35)" strokeWidth={1} />
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.3)", strokeWidth: 1 }}
            contentStyle={{
              background: "#0b2942",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "8px",
              color: "#fff",
            }}
            labelStyle={{ color: "rgba(255,255,255,0.7)" }}
            itemStyle={{ color: "#fff" }}
          />
          <XAxis
            dataKey="month"
            axisLine={{ stroke: "rgba(255,255,255,0.6)", strokeWidth: 3 }}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
          />
          <YAxis
            hide={false}
            axisLine={{ stroke: "rgba(255,255,255,0.6)", strokeWidth: 3 }}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
            domain={[0, 80]}
            ticks={[20, 40, 60]}
            width={40}
          />
          <Line
            type="linear"
            dataKey="value"
            stroke="#ffffff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SentimentDashboard;