"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import {
  Bounds,
  Center,
  OrbitControls,
  useFBX,
} from "@react-three/drei"

function SyndModel() {
  const fbx = useFBX("/models/synd.fbx")

  return (
    <Center>
      <primitive object={fbx} />
    </Center>
  )
}

export default function Synd3D() {
  return (
    <div
      className="
        relative
        h-[550px]
        w-full
        cursor-grab
        active:cursor-grabbing
      "
    >
      <Canvas
        camera={{
          // Mantém aproximadamente essa visão atual:
          // frente + um pouco de cima
          position: [4, 3, 6],
          fov: 35,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        style={{
          touchAction: "none",
        }}
      >
        {/* Iluminação */}
        <ambientLight intensity={2} />

        <directionalLight
          position={[5, 6, 5]}
          intensity={3}
        />

        <directionalLight
          position={[-5, 2, -3]}
          intensity={1}
        />

        <Suspense fallback={null}>
          <Bounds
            fit
            clip
            observe
            // 1.15 = maior
            // 1.35 = menor
            // 1.50 = ainda menor
            margin={1.4}
          >
            <SyndModel />
          </Bounds>
        </Suspense>

        <OrbitControls
          makeDefault

          // Não permite tirar o objeto do centro
          enablePan={false}

          // Usuário não altera o tamanho
          enableZoom={true}

          // Usuário ainda pode arrastar
          enableRotate={true}
          rotateSpeed={0.7}

          // Rotação automática
          autoRotate
          autoRotateSpeed={3}

          // Limita verticalmente
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.55}

          target={[0, 0, 0]}
        />
      </Canvas>

      <p
        className="
          pointer-events-none
          absolute
          bottom-4
          left-1/2
          -translate-x-1/2
          whitespace-nowrap
          text-xs
          text-white/35
        "
      >
        Arraste para explorar em 360°
      </p>
    </div>
  )
}

useFBX.preload("/models/synd.fbx")