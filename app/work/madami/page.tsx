import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const SITE = "https://oryx.uz";

export const metadata: Metadata = {
  title: "Madami.uz — E-commerce Platform | ORYX Case Study",
  description:
    "How ORYX built Madami.uz — a full-scale e-commerce and digital retail platform in Tashkent. Tech stack, design decisions, and results.",
  openGraph: {
    title: "Madami.uz Case Study — Built by ORYX",
    description: "Full-scale e-commerce platform for Madami.uz. Designed and developed by ORYX digital product studio in Tashkent, Uzbekistan.",
    url: `${SITE}/work/madami`,
    images: [{ url: `${SITE}/og?title=Madami.uz+Case+Study&sub=E-commerce+Platform`, width: 1200, height: 630 }],
  },
  alternates: { canonical: `${SITE}/work/madami` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Madami.uz — E-commerce Platform",
  creator: { "@type": "Organization", name: "ORYX", url: SITE },
  url: "https://madami.uz",
  description: "Full-scale e-commerce and digital retail platform built by ORYX for Madami.uz in Tashkent, Uzbekistan.",
  keywords: "e-commerce, web platform, Next.js, Tashkent, Uzbekistan",
  dateCreated: "2024",
  inLanguage: ["ru", "uz"],
};

export default function MadamiCaseStudy() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-[#020202] text-[#f6f6f7]">
        {/* Nav */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.07] bg-[#020202]/90 px-[7.6vw] py-4 backdrop-blur-sm">
          <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4f4f55] transition-colors hover:text-[#f6f6f7]">
            ← BACK
          </Link>
          <Link href="/">
            <img src="/oryx-logo-white.svg" alt="ORYX" className="h-5 w-auto opacity-70" />
          </Link>
          <a href="/#contact" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4f4f55] transition-colors hover:text-[#f6f6f7]">
            CONTACT →
          </a>
        </div>

        {/* Hero */}
        <section className="border-b border-white/[0.07] px-[7.6vw] pb-16 pt-20">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.26em] text-[#4f4f55]">
            &gt; ORYX / WORK / 01
          </p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-[#f6f6f7] md:text-5xl lg:text-6xl">
                Madami.uz
              </h1>
              <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.18em] text-[#8b8b8f]">
                E-commerce & Digital Retail Platform
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#4a9e5c]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#4a9e5c]">LIVE</span>
              <a href="https://madami.uz" target="_blank" rel="noopener noreferrer"
                className="ml-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#4f4f55] transition-colors hover:text-[#f6f6f7]">
                madami.uz ↗
              </a>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-[7.6vw] py-20">

          {/* Tags */}
          <div className="mb-12 flex flex-wrap gap-2">
            {["E-commerce", "Web Platform", "Next.js", "React", "TypeScript", "Tashkent"].map((t) => (
              <span key={t} className="border border-white/[0.07] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#4f4f55]">
                {t}
              </span>
            ))}
          </div>

          {/* Overview */}
          <section className="mb-16">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[#4f4f55]">01 — OVERVIEW</p>
            <h2 className="mb-6 font-display text-2xl font-semibold text-[#f6f6f7] md:text-3xl">
              A full-scale e-commerce platform built for growth.
            </h2>
            <p className="text-[15px] leading-[1.8] text-[#9b9ba0]">
              Madami.uz needed more than a simple online store. They needed a scalable digital retail platform that could handle a large product catalogue, real-time inventory, seamless checkout, and a fast, mobile-first experience for customers across Uzbekistan.
            </p>
            <p className="mt-4 text-[15px] leading-[1.8] text-[#9b9ba0]">
              ORYX designed and built the platform end-to-end — from UX and visual design through to backend infrastructure and production deployment on Vercel with a PostgreSQL database.
            </p>
          </section>

          {/* Divider */}
          <div className="mb-16 h-px bg-white/[0.07]" />

          {/* The challenge */}
          <section className="mb-16">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[#4f4f55]">02 — THE CHALLENGE</p>
            <h2 className="mb-6 font-display text-2xl font-semibold text-[#f6f6f7]">
              Fast, scalable, and conversion-optimised.
            </h2>
            <ul className="space-y-3 text-[15px] leading-[1.8] text-[#9b9ba0]">
              <li className="flex gap-3"><span className="mt-1 shrink-0 font-mono text-[10px] text-[#4f4f55]">→</span> Large product catalogue requiring fast search and filtering</li>
              <li className="flex gap-3"><span className="mt-1 shrink-0 font-mono text-[10px] text-[#4f4f55]">→</span> Mobile-first design for Uzbekistan's primarily mobile user base</li>
              <li className="flex gap-3"><span className="mt-1 shrink-0 font-mono text-[10px] text-[#4f4f55]">→</span> Clean, premium aesthetic that builds trust with first-time buyers</li>
              <li className="flex gap-3"><span className="mt-1 shrink-0 font-mono text-[10px] text-[#4f4f55]">→</span> Admin dashboard for inventory, orders, and analytics</li>
            </ul>
          </section>

          <div className="mb-16 h-px bg-white/[0.07]" />

          {/* Tech stack */}
          <section className="mb-16">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[#4f4f55]">03 — TECH STACK</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {[
                { label: "Frontend", value: "Next.js 14, React, TypeScript" },
                { label: "Styling", value: "Tailwind CSS, Framer Motion" },
                { label: "Backend", value: "Node.js, PostgreSQL, Prisma" },
                { label: "Payments", value: "Local payment gateway integration" },
                { label: "Deployment", value: "Vercel + Railway" },
                { label: "Language", value: "Russian, Uzbek" },
              ].map((item) => (
                <div key={item.label} className="border border-white/[0.07] p-4">
                  <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#4f4f55]">{item.label}</p>
                  <p className="font-display text-[14px] font-medium text-[#f6f6f7]">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mb-16 h-px bg-white/[0.07]" />

          {/* Results */}
          <section className="mb-16">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[#4f4f55]">04 — RESULTS</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                { value: "< 2s", label: "Page load time" },
                { value: "100%", label: "Mobile optimised" },
                { value: "Live", label: "Production status" },
              ].map((s) => (
                <div key={s.label} className="border border-white/[0.07] p-6">
                  <p className="font-display text-4xl font-bold text-[#f6f6f7]">{s.value}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#4f4f55]">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="border-t border-white/[0.07] pt-12 text-center">
            <p className="mb-6 font-display text-xl font-semibold text-[#f6f6f7]">Want something similar?</p>
            <a href="/#contact"
              className="group inline-flex items-center gap-2 border border-[#f6f6f7] bg-[#f6f6f7] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#020202] transition-all duration-300 hover:bg-transparent hover:text-[#f6f6f7]">
              CONTACT ORYX
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
