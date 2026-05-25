"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
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
      aria-label="About ORYX — digital product studio in Tashkent"
    >
      {/* Grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        backgroundImage: [
          "linear-gradient(to right,rgba(255,255,255,0.022) 1px,transparent 1px)",
          "linear-gradient(to bottom,rgba(255,255,255,0.018) 1px,transparent 1px)",
        ].join(","),
        backgroundSize: "80px 80px",
      }} />

      <div className="relative z-10 flex h-full flex-col lg:flex-row" style={{ minHeight: "90vh" }}>

        {/* ── Left ─────────────────────────────────────────────────── */}
        <div className="flex w-full flex-col justify-center px-[7.6vw] py-20 lg:w-[50%] lg:py-32">

          {/* Eyebrow + location */}
          <motion.div
            className="mb-6 flex items-center gap-4"
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease }}
          >
            <span style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>
              {tr.about.label}
            </span>
            <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)", display: "inline-block" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.22em", color: "#3a3a40", fontFamily: "var(--font-jetbrains),monospace" }}>
              TASHKENT · UZ
            </span>
          </motion.div>

          {/* Name + mobile photo */}
          <div className="flex items-start justify-between gap-4 lg:block">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease }}
                className="font-display font-semibold text-oryx-white"
                style={{ fontSize: "clamp(36px,4.2vw,68px)", letterSpacing: "-0.028em", lineHeight: 1.04, marginBottom: "10px" }}
              >
                Xusan<br />Ibragimov
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.18, ease }}
                style={{ fontSize: "11px", letterSpacing: "0.22em", color: "#8b8b8f", fontFamily: "var(--font-jetbrains),monospace", marginBottom: "0" }}
              >
                {tr.about.title}
              </motion.p>
            </div>

            {/* Mobile portrait */}
            <motion.div
              className="lg:hidden shrink-0 overflow-hidden rounded-sm"
              style={{ width: "110px", height: "140px", position: "relative", border: "1px solid rgba(255,255,255,0.1)" }}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.14, ease }}
            >
              <Image
                src="/xusan.jpg"
                alt="Xusan Ibragimov, CEO and founder of ORYX digital product studio in Tashkent"
                fill
                sizes="110px"
                className="object-cover object-top"
                style={{ filter: "brightness(0.85) contrast(1.05) saturate(0)" }}
              />
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, originX: "0%" }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "28px 0" }}
          />

          {/* Bio — studio voice */}
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            style={{ fontSize: "15px", color: "#9b9ba0", fontFamily: "var(--font-jetbrains),monospace", lineHeight: 1.75, letterSpacing: "0.01em", maxWidth: "420px", marginBottom: "28px" }}
          >
            {tr.about.bio}
          </motion.p>

          {/* Capability tags */}
          <motion.div
            className="mb-10 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.36, ease }}
          >
            {tr.about.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: "#4f4f55",
                  fontFamily: "var(--font-jetbrains),monospace",
                  padding: "5px 10px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "2px",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.42, ease }}
            className="mb-12 flex gap-8 flex-wrap"
          >
            {tr.about.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5">
                <span className="font-display font-semibold text-oryx-white" style={{ fontSize: "clamp(28px,2.8vw,44px)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {s.value}
                </span>
                <span style={{ fontSize: "9px", letterSpacing: "0.18em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>
                  {s.label.toUpperCase()}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.48, ease }}
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

        {/* ── Right — photo ────────────────────────────────────────── */}
        <motion.div
          className="relative hidden w-full overflow-hidden lg:block lg:w-[50%]"
          style={{ minHeight: "480px" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.08, ease }}
        >
          <Image
            src="/xusan.jpg"
            alt="Xusan Ibragimov, founder and CEO of ORYX digital product studio, Tashkent"
            fill
            sizes="50vw"
            className="object-cover"
            style={{ objectPosition: "center 12%", filter: "brightness(0.92) contrast(1.04) saturate(0)" }}
            priority={false}
          />

          {/* Left fade */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,#020202 0%,rgba(2,2,2,0.25) 22%,transparent 45%)" }} />

          {/* Bottom fade */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(2,2,2,0.4) 0%,transparent 22%)" }} />

          {/* Floating studio tag — top right */}
          <motion.div
            className="absolute right-7 top-7 flex flex-col items-end gap-1"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            <span style={{ fontSize: "9px", letterSpacing: "0.26em", color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-jetbrains),monospace" }}>
              STUDIO ORYX
            </span>
            <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.12)", fontFamily: "var(--font-jetbrains),monospace" }}>
              EST. 2022
            </span>
          </motion.div>

          {/* Corner bracket — top right */}
          <div aria-hidden className="absolute top-6 right-6 pointer-events-none"
            style={{ width: "16px", height: "16px", borderTop: "1px solid rgba(255,255,255,0.18)", borderRight: "1px solid rgba(255,255,255,0.18)" }} />

          {/* Corner bracket — bottom left */}
          <div aria-hidden className="absolute bottom-6 left-6 pointer-events-none"
            style={{ width: "16px", height: "16px", borderBottom: "1px solid rgba(255,255,255,0.18)", borderLeft: "1px solid rgba(255,255,255,0.18)" }} />

          {/* Grain */}
          <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full mix-blend-soft-light" style={{ opacity: 0.035 }}>
            <filter id="photo-grain"><feTurbulence type="fractalNoise" baseFrequency="1.7" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
            <rect width="100%" height="100%" filter="url(#photo-grain)" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
