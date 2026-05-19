"use client";

import { motion } from "framer-motion";

const NAV = [
  { label: "SERVICES", href: "#services" },
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export function Header({ visible = true }: { visible?: boolean }) {
  return (
    <motion.header
      className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-[7.6vw] pt-7"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      {/* Logo */}
      <a
        href="/"
        aria-label="ORYX home"
        className="flex items-center gap-3"
      >
        <img
          src="/oryx-logo-white.svg"
          alt=""
          aria-hidden
          className="h-6 w-auto"
        />
        <span className="sr-only">ORYX</span>
      </a>

      {/* Nav */}
      <nav className="hidden items-center gap-9 md:flex">
        {NAV.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-dim transition-colors duration-300 hover:text-oryx-white"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <a
        href="#contact"
        className="group hidden items-center gap-2 border border-oryx-white bg-oryx-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-black transition-all duration-300 hover:bg-transparent hover:text-oryx-white md:inline-flex"
      >
        BOOK A CALL
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
          →
        </span>
      </a>

      {/* Mobile hint */}
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-dim md:hidden">
        MENU
      </span>
    </motion.header>
  );
}
