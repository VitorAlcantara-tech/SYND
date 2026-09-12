'use client';

import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

interface Vendedor {
    nome: string;
    local: string;
    iniciais: string;
    corTema: string; // cor de destaque do card: borda topo, % atingimento, barra e sparkline
    corAvatar: string;
    tendencia: string;
    atingimento: number; // percentual, pode passar de 100
    reunioesFeitas: number;
    reunioesTotal: number;
    sentimento: number; // 0 a 10
    oportunidades: number;
    churn: number;
    historico: number[]; // pontos pro mini-gráfico de tendência
}

interface VendedoresGridProps {
    vendedores: Vendedor[];
    onVerDetalhes?: (vendedor: Vendedor) => void;
}

function IconeTendencia({ tendencia }: { tendencia: Vendedor['tendencia'] }) {
    if (tendencia === 'alta') {
        return <TrendingUp size={16} className="text-[#4ADE80]" />;
    }
    if (tendencia === 'baixa') {
        return <TrendingDown size={16} className="text-[#FF6B6B]" />;
    }
    return <Minus size={16} className="text-[#6B8494]" />;
}

function corSentimento(valor: number) {
    if (valor < 6) return '#FF6B6B';
    if (valor < 5.5) return 'text-[#2DD4FF]';
    return '#2DD4FF';
}

function corChurn(valor: number) {
    if (valor === 0) return '#FFFFFF';
    if (valor <= 2) return '#FF6B6B';
    return '#FF6B6B';
}

function VendedorCard({
    vendedor,
    onVerDetalhes,
}: {
    vendedor: Vendedor;
    onVerDetalhes?: (vendedor: Vendedor) => void;
}) {
    const dadosSparkline = vendedor.historico.map((valor, index) => ({ index, valor }));

    return (
        <div className={`relative border-1 border-[#0D151A]/15 bg-[#0D151A]/40 rounded-sm overflow-hidden transition-all`}
        style={{ '--hover-border': vendedor.corAvatar } as React.CSSProperties}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = `${vendedor.corAvatar}40`}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
        >
            {/* barra de destaque no topo */}
            <div className="h-1 w-full" style={{ backgroundColor: vendedor.corTema, opacity: 0.4}} />

            <div className="p-5">
                {/* cabeçalho: avatar, nome, local, tendência */}
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3 min-w-0">
                        <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
                            style={{ backgroundColor: vendedor.corAvatar }}
                        >
                            {vendedor.iniciais}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                                {vendedor.nome}
                            </p>
                            <p className="text-xs text-[#7C99A8] truncate">{vendedor.local}</p>
                        </div>
                    </div>
                    <IconeTendencia tendencia={vendedor.tendencia} />
                </div>

                {/* atingimento */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold tracking-wide text-[#7C99A8]">
                        UPLOADS CONCLUÍDOS
                    </span>
                    <span
                        className="text-xs font-bold"
                        style={{ color: vendedor.corTema }}
                    >
                        {vendedor.atingimento}%
                    </span>
                </div>
                <div className="w-full h-1.5 bg-[#12384B] rounded-full overflow-hidden mb-1.5">
                    <div
                        className="h-full rounded-full"
                        style={{
                            width: `${Math.min(vendedor.atingimento, 100)}%`,
                            backgroundColor: vendedor.corTema, opacity: 0.6
                        }}
                    />
                </div>
                <p className="text-xs text-[#7C99A8] mb-5">
                    {vendedor.reunioesFeitas} de {vendedor.reunioesTotal} reuniões
                </p>

                {/* métricas */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-[#0D151A]/50 rounded-sm px-2 py-2">
                        <p className="text-[9px] font-bold tracking-wide text-[#7C99A8] mb-1">
                            SENTIMENTO
                        </p>
                        <p
                            className="text-sm font-bold"
                            style={{ color: corSentimento(vendedor.sentimento) }}
                        >
                            {vendedor.sentimento.toFixed(1)}
                        </p>
                    </div>
                    <div className="bg-[#0D151A]/50 rounded-sm px-2 py-2">
                        <p className="text-[9px] font-bold tracking-wide text-[#7C99A8] mb-1">
                            CLIENTES
                        </p>
                        <p className="text-sm font-bold">
                            {vendedor.oportunidades}
                        </p>
                    </div>
                    <div className="bg-[#0D151A]/50 rounded-sm px-2 py-2">
                        <p className="text-[9px] font-bold tracking-wide text-[#7C99A8] mb-1">
                            CHURN
                        </p>
                        <p
                            className="text-sm font-bold"
                            style={{ color: corChurn(vendedor.churn)}}
                        >
                            {vendedor.churn}
                        </p>
                    </div>
                </div>

                {/* sparkline */}
                <div className="h-8 mb-3">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dadosSparkline}>
                            <Line
                                type="monotone"
                                dataKey="valor"
                                stroke={vendedor.corTema}
                                strokeWidth={1.5}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <Link
                    href="/vendedor-dash"
                    type="button"
                    className="flex items-center gap-1 text-xs text-[#7C99A8] hover:text-[#8FE8FF] transition-colors ml-auto"
                >
                    Ver detalhes <ArrowRight size={12} />
                </Link>
            </div>
        </div>
    );
}

export default function VendedoresGrid({ vendedores, onVerDetalhes }: VendedoresGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {vendedores.map((vendedor) => (
                <VendedorCard
                    key={vendedor.nome}
                    vendedor={vendedor}
                    onVerDetalhes={onVerDetalhes}
                />
            ))}
        </div>
    );
}
