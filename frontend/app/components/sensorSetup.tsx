    "use client"

    import { useState } from "react"

    const steps = [
        {
            number: "01",
            title: "Configure o Wi-Fi",
            description:
                "Conecte o Sensor SYND à rede que será utilizada para enviar os dados.",
            display: {
                top: "SYND",
                main: "WI-FI",
                bottom: "CONECTANDO..."
            },
            content: [
                "Ao não encontrar uma rede configurada, o SYND cria uma rede própria.",
                'Procure por "Sensor-Synd" nas redes Wi-Fi disponíveis.',
                "Abra o portal de configuração e selecione sua rede.",
                "Informe a senha e aguarde a confirmação no display."
            ]
        },
        {
            number: "02",
            title: "Faça uma gravação",
            description:
                "Com o sensor conectado, você já pode registrar uma reunião.",
            display: {
                top: "SYND",
                main: "GRAVANDO",
                bottom: "00:32:18"
            },
            content: [
                "Pressione o botão para iniciar a gravação.",
                'O display mostrará "GRAVANDO".',
                "Pressione novamente para finalizar.",
                "O áudio será salvo e enviado para processamento."
            ]
        },
        {
            number: "03",
            title: "Acesse os resultados",
            description:
                "Depois do processamento, o SYND transforma a reunião em dados.",
            display: {
                top: "SYND",
                main: "CÓDIGO",
                bottom: "A7F2-91"
            },
            content: [
                "O áudio é transcrito automaticamente.",
                "A inteligência artificial identifica os principais dados da reunião.",
                "Um código de busca é gerado para cada gravação.",
                "Use esse código no sistema SYND para encontrar a reunião."
            ]
        }
    ]

    export default function SensorSetup() {
        const [activeStep, setActiveStep] = useState(0)

        const step = steps[activeStep]

        const nextStep = () => {
            if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1)
            }
        }

        const previousStep = () => {
            if (activeStep > 0) {
                setActiveStep(activeStep - 1)
            }
        }

        return (
            <>
                {/* LINHA DIVISÓRIA */}
                <div className="w-full h-px bg-white/20 mt-10 md:mt-0" />

                {/* CABEÇALHO */}
                <section className="px-6 md:px-25 pt-16 md:pt-24">

                    <div className="max-w-3xl mb-10 md:mb-16">

                        <h2
                            className="text-xl sm:text-2xl lg:text-4xl font-semibold leading-tight"
                            style={{
                                textShadow: "0 0 50px rgba(255,255,255,0.15)"
                            }}
                        >
                            CONFIGURE O SENSOR SYND
                            <br />
                            PARA A SUA SALA DE REUNIÕES
                        </h2>

                        <p className="mt-4 md:mt-6 max-w-2xl text-base md:text-lg text-white/65 leading-relaxed">
                            Siga as etapas para conectar o sensor, registrar sua
                            reunião e acessar os resultados.
                        </p>

                    </div>

                </section>

                {/* CONFIGURAÇÃO */}
                <section className="w-full px-6 md:px-25 pb-16 md:pb-24">
{/* ETAPAS */}
<div className="hidden md:flex items-center w-full mb-10 px-0">

    {steps.map((item, index) => {

        const completed = index < activeStep
        const active = index === activeStep

        return (
            <div
                key={item.number}
                className="flex items-center flex-1"
            >

                <button
                    onClick={() => setActiveStep(index)}
                    className="flex items-center gap-3 shrink-0"
                >

                    <div
                        className={`
                            w-9 h-9
                            rounded-full
                            border
                            flex
                            items-center
                            justify-center
                            text-xs
                            font-medium
                            transition-all
                            duration-300
                            ${
                                active || completed
                                    ? "bg-white border-white text-[#07577d]"
                                    : "bg-white/10 border-white/20 text-white/50"
                            }
                        `}
                    >
                        {completed ? "✓" : item.number}
                    </div>

                    <span
                        className={`
                            text-sm
                            whitespace-nowrap
                            transition-colors
                            ${
                                active
                                    ? "text-white"
                                    : "text-white/45"
                            }
                        `}
                    >
                        {item.title}
                    </span>

                </button>

                {index < steps.length - 1 && (
                    <div
                        className={`
                            h-px
                            flex-1
                            ml-6
                            mr-6
                            bg-white/20
                            transition-colors
                            duration-500
                            ${
                                completed
                                    ? "bg-white/60"
                                    : "bg-white/20"
                            }
                        `}
                    />
                )}

            </div>
        )
    })}

</div>

                    {/* CARDS */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">

                        {/* CARD SENSOR */}
                        <div
                            className="
                                relative
                                rounded-2xl
                                border
                                border-white/15
                                bg-white/[0.04]
                                p-6
                                md:p-7
                                min-h-[330px]
                                flex
                                flex-col
                                justify-between
                            "
                        >

                            <div>

                                {/* SENSOR + CONTADOR */}
                                <div className="flex items-start justify-between">

                                    <div className="relative">

                                        <div
                                            className="
                                                w-[150px]
                                                h-[84px]
                                                rounded-xl
                                                bg-[#08090a]
                                                border
                                                border-white/20
                                                p-[6px]
                                                shadow-[0_0_35px_rgba(255,255,255,0.04)]
                                            "
                                        >

                                            <div
                                                className="
                                                    w-full
                                                    h-full
                                                    rounded-[6px]
                                                    border
                                                    border-white/10
                                                    bg-[#020303]
                                                    flex
                                                    flex-col
                                                    justify-between
                                                    px-2.5
                                                    py-1.5
                                                "
                                            >

                                                <div className="flex items-center justify-between">

                                                    <span className="text-[7px] tracking-[0.25em] text-white/45 font-mono">
                                                        {step.display.top}
                                                    </span>

                                                    <span className="text-[6px] text-white/30 font-mono">
                                                        ●
                                                    </span>

                                                </div>

                                                <div className="text-center">

                                                    <span className="text-[11px] tracking-[0.15em] text-white/90 font-mono">
                                                        {step.display.main}
                                                    </span>

                                                </div>

                                                <div className="flex items-center justify-between">

                                                    <span className="text-[6px] text-white/35 font-mono">
                                                        {step.display.bottom}
                                                    </span>

                                                    <div className="flex gap-[3px]">
                                                        <span className="w-[3px] h-[3px] rounded-full bg-white/40" />
                                                        <span className="w-[3px] h-[3px] rounded-full bg-white/20" />
                                                        <span className="w-[3px] h-[3px] rounded-full bg-white/10" />
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="absolute -bottom-3 left-6 right-6 h-5 bg-white/[0.03] blur-xl rounded-full" />

                                    </div>

                                    <span className="text-xs text-white/35">
                                        {step.number} / 03
                                    </span>

                                </div>

                                {/* TÍTULO */}
                                <h3 className="mt-6 text-xl font-semibold">
                                    {step.title}
                                </h3>

                                {/* DESCRIÇÃO */}
                                <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-xl">
                                    {step.description}
                                </p>

                            </div>

                            {/* PROGRESSO */}
                            <div className="mt-6">

                                <div className="flex justify-between text-xs text-white/50 mb-2">

                                    <span>
                                        Progresso
                                    </span>

                                    <span>
                                        {Math.round(
                                            ((activeStep + 1) /
                                                steps.length) *
                                                100
                                        )}
                                        %
                                    </span>

                                </div>

                                <div className="h-px bg-white/20 rounded-full overflow-hidden">

                                    <div
                                        className="h-full bg-white rounded-full transition-all duration-500"
                                        style={{
                                            width: `${
                                                ((activeStep + 1) /
                                                    steps.length) *
                                                100
                                            }%`
                                        }}
                                    />

                                </div>

                            </div>

                        </div>

                        {/* PASSO A PASSO */}
                        <div
                            className="
                                relative
                                rounded-2xl
                                border
                                border-white/15
                                bg-white/[0.04]
                                p-6
                                md:p-7
                                min-h-[330px]
                                flex
                                flex-col
                            "
                        >

                            <span className="text-xs tracking-[0.2em] text-white/50">
                                PASSO A PASSO
                            </span>

                            <div className="mt-5 space-y-4">

                                {step.content.map((text, index) => (

                                    <div
                                        key={index}
                                        className="flex gap-3 items-start"
                                    >

                                        <div
                                            className="
                                                shrink-0
                                                w-6
                                                h-6
                                                rounded-full
                                                border
                                                border-white/15
                                                bg-white/5
                                                flex
                                                items-center
                                                justify-center
                                            "
                                        >

                                            <span className="text-[10px] text-white/60">
                                                {index + 1}
                                            </span>

                                        </div>

                                        <p className="text-sm text-white/60 leading-relaxed pt-0.5">
                                            {text}
                                        </p>

                                    </div>

                                ))}

                            </div>

                            {/* NAVEGAÇÃO */}
                            <div className="flex items-center justify-between mt-auto pt-5">

                                <button
                                    onClick={previousStep}
                                    disabled={activeStep === 0}
                                    className={`
                                        text-sm
                                        transition
                                        ${
                                            activeStep === 0
                                                ? "text-white/20 cursor-not-allowed"
                                                : "text-white/60 hover:text-white"
                                        }
                                    `}
                                >
                                    ← Anterior
                                </button>

                                {activeStep < steps.length - 1 ? (

<button
    onClick={nextStep}
    className="
        flex
        items-center
        gap-2
        px-5
        py-3
        rounded-sm
        bg-white
        text-[#06486C]
        text-sm
        font-medium
        hover:bg-white/90
        transition
    "
>
    Próxima etapa
    <span>→</span>
</button>

                                ) : (

                                    <span className="text-sm text-white/60 font-mono">
                                        A7F2-91
                                    </span>

                                )}

                            </div>

                        </div>

                    </div>

                    {/* MOBILE */}
                    <div className="md:hidden mt-6 flex gap-2">

                        {steps.map((item, index) => (

                            <button
                                key={item.number}
                                onClick={() => setActiveStep(index)}
                                className={`
                                    h-1
                                    flex-1
                                    rounded-full
                                    transition-all
                                    ${
                                        index <= activeStep
                                            ? "bg-white"
                                            : "bg-white/20"
                                    }
                                `}
                                aria-label={`Ir para ${item.title}`}
                            />

                        ))}

                    </div>

                </section>
            </>
        )
    }