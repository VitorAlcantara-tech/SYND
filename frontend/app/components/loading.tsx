"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export default function SyndLoadingScreen() {
  const { progress, active } = useProgress();

  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  const startedAt = useRef(Date.now());

  const percentage = Math.min(100, Math.round(progress));

  useEffect(() => {
    if (!active && progress >= 100) {
      const minimumLoadingTime = 1200;

      const elapsed = Date.now() - startedAt.current;
      const remaining = Math.max(0, minimumLoadingTime - elapsed);

      const fadeTimer = setTimeout(() => {
        setLeaving(true);

        const removeTimer = setTimeout(() => {
          setVisible(false);
        }, 650);

        return () => clearTimeout(removeTimer);
      }, remaining);

      return () => clearTimeout(fadeTimer);
    }
  }, [active, progress]);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[99]
        flex items-center justify-center md:justify-start md:px-70
        overflow-hidden
        bg-[#06445f]
        transition-all duration-700 ease-out
        ${
          leaving
            ? "pointer-events-none opacity-0 scale-[1.015]"
            : "opacity-100 scale-100"
        }
      `}
    >
      {/* Glow de fundo */}
      <div
        className="
          absolute
          left-1/2 top-1/2
          h-[600px] w-[600px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[#00AEEF]/10
          blur-[140px]
        "
      />

      {/* Geometria - lado direito */}
      <div
        className="
          absolute
          right-[-100px] top-[22%]
          h-[380px] w-[380px]
          rotate-45
          rounded-[34px]
          border border-[#00AEEF]/15
        "
      />

      <div
        className="
          absolute
          right-[40px] top-[30%]
          h-[240px] w-[240px]
          rotate-45
          rounded-[26px]
          bg-[#00AEEF]/5
        "
      />

      {/* Geometria - lado esquerdo */}
      <div
        className="
          absolute
          bottom-[-190px] left-[-130px]
          h-[420px] w-[420px]
          rotate-45
          rounded-[40px]
          border border-white/[0.04]
        "
      />

      {/* Conteúdo */}
      <div className="relative z-10 w-[min(420px,80vw)]">
        {/* Logo */}
        <div className="mb-14 flex items-center justify-center">
          {/*
            Troque o src pelo caminho real do logo da SYND.
          */}
          <img
            src="../../icon.png"
            alt="SYND"
            className="h-auto w-[155px] object-contain"
          />
        </div>

        {/* Informações */}
        <div className="mb-3 flex items-end justify-between">
          <span
            className="
              text-[12px]
              font-semibold
              uppercase
              tracking-[0.20em]
              text-white
            "
          >
            Carregando
          </span>

          <span
            className="
              font-mono
              text-[12px]
              font-medium
              tracking-wide
              text-white/60
            "
          >
            {percentage.toString().padStart(2, "0")}%
          </span>
        </div>

        {/* Barra */}
        <div
          className="
            relative
            h-[4px]
            w-full
            overflow-hidden
            rounded-full
            bg-white/10
          "
        >
          <div
            className="
              relative
              h-full
              rounded-full
              bg-[#00AEEF]
              transition-[width]
              duration-300
              ease-out
            "
            style={{
              width: `${percentage}%`,
            }}
          >
            {/* Brilho na ponta */}
            <div
              className="
                absolute
                right-0 top-1/2
                h-[14px] w-[30px]
                -translate-y-1/2
                rounded-full
                bg-[#00AEEF]
                opacity-70
                blur-[8px]
              "
            />

            {/* Reflexo */}
            <div
              className="
                absolute
                inset-y-0
                right-0
                w-[45px]
                bg-gradient-to-r
                from-transparent
                via-white/50
                to-transparent
                opacity-60
              "
            />
          </div>
        </div>

        {/* Texto inferior */}
        <p
          className="
            mt-5
            text-center
            text-[11px]
            font-normal
            tracking-[0.08em]
            text-white/25
          "
        >
          Preparando sua experiência SYND
        </p>
      </div>
    </div>
  );
}