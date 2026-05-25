"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const PROJECT_META = [
  {
    index: "01",
    client: "Madami.uz",
    logo: "/partners/madami.png",
    logoAlt: "Madami.uz — e-commerce and digital retail platform built by ORYX in Tashkent",
    type: "Websites & Platforms",
    url: "https://madami.uz",
    status: "live",
  },
  {
    index: "02",
    client: "Uyjoy.uz",
    logo: "/partners/uyjoy.png",
    logoAlt: "Uyjoy.uz — real estate marketplace built by ORYX, connecting buyers and sellers across Uzbekistan",
    type: "Websites & Platforms",
    url: "https://uyjoy.uz",
    status: "live",
  },
  {
    index: "03",
    client: "Viva Dental",
    logo: "/partners/viva.png",
    logoAlt: "Viva Dental — custom CRM and patient management system built by ORYX for dental clinic in Tashkent",
    type: "CRM & ERP Systems",
    url: null,
    status: "building",
  },
];

function ProjectCard({
  project,
  descriptor,
  tags,
  liveLabel,
  inProgressLabel,
  visitLabel,
  delay,
}: {
  project: typeof PROJECT_META[number];
  descriptor: string;
  tags: readonly string[];
  liveLabel: string;
  inProgressLabel: string;
  visitLabel: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      <div
        className="relative flex flex-col overflow-hidden transition-all duration-500"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "4px",
          background: "rgba(255,255,255,0.014)",
        }}
      >
        {/* Hover border glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ borderRadius: "4px", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
        />

        {/* Top stripe */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>
            {project.index}
          </span>
          <div className="flex items-center gap-2">
            <div
              className={project.status === "live" ? "animate-pulse" : ""}
              style={{ width: "6px", height: "6px", borderRadius: "50%", background: project.status === "live" ? "#4a9e5c" : "#b8882a" }}
            />
            <span style={{ fontSize: "9px", letterSpacing: "0.22em", fontFamily: "var(--font-jetbrains),monospace", color: project.status === "live" ? "#4a9e5c" : "#b8882a" }}>
              {project.status === "live" ? liveLabel : inProgressLabel}
            </span>
          </div>
        </div>

        {/* Logo area — next/image for optimised PNG delivery */}
        <div
          className="relative flex items-center justify-center px-6"
          style={{ height: "300px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Image
            src={project.logo}
            alt={project.logoAlt}
            width={320}
            height={240}
            className="w-auto object-contain transition-all duration-500 group-hover:opacity-100"
            style={{ maxHeight: "280px", maxWidth: "100%", filter: "brightness(0) invert(1)", opacity: 0.88 }}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3 px-6 py-5">
          <p style={{ fontSize: "9px", letterSpacing: "0.24em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>
            &gt; {project.type.toUpperCase()}
          </p>
          <h3 className="font-display font-semibold text-oryx-white leading-snug" style={{ fontSize: "clamp(17px,1.4vw,20px)", letterSpacing: "-0.01em" }}>
            {project.client}
          </h3>
          <p style={{ fontSize: "12px", color: "#8b8b8f", fontFamily: "var(--font-jetbrains),monospace", lineHeight: 1.65, letterSpacing: "0.01em" }}>
            {descriptor}
          </p>
        </div>

        {/* Tags + link */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span key={tag} style={{ fontSize: "9px", letterSpacing: "0.16em", fontFamily: "var(--font-jetbrains),monospace", color: "#4f4f55", padding: "3px 8px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "2px" }}>
                {tag}
              </span>
            ))}
          </div>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.client} website`}
              className="flex items-center gap-1.5 transition-colors duration-300 hover:text-oryx-white"
              style={{ fontSize: "10px", letterSpacing: "0.18em", fontFamily: "var(--font-jetbrains),monospace", color: "#4f4f55" }}
            >
              {visitLabel}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : (
            <span style={{ fontSize: "10px", letterSpacing: "0.18em", fontFamily: "var(--font-jetbrains),monospace", color: "#3a3a40" }}>NDA</span>
          )}
        </div>
      </div>

      {/* Large background number */}
      <div
        className="pointer-events-none absolute -bottom-4 -right-2 select-none font-display font-bold leading-none text-oryx-white opacity-[0.025] transition-opacity duration-500 group-hover:opacity-[0.04]"
        style={{ fontSize: "clamp(80px,10vw,140px)", letterSpacing: "-0.04em" }}
        aria-hidden
      >
        {project.index}
      </div>
    </motion.div>
  );
}

export function Work() {
  const { tr } = useLanguage();
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section
      id="work"
      className="relative bg-[#020202] px-[7.6vw] py-28 lg:py-36"
      aria-label="ORYX selected work — web development and CRM projects in Tashkent"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        backgroundImage: ["linear-gradient(to right, rgba(255,255,255,0.022) 1px, transparent 1px)", "linear-gradient(to bottom, rgba(255,255,255,0.018) 1px, transparent 1px)"].join(", "),
        backgroundSize: "80px 80px",
      }} />

      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full mix-blend-soft-light" style={{ opacity: 0.022 }}>
        <filter id="work-grain"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#work-grain)" />
      </svg>

      <div className="relative z-10">
        <div ref={headRef} className="mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5"
            style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}
          >
            {tr.work.label}
          </motion.p>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <motion.h2
              initial={{ opacity: 0, y: 12 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-medium text-oryx-white"
              style={{ fontSize: "clamp(32px,4vw,64px)", letterSpacing: "-0.025em", lineHeight: 1.04 }}
            >
              {tr.work.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: "12px", color: "#8b8b8f", fontFamily: "var(--font-jetbrains),monospace", maxWidth: "320px", lineHeight: 1.75, letterSpacing: "0.01em", whiteSpace: "pre-line" }}
            >
              {tr.work.tagline}
            </motion.p>
          </div>

          <motion.div
            initial={{ scaleX: 0, originX: 0 }} animate={headInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
            style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROJECT_META.map((project, i) => (
            <ProjectCard
              key={project.index}
              project={project}
              descriptor={tr.work.projects[i].descriptor}
              tags={tr.work.projects[i].tags}
              liveLabel={tr.work.live}
              inProgressLabel={tr.work.inProgress}
              visitLabel={tr.work.visit}
              delay={i * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "32px" }}
        >
          <p style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>
            {tr.work.moreSoon}
          </p>
          <a
            href="#contact"
            className="group flex items-center gap-2 transition-colors duration-300 hover:text-oryx-white"
            style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#8b8b8f", fontFamily: "var(--font-jetbrains),monospace" }}
          >
            {tr.work.workWithUs}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
