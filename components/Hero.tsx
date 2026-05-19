"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeroBackground } from "@/components/HeroBackground";
import { HeroParticleOverlay } from "@/components/HeroParticleOverlay";
import { TypingHeadline } from "@/components/TypingHeadline";
import { Header } from "@/components/Header";

const HEADLINE = [
  "We turn ideas into",
  "digital products",
  "that scale.",
];

const DESCRIPTION =
  "Founder-led digital product studio for websites, MVPs, automations, and AI systems.";

type HeroProps = {
  /** Gate that delays animations until the IntroLoader has finished. */
  active?: boolean;
};

export function Hero({ active = true }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax offset for the background image (rendered through HeroBackground)
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [typedDone, setTypedDone] = useState(false);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduceMotion) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      // Background drifts opposite to cursor for "depth" feel
      setBgOffset({ x: -nx * 10, y: -ny * 6 });
    },
    [reduceMotion],
  );

  const onLeave = useCallback(() => {
    setBgOffset({ x: 0, y: 0 });
  }, []);

  // Mark headline done after a max budget so the rest of the page can reveal
  useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(() => setTypedDone(true), 3200);
    return () => window.clearTimeout(t);
  }, [active]);

  return (
    <section
      ref={sectionRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#030303] text-oryx-white"
      aria-label="ORYX — turning ideas into products that scale"
    >
      <HeroBackground parallaxX={bgOffset.x} parallaxY={bgOffset.y} />
      <HeroParticleOverlay />

      <Header visible={active} />

      <div className="relative z-20 flex flex-1 items-center px-[7.6vw] pt-28">
        <div className="max-w-[760px]">
          {/* Eyebrow */}
          <motion.p
            className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-dim"
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: active ? 1 : 0,
              y: active ? 0 : 6,
            }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            &gt; ORYX / HOME
          </motion.p>

          {/* Typed headline */}
          <TypingHeadline
            lines={HEADLINE}
            start={active}
            speed={28}
            lineGap={140}
            onComplete={() => setTypedDone(true)}
            className="max-w-[680px] font-display text-[clamp(36px,3.8vw,72px)] font-medium leading-[1.04] tracking-[-0.02em]"
          />

          {/* Description */}
          <motion.p
            className="mt-10 max-w-[520px] font-mono text-sm leading-7 tracking-[0.02em] text-oryx-dim"
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: typedDone ? 1 : 0,
              y: typedDone ? 0 : 6,
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {DESCRIPTION}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: typedDone ? 1 : 0,
              y: typedDone ? 0 : 6,
            }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 border border-oryx-white bg-oryx-white px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-black transition-all duration-300 hover:bg-transparent hover:text-oryx-white"
            >
              BOOK A 20-MIN CALL
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-3 border border-oryx-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-white transition-colors duration-300 hover:border-oryx-white"
            >
              VIEW OUR WORK
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom meta strip */}
      <motion.div
        className="relative z-20 flex items-end justify-between px-[7.6vw] pb-8 font-mono text-[10px] uppercase tracking-[0.22em] text-oryx-mute"
        initial={{ opacity: 0 }}
        animate={{ opacity: typedDone ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <span>&gt; SCROLL TO EXPLORE</span>
        <span className="hidden sm:inline">2026 — STUDIO ORYX</span>
      </motion.div>
    </section>
  );
}
