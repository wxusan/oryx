import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://oryx.uz";

export const metadata: Metadata = {
  title: "Uyjoy.uz — Real Estate Marketplace | ORYX Case Study",
  description:
    "How ORYX built Uyjoy.uz — a real estate marketplace connecting buyers, sellers, and agencies across Uzbekistan. Design, tech stack, and outcomes.",
  openGraph: {
    title: "Uyjoy.uz Case Study — Built by ORYX",
    description: "Real estate marketplace connecting buyers, sellers and agencies across Uzbekistan. Designed and developed by ORYX studio in Tashkent.",
    url: `${SITE}/work/uyjoy`,
    images: [{ url: `${SITE}/og?title=Uyjoy.uz+Case+Study&sub=Real+Estate+Marketplace`, width: 1200, height: 630 }],
  },
  alternates: { canonical: `${SITE}/work/uyjoy` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Uyjoy.uz — Real Estate Marketplace",
  creator: { "@type": "Organization", name: "ORYX", url: SITE },
  url: "https://uyjoy.uz",
  description: "Real estate marketplace connecting buyers, sellers, and agencies across Uzbekistan. Built by ORYX digital product studio in Tashkent.",
  keywords: "real estate, marketplace, web platform, Uzbekistan, Tashkent",
  dateCreated: "2024",
};

export default function UyjoyCaseStudy() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-[#020202] text-[#f6f6f7]">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.07] bg-[#020202]/90 px-[7.6vw] py-4 backdrop-blur-sm">
          <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4f4f55] transition-colors hover:text-[#f6f6f7]">← BACK</Link>
          <Link href="/"><img src="/oryx-logo-white.svg" alt="ORYX" className="h-5 w-auto opacity-70" /></Link>
          <a href="/#contact" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4f4f55] transition-colors hover:text-[#f6f6f7]">CONTACT →</a>
        </div>

        <section className="border-b border-white/[0.07] px-[7.6vw] pb-16 pt-20">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.26em] text-[#4f4f55]">&gt; ORYX / WORK / 02</p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-[#f6f6f7] md:text-5xl lg:text-6xl">Uyjoy.uz</h1>
              <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.18em] text-[#8b8b8f]">Real Estate Marketplace</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#4a9e5c]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#4a9e5c]">LIVE</span>
              <a href="https://uyjoy.uz" target="_blank" rel="noopener noreferrer" className="ml-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#4f4f55] transition-colors hover:text-[#f6f6f7]">uyjoy.uz ↗</a>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-[7.6vw] py-20">
          <div className="mb-12 flex flex-wrap gap-2">
            {["Real Estate", "Marketplace", "Next.js", "React", "PostgreSQL", "Tashkent"].map((t) => (
              <span key={t} className="border border-white/[0.07] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#4f4f55]">{t}</span>
            ))}
          </div>

          <section className="mb-16">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[#4f4f55]">01 — OVERVIEW</p>
            <h2 className="mb-6 font-display text-2xl font-semibold text-[#f6f6f7] md:text-3xl">A marketplace that connects all sides of the real estate market.</h2>
            <p className="text-[15px] leading-[1.8] text-[#9b9ba0]">
              Uyjoy.uz is a real estate marketplace for Uzbekistan — connecting individual buyers, private sellers, and professional agencies in one platform. The challenge was building a system that worked for all three user types simultaneously, with different dashboards, listing flows, and trust mechanisms for each.
            </p>
            <p className="mt-4 text-[15px] leading-[1.8] text-[#9b9ba0]">
              ORYX built the full platform from concept to launch: UX research, design system, frontend, backend API, listing management, search with filters, and agency profile pages.
            </p>
          </section>

          <div className="mb-16 h-px bg-white/[0.07]" />

          <section className="mb-16">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[#4f4f55]">02 — THE CHALLENGE</p>
            <h2 className="mb-6 font-display text-2xl font-semibold text-[#f6f6f7]">Three user types, one cohesive product.</h2>
            <ul className="space-y-3 text-[15px] leading-[1.8] text-[#9b9ba0]">
              <li className="flex gap-3"><span className="mt-1 shrink-0 font-mono text-[10px] text-[#4f4f55]">→</span> Buyers: fast search, map view, saved listings, contact sellers</li>
              <li className="flex gap-3"><span className="mt-1 shrink-0 font-mono text-[10px] text-[#4f4f55]">→</span> Sellers: listing creation with photo upload, pricing, availability</li>
              <li className="flex gap-3"><span className="mt-1 shrink-0 font-mono text-[10px] text-[#4f4f55]">→</span> Agencies: verified profiles, portfolio listings, lead tracking</li>
              <li className="flex gap-3"><span className="mt-1 shrink-0 font-mono text-[10px] text-[#4f4f55]">→</span> Bilingual (Russian + Uzbek) throughout</li>
            </ul>
          </section>

          <div className="mb-16 h-px bg-white/[0.07]" />

          <section className="mb-16">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[#4f4f55]">03 — TECH STACK</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {[
                { label: "Frontend", value: "Next.js, React, TypeScript" },
                { label: "Styling", value: "Tailwind CSS" },
                { label: "Backend", value: "Node.js, PostgreSQL" },
                { label: "Search", value: "Full-text search, geolocation filters" },
                { label: "Storage", value: "Image uploads, cloud storage" },
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

          <section className="mb-16">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[#4f4f55]">04 — RESULTS</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[{ value: "3", label: "User types served" }, { value: "Live", label: "Production status" }, { value: "2", label: "Languages" }].map((s) => (
                <div key={s.label} className="border border-white/[0.07] p-6">
                  <p className="font-display text-4xl font-bold text-[#f6f6f7]">{s.value}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#4f4f55]">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-white/[0.07] pt-12 text-center">
            <p className="mb-6 font-display text-xl font-semibold text-[#f6f6f7]">Building something similar?</p>
            <a href="/#contact" className="group inline-flex items-center gap-2 border border-[#f6f6f7] bg-[#f6f6f7] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#020202] transition-all duration-300 hover:bg-transparent hover:text-[#f6f6f7]">
              CONTACT ORYX <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
