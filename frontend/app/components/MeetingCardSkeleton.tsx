'use client'

/**
 * Skeleton do card de reunião — imita a silhueta real de
 * CardResult + InsightTabsCard lado a lado, com um shimmer
 * sutil passando por cima em vez de um "Carregando..." genérico.
 *
 * Uso:
 *   {(isLoading || isLoadingReq) && <MeetingCardSkeleton />}
 *
 * Requer o keyframe abaixo no seu globals.css (uma vez só):
 *
 *   @keyframes shimmer {
 *     100% { transform: translateX(100%); }
 *   }
 */

function Bar({ className = "" }: { className?: string }) {
    return (
        <div className={`rounded-md bg-white/10 ${className}`} />
    )
}

function ShimmerOverlay() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
                className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(45,212,255,0.08), transparent)",
                }}
            />
        </div>
    )
}

export default function MeetingCardSkeleton() {
    return (
        <div className="flex-[0_0_100%] min-w-0 flex flex-col md:flex-row md:bg-black/15 rounded-md justify-end relative overflow-hidden">
            <ShimmerOverlay />

            {/* Lado esquerdo — espelha o CardResult */}
            <article className="w-full md:w-[50%] p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <Bar className="h-5 w-40" />
                    <Bar className="h-5 w-16 rounded-full" />
                </div>

                <div className="flex flex-col gap-2">
                    <Bar className="h-3 w-full" />
                    <Bar className="h-3 w-[90%]" />
                    <Bar className="h-3 w-[75%]" />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                    <Bar className="h-45 w-full" />
                </div>
            </article>

            {/* Lado direito — espelha o InsightTabsCard */}
            <article className="w-full md:w-[50%] p-5 flex flex-col gap-4">
                <div className="flex gap-2">
                    <Bar className="h-8 w-24 rounded-full" />
                    <Bar className="h-8 w-24 rounded-full" />
                    <Bar className="h-8 w-24 rounded-full" />
                    <Bar className="h-8 w-24 rounded-full" />
                </div>

                <div className="flex flex-col gap-3 mt-2">
                    <Bar className="h-4 w-[65%]" />
                    <Bar className="h-4 w-[60%]" />
                    <Bar className="h-4 w-[65%]" />
                    <Bar className="h-4 w-[60%]" />
                </div>
            </article>
        </div>
    )
}
