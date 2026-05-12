"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypingHeadlineProps = {
  /** Lines to type. A line break renders as a hard <br>. */
  lines: string[];
  /** Ms per character. */
  speed?: number;
  /** Ms gap between lines. */
  lineGap?: number;
  /** Whether typing should start. */
  start?: boolean;
  /** Fires once when the final character is typed. */
  onComplete?: () => void;
  className?: string;
};

/**
 * Multi-line typing animation with a white block cursor.
 * Respects prefers-reduced-motion (renders fully immediately).
 */
export function TypingHeadline({
  lines,
  speed = 32,
  lineGap = 160,
  start = true,
  onComplete,
  className = "",
}: TypingHeadlineProps) {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState<string[]>(() => lines.map(() => ""));
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    if (reduceMotion) {
      setTyped(lines);
      setDone(true);
      onComplete?.();
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    const typeLine = (lineIndex: number) => {
      if (cancelled || lineIndex >= lines.length) {
        setDone(true);
        onComplete?.();
        return;
      }
      const text = lines[lineIndex];
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setTyped((prev) => {
          const next = [...prev];
          next[lineIndex] = text.slice(0, i);
          return next;
        });
        if (i < text.length) {
          timers.push(window.setTimeout(tick, speed));
        } else {
          timers.push(window.setTimeout(() => typeLine(lineIndex + 1), lineGap));
        }
      };
      tick();
    };

    timers.push(window.setTimeout(() => typeLine(0), 80));
    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
    // We intentionally do not depend on `lines` reference; pass a stable array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, reduceMotion]);

  return (
    <h1 className={className}>
      {typed.map((line, i) => {
        const isCurrent =
          !done &&
          line.length < lines[i].length &&
          typed.slice(0, i).every((t, j) => t === lines[j]);
        return (
          <span key={i} className="block">
            {line || " "}
            {isCurrent && <BlockCursor />}
          </span>
        );
      })}
      {done && (
        <span aria-hidden className="sr-only">
          {lines.join(" ")}
        </span>
      )}
    </h1>
  );
}

function BlockCursor() {
  return (
    <span
      aria-hidden
      className="ml-[0.05em] inline-block h-[0.78em] w-[0.42em] translate-y-[0.05em] bg-oryx-white align-baseline"
      style={{ animation: "headline-cursor 0.95s steps(2, start) infinite" }}
    />
  );
}
