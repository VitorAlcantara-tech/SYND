"use client"

import { Suspense, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  OrbitControls,
  useFBX,
} from "@react-three/drei"
import * as THREE from "three"
import { motion } from "framer-motion"

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
  let seed = 123456

  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }

  for (let i = 0; i < size * size; i++) {
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
    const plasticTexture = createPlasticTexture()

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: "#002740",
      metalness: 0.0,
      roughness: 0.6,
      bumpMap: plasticTexture,
      bumpScale: 0.015,
      clearcoat: 0.15,
      clearcoatRoughness: 0.6,
      clearcoatNormalMap: plasticTexture,
      clearcoatNormalScale: new THREE.Vector2(0.1, 0.1),
      envMapIntensity: 0.6,
    })

    const logoMaterial = new THREE.MeshPhysicalMaterial({
      color: "#F4FBFF",

      emissive: new THREE.Color("#D9F6FF"),
      emissiveIntensity: 1.8,

      metalness: 0,
      roughness: 0.35,

      bumpMap: plasticTexture,
      bumpScale: 0.008,

      clearcoat: 0.25,
      clearcoatRoughness: 0.25,

      envMapIntensity: 0.35,
    })

    const displayMaterial = new THREE.MeshStandardMaterial({
      color: "#173049",
      roughness: 0.48,
      metalness: 0.05,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    })

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: "#05090D",
      roughness: 0.16,
      metalness: 0,
      clearcoat: 0.75,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.5,
      emissive: new THREE.Color("#02070B"),
      emissiveIntensity: 0.12,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    })

    const timerMaterial = new THREE.MeshBasicMaterial({
      color: "#DDFBFF",
      side: THREE.DoubleSide,
      toneMapped: false,
      polygonOffset: true,
      polygonOffsetFactor: -3,
      polygonOffsetUnits: -3,
    })

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

      const hierarchy = getHierarchyName(child)

      child.castShadow = true
      child.receiveShadow = false

      if (
        hierarchy.includes("synd_rec") ||
        hierarchy.includes("display_rec")
      ) {
        child.material = recMaterial
        child.renderOrder = 20
        return
      }

      if (
        hierarchy.includes("synd_tempo") ||
        hierarchy.includes("timer")
      ) {
        child.material = timerMaterial
        child.renderOrder = 19
        return
      }

      if (
        hierarchy.includes("synd_vidro") ||
        hierarchy.includes("glass")
      ) {
        child.material = glassMaterial
        child.renderOrder = 10
        return
      }

      if (
        hierarchy.includes("synd_display") ||
        hierarchy.includes("display_frame")
      ) {
        child.material = displayMaterial
        child.renderOrder = 5
        return
      }

      if (hierarchy.includes("synd_logo")) {
        child.material = logoMaterial
        return
      }

      if (hierarchy.includes("synd_tampa")) {
        child.material = bodyMaterial
        return
      }

      if (hierarchy.includes("synd_caixa")) {
        child.material = bodyMaterial
        return
      }
    })

    return clone
  }, [fbx])

  return (
    <Center>
      <primitive
        object={model}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </Center>
  )
}

function AnimatedSyndModel() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.1
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.5
  })

  return (
    <group ref={groupRef}>
      <SyndModel />
    </group>
  )
}

function LoadTrigger({ onLoad }: { onLoad: () => void }) {
  useMemo(() => {
    onLoad()
  }, [onLoad])

  return null
}

export default function Synd3D() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      className="
        relative
        md:h-[550px]
        h-[500px]
        w-full
        cursor-grab
        active:cursor-grabbing
      "
    >
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 0.95,
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{
            position: [1.2, -1.7, 5],
            fov: 30,
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
          <Environment preset="city" environmentIntensity={0.8} />

          <ambientLight intensity={0.35} />
          <hemisphereLight args={["#d8eaff", "#08263a", 0.55]} />

          <directionalLight
            position={[5, 10, 10]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-3}
            shadow-camera-right={3}
            shadow-camera-top={3}
            shadow-camera-bottom={-3}
            shadow-bias={-0.0005}
          />

          <directionalLight position={[-5, 3, 4]} intensity={0.65} />
          <directionalLight position={[-3, 4, -6]} intensity={0.3} />

          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.45}>
              <AnimatedSyndModel />
            </Bounds>
            <LoadTrigger onLoad={() => setIsLoaded(true)} />
          </Suspense>

          <ContactShadows
            position={[0, -1.3, 0]}
            opacity={0.9}
            scale={8}
            blur={1.8}
            far={3}
            resolution={1024}
            color="#000000"
          />

          <OrbitControls
            makeDefault
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            rotateSpeed={0.8}
            zoomSpeed={1.0}
            panSpeed={0.8}
            autoRotate={false}
            target={[0, 0, 0]}
          />
        </Canvas>
      </motion.div>

      <p
        className={`
          pointer-events-none
          absolute
          bottom-4
          left-1/2
          -translate-x-1/2
          whitespace-nowrap
          text-xs
          text-white/35
          hidden
          md:flex
          transition-opacity
          duration-700
          ${isLoaded ? "opacity-100" : "opacity-0"}
        `}
      >
        Arraste para explorar em 360°
      </p>
    </div>
  )
}

useFBX.preload("/models/synd.fbx")