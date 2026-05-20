"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OryxBootBackground } from "@/components/OryxBootBackground";
import { useLanguage } from "@/context/LanguageContext";

type IntroLoaderProps = { onComplete: () => void };
type FlickerState = "none" | "black" | "white";

// Stage assignments for each boot line (fixed, not translated)
const BOOT_LINE_STAGES = [
  { stage: 2, doneStage: 3 },
  { stage: 3, doneStage: 4 },
  { stage: 4, doneStage: 5 },
];

// Progress milestones matched to stage timings
const PROGRESS_BY_STAGE: Record<number, number> = {
  0: 0,
  1: 8,
  2: 28,
  3: 58,
  4: 82,
  5: 100,
};

function useTypedText(text: string, start: boolean, speed = 24) {
  const [value, setValue] = useState("");
  const [done, setDone]   = useState(false);

  useEffect(() => {
    if (!start) { setValue(""); setDone(false); return; }
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setValue(text.slice(0, index));
      if (index >= text.length) { window.clearInterval(interval); setDone(true); }
    }, speed);
    return () => window.clearInterval(interval);
  }, [speed, start, text]);

  return { value, done };
}

function TerminalLine({
  command, status, active, statusActive,
}: {
  command: string; status: string; active: boolean; statusActive: boolean;
}) {
  const { value: typed, done } = useTypedText(command, active);
  const showCursor = active && !done && !statusActive;

  return (
    <div className="grid w-[calc(100vw-88px)] grid-cols-[18px_minmax(0,1fr)_62px] items-center gap-[14px] font-mono text-[16px] leading-none tracking-[0.045em] text-oryx-white sm:w-auto sm:grid-cols-[22px_minmax(0,370px)_88px] sm:gap-[24px] sm:text-[clamp(18px,1.45vw,27px)]">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      >&gt;</motion.span>

      {/* Text + inline blinking cursor while this line is typing */}
      <span className="inline-flex min-h-[1em] items-center whitespace-nowrap">
        {typed}
        {showCursor && (
          <span
            aria-hidden
            className="ml-[3px] inline-block"
            style={{
              width: "clamp(9px,0.8vw,14px)",
              height: "1em",
              background: "#f6f6f7",
              boxShadow: "0 0 10px rgba(255,255,255,0.35)",
              animation: "cursor-blink 0.7s steps(2,start) infinite",
              verticalAlign: "text-bottom",
            }}
          />
        )}
      </span>

      <motion.span
        className="whitespace-nowrap text-right"
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: statusActive ? 1 : 0, filter: statusActive ? "blur(0px)" : "blur(4px)" }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >{status}</motion.span>
    </div>
  );
}

function ProgressBar({ stage }: { stage: number }) {
  const pct = PROGRESS_BY_STAGE[Math.min(stage, 5)] ?? 0;

  return (
    <motion.div
      className="flex items-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: stage >= 2 ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Bar track */}
      <div
        style={{
          width: "clamp(200px,26vw,380px)",
          height: "2px",
          background: "rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{ position: "absolute", inset: 0, transformOrigin: "left" }}
          animate={{ scaleX: pct / 100 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ width: "100%", height: "100%", background: "#f6f6f7", boxShadow: "0 0 8px rgba(255,255,255,0.5)" }} />
        </motion.div>
      </div>

      {/* Percentage */}
      <motion.span
        key={pct}
        animate={{ opacity: [0.4, 1] }}
        transition={{ duration: 0.15 }}
        style={{
          fontFamily: "var(--font-jetbrains),monospace",
          fontSize: "clamp(11px,0.9vw,14px)",
          color: pct === 100 ? "#f6f6f7" : "#4f4f55",
          letterSpacing: "0.08em",
          minWidth: "42px",
        }}
      >
        {pct}%
      </motion.span>
    </motion.div>
  );
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const { tr } = useLanguage();
  const [visible, setVisible] = useState(true);
  const [stage,   setStage]   = useState(0);
  const [flicker, setFlicker] = useState<FlickerState>("none");

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStage(1),  250),
      window.setTimeout(() => setStage(2),  950),
      window.setTimeout(() => setStage(3), 1650),
      window.setTimeout(() => setStage(4), 2200),
      window.setTimeout(() => setStage(5), 2580),

      // Power-death flicker
      window.setTimeout(() => setFlicker("black"),  2920),
      window.setTimeout(() => setFlicker("none"),   2985),
      window.setTimeout(() => setFlicker("black"),  3070),
      window.setTimeout(() => setFlicker("none"),   3125),
      window.setTimeout(() => setFlicker("black"),  3200),
      window.setTimeout(() => setFlicker("none"),   3240),
      window.setTimeout(() => setFlicker("black"),  3300),
      window.setTimeout(() => setFlicker("none"),   3330),
      window.setTimeout(() => setFlicker("white"),  3390),
      window.setTimeout(() => setFlicker("none"),   3470),

      window.setTimeout(() => setVisible(false), 3580),
      window.setTimeout(onComplete,              4160),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="fixed inset-0 z-50 overflow-hidden bg-oryx-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          aria-label="ORYX loading sequence"
        >
          <OryxBootBackground ready={stage >= 4} />

          {/* ── Scanline overlay ─────────────────────────────────────── */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.13) 2px, rgba(0,0,0,0.13) 4px)",
              backgroundSize: "100% 4px",
            }}
          />

          {/* ── Content ──────────────────────────────────────────────── */}
          <div className="relative z-20 h-full">
            <motion.img
              src="/oryx-logo-white.svg"
              alt="ORYX"
              className="absolute left-[13.25vw] top-[21.2vh] h-auto w-[clamp(236px,17.6vw,318px)] object-contain"
              initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
              animate={{
                opacity: stage >= 1 ? 1 : 0,
                y:       stage >= 1 ? 0 : 8,
                filter:  stage >= 1 ? "blur(0px)" : "blur(8px)",
              }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="absolute left-[13.35vw] top-[42.1vh] flex flex-col gap-[32px]">
              {tr.loader.lines.map((line, index) => (
                <TerminalLine
                  key={line.command}
                  command={line.command}
                  status={line.status}
                  active={stage >= BOOT_LINE_STAGES[index].stage}
                  statusActive={stage >= BOOT_LINE_STAGES[index].doneStage}
                />
              ))}

              {/* Progress bar */}
              <div className="mt-2">
                <ProgressBar stage={stage} />
              </div>

              {/* Final blinking cursor after everything done */}
              <motion.div
                className="terminal-cursor"
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 5 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          {/* ── Flicker overlay ───────────────────────────────────────── */}
          {flicker !== "none" && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30"
              style={{ background: flicker === "black" ? "#020202" : "rgba(246,246,247,0.92)" }}
            />
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
