"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OryxBootBackground } from "@/components/OryxBootBackground";

type IntroLoaderProps = {
  onComplete: () => void;
};

const bootLines = [
  { command: "INITIALIZING ORYX", status: "[ OK ]" },
  { command: "SYSTEM CHECK", status: "[ OK ]" },
  { command: "READY", status: "[ ✓ ]" },
];

function useTypedText(text: string, start: boolean, speed = 24) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!start) {
      setValue("");
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setValue(text.slice(0, index));
      if (index >= text.length) window.clearInterval(interval);
    }, speed);

    return () => window.clearInterval(interval);
  }, [speed, start, text]);

  return value;
}

function TerminalLine({
  command,
  status,
  active,
  statusActive,
}: {
  command: string;
  status: string;
  active: boolean;
  statusActive: boolean;
}) {
  const typed = useTypedText(command, active);

  return (
    <div className="grid w-[calc(100vw-88px)] grid-cols-[18px_minmax(0,1fr)_62px] items-center gap-[14px] font-mono text-[16px] leading-none tracking-[0.045em] text-oryx-white sm:w-auto sm:grid-cols-[22px_minmax(0,370px)_88px] sm:gap-[24px] sm:text-[clamp(18px,1.45vw,27px)]">
      <motion.span
        className="text-oryx-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      >
        &gt;
      </motion.span>
      <span className="min-h-[1em] whitespace-nowrap">{typed}</span>
      <motion.span
        className="whitespace-nowrap text-right"
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{
          opacity: statusActive ? 1 : 0,
          filter: statusActive ? "blur(0px)" : "blur(4px)",
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {status}
      </motion.span>
    </div>
  );
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStage(1), 250),
      window.setTimeout(() => setStage(2), 950),
      window.setTimeout(() => setStage(3), 1650),
      window.setTimeout(() => setStage(4), 2200),
      window.setTimeout(() => setStage(5), 2580),
      window.setTimeout(() => setVisible(false), 3500),
      window.setTimeout(onComplete, 4070),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="fixed inset-0 z-50 overflow-hidden bg-oryx-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(5px)" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          aria-label="ORYX loading sequence"
        >
          <OryxBootBackground ready={stage >= 4} />

          <div className="relative z-10 h-full">
            <motion.img
              src="/oryx-logo-white.svg"
              alt="ORYX"
              className="absolute left-[13.25vw] top-[21.2vh] h-auto w-[clamp(236px,17.6vw,318px)] object-contain"
              initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
              animate={{
                opacity: stage >= 1 ? 1 : 0,
                y: stage >= 1 ? 0 : 8,
                filter: stage >= 1 ? "blur(0px)" : "blur(8px)",
              }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="absolute left-[13.35vw] top-[42.1vh] flex flex-col gap-[32px]">
              {bootLines.map((line, index) => (
                <TerminalLine
                  key={line.command}
                  command={line.command}
                  status={line.status}
                  active={stage >= index + 2}
                  statusActive={stage >= index + 3}
                />
              ))}

              <motion.div
                className="terminal-cursor mt-[18px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 5 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
