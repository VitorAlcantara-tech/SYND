'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Clipboard, Calendar, Users, Home } from 'lucide-react';
import logo from '@/public/images/synd_logo.png'
import Link from 'next/link'

const menuItems = [
  { label: 'Inicio', icon: Home, href: '/' },
  { label: 'Tarefas', icon: Clipboard, href: '#' },
  { label: 'Agenda', icon: Calendar, href: '#' },
  { label: 'Clientes', icon: Users, href: '#' },
];

export default function Header() {
  const [sidebar, setSidebar] = useState(false);

  const toggleSideBar = () => setSidebar((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebar(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative">
      <nav className="w-full flex flex-row flex-wrap justify-between items-center gap-4 px-6 md:px-15 py-5 md:pt-10">
        <Image
          alt="Logo escrito SYND"
          src={logo}
          width={120}
          height={120}
          className="w-20 md:w-[120px] h-auto"
        />

        <button
          className="relative z-30 p-3 -m-3 flex flex-col gap-2 justify-center items-center w-[28px] h-[22px]"
          onClick={toggleSideBar}
          aria-label={sidebar ? 'Fechar menu' : 'Abrir menu'}
        >
          <span
            className={
              sidebar
                ? 'absolute h-[2px] w-[28px] bg-white transition-all duration-300 rotate-45'
                : 'absolute h-[2px] w-[28px] bg-white transition-all duration-300 -translate-y-[8px] rotate-0'
            }
          ></span>
          <span
            className={
              sidebar
                ? 'absolute h-[2px] w-[28px] bg-white transition-all duration-300 opacity-0'
                : 'absolute h-[2px] w-[28px] bg-white transition-all duration-300 opacity-100'
            }
          ></span>
          <span
            className={
              sidebar
                ? 'absolute h-[2px] w-[28px] bg-white transition-all duration-300 -rotate-45'
                : 'absolute h-[2px] w-[28px] bg-white transition-all duration-300 translate-y-[8px] rotate-0'
            }
          ></span>
        </button>
      </nav>

      <div
        className={
          sidebar
            ? 'fixed inset-0 z-10 bg-black/30 backdrop-blur-xs opacity-100 pointer-events-auto transition-opacity duration-300'
            : 'fixed inset-0 z-10 bg-black/30 backdrop-blur-xs opacity-0 pointer-events-none transition-opacity duration-300'
        }
        onClick={toggleSideBar}
      ></div>

      <div
        className={
          sidebar
            ? 'fixed top-0 right-0 z-20 flex flex-col w-[50%] md:w-[13%] h-screen border-l border-white/10 bg-[#002740] text-white shadow-2xl shadow-black/50 pt-24 md:pt-32 transform transition-transform duration-300 ease-in-out translate-x-0'
            : 'fixed top-0 right-0 z-20 flex flex-col w-[50%] md:w-[13%] h-screen border-l border-white/10 bg-[#002740] text-white shadow-2xl shadow-black/50 pt-24 md:pt-32 transform transition-transform duration-300 ease-in-out translate-x-full'
        }
      >
        <span className="text-xs uppercase font-semibold text-white/40 mb-2 px-5">
          Menu
        </span>

        <div className="flex flex-col gap-1 font-semibold w-full">
          {menuItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-row items-center gap-3 py-3 px-3 w-full text-white/90 hover:bg-white/10 hover:text-white active:bg-white/20 transition-colors duration-200 font-normal"
            >
              <Icon className="ml-3" size={20} strokeWidth={1.75} />
              <span className="text-sm md:text-base">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}