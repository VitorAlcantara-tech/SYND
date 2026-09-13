export default function SyndSteps() {
    return (
        <>
            {/* LINHA DIVISÓRIA */}
            <div className="w-full h-px bg-white/20 mt-10 md:mt-0" />

            {/* CABEÇALHO */}
            <section className="px-6 md:px-25 pt-16 md:pt-24">
                <div className="max-w-3xl mb-10 md:mb-20">
                    <h2
                        className="text-xl sm:text-2xl lg:text-4xl font-semibold leading-tight"
                        style={{
                            textShadow: "0 0 50px rgba(255,255,255,0.15)"
                        }}
                    >
                        COMO O SYND TRANSFORMA
                        <br />
                        REUNIÕES EM DADOS
                    </h2>
                    <p className="mt-4 md:mt-6 max-w-2xl text-base md:text-lg text-white/65 leading-relaxed">
                        O sensor captura a conversa comercial e transforma o áudio
                        em informações que ajudam sua equipe a entender clientes,
                        oportunidades e próximos passos.
                    </p>
                </div>
            </section>

            {/* ETAPAS */}
            <section className="w-full px-6 md:px-25 pb-16 md:pb-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 w-full">

                    {/* ETAPA 1 */}
                    <div className="relative">
                        <div className="flex items-center">
                            <span className="text-xs tracking-[0.2em] text-white/50">
                                ETAPA 1
                            </span>
                            <div className="hidden md:block h-px bg-white/20 flex-1 ml-5" />
                        </div>
                        <h3 className="mt-7 text-xl font-semibold">
                            CAPTA
                        </h3>
                        <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-xs">
                            O sensor SYND captura o áudio da reunião comercial
                            diretamente no ambiente.
                        </p>
                    </div>

                    {/* ETAPA 2 */}
                    <div className="relative">
                        <div className="flex items-center">
                            <span className="text-xs tracking-[0.2em] text-white/50">
                                ETAPA 2
                            </span>
                            <div className="hidden md:block h-px bg-white/20 flex-1 ml-5" />
                        </div>
                        <h3 className="mt-7 text-xl font-semibold">
                            ENVIA
                        </h3>
                        <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-xs">
                            Após a gravação, os dados são enviados pela conexão
                            de rede para processamento.
                        </p>
                    </div>

                    {/* ETAPA 3 */}
                    <div className="relative">
                        <div className="flex items-center">
                            <span className="text-xs tracking-[0.2em] text-white/50">
                                ETAPA 3
                            </span>
                            <div className="hidden md:block h-px bg-white/20 flex-1 ml-5" />
                        </div>
                        <h3 className="mt-7 text-xl font-semibold">
                            ANALISA
                        </h3>
                        <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-xs">
                            A gravação é transcrita e analisada por inteligência
                            artificial, identificando os principais pontos da conversa.
                        </p>
                    </div>

                    {/* ETAPA 4 */}
                    <div className="relative">
                        <div className="flex items-center">
                            <span className="text-xs tracking-[0.2em] text-white/50">
                                ETAPA 4
                            </span>
                        </div>
                        <h3 className="mt-7 text-xl font-semibold">
                            ENTREGA
                        </h3>
                        <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-xs">
                            Os resultados ficam organizados para que gestores
                            e vendedores transformem conversas em decisões.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}