import { ArrowUpRight } from "lucide-react";

export interface TranscriptCardProps {
  meetingLabel?: string;
  meetingTitle?: string;
  duration?: string;
  speakers?: string;
  sentimentLabel?: string;
  sentimentScore?: number;
  summaryLabel?: string;
  summary?: string;
  onOpen?: () => void;
}
 
export default function CardResult({
  meetingLabel = "REUNIÃO",
  meetingTitle = "Renovação de contrato - Alpha Log",
  duration = "48 min",
  speakers = "3 locutores",
  sentimentLabel = "Positivo",
  sentimentScore = 8.7,
  summaryLabel = "RESUMO",
  summary = "Cliente satisfeito com a operação atual, demonstrando total confiança nos serviços prestados. A relação consolidada abre oportunidade estratégica para expansão contratual. No próximo trimestre, o foco será ampliar o escopo para logística reversa. A iniciativa visa otimizar processos e agregar ainda mais valor à parceria.",
  onOpen = () => {},
}: TranscriptCardProps) {
  return (
    <div className="lg:border-l-2 border-white/80 lg:pr-10">
    <div className="flex w-full box-border rounded-[5px] px-3 lg:px-8 py-7 font-sans text-[#E6EDF3]">
      <div>
      {/* Header */}
      <div className="mb-1 lg:mb-5 flex items-center justify-between">
        <h2 className="m-0 lg:text-xl lg:font-semibold text-[11px] tracking-wide text-[#7C93A8] lg:text-[#F5F8FA]">
          TRANSCRIÇÃO
        </h2>
        <button
          onClick={onOpen}
          className="border-b-[2px] pl-1 py-1 text-sm font-semibold text-[#3FD0F5]"
        >
          <ArrowUpRight/>
        </button>
      </div>
 
      {/* Meeting info */}
      <div className="mb-[22px]">
        <div className="mb-1.5 text-[11px] tracking-wide text-[#7C93A8]">
          {meetingLabel}
        </div>
        <div className="text-md lg:text-lg font-semibold text-[#F5F8FA]">
          {meetingTitle}
        </div>
      </div>
 
      {/* Stats row */}
      <div className="mb-5 flex flex-wrap justify-between lg:justify-start lg:gap-12 border-b border-white/10 pb-5">
        <Stat label="Duração" value={duration} />
        <Stat label="Locutores" value={speakers} />
        <Stat
          label="Sentimento"
          value={`${sentimentLabel} - ${sentimentScore}`}
          valueColor="text-[#04D5F9]"
        />
      </div>
 
      {/* Summary */}
      <div>
        <div className="mb-2.5 text-[11px] tracking-wide text-[#7C93A8]">
          {summaryLabel}
        </div>
        <div className="flex gap-3.5">
          <div className="w-[3px] shrink-0 rounded-sm bg-[#3FD0F5]" />
          <p className="m-0 text-md leading-relaxed text-[#eff1f1]">
            {summary}
          </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
 
interface StatProps {
  label: string;
  value: string;
  valueColor?: string;
}
 
function Stat({ label, value, valueColor = "text-[#F5F8FA]" }: StatProps) {
  return (
    <div>
      <div className="mb-1 text-[13px] text-[#7C93A8]">{label}</div>
      <div className={`text-base font-bold ${valueColor}`}>{value}</div>
    </div>
  );
}
 