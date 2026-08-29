import { useState, useMemo } from "react";
import {
  AlertTriangle, ListChecks, Lightbulb, CircleDot, Star, Building2, MapPin,
  Quote, Info, Video, ChevronDown, Check,
} from "lucide-react";

const riscoConfig = {
  baixo: { label: "Risco baixo", classes: "border-emerald-400 text-emerald-300 bg-emerald-950" },
  medio: { label: "Risco médio", classes: "border-amber-400 text-amber-300 bg-amber-950" },
  alto: { label: "Risco alto", classes: "border-rose-400 text-rose-300 bg-rose-950" },
};

// ------------------------------------------------------------------
// Normalização: converte o objeto bruto vindo da API (chaves em PT-BR,
// "Analise" como string JSON) no shape que o restante do componente usa.
// ------------------------------------------------------------------

function parseDataHoraBR(str) {
  if (!str) return null;
  // "2026-01-12 15:00:00" -> "2026-01-12T15:00:00" (Date fica confiável em qualquer engine)
  return str.includes("T") ? str : str.replace(" ", "T");
}

function safeParseAnalise(valor) {
  if (!valor) return {};
  if (typeof valor === "object") return valor; // já veio parseado
  try {
    return JSON.parse(valor);
  } catch (err) {
    console.error("Falha ao fazer parse de 'Analise':", err, valor);
    return {};
  }
}

function normalizeReuniao(raw) {
  const analise = safeParseAnalise(raw?.["Analise"]);

  return {
    id: raw?.["ID"],
    status: raw?.["Status"],
    idStatusReuniao: raw?.["ID status da reunião"],
    data: parseDataHoraBR(raw?.["Data"]),
    dataCriacao: parseDataHoraBR(raw?.["Data de criação"]),
    formato: raw?.["Formato da reunião"],
    duracao: raw?.["Duração"] ?? "00:00:00",
    codt: raw?.["CODT"],
    tipoRecurso: raw?.["Tipo de recurso"],
    reuniaoExterna: raw?.["Reunião externa"],
    uf: raw?.["UF"],
    cnae: raw?.["CNAE"],
    unidade: raw?.["Nome da unidade"],
    segmento: raw?.["Segmento"],
    faixaFaturamento: raw?.["Faixa de faturamento do cliente"],
    dataUltimaPesquisa: raw?.["Data da última pesquisa"],
    nps: raw?.["Nota NPS"],

    resumoGeral: analise.resumo_geral ?? "",
    principaisAssuntos: analise.principais_assuntos ?? "",

    // No JSON real, "dores"/"oportunidades" são um parágrafo único, e as
    // citações ficam soltas em "trechos_chave_*" (sem pareamento 1:1 com
    // uma afirmação específica) — diferente do mock antigo, que tinha
    // {texto, trecho} pareados item a item.
    dores: {
      resumo: analise.dores ?? "",
      trechos: analise.trechos_chave_dores ?? [],
    },
    oportunidades: {
      resumo: analise.oportunidades ?? "",
      trechos: analise.trechos_chave_oportunidades ?? [],
    },

    // Idem: "trechos_chave_tarefas" é uma lista solta, não amarrada a uma
    // tarefa específica, então cada tarefa fica sem "trecho" individual.
    tarefas: (analise.tarefas ?? []).map((t) => ({
      nome: t.nome,
      data: t.data_prevista ?? "Não identificado",
    })),

    riscoChurn: analise.risco_churn ?? "baixo",
    evidenciasChurn: analise.evidencias_churn ?? [],
    sentimento: analise.sentimento ?? 0,
  };
}

// ------------------------------------------------------------------
// Componentes auxiliares (inalterados na aparência)
// ------------------------------------------------------------------

function formatDataHora(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return (
    d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }) +
    " · " +
    d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  );
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

/** Seção recolhível: título sempre visível, conteúdo (itens) some/aparece ao clicar */
function CollapsibleSection({ icon, title, accent, items, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const [openQuote, setOpenQuote] = useState(null);

  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-slate-900/60 hover:bg-slate-900 transition-colors"
      >
        <span className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${accent}`}>
          {icon} {title}
          <span className="text-slate-500 font-normal normal-case">({items.length})</span>
        </span>
        <ChevronDown size={15} className={`text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="px-4 py-3 space-y-2 bg-slate-950">
          {items.map((item, i) => (
            <li key={i}>
              <button
                onClick={() => item.trecho && setOpenQuote(openQuote === i ? null : i)}
                className="w-full text-left flex items-start gap-2 group"
                disabled={!item.trecho}
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                <span className="text-sm text-slate-300">
                  {item.texto}
                  {item.trecho && (
                    <span className="ml-1.5 text-[10px] text-slate-500 group-hover:text-slate-300">
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

/**
 * Divide um parágrafo em afirmações individuais, usando vírgula e a
 * conjunção " e " como separadores (heurística simples para PT-BR).
 */
function splitEmAfirmacoes(str) {
  if (!str) return [];
  return str
    .split(/,| e (?=[a-zà-ú])/i)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean);
}

/**
 * Cada afirmação extraída de "dores"/"oportunidades" vira um item visível
 * no card; a citação correspondente em trechos_chave_* fica escondida
 * atrás do "ver trecho" (pareamento por posição, best-effort).
 */
function BlocoAnalise({ icon, title, accent, resumo, trechos }) {
  const afirmacoes = splitEmAfirmacoes(resumo);
  if (afirmacoes.length === 0) return null;

  const total = Math.max(afirmacoes.length, trechos.length);
  const items = Array.from({ length: total }, (_, i) => ({
    texto: afirmacoes[i] ?? "Ponto adicional identificado",
    trecho: trechos[i] ?? null,
  }));

  return (
    <CollapsibleSection icon={icon} title={title} accent={accent} items={items} />
  );
}

/** Checklist de tarefas com estado de concluído + trecho opcional */
function TaskChecklist({ tarefas }) {
  const [done, setDone] = useState(() => tarefas.map(() => false));
  const [openQuote, setOpenQuote] = useState(null);

  const toggle = (i) => setDone((d) => d.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/60">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-300">
          <ListChecks size={13} /> Próximos passos
          <span className="text-slate-500 font-normal normal-case">
            ({done.filter(Boolean).length}/{tarefas.length})
          </span>
        </span>
      </div>
      <ul className="px-4 py-3 space-y-3 bg-slate-950">
        {tarefas.map((t, i) => (
          <li key={`${t.nome}-${i}`}>
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
                  {t.nome}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[11px] text-slate-500">Prazo: {t.data}</p>
                  {t.trecho && (
                    <button
                      onClick={() => setOpenQuote(openQuote === i ? null : i)}
                      className="text-[10px] text-slate-500 hover:text-slate-300"
                    >
                      {openQuote === i ? "ocultar trecho" : "ver trecho"}
                    </button>
                  )}
                </div>
                {openQuote === i && t.trecho && (
                  <div className="mt-1.5 flex items-start gap-2 border-l-2 border-slate-700 pl-3">
                    <Quote size={11} className="shrink-0 mt-0.5 text-slate-600" />
                    <p className="text-xs italic text-slate-500 leading-relaxed">"{t.trecho}"</p>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ------------------------------------------------------------------
// Componente principal — agora recebe os dados brutos da API via prop
// ------------------------------------------------------------------

export default function ReuniaoCard({ data: rawData }) {
  const [showMeta, setShowMeta] = useState(false);
  const data = useMemo(() => normalizeReuniao(rawData), [rawData]);
  const risco = riscoConfig[data.riscoChurn] ?? riscoConfig.baixo;

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
            <Building2 size={18} className="text-blue-950" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{data.unidade}</p>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin size={11} /> {data.uf} · {data.segmento}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Waveform />
          <div className="text-right">
            <p className="text-xs text-slate-400">{formatDataHora(data.data)}</p>
            <p className="text-xs text-slate-500 flex items-center gap-1 justify-end">
              <Video size={11} /> {data.formato} · {data.duracao.slice(0, 5)}min
            </p>
          </div>
        </div>
      </div>

      {/* Faixa de indicadores (sempre visível) */}
      <div className="flex flex-wrap items-center gap-3 px-6 py-3 border-b border-slate-800 bg-slate-900/50">
        <span className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide border rounded-full px-3 py-1 ${risco.classes}`}>
          <AlertTriangle size={12} /> {risco.label}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 rounded-full px-3 py-1">
          <Star size={12} className="text-blue-400" /> NPS {data.nps}
        </span>
        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800 rounded-full px-3 py-1">
          Sentimento
          <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${(data.sentimento / 10) * 100}%` }} />
          </div>
          {data.sentimento}/10
        </div>

        <button
          onClick={() => setShowMeta((v) => !v)}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 rounded-full px-3 py-1 ml-auto"
        >
          <Info size={12} /> {showMeta ? "ocultar detalhes" : "mais detalhes"}
          <ChevronDown size={13} className={`transition-transform ${showMeta ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Metadados completos (recolhíveis) */}
      {showMeta && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 py-4 border-b border-slate-800 bg-slate-900/30">
          <Meta label="ID" value={data.id} />
          <Meta label="Status" value={`${data.status} (${data.idStatusReuniao})`} />
          <Meta label="Criada em" value={formatDataHora(data.dataCriacao)} />
          <Meta label="CODT" value={data.codt} />
          <Meta label="CNAE" value={data.cnae} />
          <Meta label="Faturamento" value={data.faixaFaturamento} />
          <Meta label="Última pesquisa NPS" value={data.dataUltimaPesquisa} />
          <Meta label="Reunião externa" value={data.reuniaoExterna ? "Sim" : "Não"} />
          <Meta label="Tipo de recurso" value={data.tipoRecurso} />
        </div>
      )}

      {/* Corpo */}
      <div className="px-6 py-6 space-y-5">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Resumo</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{data.resumoGeral}</p>
        </div>

        <BlocoAnalise
          icon={<CircleDot size={13} />}
          title="Dores"
          accent="text-rose-400"
          resumo={data.dores.resumo}
          trechos={data.dores.trechos}
        />

        <BlocoAnalise
          icon={<Lightbulb size={13} />}
          title="Oportunidades"
          accent="text-blue-400"
          resumo={data.oportunidades.resumo}
          trechos={data.oportunidades.trechos}
        />

        <TaskChecklist tarefas={data.tarefas} />

        {data.evidenciasChurn.length > 0 && (
          <CollapsibleSection
            icon={<AlertTriangle size={13} />}
            title="Evidências de churn"
            accent="text-amber-400"
            items={data.evidenciasChurn.map((e) => ({ texto: e, trecho: null }))}
          />
        )}
      </div>
    </div>
  );
}