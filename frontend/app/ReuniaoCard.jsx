import { useState } from "react";
import {
  AlertTriangle, ListChecks, Lightbulb, CircleDot, Star, Building2, MapPin,
  Quote, Info, Video, ChevronDown, Check,
} from "lucide-react";

const mockData = {
  id: "907223",
  data: "2026-01-12T15:00:00",
  dataCriacao: "2026-01-12T11:17:36",
  formato: "VIDEO",
  idStatusReuniao: "3",
  status: "COMPLETED",
  duracao: "00:31:14",
  codt: "TFBER2",
  tipoRecurso: "",
  reuniaoExterna: true,
  uf: "RS",
  cnae: "4639701",
  unidade: "TOTVS RIO GRANDE DO SUL",
  segmento: "DISTRIBUICAO",
  faixaFaturamento: "06.SMB III - De R$ 120.000.001 a R$ 240.000.000",
  dataUltimaPesquisa: "2024-01",
  nps: 4,

  resumo_geral:
    "Reunião entre a equipe da TOTVS e o cliente do segmento de distribuição para alinhar necessidades de consultoria e treinamento contábil/fiscal. O cliente relatou a contratação recente de um escritório contábil externo que não domina o ERP WinThor, além da urgência em adequar parametrizações para a Reforma Tributária. A TOTVS propôs o envio de um checklist de assessment para mapear processos não utilizados e dimensionar uma proposta de horas de consultoria sob medida.",
  principais_assuntos:
    "Treinamento do sistema WinThor para o novo escritório de contabilidade externo e equipe interna; parametrizações e adequações para a Reforma Tributária; interesse no produto de Inteligência Tributária (rotina 7000); envio de checklist de assessment de processos; automação financeira (PagFor, conciliação bancária e Bolepix).",

  dores: [
    { texto: "Terceirização da contabilidade para um escritório externo que não possui conhecimento no ERP WinThor",
      trecho: "com a saída dela e passando essa parte mais contábil para o escritório de contabilidade, eles não têm esse conhecimento sobre o mentor" },
    { texto: "Falta de parametrização e treinamento internos para as exigências da Reforma Tributária",
      trecho: "não parametrizaram nada ainda não atualizaram. Não tem nada referente à reforma tributária ainda rodando dentro do sistema." },
    { texto: "Desconhecimento sobre o portfólio de produtos e soluções da TOTVS que poderiam otimizar rotinas manuais",
      trecho: "como eu não tenho hoje uma vitrine da TOTOS para entender o que de produto vocês têm à venda, têm a oferecer para nós, e que possa justamente ajudar o nosso dia a dia aqui." },
    { texto: "Conciliação bancária e PagFor não utilizados",
      trecho: "hoje a gente não utiliza a conciliação bancária, por exemplo." },
  ],

  oportunidades: [
    { texto: "Venda de horas de consultoria e treinamento nos módulos Contábil e Fiscal",
      trecho: "queríamos, justamente, uma consultoria na parte de contabilidade e fiscal para que a gente possa treinar a equipe externa lá do escritório" },
    { texto: "Contratação e implementação do produto de Inteligência Tributária (rotina 7000)",
      trecho: "um produto de vocês que seria a parte mais de inteligência voltada ali na parte de tributos, que se eu não me engano era a rotina 7.000, inteligência tributária" },
    { texto: "Atualização e parametrização para a Reforma Tributária (rotina 4000, versão 37 e DOC Fiscal)",
      trecho: null },
    { texto: "Automações financeiras (PagFor/CNAB e conciliação bancária, rotina 643)",
      trecho: "fazer um projeto para você de um contrato de horas de consultoria dentro daquilo que você vai realmente necessitar" },
  ],

  tarefas: [
    { nome: "Organizar e enviar a planilha/checklist de assessment de processos para o cliente", data: "Não identificado",
      trecho: "Eu vou organizar o documento aqui, aí eu passo para o [PESSOA] e você encaminha para eles" },
    { nome: "Preencher e retornar o checklist de assessment com as aderências dos setores", data: "Não identificado",
      trecho: "Eu só fico no aguardo de vocês assim que eu enviar para vocês aí a planilha, vocês me responderem o mais rápido possível para a gente já dar andamento no processo." },
    { nome: "Elaborar e apresentar a proposta comercial/orçamento para treinamento e consultoria contábil/fiscal", data: "Não identificado",
      trecho: "A gente fazer esse levantamento de possíveis demandas aí e a segunda coisa é fazer um orçamento para a gente ter esse treinamento cont e fiscal." },
  ],

  risco_churn: "baixo",
  evidencias_churn: [],
  sentimento: 8.0,
};

const riscoConfig = {
  baixo: { label: "Risco baixo", classes: "border-emerald-400 text-emerald-300 bg-emerald-950" },
  medio: { label: "Risco médio", classes: "border-amber-400 text-amber-300 bg-amber-950" },
  alto: { label: "Risco alto", classes: "border-rose-400 text-rose-300 bg-rose-950" },
  default: { label: "Risco não informado", classes: "border-slate-600 text-slate-400 bg-slate-800" },
};

function formatDataHora(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }) +
    " · " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function normalizarItems(items) {
  if (!items) return [];
  if (Array.isArray(items)) {
    return items.map((item) => {
      if (typeof item === "string") return { texto: item, trecho: null };
      return { texto: item.texto || item.nome || "", trecho: item.trecho || null };
    });
  }
  if (typeof items === "string") return [{ texto: items, trecho: null }];
  return [];
}

function Waveform() {
  const heights = [6, 12, 18, 10, 22, 14, 8, 16, 20, 10, 6, 14, 18, 8, 12];
  return (
    <div className="flex items-end gap-[3px] h-6">
      {heights.map((h, i) => (
        <div key={i} className="w-[3px] rounded-full bg-blue-500" style={{ height: `${h}px` }} />
      ))}
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-slate-500">{label}</p>
      <p className="text-xs text-slate-300 mt-0.5">{value || "—"}</p>
    </div>
  );
}

function CollapsibleSection({ icon, title, accent, items, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const [openQuote, setOpenQuote] = useState(null);

  const normalizedItems = normalizarItems(items);

  if (!normalizedItems.length) return null;

  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-slate-900/60 hover:bg-slate-900 transition-colors"
      >
        <span className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${accent}`}>
          {icon} {title}
          <span className="text-slate-500 font-normal normal-case">({normalizedItems.length})</span>
        </span>
        <ChevronDown size={15} className={`text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="px-4 py-3 space-y-2 bg-slate-950 border-t border-slate-800/50">
          {normalizedItems.map((item, i) => (
            <li key={i}>
              <button
                onClick={() => item.trecho && setOpenQuote(openQuote === i ? null : i)}
                className="w-full text-left flex items-start gap-2 group cursor-pointer disabled:cursor-default"
                disabled={!item.trecho}
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                <span className="text-sm text-slate-300">
                  {item.texto}
                  {item.trecho && (
                    <span className="ml-1.5 text-[10px] text-slate-500 group-hover:text-slate-300 underline underline-offset-2">
                      {openQuote === i ? "ocultar trecho" : "ver trecho"}
                    </span>
                  )}
                </span>
              </button>
              {openQuote === i && item.trecho && (
                <div className="mt-1.5 ml-3.5 flex items-start gap-2 border-l-2 border-slate-700 pl-3">
                  <Quote size={11} className="shrink-0 mt-0.5 text-slate-600" />
                  <p className="text-xs italic text-slate-500 leading-relaxed">"{item.trecho}"</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TaskChecklist({ tarefas }) {
  const normalizedTasks = Array.isArray(tarefas) ? tarefas : [];
  const [done, setDone] = useState(() => normalizedTasks.map(() => false));
  const [openQuote, setOpenQuote] = useState(null);

  if (!normalizedTasks.length) return null;

  const toggle = (i) => setDone((d) => d.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/60">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-300">
          <ListChecks size={13} /> Próximos passos
          <span className="text-slate-500 font-normal normal-case">
            ({done.filter(Boolean).length}/{normalizedTasks.length})
          </span>
        </span>
      </div>
      <ul className="px-4 py-3 space-y-3 bg-slate-950 border-t border-slate-800/50">
        {normalizedTasks.map((t, i) => {
          const nome = typeof t === "string" ? t : t.nome || t.texto;
          const dataPrazo = t.data || t.data_prevista || "Não informado";
          const trecho = t.trecho;

          return (
            <li key={i}>
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggle(i)}
                  aria-label={done[i] ? "Marcar como pendente" : "Marcar como concluída"}
                  className={`mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors ${
                    done[i] ? "bg-blue-500 border-blue-500" : "border-slate-600 hover:border-blue-400"
                  }`}
                >
                  {done[i] && <Check size={11} className="text-blue-950" />}
                </button>
                <div className="flex-1">
                  <p className={`text-sm ${done[i] ? "text-slate-500 line-through" : "text-slate-300"}`}>
                    {nome}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[11px] text-slate-500">Prazo: {dataPrazo}</p>
                    {trecho && (
                      <button
                        onClick={() => setOpenQuote(openQuote === i ? null : i)}
                        className="text-[10px] text-slate-500 hover:text-slate-300 underline underline-offset-2"
                      >
                        {openQuote === i ? "ocultar trecho" : "ver trecho"}
                      </button>
                    )}
                  </div>
                  {openQuote === i && trecho && (
                    <div className="mt-1.5 flex items-start gap-2 border-l-2 border-slate-700 pl-3">
                      <Quote size={11} className="shrink-0 mt-0.5 text-slate-600" />
                      <p className="text-xs italic text-slate-500 leading-relaxed">"{trecho}"</p>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function ReuniaoCard({ data: inputData }) {
  const [showMeta, setShowMeta] = useState(false);

  // Fallback seguro: aceita prop externa ou usa o mock incorporado
  const raw = inputData || mockData;

  // Realiza parse de Analise se necessário
  let analiseParsed = {};
  if (raw.Analise) {
    try {
      analiseParsed = typeof raw.Analise === "string" ? JSON.parse(raw.Analise) : raw.Analise;
    } catch (e) {
      console.error("Erro ao converter Analise:", e);
    }
  }

  const data = { ...raw, ...analiseParsed };

  const riscoKey = (data.risco_churn || "").toLowerCase();
  const risco = riscoConfig[riscoKey] ?? riscoConfig.default;

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
            <Building2 size={18} className="text-blue-950" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{data.unidade || data["Nome da unidade"] || "—"}</p>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin size={11} /> {data.uf || data.UF || "—"} · {data.segmento || data.Segmento || "—"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Waveform />
          <div className="text-right">
            <p className="text-xs text-slate-400">{formatDataHora(data.data || data.Data)}</p>
            <p className="text-xs text-slate-500 flex items-center gap-1 justify-end">
              <Video size={11} /> {data.formato || data["Formato da reunião"] || "—"} · {(data.duracao || data["Duração"] || "").slice(0, 5)}min
            </p>
          </div>
        </div>
      </div>

      {/* Faixa de indicadores */}
      <div className="flex flex-wrap items-center gap-3 px-6 py-3 border-b border-slate-800 bg-slate-900/50">
        <span className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide border rounded-full px-3 py-1 ${risco.classes}`}>
          <AlertTriangle size={12} /> {risco.label}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 rounded-full px-3 py-1">
          <Star size={12} className="text-blue-400" /> NPS {data.nps ?? data["Nota NPS"] ?? "—"}
        </span>
        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800 rounded-full px-3 py-1">
          Sentimento
          <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${((data.sentimento ?? 0) / 10) * 100}%` }} />
          </div>
          {data.sentimento ?? "—"}/10
        </div>

        <button
          onClick={() => setShowMeta((v) => !v)}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 rounded-full px-3 py-1 ml-auto transition-colors"
        >
          <Info size={12} /> {showMeta ? "ocultar detalhes" : "mais detalhes"}
          <ChevronDown size={13} className={`transition-transform ${showMeta ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Metadados completos */}
      {showMeta && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 py-4 border-b border-slate-800 bg-slate-900/30">
          <Meta label="ID" value={data.id || data.ID} />
          <Meta label="Status" value={`${data.status || data.Status || ""} (${data.idStatusReuniao || data["ID status da reunião"] || ""})`} />
          <Meta label="Criada em" value={formatDataHora(data.dataCriacao || data["Data de criação"])} />
          <Meta label="CODT" value={data.codt || data.CODT} />
          <Meta label="CNAE" value={data.cnae || data.CNAE} />
          <Meta label="Faturamento" value={data.faixaFaturamento || data["Faixa de faturamento do cliente"]} />
          <Meta label="Última pesquisa NPS" value={data.dataUltimaPesquisa || data["Data da última pesquisa"]} />
          <Meta label="Reunião externa" value={(data.reuniaoExterna ?? data["Reunião externa"]) ? "Sim" : "Não"} />
          <Meta label="Tipo de recurso" value={data.tipoRecurso || data["Tipo de recurso"]} />
        </div>
      )}

      {/* Corpo */}
      <div className="px-6 py-6 space-y-5">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Resumo</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{data.resumo_geral || "—"}</p>
        </div>

        {data.principais_assuntos && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Principais Assuntos</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{data.principais_assuntos}</p>
          </div>
        )}

        <CollapsibleSection
          icon={<CircleDot size={13} />}
          title="Dores"
          accent="text-rose-400"
          items={data.dores}
          defaultOpen={true}
        />

        <CollapsibleSection
          icon={<Lightbulb size={13} />}
          title="Oportunidades"
          accent="text-blue-400"
          items={data.oportunidades}
          defaultOpen={true}
        />

        <TaskChecklist tarefas={data.tarefas} />

        {data.evidencias_churn && data.evidencias_churn.length > 0 && (
          <CollapsibleSection
            icon={<AlertTriangle size={13} />}
            title="Evidências de churn"
            accent="text-amber-400"
            items={data.evidencias_churn}
          />
        )}
      </div>
    </div>
  );
}