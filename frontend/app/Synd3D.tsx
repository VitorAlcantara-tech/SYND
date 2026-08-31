"use client"

import { Suspense, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import {
  Bounds,
  Center,
  OrbitControls,
  useFBX,
} from "@react-three/drei"
import * as THREE from "three"

/**
 * Pega não apenas o nome do Mesh,
 * mas também os nomes dos pais dele.
 *
 * Exemplo:
 * SYND_Tempo > typeMesh1
 *
 * vira:
 * "typeMesh1 synd_tempo synd_master_grp ..."
 */
function getHierarchyName(object: THREE.Object3D) {
  const names: string[] = []

  let current: THREE.Object3D | null = object

  while (current) {
    if (current.name) {
      names.push(current.name.toLowerCase())
    }

    current = current.parent
  }

  return names.join(" ")
}

function createPlasticTexture(size = 128) {
  const data = new Uint8Array(size * size * 4)

  // Seed fixa para a textura não mudar a cada reload
  let seed = 123456

  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }

  for (let i = 0; i < size * size; i++) {
    // Ruído bem discreto
    const value = Math.floor(115 + random() * 28)

    const index = i * 4

    data[index] = value
    data[index + 1] = value
    data[index + 2] = value
    data[index + 3] = 255
  }

  const texture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat
  )

  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping

  // Quantas vezes a microtextura se repete
  texture.repeat.set(20, 20)

  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.needsUpdate = true

  return texture
}

function SyndModel() {
  const fbx = useFBX("/models/synd.fbx")

  const model = useMemo(() => {
    const clone = fbx.clone(true)

    /*
    |--------------------------------------------------------------------------
    | CORPO
    |--------------------------------------------------------------------------
    | Plástico azul fosco.
    |
    | Não usamos PhysicalMaterial aqui porque queremos uma cor mais estável
    | conforme o produto gira.
    */
    const plasticTexture = createPlasticTexture()

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      // Um pouco mais claro que o atual
      color: "#0a4569",

      metalness: 0.015,
      roughness: 0.68,

      // MICROTEXTURA REAL
      bumpMap: plasticTexture,
      bumpScale: 0.012,

      // Um reflexo extremamente discreto
      clearcoat: 0.06,
      clearcoatRoughness: 0.75,
    })

    /*
    |--------------------------------------------------------------------------
    | LOGO
    |--------------------------------------------------------------------------
    */
    const logoMaterial = new THREE.MeshStandardMaterial({
      color: "#E9ECEF",
      roughness: 0.52,
      metalness: 0,
    })

    /*
    |--------------------------------------------------------------------------
    | BASE / MOLDURA DO DISPLAY
    |--------------------------------------------------------------------------
    */
    const displayMaterial = new THREE.MeshStandardMaterial({
      color: "#080D12",
      roughness: 0.48,
      metalness: 0.05,

      // Evita conflito com o vidro caso estejam muito próximos
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    })

    /*
    |--------------------------------------------------------------------------
    | VIDRO
    |--------------------------------------------------------------------------
    | Preto com brilho discreto.
    */
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: "#05090D",

      roughness: 0.16,
      metalness: 0,

      clearcoat: 0.75,
      clearcoatRoughness: 0.12,

      emissive: new THREE.Color("#02070B"),
      emissiveIntensity: 0.12,

      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    })

    /*
    |--------------------------------------------------------------------------
    | TIMER
    |--------------------------------------------------------------------------
    | MeshBasicMaterial é proposital.
    |
    | O texto deve parecer uma tela, então não queremos que fique escuro
    | quando o produto gira para longe da luz.
    */
    const timerMaterial = new THREE.MeshBasicMaterial({
      color: "#DDFBFF",

      side: THREE.DoubleSide,

      toneMapped: false,

      polygonOffset: true,
      polygonOffsetFactor: -3,
      polygonOffsetUnits: -3,
    })

    /*
    |--------------------------------------------------------------------------
    | REC
    |--------------------------------------------------------------------------
    */
    const recMaterial = new THREE.MeshBasicMaterial({
      color: "#FF3F52",

      side: THREE.DoubleSide,

      toneMapped: false,

      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4,
    })

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return

      /*
       * IMPORTANTE:
       *
       * Antes usávamos:
       *
       * child.name
       *
       * Agora usamos o nome da hierarquia inteira.
       *
       * Isso permite reconhecer:
       *
       * SYND_Tempo
       *   └── typeMesh1
       *
       * mesmo que o Mesh propriamente dito se chame typeMesh1.
       */
      const hierarchy = getHierarchyName(child)

      child.castShadow = false
      child.receiveShadow = false

      /*
      |--------------------------------------------------------------------------
      | REC
      |--------------------------------------------------------------------------
      */
      if (
        hierarchy.includes("synd_rec") ||
        hierarchy.includes("display_rec")
      ) {
        child.material = recMaterial
        child.renderOrder = 20
        return
      }

      /*
      |--------------------------------------------------------------------------
      | TIMER
      |--------------------------------------------------------------------------
      */
      if (
        hierarchy.includes("synd_tempo") ||
        hierarchy.includes("timer")
      ) {
        child.material = timerMaterial
        child.renderOrder = 19
        return
      }

      /*
      |--------------------------------------------------------------------------
      | VIDRO
      |--------------------------------------------------------------------------
      */
      if (
        hierarchy.includes("synd_vidro") ||
        hierarchy.includes("glass")
      ) {
        child.material = glassMaterial
        child.renderOrder = 10
        return
      }

      /*
      |--------------------------------------------------------------------------
      | DISPLAY / BASE
      |--------------------------------------------------------------------------
      */
      if (
        hierarchy.includes("synd_display") ||
        hierarchy.includes("display_frame")
      ) {
        child.material = displayMaterial
        child.renderOrder = 5
        return
      }

      /*
      |--------------------------------------------------------------------------
      | LOGO
      |--------------------------------------------------------------------------
      */
      if (hierarchy.includes("synd_logo")) {
        child.material = logoMaterial
        return
      }

      /*
      |--------------------------------------------------------------------------
      | TAMPA
      |--------------------------------------------------------------------------
      */
      if (hierarchy.includes("synd_tampa")) {
        child.material = bodyMaterial
        return
      }

      /*
      |--------------------------------------------------------------------------
      | CAIXA
      |--------------------------------------------------------------------------
      */
      if (hierarchy.includes("synd_caixa")) {
        child.material = bodyMaterial
        return
      }
    })

    return clone
  }, [fbx])

  return (
    <Center>
      <primitive object={model} />
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
        dpr={[1, 2]}
        camera={{
          position: [4, 3, 6],
          fov: 35,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 0.95
        }}
        style={{
          touchAction: "none",
        }}
      >
        {/*
        |--------------------------------------------------------------------------
        | ILUMINAÇÃO
        |--------------------------------------------------------------------------
        |
        | Bem mais neutra.
        | Não queremos que o azul vire azul-claro/branco conforme rotaciona.
        */}

       {/* Luz geral — não deixa o lado escuro virar preto */}
        <ambientLight intensity={1.0} />

        {/* Preenchimento natural entre parte superior e inferior */}
        <hemisphereLight
          args={[
            "#d8eaff",
            "#08263a",
            0.55,
          ]}
        />

        {/* Luz principal */}
        <directionalLight
          position={[5, 10, 10]}
          intensity={3.20}
        />

        {/* Preenche o lado oposto */}
        <directionalLight
          position={[-5, 3, 4]}
          intensity={0.65}
        />

        {/* Luz traseira muito discreta para separar as bordas */}
        <directionalLight
          position={[-3, 4, -6]}
          intensity={0.3}
        />

        <Suspense fallback={null}>
          <Bounds
            fit
            clip
            observe
            margin={1.45}
          >
            <SyndModel />
          </Bounds>
        </Suspense>

        <OrbitControls
          makeDefault

          enablePan={false}
          enableZoom={false}
          enableRotate

          rotateSpeed={0.65}

          autoRotate
          autoRotateSpeed={3}

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