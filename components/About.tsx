"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

export function About() {
  const { tr } = useLanguage();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden bg-[#020202]"
      style={{ minHeight: "90vh" }}
      aria-label="About Xusan Ibragimov"
    >
      {/* Grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        backgroundImage: ["linear-gradient(to right,rgba(255,255,255,0.022) 1px,transparent 1px)", "linear-gradient(to bottom,rgba(255,255,255,0.018) 1px,transparent 1px)"].join(","),
        backgroundSize: "80px 80px",
      }} />

      <div className="relative z-10 flex h-full flex-col lg:flex-row" style={{ minHeight: "90vh" }}>

        {/* ── Left — content ───────────────────────────────────────────── */}
        <div className="flex w-full flex-col justify-center px-[7.6vw] py-20 lg:w-[50%] lg:py-32">

          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease }}
            style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace", marginBottom: "24px" }}
          >
            {tr.about.label}
          </motion.p>

          {/* Name + mobile photo side by side */}
          <div className="flex items-start justify-between gap-4 lg:block">
            <motion.h2
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="font-display font-semibold text-oryx-white"
              style={{ fontSize: "clamp(36px,4.2vw,68px)", letterSpacing: "-0.028em", lineHeight: 1.04, marginBottom: "12px" }}
            >
              Xusan<br />Ibragimov
            </motion.h2>

            {/* Mobile-only portrait — hidden on desktop (photo panel handles it) */}
            <motion.div
              className="lg:hidden shrink-0 overflow-hidden rounded-sm"
              style={{ width: "110px", height: "140px", border: "1px solid rgba(255,255,255,0.1)" }}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.14, ease }}
            >
              <img
                src="/xusan.jpg"
                alt="Xusan Ibragimov"
                className="h-full w-full object-cover object-bottom"
                style={{ filter: "brightness(0.78) contrast(1.06) saturate(0.82)", imageOrientation: "none" }}
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.18, ease }}
            style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#8b8b8f", fontFamily: "var(--font-jetbrains),monospace", marginBottom: "36px" }}
          >
            {tr.about.title}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, originX: "0%" }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "36px" }}
          />

          {/* One punchy line */}
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28, ease }}
            style={{ fontSize: "15px", color: "#9b9ba0", fontFamily: "var(--font-jetbrains),monospace", lineHeight: 1.75, letterSpacing: "0.01em", maxWidth: "400px", marginBottom: "48px" }}
          >
            {tr.about.bio}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.34, ease }}
            className="flex gap-10 flex-wrap mb-12"
          >
            {tr.about.stats.map((s) => (
              <div key={s.value} className="flex flex-col gap-1.5">
                <span className="font-display font-semibold text-oryx-white" style={{ fontSize: "clamp(36px,3.5vw,52px)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {s.value}
                </span>
                <span style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>
                  {s.label.toUpperCase()}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.4, ease }}
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 border border-oryx-white bg-oryx-white px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-black transition-all duration-300 hover:bg-transparent hover:text-oryx-white"
            >
              {tr.about.cta}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
          </motion.div>
        </div>

        {/* ── Right — photo, full bleed (desktop only) ────────────────── */}
        <motion.div
          className="relative hidden w-full overflow-hidden lg:block lg:w-[50%]"
          style={{ minHeight: "480px" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.08, ease }}
        >
          <img
            src="/xusan.jpg"
            alt="Xusan Ibragimov"
            className="absolute inset-0 h-full w-full object-cover object-bottom"
            style={{ filter: "brightness(0.72) contrast(1.08) saturate(0.78)", imageOrientation: "none" }}
          />

          {/* Left fade into section bg */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(90deg,#020202 0%,rgba(2,2,2,0.4) 30%,transparent 60%)",
          }} />

          {/* Bottom fade */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(0deg,rgba(2,2,2,0.6) 0%,transparent 35%)",
          }} />

          {/* Corner brackets */}
          <div aria-hidden className="absolute top-6 right-6 pointer-events-none"
            style={{ width: "16px", height: "16px", borderTop: "1px solid rgba(255,255,255,0.22)", borderRight: "1px solid rgba(255,255,255,0.22)" }} />
          <div aria-hidden className="absolute bottom-6 left-6 pointer-events-none"
            style={{ width: "16px", height: "16px", borderBottom: "1px solid rgba(255,255,255,0.22)", borderLeft: "1px solid rgba(255,255,255,0.22)" }} />

          {/* Grain */}
          <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full mix-blend-soft-light" style={{ opacity: 0.04 }}>
            <filter id="photo-grain"><feTurbulence type="fractalNoise" baseFrequency="1.7" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
            <rect width="100%" height="100%" filter="url(#photo-grain)" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
