    export default function SyndSteps() {
        return (
            <>
                {/* LINHA DIVISÓRIA */}
                <div className="w-full h-px bg-white/20 mt-8 md:mt-0" />

                {/* CABEÇALHO */}
                <section className="px-5 sm:px-6 md:px-25 pt-12 sm:pt-16 md:pt-24">
                    <div className="max-w-3xl mb-10 sm:mb-14 md:mb-20">
                        <h2
                            className="text-2xl sm:text-2xl lg:text-4xl font-semibold leading-tight text-white"
                            style={{
                                textShadow: "0 0 50px rgba(255,255,255,0.15)",
                            }}
                        >
                            COMO O SYND TRANSFORMA
                            <br />
                            REUNIÕES EM DADOS
                        </h2>

                        <p className="mt-4 md:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-white/75 leading-relaxed">
                            O sensor captura a conversa comercial e transforma o áudio
                            em informações que ajudam sua equipe a entender clientes,
                            oportunidades e próximos passos.
                        </p>
                    </div>
                </section>

                {/* ETAPAS */}
                <section className="w-full px-5 sm:px-6 md:px-25 pb-12 sm:pb-16 md:pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5 md:gap-5 w-full">

                        {/* ETAPA 1 */}
                        <div className="relative rounded-sm border border-white/20 bg-[#07577a]/45 p-6 sm:p-7 md:p-8 min-h-0 md:min-h-[245px] backdrop-blur-sm">
                            <div className="flex items-center">
                                <span className="text-[10px] sm:text-xs tracking-[0.2em] text-white/75">
                                    ETAPA 1
                                </span>

                                <div className="hidden md:block h-px bg-white/25 flex-1 ml-5" />
                            </div>

                            <h3 className="mt-6 md:mt-7 text-lg sm:text-xl font-semibold text-white">
                                CAPTA
                            </h3>

                            <p className="mt-3 text-sm text-white/75 leading-relaxed max-w-xs">
                                O sensor SYND captura o áudio da reunião comercial
                                diretamente no ambiente.
                            </p>
                        </div>

                        {/* ETAPA 2 */}
                        <div className="relative rounded-sm border border-white/20 bg-[#07577a]/45 p-6 sm:p-7 md:p-8 min-h-0 md:min-h-[245px] backdrop-blur-sm">
                            <div className="flex items-center">
                                <span className="text-[10px] sm:text-xs tracking-[0.2em] text-white/75">
                                    ETAPA 2
                                </span>

                                <div className="hidden md:block h-px bg-white/25 flex-1 ml-5" />
                            </div>

                            <h3 className="mt-6 md:mt-7 text-lg sm:text-xl font-semibold text-white">
                                ENVIA
                            </h3>

                            <p className="mt-3 text-sm text-white/75 leading-relaxed max-w-xs">
                                Após a gravação, os dados são enviados pela conexão
                                de rede para processamento.
                            </p>
                        </div>

                        {/* ETAPA 3 */}
                        <div className="relative rounded-sm border border-white/20 bg-[#07577a]/45 p-6 sm:p-7 md:p-8 min-h-0 md:min-h-[245px] backdrop-blur-sm">
                            <div className="flex items-center">
                                <span className="text-[10px] sm:text-xs tracking-[0.2em] text-white/75">
                                    ETAPA 3
                                </span>

                                <div className="hidden md:block h-px bg-white/25 flex-1 ml-5" />
                            </div>

                            <h3 className="mt-6 md:mt-7 text-lg sm:text-xl font-semibold text-white">
                                ANALISA
                            </h3>

                            <p className="mt-3 text-sm text-white/75 leading-relaxed max-w-xs">
                                A gravação é transcrita e analisada por inteligência
                                artificial, identificando os principais pontos da conversa.
                            </p>
                        </div>

                        {/* ETAPA 4 */}
                        <div className="relative rounded-sm border border-white/20 bg-[#07577a]/45 p-6 sm:p-7 md:p-8 min-h-0 md:min-h-[245px] backdrop-blur-sm">
                            <div className="flex items-center">
                                <span className="text-[10px] sm:text-xs tracking-[0.2em] text-white/75">
                                    ETAPA 4
                                </span>

                                <div className="hidden md:block h-px bg-white/25 flex-1 ml-5" />
                            </div>

                            <h3 className="mt-6 md:mt-7 text-lg sm:text-xl font-semibold text-white">
                                ENTREGA
                            </h3>

                            <p className="mt-3 text-sm text-white/75 leading-relaxed max-w-xs">
                                Os resultados ficam organizados para que gestores
                                e vendedores transformem conversas em decisões.
                            </p>
                        </div>

                    </div>
                </section>
            </>
        )
    }