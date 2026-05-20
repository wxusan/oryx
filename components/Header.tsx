"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header({ visible = true }: { visible?: boolean }) {
  const { tr } = useLanguage();
  const NAV = [
    { label: tr.nav.services, href: "#services" },
    { label: tr.nav.work,     href: "#work" },
    { label: tr.nav.about,    href: "#about" },
    { label: tr.nav.contact,  href: "#contact" },
  ];

  return (
    <motion.header
      className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-[7.6vw] pt-7"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <a href="/" aria-label="ORYX home" className="flex items-center gap-3">
        <img src="/oryx-logo-white.svg" alt="" aria-hidden className="h-6 w-auto" />
        <span className="sr-only">ORYX</span>
      </a>

      <nav className="hidden items-center gap-9 md:flex">
        {NAV.map((item) => (
          <a key={item.label} href={item.href}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-dim transition-colors duration-300 hover:text-oryx-white">
            {item.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-5 md:flex">
        <LanguageSwitcher />
        <a href="#contact"
          className="group inline-flex items-center gap-2 border border-oryx-white bg-oryx-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-black transition-all duration-300 hover:bg-transparent hover:text-oryx-white">
          {tr.nav.cta}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </a>
      </div>

      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-dim md:hidden">
        MENU
      </span>
    </motion.header>
  );
}
