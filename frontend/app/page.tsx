import Image from "next/image"
import synd from "@/public/images/synd_logo.png"
import box from "@/public/images/box_synd.png"
import cards from "@/public/images/cards-blue.png"
import { ArrowRight } from "lucide-react"
import Synd3D from "./Synd3D"

import Link from 'next/link'

export default function Init() {
    return (
        <main className="w-full min-h-screen overflow-x-hidden text-white" style={{
                background: "linear-gradient(139deg, #002740 0%, #06486C 53%, #06486C 98%)"
            }}>
            <SyndLoadingScreen />

            <LandingPage />
        </main>

    )
}