"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeroBackground } from "@/components/HeroBackground";
import { HeroParticleOverlay } from "@/components/HeroParticleOverlay";
import { Header } from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";

type HeroProps = { active?: boolean };

export function Hero({ active = true }: HeroProps) {
  const { tr } = useLanguage();
  const reduceMotion = useReducedMotion();
  const sectionRef   = useRef<HTMLElement>(null);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [typedDone, setTypedDone] = useState(false);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduceMotion) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setBgOffset({
        x: -((e.clientX - rect.left) / rect.width - 0.5) * 10,
        y: -((e.clientY - rect.top)  / rect.height - 0.5) * 6,
      });
    },
    [reduceMotion],
  );

  const onLeave = useCallback(() => setBgOffset({ x: 0, y: 0 }), []);

  useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(() => setTypedDone(true), 900);
    return () => window.clearTimeout(t);
  }, [active]);

  return (
    <section
      ref={sectionRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#030303] text-oryx-white"
      aria-label="ORYX"
    >
      <HeroBackground parallaxX={bgOffset.x} parallaxY={bgOffset.y} />
      <HeroParticleOverlay />
      <Header visible={active} />

      <div className="relative z-20 flex flex-1 items-center px-[7.6vw] pt-28">
        <div className="max-w-[760px]">

          <motion.p
            className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-dim"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {tr.hero.eyebrow}
          </motion.p>

          <h1 className="max-w-[680px] font-display text-[clamp(36px,3.8vw,72px)] font-medium leading-[1.04] tracking-[-0.02em]">
            {tr.hero.headline.map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
                animate={{
                  opacity: active ? 1 : 0,
                  y:       active ? 0 : 22,
                  filter:  active ? "blur(0px)" : "blur(4px)",
                }}
                transition={{ duration: 0.65, delay: active ? 0.1 + i * 0.12 : 0, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-10 max-w-[520px] font-mono text-sm leading-7 tracking-[0.02em] text-oryx-dim"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: typedDone ? 1 : 0, y: typedDone ? 0 : 6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {tr.hero.description}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: typedDone ? 1 : 0, y: typedDone ? 0 : 6 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="#contact"
              className="group inline-flex items-center gap-3 border border-oryx-white bg-oryx-white px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-black transition-all duration-300 hover:bg-transparent hover:text-oryx-white">
              {tr.hero.cta1}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                const section = document.getElementById("work");
                if (!section) return;
                const overlay = document.createElement("div");
                overlay.style.cssText = "position:fixed;inset:0;z-index:9999;background:#020202;opacity:0;pointer-events:none;transition:opacity 180ms ease";
                document.body.appendChild(overlay);
                requestAnimationFrame(() => { overlay.style.opacity = "1"; });
                setTimeout(() => {
                  const top = section.getBoundingClientRect().top + window.scrollY + 140;
                  window.scrollTo({ top, behavior: "instant" });
                  setTimeout(() => {
                    overlay.style.transition = "opacity 320ms ease";
                    overlay.style.opacity = "0";
                    setTimeout(() => overlay.remove(), 360);
                  }, 40);
                }, 200);
              }}
              className="group inline-flex items-center gap-3 border border-oryx-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-white transition-colors duration-300 hover:border-oryx-white"
            >
              {tr.hero.cta2}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-20 flex items-end justify-between px-[7.6vw] pb-8 font-mono text-[10px] uppercase tracking-[0.22em] text-oryx-mute"
        initial={{ opacity: 0 }}
        animate={{ opacity: typedDone ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <span>&gt; {tr.hero.scroll}</span>
        <span className="hidden sm:inline">{tr.hero.year}</span>
      </motion.div>
    </section>
  );
}
