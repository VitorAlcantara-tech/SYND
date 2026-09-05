
import synd from "@/public/images/synd_logo.png"
import Link from "next/dist/client/link"
import Image from "next/image"

export default function NavbarLandingPage() {
    return (
                <nav className="w-full flex flex-row flex-wrap justify-between gap-4 px-6 md:px-15 pt-6 md:pt-10">
                    <Image
                        alt={"Logo escrito SYND"}
                        src={synd}
                        width={120}
                        height={120}
                        className="w-20 md:w-[120px] h-auto"
                    />
                    <div className="hidden md:flex flex-row gap-10 text-lg items-center cursor-pointer">
                        <div className="btn-light-hover"> Produtos </div>
                        <div className="btn-light-hover"> Recursos </div>
                        <div className="btn-light-hover"> Preços </div>
                        <div className="btn-light-hover"> Contato </div>
                    </div>
                    <Link href={"/vendedor-dash"} className="h-full py-1 px-2 rounded-sm bg-[#0396be] font-md font-light shadow-[0px_5px_1px_-3px_rgba(0,0,0,0.3)] hover:shadow-[0px_1px_5px_-3px_rgba(0,0,0,0.3)] btn-light-hover">
                        Entrar
                    </Link>
                </nav>
    )
}