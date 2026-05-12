"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  previewTitle: string;
  previewSubtitle: string;
  metrics: Array<{ label: string; value: string; delta: string }>;
  flow: Array<{ label: string; detail: string }>;
};

const SERVICES: Service[] = [
  {
    id: "websites",
    number: "01",
    title: "Websites & Platforms",
    summary:
      "High-performance websites, landing pages, portals, e-commerce, and booking platforms built for growth.",
    previewTitle: "Growth platform interface",
    previewSubtitle: "Landing page, client portal, conversion path, and measurement layer.",
    metrics: [
      { label: "Visitors", value: "24.8K", delta: "+18.6%" },
      { label: "Sessions", value: "56.3K", delta: "+21.4%" },
      { label: "Conversion", value: "3.92%", delta: "+12.7%" },
      { label: "Revenue", value: "$128.4K", delta: "+27.3%" },
    ],
    flow: [
      { label: "Visit", detail: "Lead capture" },
      { label: "Route", detail: "Booking / cart" },
      { label: "Measure", detail: "Analytics event" },
      { label: "Sync", detail: "CRM record" },
    ],
  },
  {
    id: "crm-erp",
    number: "02",
    title: "CRM & ERP Systems",
    summary:
      "Business systems for leads, clients, inventory, operations, approvals, dashboards, and internal workflows.",
    previewTitle: "Operations command system",
    previewSubtitle: "Pipeline, inventory, approvals, finance, and team activity in one place.",
    metrics: [
      { label: "Leads", value: "1.8K", delta: "+31.2%" },
      { label: "Tasks", value: "9.4K", delta: "+44.1%" },
      { label: "Stock Sync", value: "99.8%", delta: "+8.9%" },
      { label: "Cycle Time", value: "2.1d", delta: "-36.5%" },
    ],
    flow: [
      { label: "Lead", detail: "Qualify" },
      { label: "Approve", detail: "Manager rule" },
      { label: "Invoice", detail: "ERP action" },
      { label: "Report", detail: "Ops dashboard" },
    ],
  },
  {
    id: "mobile",
    number: "03",
    title: "Mobile Apps",
    summary:
      "iOS, Android, and cross-platform apps for customers, teams, marketplaces, and product ideas.",
    previewTitle: "Mobile product system",
    previewSubtitle: "Customer app, team app, notifications, marketplace flows, and backend sync.",
    metrics: [
      { label: "Installs", value: "18.2K", delta: "+22.4%" },
      { label: "Retention", value: "47%", delta: "+9.8%" },
      { label: "Orders", value: "6.1K", delta: "+19.2%" },
      { label: "Rating", value: "4.8", delta: "+0.4" },
    ],
    flow: [
      { label: "Open", detail: "App session" },
      { label: "Action", detail: "Book / order" },
      { label: "Notify", detail: "Push event" },
      { label: "Sync", detail: "Backend state" },
    ],
  },
  {
    id: "ai-custom",
    number: "04",
    title: "AI Automations & Custom Systems",
    summary:
      "AI agents, bots, integrations, custom workflows, reporting systems, and unusual ideas that do not fit a template.",
    previewTitle: "Custom intelligence layer",
    previewSubtitle: "Agents, data routing, workflow logic, notifications, and bespoke internal tools.",
    metrics: [
      { label: "Automations", value: "128", delta: "+52.6%" },
      { label: "Hours Saved", value: "740", delta: "+38.9%" },
      { label: "Accuracy", value: "96.4%", delta: "+14.2%" },
      { label: "Alerts", value: "3.2K", delta: "+25.8%" },
    ],
    flow: [
      { label: "Trigger", detail: "New request" },
      { label: "Agent", detail: "Analyze data" },
      { label: "Action", detail: "Create task" },
      { label: "Notify", detail: "Send update" },
    ],
  },
];

const SPARKLINES = [
  "M4 36 C18 35 23 24 36 31 S58 43 68 28 S88 20 99 28 S121 38 132 22 S153 14 168 6",
  "M4 42 C20 40 26 36 39 38 S58 22 72 31 S89 51 102 29 S119 28 132 20 S150 14 168 9",
  "M4 38 C18 38 26 36 37 34 S57 40 71 32 S89 24 103 27 S123 34 136 25 S153 18 168 12",
  "M4 44 C18 41 26 39 39 43 S57 51 70 34 S88 20 103 31 S121 42 135 29 S153 25 168 14",
];

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function svgNumber(value: number) {
  return Math.round(value * 1000) / 1000;
}

function TechnicalBackground() {
  const stars = useMemo(
    () =>
      [
        [18, 24, 0.8],
        [128, 14, 1],
        [286, 58, 0.6],
        [410, 32, 0.9],
        [620, 76, 0.7],
        [768, 28, 1],
        [836, 140, 0.8],
        [706, 286, 0.7],
        [510, 342, 0.9],
        [336, 286, 0.5],
        [166, 396, 0.8],
        [782, 430, 0.6],
      ],
    [],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.075)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 opacity-[0.28] [background-image:radial-gradient(circle,rgba(255,255,255,0.16)_0_0.7px,transparent_1px)] [background-size:18px_18px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 520" preserveAspectRatio="none">
        <defs>
          <radialGradient id="stackGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.36" />
            <stop offset="16%" stopColor="white" stopOpacity="0.08" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g opacity="0.42">
          {Array.from({ length: 38 }).map((_, index) => {
            const angle = (-155 + index * 8.1) * (Math.PI / 180);
            const length = index % 7 === 0 ? 310 : 190 + (index % 5) * 22;
            const x2 = svgNumber(520 + Math.cos(angle) * length);
            const y2 = svgNumber(190 + Math.sin(angle) * length);

            return (
              <line
                key={index}
                x1="520"
                y1="190"
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth={index % 7 === 0 ? 0.55 : 0.34}
                opacity={index % 7 === 0 ? 0.18 : 0.065}
              />
            );
          })}
        </g>
        <circle cx="520" cy="190" r="3.4" fill="white" opacity="0.85" />
        <circle cx="520" cy="190" r="42" fill="url(#stackGlow)" />
        {stars.map(([cx, cy, opacity], index) => (
          <circle key={index} cx={cx} cy={cy} r={index % 3 === 0 ? 1.4 : 0.8} fill="white" opacity={opacity} />
        ))}
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_62%_34%,transparent_0%,transparent_26%,rgba(3,3,3,0.72)_78%,#030303_100%)]" />
    </div>
  );
}

const STAR_POINTS = [
  [92, 48, 0.4],
  [148, 88, 0.55],
  [202, 58, 0.34],
  [236, 112, 0.72],
  [318, 46, 0.42],
  [372, 82, 0.6],
  [416, 140, 0.38],
  [174, 172, 0.44],
  [278, 206, 0.72],
  [348, 190, 0.48],
  [462, 72, 0.52],
];

function MiniStarSystem() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-y-0 right-0 h-full w-[62%]"
      viewBox="0 0 520 260"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id="browserNodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.7" />
          <stop offset="12%" stopColor="white" stopOpacity="0.14" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g opacity="0.56">
        {Array.from({ length: 42 }).map((_, index) => {
          const angle = (-166 + index * 7.9) * (Math.PI / 180);
          const length = index % 9 === 0 ? 192 : 82 + (index % 6) * 18;
          const x2 = svgNumber(290 + Math.cos(angle) * length);
          const y2 = svgNumber(154 + Math.sin(angle) * length);

          return (
            <line
              key={index}
              x1="290"
              y1="154"
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth={index % 9 === 0 ? 0.62 : 0.34}
              opacity={index % 9 === 0 ? 0.22 : 0.08}
            />
          );
        })}
      </g>
      <path d="M290 154 C244 92 226 70 194 34" fill="none" stroke="white" strokeWidth="1" opacity="0.34" />
      <path d="M290 154 C310 94 346 70 386 26" fill="none" stroke="white" strokeWidth="1" opacity="0.34" />
      <path d="M290 154 C248 106 224 82 204 48" fill="none" stroke="white" strokeWidth="0.48" opacity="0.16" />
      <path d="M290 154 C318 102 352 86 398 54" fill="none" stroke="white" strokeWidth="0.48" opacity="0.16" />
      <circle cx="290" cy="154" r="34" fill="url(#browserNodeGlow)" opacity="0.65" />
      <circle cx="290" cy="154" r="2.2" fill="white" />
      {STAR_POINTS.map(([cx, cy, opacity], index) => (
        <circle key={index} cx={cx} cy={cy} r={index % 4 === 0 ? 1.3 : 0.72} fill="white" opacity={opacity} />
      ))}
    </svg>
  );
}

function HeroMockupBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <img
        src="/hero-desktop@2x.webp"
        alt=""
        className="h-full w-full object-cover object-[80%_center] opacity-[0.22] grayscale"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#030303_0%,rgba(3,3,3,0.92)_42%,rgba(3,3,3,0.54)_72%,rgba(3,3,3,0.82)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_76%_48%,transparent_0%,rgba(0,0,0,0.12)_42%,rgba(0,0,0,0.78)_100%)]" />
    </div>
  );
}

function BrowserMockup({ service }: { service: Service }) {
  const title =
    service.id === "websites"
      ? "Intelligent digital systems that scale."
      : service.previewTitle;

  return (
    <div className="relative min-h-[230px] overflow-hidden rounded-[6px] border border-oryx-line bg-[#030303]/70 sm:min-h-[260px] xl:min-h-[278px]">
      <HeroMockupBackground />
      <MiniStarSystem />
      <div className="relative z-10 flex items-center justify-between border-b border-oryx-line px-5 py-3">
        <img
          src="/oryx-logo-white.svg"
          alt="ORYX"
          className="h-auto w-[72px] opacity-70"
        />
        <div className="hidden gap-6 font-mono text-[8px] uppercase tracking-[0.18em] text-oryx-mute sm:flex">
          <span>Work</span>
          <span>Services</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </div>
      <div className="relative z-10 max-w-[360px] px-5 pb-6 pt-11 sm:pt-16">
        <h3 className="font-display text-[clamp(24px,2.1vw,36px)] font-medium leading-[1.06] text-oryx-white">
          {title}
        </h3>
        <p className="mt-5 max-w-[300px] font-mono text-[10px] leading-[1.75] text-oryx-dim">
          {service.previewSubtitle}
        </p>
        <div className="mt-6 inline-flex items-center gap-3 border border-oryx-line px-4 py-2.5 font-mono text-[8px] uppercase tracking-[0.2em] text-oryx-white">
          Let&apos;s Build
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </div>
  );
}

function InteractiveSparkline({
  className,
  d,
  heightClassName = "h-9",
  animationDelay = 0,
}: {
  className?: string;
  d: string;
  heightClassName?: string;
  animationDelay?: number;
}) {
  return (
    <svg
      className={cn("w-full", heightClassName, className)}
      viewBox="0 0 172 50"
      aria-hidden="true"
    >
      <motion.path
        d={`${d} L168 50 L4 50 Z`}
        fill="white"
        animate={{ opacity: [0.01, 0.072, 0.01] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: animationDelay }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          opacity: [0.28, 0.92, 0.28],
          strokeWidth: [1.05, 1.65, 1.05],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: animationDelay }}
      />
    </svg>
  );
}

function DeviceMockups({ service }: { service: Service }) {
  const labels =
    service.id === "mobile"
      ? ["Customer", "Team"]
      : service.id === "crm-erp"
        ? ["Pipeline", "Ops"]
        : service.id === "ai-custom"
          ? ["Agent", "Data"]
          : ["Page", "Signal"];

  return (
    <div className="relative min-h-[230px] overflow-hidden rounded-[6px] border border-oryx-line bg-[#030303]/55 p-5 sm:min-h-[260px] xl:min-h-[278px]">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.36] [background-image:radial-gradient(circle,rgba(255,255,255,0.16)_0_0.65px,transparent_1px)] [background-size:15px_15px]" />
      <div className="relative z-10 grid h-full grid-cols-2 gap-4">
        {labels.map((label, index) => (
          <motion.div
            key={label}
            className="group/device flex min-h-[194px] flex-col rounded-[18px] border border-white/14 bg-black/35 p-4 opacity-[0.65] shadow-[inset_0_0_28px_rgba(255,255,255,0.025)] transition duration-300 hover:border-white/36 hover:opacity-100 hover:shadow-[inset_0_0_32px_rgba(255,255,255,0.05),0_0_36px_rgba(255,255,255,0.07)] xl:min-h-[228px]"
            initial="muted"
            whileHover="active"
            variants={{
              muted: { y: 0 },
              active: { y: -2 },
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-oryx-mute transition-colors group-hover/device:text-oryx-dim">{label}</span>
              <span className="h-2 w-2 rounded-full border border-white/24 transition group-hover/device:border-white/60 group-hover/device:bg-white/30" />
            </div>
            {index === 0 ? (
              <>
                <div className="h-[72px] rounded-[3px] border border-white/10 bg-[linear-gradient(135deg,transparent_49%,rgba(255,255,255,0.055)_50%,transparent_51%),linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.055)_50%,transparent_51%)] transition group-hover/device:border-white/20 group-hover/device:bg-[linear-gradient(135deg,transparent_49%,rgba(255,255,255,0.12)_50%,transparent_51%),linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.12)_50%,transparent_51%)] xl:h-[88px]" />
                <div className="mt-4 space-y-2">
                  <span className="block h-px w-[76%] bg-white/16 transition-colors group-hover/device:bg-white/34" />
                  <span className="block h-px w-[92%] bg-white/12 transition-colors group-hover/device:bg-white/24" />
                  <span className="block h-px w-[62%] bg-white/10 transition-colors group-hover/device:bg-white/18" />
                </div>
                <div className="mt-auto space-y-2">
                  <span className="block h-px w-[28%] bg-white/14" />
                  <span className="block h-px w-[84%] bg-white/12" />
                  <span className="block h-px w-[68%] bg-white/10" />
                </div>
              </>
            ) : (
              <>
                <motion.svg
                  className="h-[92px] w-full xl:h-[112px]"
                  viewBox="0 0 180 116"
                  aria-hidden="true"
                >
                  <line x1="8" y1="98" x2="172" y2="98" stroke="white" opacity="0.08" />
                  <motion.path
                    d="M10 86 L32 60 L52 70 L82 38 L114 54 L142 20 L170 31"
                    fill="none"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{
                      opacity: [0.28, 0.92, 0.28],
                      strokeWidth: [1.5, 2.4, 1.5],
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  />
                  <line x1="10" y1="28" x2="64" y2="28" stroke="white" strokeWidth="2" opacity="0.14" />
                  <line x1="10" y1="38" x2="48" y2="38" stroke="white" strokeWidth="2" opacity="0.08" />
                </motion.svg>
                <div className="mt-auto space-y-3">
                  {[0, 1, 2].map((row) => (
                    <div key={row} className="grid grid-cols-[18px_1fr_34px] items-center gap-3">
                      <span className="h-4 w-4 rounded-full border border-white/12 transition-colors group-hover/device:border-white/34" />
                      <span className="space-y-1.5">
                        <span className="block h-px w-[84%] bg-white/16 transition-colors group-hover/device:bg-white/32" />
                        <span className="block h-px w-[52%] bg-white/10 transition-colors group-hover/device:bg-white/18" />
                      </span>
                      <span className="space-y-1.5">
                        <span className="block h-px w-full bg-white/12 transition-colors group-hover/device:bg-white/24" />
                        <span className="block h-px w-2/3 bg-white/[0.08] transition-colors group-hover/device:bg-white/16" />
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function WindowPreview({ service }: { service: Service }) {
  return (
    <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr]">
      <BrowserMockup service={service} />
      <DeviceMockups service={service} />
    </div>
  );
}

function FlowIcon({ type }: { type: "trigger" | "mail" | "condition" | "database" | "signal" }) {
  if (type === "trigger") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M13.5 2.5 5.5 13h5L9.6 22l8.9-12h-5z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "mail") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="5.5" width="18" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === "condition") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <circle cx="12" cy="5" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5" cy="19" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="19" cy="19" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 7 6.2 17M13 7l4.8 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === "database") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 6v9c0 1.65 3.13 3 7 3s7-1.35 7-3V6M5 10.5c0 1.65 3.13 3 7 3s7-1.35 7-3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M9 3h6v6H9zM9 15h6v6H9zM3 9h6v6H3zM15 9h6v6h-6z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function WorkflowNode({
  className,
  detail,
  eyebrow,
  icon,
  title,
}: {
  className?: string;
  detail?: string;
  eyebrow: string;
  icon: "trigger" | "mail" | "condition" | "database" | "signal";
  title: string;
}) {
  return (
    <div
      className={cn(
        "absolute grid grid-cols-[24px_1fr] items-center gap-2 rounded-[6px] border border-oryx-line bg-[#030303]/80 px-3 py-2.5 text-oryx-white shadow-[inset_0_0_28px_rgba(255,255,255,0.02)] transition-all duration-200 hover:border-white/20 hover:shadow-[inset_0_0_28px_rgba(255,255,255,0.045),0_0_18px_rgba(255,255,255,0.05)]",
        className,
      )}
    >
      <span className="text-oryx-dim">
        <FlowIcon type={icon} />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-oryx-mute">{eyebrow}</span>
        <span className="mt-1 block truncate font-mono text-[9px] text-oryx-white">{title}</span>
        {detail ? <span className="mt-0.5 block truncate font-mono text-[9px] text-oryx-dim">{detail}</span> : null}
      </span>
    </div>
  );
}

function FlowPreview({ service }: { service: Service }) {
  const workflow =
    service.id === "websites"
      ? {
          trigger: "New Submission",
          action: "Send Email",
          condition: "Check Data",
          yes: "Create Record",
          no: "Notify Team",
        }
      : {
          trigger: service.flow[0].detail,
          action: service.flow[1].detail,
          condition: service.flow[2].detail,
          yes: service.flow[3].detail,
          no: "Notify Team",
        };

  return (
    <div className="overflow-hidden rounded-[6px] border border-oryx-line bg-black/20 p-3 sm:p-4">
      <div className="relative hidden h-[140px] md:block">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 140" preserveAspectRatio="none" aria-hidden="true">
          <g fill="none" stroke="white" strokeWidth="1" opacity="0.28">
            <path d="M204 63H244" />
            <path d="M408 63H448" />
            <path d="M616 63H650V34H692" />
            <path d="M616 63H650V105H692" />
          </g>
          <g fill="#030303" stroke="white" strokeWidth="1" opacity="0.62">
            <circle cx="204" cy="63" r="5" />
            <circle cx="244" cy="63" r="5" />
            <circle cx="408" cy="63" r="5" />
            <circle cx="448" cy="63" r="5" />
            <circle cx="616" cy="63" r="5" />
            <circle cx="692" cy="34" r="5" />
            <circle cx="692" cy="105" r="5" />
            <circle cx="868" cy="34" r="5" />
            <circle cx="868" cy="105" r="5" />
          </g>
        </svg>

        <WorkflowNode
          className="left-[3%] top-[32px] h-[62px] w-[20%]"
          detail="Lead capture"
          eyebrow="Trigger"
          icon="trigger"
          title={workflow.trigger}
        />
        <WorkflowNode
          className="left-[26%] top-[32px] h-[62px] w-[20%]"
          detail="Routing rule"
          eyebrow="Action"
          icon="mail"
          title={workflow.action}
        />
        <WorkflowNode
          className="left-[49%] top-[32px] h-[62px] w-[21%]"
          detail="Score and verify"
          eyebrow="Condition"
          icon="condition"
          title={workflow.condition}
        />
        <span className="absolute left-[71%] top-[22px] rounded-[4px] border border-oryx-line bg-[#030303] px-2 py-1 font-mono text-[9px] uppercase text-oryx-white">
          Yes
        </span>
        <span className="absolute left-[71%] top-[93px] rounded-[4px] border border-oryx-line bg-[#030303] px-2 py-1 font-mono text-[9px] uppercase text-oryx-white">
          No
        </span>
        <WorkflowNode
          className="left-[77%] top-[4px] h-[58px] w-[21.5%]"
          eyebrow="Action"
          icon="database"
          title={workflow.yes}
        />
        <WorkflowNode
          className="left-[77%] top-[75px] h-[58px] w-[21.5%]"
          eyebrow="Action"
          icon="signal"
          title={workflow.no}
        />
      </div>

      <div className="grid gap-3 md:hidden">
        {service.flow.map((item, index) => (
          <div key={item.label} className="relative">
            <div className="min-h-[62px] border border-oryx-line bg-[#030303]/60 p-3">
              <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-oryx-mute">
                {index === 0 ? "Trigger" : index === service.flow.length - 1 ? "Output" : "Action"}
              </div>
              <div className="mt-1.5 font-mono text-[10px] text-oryx-white">{item.label}</div>
              <div className="mt-1 font-mono text-[10px] text-oryx-dim">{item.detail}</div>
            </div>
            {index < service.flow.length - 1 ? (
              <div className="pointer-events-none absolute left-full top-1/2 z-10 hidden h-px w-3 bg-white/25 md:block" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricGrid({ service }: { service: Service }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
      {service.metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          data-metric-card={metric.label}
          className="group/metric relative overflow-hidden rounded-[4px] border border-oryx-line bg-black/20 p-4 opacity-[0.62] transition duration-300 hover:border-white/30 hover:opacity-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.07),inset_0_0_20px_rgba(255,255,255,0.03)]"
          whileHover={{ y: -3 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {/* shine sweep */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(108deg,transparent_32%,rgba(255,255,255,0.07)_50%,transparent_68%)] transition-transform duration-700 group-hover/metric:translate-x-full" />
          <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-oryx-mute transition-colors group-hover/metric:text-oryx-dim">{metric.label}</div>
          <div className="mt-2 font-display text-2xl font-medium text-oryx-white/75 transition-colors group-hover/metric:text-oryx-white">{metric.value}</div>
          <div className="mt-1.5 font-mono text-[9px] text-oryx-dim/70 transition-colors group-hover/metric:text-oryx-dim">↗ {metric.delta}</div>
          <InteractiveSparkline d={SPARKLINES[index]} className="mt-3" animationDelay={index * 0.45} />
        </motion.div>
      ))}
    </div>
  );
}

const CRM_PIPELINE = [
  { label: "New Leads", value: "128", delta: "-12.4%" },
  { label: "Qualified", value: "64", delta: "+8.7%" },
  { label: "Proposal", value: "28", delta: "+5.1%" },
  { label: "Negotiation", value: "16", delta: "-3.2%" },
  { label: "Won", value: "9", delta: "+11.2%" },
];

const CRM_CLIENTS = [
  ["Acme Corporation", "$230,450", "Active"],
  ["Nova Systems", "$86,230", "Active"],
  ["Vertex Global", "$192,100", "Active"],
  ["Helix Labs", "$54,900", "Active"],
  ["Orion Industries", "$310,750", "Active"],
];

const CRM_MODULES = [
  "Inventory",
  "Purchasing",
  "Sales Orders",
  "Projects",
  "HR & Payroll",
  "Accounting",
  "Assets",
  "Reports",
];

const CRM_WORKFLOW = [
  ["Lead Capture", "Auto assign"],
  ["Qualification", "Score & enrich"],
  ["Proposal", "Generate quote"],
  ["Approval", "Manager review"],
  ["Order", "Create order"],
  ["Fulfillment", "Process & ship"],
  ["Invoice", "Generate & send"],
];

const CRM_FINANCIALS = [
  ["Total Revenue", "$2.74M", "+18.6% vs last month"],
  ["Outstanding AR", "$683K", "+9.5% vs last month"],
  ["New Clients", "32", "+14.2% vs last month"],
  ["Open Orders", "76", "+4.2% vs last month"],
  ["Approvals Pending", "18", "+12.3% vs last month"],
  ["Gross Margin", "34.7%", "+3.6% vs last month"],
];

function MiniSparkline({ index, className }: { index: number; className?: string }) {
  return (
    <InteractiveSparkline
      d={SPARKLINES[index % SPARKLINES.length]}
      className={className}
      heightClassName="h-5"
      animationDelay={index * 0.35}
    />
  );
}

function CrmIcon({ index }: { index: number }) {
  const paths = [
    "M12 3 4.5 7.2v9.1L12 21l7.5-4.7V7.2z M12 3v18 M4.5 7.2 12 11.8l7.5-4.6",
    "M4 7h3l2 8h8l2-6H8 M10 19h.1 M17 19h.1",
    "M7 3h8l4 4v14H7z M15 3v5h4 M9 12h7 M9 16h7",
    "M6 8h12v11H6z M9 8V5h6v3",
    "M8 11a4 4 0 1 1 8 0 M4 21a8 8 0 0 1 16 0",
    "M5 5h14v14H5z M8 8h3v3H8z M13 8h3v3h-3z M8 13h3v3H8z M13 13h3v3h-3z",
    "M12 3 5 7v10l7 4 7-4V7z M12 3v18",
    "M5 19V9 M12 19V5 M19 19v-8",
  ];

  return (
    <svg className="mx-auto h-4 w-4 text-oryx-dim" viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[index % paths.length]} fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrmDashboardPreview({ service }: { service: Service }) {
  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[8px] border border-oryx-line bg-[#030303] p-4 shadow-[0_0_70px_rgba(255,255,255,0.035)] sm:p-5"
    >
      <TechnicalBackground />
      <div className="relative z-10 rounded-[4px] border border-oryx-line bg-black/20">
        <div className="flex items-center justify-between border-b border-oryx-line px-4 py-2.5">
          <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.22em] text-oryx-dim">
            <span>{service.number}</span>
            <span className="text-oryx-white">CRM & ERP Systems</span>
          </div>
          <div className="flex gap-1.5">
            <span className="h-1 w-1 rounded-full bg-white/45" />
            <span className="h-1 w-1 rounded-full bg-white/35" />
            <span className="h-1 w-1 rounded-full bg-white/70" />
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-oryx-line px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="grid h-4 w-4 rotate-45 place-items-center border border-white/35">
              <span className="h-1.5 w-1.5 rounded-full bg-white/55" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-oryx-white">ORYX</span>
          </div>
          <div className="hidden items-center gap-7 font-mono text-[8px] uppercase tracking-[0.16em] text-oryx-mute lg:flex">
            <span className="border-b border-white/45 pb-2 text-oryx-white">Dashboard</span>
            <span>CRM</span>
            <span>ERP</span>
            <span>Operations</span>
            <span>Finance</span>
            <span>Reports</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[8px] text-oryx-dim">
            <span>⌕</span>
            <span>◇</span>
            <span className="grid h-5 w-5 place-items-center rounded-full border border-white/18 text-[7px]">AO</span>
          </div>
        </div>

        <div className="space-y-3 p-3">
          <div className="grid gap-3 xl:grid-cols-[1.35fr_1fr]">
            <div className="rounded-[3px] border border-oryx-line bg-black/20">
              <div className="border-b border-oryx-line px-3 py-2 font-mono text-[8px] uppercase tracking-[0.2em] text-oryx-dim">
                CRM Pipeline
              </div>
              <div className="grid grid-cols-5 divide-x divide-white/[0.08]">
                {CRM_PIPELINE.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="group/pipeline relative overflow-hidden px-3 py-3 opacity-65 transition duration-200 hover:bg-white/[0.025] hover:opacity-100"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(108deg,transparent_32%,rgba(255,255,255,0.055)_50%,transparent_68%)] transition-transform duration-600 group-hover/pipeline:translate-x-full" />
                    <div className="font-mono text-[7px] uppercase tracking-[0.16em] text-oryx-mute transition-colors group-hover/pipeline:text-oryx-dim">{item.label}</div>
                    <div className="mt-2 font-display text-lg text-oryx-white">{item.value}</div>
                    <div className="font-mono text-[8px] text-oryx-dim">{item.delta}</div>
                    <MiniSparkline index={index} className="mt-1.5" />
                  </motion.div>
                ))}
              </div>
              <div className="grid grid-cols-4 divide-x divide-white/[0.08] border-t border-oryx-line">
                {[
                  ["Pipeline Value", "$1.48M"],
                  ["Conversion Rate", "7.2%"],
                  ["Avg. Deal Size", "$164K"],
                  ["Win Rate", "28.1%"],
                ].map(([label, value]) => (
                  <div key={label} className="px-3 py-2">
                    <div className="font-mono text-[7px] uppercase tracking-[0.16em] text-oryx-mute">{label}</div>
                    <div className="mt-1 font-display text-sm text-oryx-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[3px] border border-oryx-line bg-black/20">
              <div className="flex justify-between border-b border-oryx-line px-3 py-2 font-mono text-[8px] uppercase tracking-[0.2em] text-oryx-dim">
                <span>Client Records</span>
                <span>View All</span>
              </div>
              <div className="divide-y divide-white/[0.06]">
                {CRM_CLIENTS.map(([name, value, status]) => (
                  <div key={name} className="group/row grid grid-cols-[1fr_64px_42px_14px] items-center gap-2 px-3 py-2 font-mono text-[8px] transition-colors duration-150 hover:bg-white/[0.03]">
                    <span className="flex min-w-0 items-center gap-2 text-oryx-dim">
                      <span className="h-1.5 w-1.5 rounded-full border border-white/25 transition-colors group-hover/row:border-white/50 group-hover/row:bg-white/20" />
                      <span className="truncate text-oryx-white/80 transition-colors group-hover/row:text-oryx-white">{name}</span>
                    </span>
                    <span className="text-right text-oryx-white/75 transition-colors group-hover/row:text-oryx-white">{value}</span>
                    <span className="text-right text-oryx-dim transition-colors group-hover/row:text-oryx-white/60">{status}</span>
                    <span className="text-oryx-mute transition-colors group-hover/row:text-oryx-dim">•••</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 xl:grid-cols-[1fr_1.05fr_0.85fr]">
            <div className="rounded-[3px] border border-oryx-line bg-black/20">
              <div className="border-b border-oryx-line px-3 py-2 font-mono text-[8px] uppercase tracking-[0.2em] text-oryx-dim">
                ERP Modules
              </div>
              <div className="grid grid-cols-4 divide-x divide-y divide-white/[0.06]">
                {CRM_MODULES.map((module, index) => (
                  <motion.div
                    key={module}
                    className="cursor-default px-2 py-3 text-center font-mono text-[7px] text-oryx-dim transition-colors duration-200 hover:bg-white/[0.035] hover:text-oryx-white"
                    whileHover={{ y: -1, scale: 1.04 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <CrmIcon index={index} />
                    <span className="mt-2 block truncate">{module}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid rounded-[3px] border border-oryx-line bg-black/20 md:grid-cols-[0.9fr_1fr]">
              <div>
                <div className="border-b border-oryx-line px-3 py-2 font-mono text-[8px] uppercase tracking-[0.2em] text-oryx-dim">
                  System Overview
                </div>
                {[
                  ["Users", "124", "Active"],
                  ["Departments", "8", "Active"],
                  ["Workflows", "37", "Running"],
                  ["Integrations", "12", "Connected"],
                ].map(([label, value, status]) => (
                  <div key={label} className="grid grid-cols-[1fr_42px_52px] border-b border-white/[0.05] px-3 py-2 font-mono text-[8px]">
                    <span className="text-oryx-dim">{label}</span>
                    <span className="text-oryx-white/80">{value}</span>
                    <span className="text-oryx-mute">{status}</span>
                  </div>
                ))}
              </div>
              <svg className="hidden h-full min-h-[126px] w-full md:block" viewBox="0 0 190 126" aria-hidden="true">
                <g stroke="white" strokeWidth="0.6" opacity="0.16">
                  <path d="M92 62 48 28M92 62l52-33M92 62l46 55M92 62 42 102M92 62l8-42M92 62l-16 34M92 62l66 6" />
                </g>
                {[92, 48, 144, 138, 42, 100, 76, 158].map((cx, index) => (
                  <circle key={index} cx={cx} cy={[62, 28, 29, 117, 102, 20, 96, 68][index]} r={index === 0 ? 2.2 : 1.5} fill="white" opacity={index === 0 ? 0.7 : 0.36} />
                ))}
              </svg>
            </div>

            <div className="rounded-[3px] border border-oryx-line bg-black/20">
              <div className="border-b border-oryx-line px-3 py-2 font-mono text-[8px] uppercase tracking-[0.2em] text-oryx-dim">
                Inventory Snapshot
              </div>
              {[
                ["Total Items", "2,341"],
                ["In Stock", "1,782"],
                ["Low Stock", "216"],
                ["Out of Stock", "43"],
                ["On Order", "310"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-white/[0.05] px-3 py-2 font-mono text-[8px] text-oryx-dim">
                  <span>{label}</span>
                  <span className="text-oryx-white/75">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[3px] border border-oryx-line bg-black/20 p-3">
            <div className="mb-3 flex justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-oryx-dim">
              <span>Workflow / Operations</span>
              <span>37 Active Workflows</span>
            </div>
            <div className="grid gap-2 md:grid-cols-7">
              {CRM_WORKFLOW.map(([title, detail], index) => (
                <motion.div
                  key={title}
                  className="group/step relative border border-oryx-line bg-[#030303]/70 px-2 py-2 transition-colors duration-200 hover:border-white/22 hover:bg-white/[0.03]"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  <div className="font-mono text-[8px] text-oryx-white/80 transition-colors group-hover/step:text-oryx-white">{title}</div>
                  <div className="mt-1 font-mono text-[7px] text-oryx-mute transition-colors group-hover/step:text-oryx-dim">{detail}</div>
                  {index < CRM_WORKFLOW.length - 1 ? (
                    <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-oryx-dim transition-colors group-hover/step:text-oryx-white/50 md:block">→</span>
                  ) : null}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-6">
            {CRM_FINANCIALS.map(([label, value, delta], index) => (
              <motion.div
                key={label}
                className="group/fin relative overflow-hidden rounded-[3px] border border-oryx-line bg-black/20 p-3 opacity-65 transition duration-300 hover:border-white/30 hover:opacity-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.06),inset_0_0_16px_rgba(255,255,255,0.025)]"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(108deg,transparent_32%,rgba(255,255,255,0.065)_50%,transparent_68%)] transition-transform duration-700 group-hover/fin:translate-x-full" />
                <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-oryx-mute transition-colors group-hover/fin:text-oryx-dim">{label}</div>
                <div className="mt-2 font-display text-lg text-oryx-white">{value}</div>
                <div className="mt-1 font-mono text-[7px] text-oryx-dim">{delta}</div>
                <MiniSparkline index={index + 1} className="mt-2" />
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between border-t border-oryx-line px-1 pt-2 font-mono text-[7px] uppercase tracking-[0.18em] text-oryx-mute">
            <span>ORYX Systems</span>
            <span>System Status • All Systems Operational</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PreviewPanel({ service }: { service: Service }) {
  if (service.id === "crm-erp") {
    return <CrmDashboardPreview service={service} />;
  }

  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[8px] border border-oryx-line bg-[#030303] p-4 shadow-[0_0_70px_rgba(255,255,255,0.035)] sm:p-5"
    >
      <TechnicalBackground />
      <div className="relative z-10 mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.22em] text-oryx-dim">
          <span>{service.number}</span>
          <span className="text-oryx-white">{service.title}</span>
        </div>
        <div className="hidden gap-2 sm:flex">
          <span className="h-1 w-1 rounded-full bg-white/55" />
          <span className="h-1 w-1 rounded-full bg-white/35" />
          <span className="h-1 w-1 rounded-full bg-white/70" />
        </div>
      </div>
      <div className="relative z-10 space-y-3">
        <WindowPreview service={service} />
        <FlowPreview service={service} />
        <MetricGrid service={service} />
      </div>
    </motion.div>
  );
}

export function BuildStack() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const reduceMotion = useReducedMotion();
  const activeService = SERVICES.find((service) => service.id === activeId) ?? SERVICES[0];

  return (
    <section
      id="services"
      aria-label="ORYX build stack services"
      className="relative overflow-hidden bg-[#030303] px-[7.6vw] py-20 text-oryx-white sm:py-24 lg:flex lg:min-h-screen lg:items-center lg:py-12 xl:py-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:128px_128px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_38%,rgba(255,255,255,0.05),transparent_38%),linear-gradient(180deg,#030303_0%,rgba(3,3,3,0.78)_24%,#030303_100%)]" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#030303] via-[#030303]/90 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1800px] gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:items-center lg:gap-12 xl:gap-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="lg:self-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-oryx-dim">
            &gt; BUILD STACK
          </p>
          <h2 className="mt-6 max-w-[500px] font-display text-[clamp(38px,3.5vw,62px)] font-medium leading-[0.96] text-oryx-white">
            One studio.
            <br />
            Four systems.
            <span aria-hidden="true" className="ml-2.5 inline-block h-[0.72em] w-[0.24em] translate-y-[0.07em] bg-oryx-white" />
          </h2>
          <p className="mt-5 max-w-[500px] font-mono text-[12px] leading-6 tracking-[0.02em] text-oryx-dim">
            We design, build, automate, and visualize digital operations that scale.
          </p>

          <div className="mt-9 space-y-0">
            {SERVICES.map((service, index) => {
              const active = service.id === activeId;

              return (
                <button
                  key={service.id}
                  type="button"
                  onMouseEnter={() => setActiveId(service.id)}
                  onFocus={() => setActiveId(service.id)}
                  onClick={() => setActiveId(service.id)}
                  className="group grid w-full grid-cols-[60px_1fr] gap-4 py-2.5 text-left sm:grid-cols-[72px_1fr]"
                  aria-pressed={active}
                >
                  <span className="relative flex justify-center">
                    {index < SERVICES.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-[46px] h-[46px] w-px -translate-x-1/2 bg-oryx-line"
                      />
                    ) : null}
                    <span
                      className={cn(
                        "relative z-10 grid h-11 w-11 place-items-center rounded-full border font-mono text-sm transition-all duration-300 sm:h-12 sm:w-12 sm:text-base",
                        active
                          ? "border-oryx-white text-oryx-white shadow-[0_0_32px_rgba(255,255,255,0.16)]"
                          : "border-oryx-line text-oryx-mute group-hover:border-white/35 group-hover:text-oryx-dim",
                      )}
                    >
                      {service.number}
                    </span>
                  </span>
                  <span className="min-w-0 pt-1">
                    <span className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "hidden h-px w-8 transition-colors duration-300 sm:block",
                          active ? "bg-oryx-white" : "bg-oryx-line group-hover:bg-white/35",
                        )}
                      />
                      <span
                        className={cn(
                          "font-display text-[clamp(19px,1.4vw,24px)] font-medium leading-tight transition-colors duration-300",
                          active ? "text-oryx-white" : "text-oryx-mute group-hover:text-oryx-dim",
                        )}
                      >
                        {service.title}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "mt-2 block max-w-[420px] font-mono text-[10px] leading-5 transition-colors duration-300 sm:ml-12",
                        active ? "text-oryx-dim" : "text-oryx-mute/75 group-hover:text-oryx-dim",
                      )}
                    >
                      {service.summary}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          <PreviewPanel service={activeService} />
        </motion.div>
      </div>
    </section>
  );
}
