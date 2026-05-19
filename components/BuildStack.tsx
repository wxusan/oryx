"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_PHASE = 3;
const ANIMATION_LOCK_MS = 900;
const SCENE_TRANSITION = { duration: 0.82, ease: [0.22, 1, 0.36, 1] as const };
const UI_TRANSITION    = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

// ─── Types ────────────────────────────────────────────────────────────────────

type OverlayItem = { label: string; value?: string; delta?: string; x: string; y: string };
type SceneData   = { index: number; photo: string; num: string; title: string; subtitle: string; overlays: OverlayItem[] };
type ServiceEntry = { id: string; title: string; subtitle?: string; desc: string };

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: ServiceEntry[] = [
  {
    id: "01 — 02",
    title: "Websites & Platforms",
    subtitle: "CRM & ERP Systems",
    desc: "High-performance websites, landing pages, e-commerce, and booking platforms — plus CRM pipelines, client records, inventory, operations, approvals, and internal workflows.",
  },
  {
    id: "03",
    title: "Mobile Apps",
    desc: "iOS, Android, and cross-platform apps for customers, teams, marketplaces, and product ideas.",
  },
  {
    id: "04",
    title: "AI Automations & Custom Systems",
    desc: "AI agents, bots, integrations, custom workflows, reporting systems, and unusual ideas that do not fit a template.",
  },
];

const SCENE_DATA: SceneData[] = [
  {
    index: 0, photo: "/scene-1.png", num: "01 + 02",
    title: "Websites & Platforms", subtitle: "& CRM / ERP Systems",
    overlays: [
      { x: "5%",  y: "14%", label: "LANDING PAGE" },
      { x: "62%", y: "12%", label: "CRM PIPELINE" },
      { x: "5%",  y: "57%", label: "VISITORS",   value: "24.8K", delta: "+18%" },
      { x: "5%",  y: "74%", label: "CONVERSION", value: "3.92%", delta: "+12%" },
      { x: "62%", y: "57%", label: "LEADS",      value: "1.8K",  delta: "+31%" },
      { x: "62%", y: "74%", label: "CYCLE TIME", value: "2.1d",  delta: "−37%" },
    ],
  },
  {
    index: 1, photo: "/scene-2.png", num: "03",
    title: "Mobile Apps", subtitle: "iOS · Android · Cross-platform",
    overlays: [
      { x: "5%",  y: "14%", label: "CUSTOMER APP" },
      { x: "60%", y: "12%", label: "TEAM APP" },
      { x: "5%",  y: "57%", label: "INSTALLS",  value: "18.2K", delta: "+22%"  },
      { x: "5%",  y: "74%", label: "RETENTION", value: "47%",   delta: "+9.8%" },
      { x: "60%", y: "57%", label: "ORDERS",    value: "6.1K",  delta: "+19%"  },
      { x: "60%", y: "74%", label: "RATING",    value: "4.8★",  delta: "+0.4"  },
    ],
  },
  {
    index: 2, photo: "/scene-3.png", num: "04",
    title: "AI Automations", subtitle: "& Custom Systems",
    overlays: [
      { x: "5%",  y: "14%", label: "AI AGENT" },
      { x: "60%", y: "12%", label: "DECISION BRANCH" },
      { x: "5%",  y: "57%", label: "TRIGGERS",     value: "842/hr", delta: "+12%" },
      { x: "5%",  y: "74%", label: "PROCESSED",    value: "99.4%",  delta: "+2%"  },
      { x: "60%", y: "57%", label: "INTEGRATIONS", value: "18",     delta: "+6"   },
      { x: "60%", y: "74%", label: "LATENCY",      value: "1.2s",   delta: "−48%" },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function phaseToServiceIndex(phase: number): number {
  if (phase <= 1) return 0;
  if (phase === 2) return 1;
  return 2;
}

function getSceneTarget(sceneIndex: number, phase: number) {
  const activeAt = sceneIndex + 1;
  if (phase < activeAt)  return { x: "118%",  rotateY: -22, opacity: 0 };
  if (phase === activeAt) return { x: "0%",   rotateY:   0, opacity: 1 };
  return                         { x: "-118%", rotateY:  22, opacity: 0 };
}

// ─── VerticalSpine ────────────────────────────────────────────────────────────

function VerticalSpine({ phase }: { phase: number }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-y-0"
      style={{ left: "38%", width: "1px" }}
      animate={{ opacity: phase >= 1 ? 1 : 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg,transparent 0%,rgba(255,255,255,0.04) 12%,rgba(255,255,255,0.18) 35%,rgba(255,255,255,0.24) 50%,rgba(255,255,255,0.18) 65%,rgba(255,255,255,0.04) 88%,transparent 100%)",
        boxShadow: "0 0 8px rgba(255,255,255,0.06)",
      }} />
      {[0.28, 0.52, 0.76].map((pos, i) => (
        <div key={i} className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{ top: `${pos * 100}%`, width: "3px", height: "3px", background: "rgba(255,255,255,0.32)", boxShadow: "0 0 6px rgba(255,255,255,0.2)" }} />
      ))}
    </motion.div>
  );
}

// ─── SceneOverlayTag ──────────────────────────────────────────────────────────

function SceneOverlayTag({ item }: { item: OverlayItem }) {
  if (item.value) {
    return (
      <div className="absolute z-10 pointer-events-none" style={{ left: item.x, top: item.y }}>
        <div style={{ padding: "7px 9px", minWidth: "80px", background: "rgba(2,2,2,0.76)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "3px", backdropFilter: "blur(10px)" }}>
          <p style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace", lineHeight: 1, marginBottom: "6px" }}>{item.label}</p>
          <p style={{ fontSize: "15px", color: "#f6f6f7", fontFamily: "var(--font-jetbrains),monospace", lineHeight: 1 }}>{item.value}</p>
          <p style={{ fontSize: "9px", lineHeight: 1, marginTop: "5px", fontFamily: "var(--font-jetbrains),monospace", color: "#5aaa5a" }}>{item.delta}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute z-10 pointer-events-none" style={{ left: item.x, top: item.y }}>
      <div style={{ padding: "5px 10px", background: "rgba(2,2,2,0.68)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "3px", backdropFilter: "blur(6px)" }}>
        <p style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#8b8b8f", fontFamily: "var(--font-jetbrains),monospace", lineHeight: 1 }}>&gt; {item.label}</p>
      </div>
    </div>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────

function Scene({ data, phase }: { data: SceneData; phase: number }) {
  const reduceMotion = useReducedMotion();
  const target = getSceneTarget(data.index, phase);
  const animTarget = reduceMotion ? { opacity: target.opacity } : target;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-[2vw]"
      initial={false}
      animate={animTarget}
      transition={SCENE_TRANSITION}
    >
      <div className="relative overflow-hidden shrink-0" style={{
        width: "min(920px, 96%)", aspectRatio: "4 / 3", borderRadius: "4px",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 0 160px rgba(0,0,0,0.88), 0 32px 64px rgba(0,0,0,0.72), 0 8px 20px rgba(0,0,0,0.58)",
      }}>
        <img src={data.photo} alt={data.title}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(0.96) contrast(1.02) saturate(0.93)" }}
          loading="lazy" decoding="async" />

        {/* Light cinematic gradient — much less dark than before */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: [
            "linear-gradient(135deg, rgba(2,2,2,0.42) 0%, rgba(2,2,2,0.0) 45%, rgba(2,2,2,0.22) 100%)",
            "linear-gradient(0deg, rgba(2,2,2,0.30) 0%, transparent 18%)",
            "linear-gradient(90deg, rgba(2,2,2,0.18) 0%, transparent 14%)",
          ].join(", "),
        }} />

        <div className="absolute left-5 top-5 z-10">
          <span className="block mb-2" style={{ fontSize: "9px", letterSpacing: "0.28em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>&gt; {data.num}</span>
          <h3 className="font-display font-semibold leading-tight text-oryx-white" style={{ fontSize: "clamp(18px, 1.8vw, 26px)" }}>{data.title}</h3>
          <p style={{ fontSize: "11px", color: "#8b8b8f", marginTop: "4px", fontFamily: "var(--font-jetbrains),monospace" }}>{data.subtitle}</p>
        </div>

        {data.overlays.map((item, i) => <SceneOverlayTag key={i} item={item} />)}

        <div aria-hidden className="absolute top-3 right-3 pointer-events-none"
          style={{ width: "14px", height: "14px", borderTop: "1px solid rgba(255,255,255,0.24)", borderRight: "1px solid rgba(255,255,255,0.24)" }} />
        <div aria-hidden className="absolute bottom-3 left-3 pointer-events-none"
          style={{ width: "14px", height: "14px", borderBottom: "1px solid rgba(255,255,255,0.24)", borderLeft: "1px solid rgba(255,255,255,0.24)" }} />

        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full mix-blend-soft-light" style={{ opacity: 0.032 }}>
          <filter id={`sg${data.index}`}>
            <feTurbulence type="fractalNoise" baseFrequency="1.7" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#sg${data.index})`} />
        </svg>
      </div>
    </motion.div>
  );
}

// ─── ServiceListItem ──────────────────────────────────────────────────────────

function ServiceListItem({ service, isActive, isPast }: { service: ServiceEntry; isActive: boolean; isPast: boolean }) {
  return (
    <div className="flex gap-5 items-start">
      <span className="shrink-0 transition-colors duration-500 pt-0.5" style={{
        fontSize: "15px", letterSpacing: "0.06em", fontFamily: "var(--font-jetbrains),monospace", whiteSpace: "nowrap",
        color: isActive ? "#f6f6f7" : isPast ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.12)",
      }}>{service.id}</span>
      <div className="flex-1 min-w-0">
        <p className="uppercase transition-colors duration-500" style={{
          fontSize: "15px", letterSpacing: "0.10em", fontFamily: "var(--font-jetbrains),monospace",
          color: isActive ? "#f6f6f7" : isPast ? "#606068" : "#30303a",
        }}>{service.title}</p>
        {service.subtitle && (
          <p className="uppercase transition-colors duration-500 mt-1" style={{
            fontSize: "14px", letterSpacing: "0.10em", fontFamily: "var(--font-jetbrains),monospace",
            color: isActive ? "#8b8b8f" : isPast ? "#3c3c44" : "#22222a",
          }}>+ {service.subtitle}</p>
        )}
        <div className="overflow-hidden" style={{
          maxHeight: isActive ? "120px" : "0px", opacity: isActive ? 1 : 0,
          transition: "max-height 0.55s ease-in-out, opacity 0.55s ease-in-out",
        }}>
          <p className="mt-3 leading-relaxed" style={{
            fontSize: "13px", color: "#9b9ba0", letterSpacing: "0.02em", fontFamily: "var(--font-jetbrains),monospace",
          }}>{service.desc}</p>
        </div>
      </div>
    </div>
  );
}

// ─── BuildStack ───────────────────────────────────────────────────────────────

export function BuildStack() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const phaseRef       = useRef(0);
  const isAnimatingRef = useRef(false);
  const inViewRef      = useRef(false);
  const [phase, setPhase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase gate: only advance 1 step at a time, lock during animation
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (isAnimatingRef.current) return;

    let target = 0;
    if (v >= 0.66) target = 3;
    else if (v >= 0.38) target = 2;
    else if (v >= 0.08) target = 1;

    const next = Math.min(phaseRef.current + 1, Math.max(phaseRef.current - 1, target));
    if (next === phaseRef.current) return;

    phaseRef.current = next;
    setPhase(next);
    isAnimatingRef.current = true;
    setTimeout(() => { isAnimatingRef.current = false; }, ANIMATION_LOCK_MS);
  });

  // Track in-view for the wheel lock
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { inViewRef.current = e.isIntersecting; },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Lock wheel scroll during animation so position doesn't advance while card is moving
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (inViewRef.current && isAnimatingRef.current) e.preventDefault();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const activeServiceIdx = phaseToServiceIndex(phase);

  return (
    <section ref={containerRef} id="services" style={{ height: "500vh" }} aria-label="ORYX build stack">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#020202]">

        {/* Section background grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          backgroundImage: [
            "linear-gradient(to right, rgba(255,255,255,0.028) 1px, transparent 1px)",
            "linear-gradient(to bottom, rgba(255,255,255,0.024) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "80px 80px",
        }} />

        {/* Grain */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full mix-blend-soft-light" style={{ opacity: 0.025 }}>
          <filter id="bs-grain">
            <feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#bs-grain)" />
        </svg>

        {/* ── PHASE 0: Hero text — solid black, nothing bleeds through ──── */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 text-center"
          initial={false}
          animate={{ opacity: phase === 0 ? 1 : 0, pointerEvents: phase === 0 ? "auto" : "none" }}
          transition={UI_TRANSITION}
          style={{ background: "#020202" }}
        >
          {/* Same grid texture on the overlay so it feels continuous */}
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{
            backgroundImage: [
              "linear-gradient(to right, rgba(255,255,255,0.028) 1px, transparent 1px)",
              "linear-gradient(to bottom, rgba(255,255,255,0.024) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "80px 80px",
          }} />

          {/* Corner brackets */}
          {([
            "top-8 left-[7.6vw] border-t border-l",
            "top-8 right-[7.6vw] border-t border-r",
            "bottom-8 left-[7.6vw] border-b border-l",
            "bottom-8 right-[7.6vw] border-b border-r",
          ] as const).map((cls, i) => (
            <div key={i} aria-hidden className={`absolute ${cls} pointer-events-none`}
              style={{ width: "18px", height: "18px", borderColor: "rgba(255,255,255,0.14)" }} />
          ))}

          {/* Horizontal scan line at mid-height */}
          <div aria-hidden className="pointer-events-none absolute left-0 right-0"
            style={{ top: "50%", height: "1px", background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.07) 20%,rgba(255,255,255,0.13) 50%,rgba(255,255,255,0.07) 80%,transparent 100%)" }} />

          {/* Text */}
          <p className="relative mb-7 z-10" style={{ fontSize: "11px", letterSpacing: "0.34em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>
            &gt;&nbsp; BUILD STACK
          </p>
          <h2 className="relative z-10 font-display font-medium tracking-[-0.025em] text-oryx-white" style={{ fontSize: "clamp(44px, 5.8vw, 92px)", lineHeight: 1.04 }}>
            One studio.<br />Four systems.
          </h2>
          <p className="relative z-10 mt-7 leading-[1.85]" style={{ fontSize: "14px", color: "#8b8b8f", fontFamily: "var(--font-jetbrains),monospace", letterSpacing: "0.01em", maxWidth: "520px" }}>
            We design, build, automate, and visualize<br />digital operations that scale.
          </p>
          <div className="relative z-10 mt-14 flex items-center gap-3">
            <div style={{ width: "28px", height: "1px", background: "rgba(255,255,255,0.14)" }} />
            <p style={{ fontSize: "9px", letterSpacing: "0.3em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>SCROLL TO EXPLORE</p>
            <div style={{ width: "28px", height: "1px", background: "rgba(255,255,255,0.14)" }} />
          </div>
        </motion.div>

        {/* ── PHASES 1-3: Left panel + Right scenes ───────────────────── */}
        <motion.div
          className="relative z-10 flex h-full flex-col lg:flex-row"
          initial={false}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
          transition={UI_TRANSITION}
          style={{ pointerEvents: phase >= 1 ? "auto" : "none" }}
        >
          {/* Left panel */}
          <div className="flex w-full flex-col justify-center overflow-hidden px-[7.6vw] py-10 lg:w-[38%] lg:py-16 lg:overflow-visible">
            <p className="mb-8" style={{ fontSize: "11px", letterSpacing: "0.28em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>
              &gt; BUILD STACK
            </p>
            <h2 className="font-display font-medium leading-[1.06] tracking-[-0.02em] text-oryx-white" style={{ fontSize: "clamp(28px, 3.2vw, 52px)" }}>
              One studio.<br />Four systems.
            </h2>
            <p className="mt-5 leading-[1.75]" style={{ fontSize: "13px", color: "#9b9ba0", letterSpacing: "0.01em", maxWidth: "340px", fontFamily: "var(--font-jetbrains),monospace" }}>
              We design, build, automate, and visualize digital operations that scale.
            </p>
            <div className="my-8" style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
            <div className="flex flex-col gap-6">
              {SERVICES.map((s, i) => (
                <ServiceListItem key={s.id} service={s} isActive={activeServiceIdx === i} isPast={activeServiceIdx > i} />
              ))}
            </div>
            {/* Progress strip */}
            <div className="mt-10 flex items-center gap-2">
              {SERVICES.map((_, i) => (
                <div key={i} className="rounded-[1px] transition-all duration-500 ease-in-out" style={{
                  height: "2px",
                  width: activeServiceIdx === i ? "32px" : "12px",
                  background: activeServiceIdx === i ? "rgba(255,255,255,0.88)" : activeServiceIdx > i ? "rgba(255,255,255,0.30)" : "rgba(255,255,255,0.09)",
                }} />
              ))}
              <span className="ml-2" style={{ fontSize: "10px", letterSpacing: "0.22em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>
                0{activeServiceIdx + 1} / 03
              </span>
            </div>
          </div>

          {/* Right panel */}
          <div className="relative flex-1 overflow-hidden" style={{ perspective: "1200px" }}>
            <VerticalSpine phase={phase} />
            {SCENE_DATA.map((s) => <Scene key={s.index} data={s} phase={phase} />)}
            <div aria-hidden className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(255,255,255,0.009) 0%, transparent 55%)" }} />
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
          style={{ background: "linear-gradient(0deg, #020202 0%, transparent 100%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0"
          style={{ width: "7.6vw", background: "linear-gradient(90deg, rgba(2,2,2,0.48) 0%, transparent 100%)" }} />
      </div>
    </section>
  );
}
