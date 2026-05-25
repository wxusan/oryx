"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import testimonialsData from "@/data/testimonials.json";
import Script from "next/script";

type Lang = "ru" | "uz";

interface Testimonial {
  id: number;
  name: string;
  role_ru: string;
  role_uz: string;
  company: string;
  rating: number;
  testimonial_ru: string;
  testimonial_uz: string;
  demo_only: boolean;
}

const PAGE_SIZE = 12;

// Average rating across all testimonials
const avgRating =
  (testimonialsData as Testimonial[]).reduce((s, t) => s + t.rating, 0) /
  testimonialsData.length;

const copy = {
  ru: {
    eyebrow: "> ОТЗЫВЫ КЛИЕНТОВ",
    heading: ["Что говорят", "наши клиенты."],
    sub: `${(testimonialsData as Testimonial[]).length} клиентов · Средняя оценка ${avgRating.toFixed(1)} / 5`,
    loadMore: "ЗАГРУЗИТЬ ЕЩЁ",
    demo: "ДЕМО",
    back: "← ВЕРНУТЬСЯ",
    allLoaded: "ВСЕ ОТЗЫВЫ ЗАГРУЖЕНЫ",
  },
  uz: {
    eyebrow: "> MIJOZLAR FIKRI",
    heading: ["Mijozlarimiz", "nima deyishadi."],
    sub: `${(testimonialsData as Testimonial[]).length} ta mijoz · O'rtacha baho ${avgRating.toFixed(1)} / 5`,
    loadMore: "KO'PROQ YUKLASH",
    demo: "DEMO",
    back: "← ORTALISHGA QAYTISH",
    allLoaded: "BARCHA FIKRLAR YUKLANDI",
  },
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full)
          return (
            <svg key={i} className="h-3 w-3 text-oryx-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        if (i === full && partial > 0)
          return (
            <svg key={i} className="h-3 w-3" viewBox="0 0 20 20">
              <defs>
                <linearGradient id={`p${i}`}>
                  <stop offset={`${partial * 100}%`} stopColor="#f6f6f7" />
                  <stop offset={`${partial * 100}%`} stopColor="#4f4f55" />
                </linearGradient>
              </defs>
              <path fill={`url(#p${i})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        return (
          <svg key={i} className="h-3 w-3 text-oryx-mute" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
      <span className="ml-1.5 font-mono text-[10px] text-oryx-dim">{rating.toFixed(1)}</span>
    </div>
  );
}

function TestimonialCard({
  t,
  lang,
  index,
}: {
  t: Testimonial;
  lang: Lang;
  index: number;
}) {
  const text = lang === "uz" ? t.testimonial_uz : t.testimonial_ru;
  const role = lang === "uz" ? t.role_uz : t.role_ru;
  const initials = t.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: (index % PAGE_SIZE) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col gap-5 border border-oryx-line bg-[#0d0d0d] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-[#111111]"
    >
      {/* Subtle top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Demo badge */}
      {t.demo_only && (
        <span className="absolute right-4 top-4 font-mono text-[9px] tracking-[0.18em] text-oryx-mute">
          DEMO
        </span>
      )}

      {/* Header: avatar + name */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-white/[0.06] font-display text-[11px] font-semibold uppercase tracking-wider text-oryx-dim">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-[13px] font-semibold leading-tight text-oryx-white">
            {t.name}
          </p>
          <p className="font-mono text-[10px] tracking-[0.12em] text-oryx-dim">
            {role} · {t.company}
          </p>
        </div>
      </div>

      {/* Rating */}
      <StarRating rating={t.rating} />

      {/* Text */}
      <blockquote className="flex-1 text-[13px] leading-[1.7] text-[#b7b7ba]">
        &ldquo;{text}&rdquo;
      </blockquote>

      {/* Bottom line: company */}
      <div className="flex items-center justify-between border-t border-oryx-line pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-oryx-mute">
          {t.company}
        </span>
        <span className="font-mono text-[10px] text-oryx-mute">#{String(t.id).padStart(3, "0")}</span>
      </div>
    </motion.article>
  );
}

// JSON-LD schema for AI crawlers
function JsonLd({ lang }: { lang: Lang }) {
  const reviews = (testimonialsData as Testimonial[]).map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
    reviewBody: lang === "uz" ? t.testimonial_uz : t.testimonial_ru,
    itemReviewed: { "@type": "Organization", name: "ORYX" },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ORYX",
    url: "https://oryx-flame.vercel.app",
    description:
      "Founder-led digital product studio in Tashkent. Websites, mobile apps, CRM/ERP systems, and AI automations.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(2),
      reviewCount: testimonialsData.length,
      bestRating: 5,
    },
    review: reviews.slice(0, 20), // first 20 for schema size
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function TestimonialsPage() {
  const [lang, setLang] = useState<Lang>("ru");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const all = testimonialsData as Testimonial[];
  const shown = all.slice(0, visible);
  const allLoaded = visible >= all.length;

  // Sync with saved language preference
  useEffect(() => {
    const saved = localStorage.getItem("oryx-lang");
    if (saved === "uz") setLang("uz");
  }, []);

  const c = copy[lang];

  return (
    <>
      <JsonLd lang={lang} />

      <div className="min-h-screen bg-[#020202] text-[#f6f6f7]">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-oryx-line bg-[#020202]/90 px-[7.6vw] py-4 backdrop-blur-sm">
          <a
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-dim transition-colors hover:text-oryx-white"
          >
            {c.back}
          </a>
          <img src="/oryx-logo-white.svg" alt="ORYX" className="h-5 w-auto opacity-70" />
          {/* Language toggle */}
          <div className="flex items-center gap-1">
            {(["ru", "uz"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 transition-all ${
                  lang === l
                    ? "text-oryx-white bg-white/[0.08]"
                    : "text-oryx-mute hover:text-oryx-dim"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Hero section */}
        <section className="px-[7.6vw] pb-16 pt-20">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-6 font-mono text-[11px] uppercase tracking-[0.26em] text-oryx-dim"
          >
            {c.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-oryx-white md:text-5xl lg:text-6xl"
          >
            {c.heading[0]}
            <br />
            <span className="text-oryx-dim">{c.heading[1]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-mono text-[12px] tracking-[0.14em] text-oryx-dim"
          >
            {c.sub}
          </motion.p>

          {/* Aggregate stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 flex items-center gap-6 border-t border-oryx-line pt-8"
          >
            <div>
              <p className="font-display text-3xl font-bold text-oryx-white">{avgRating.toFixed(1)}</p>
              <StarRating rating={avgRating} />
            </div>
            <div className="h-10 w-px bg-oryx-line" />
            <div>
              <p className="font-display text-3xl font-bold text-oryx-white">{all.length}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-oryx-dim">
                {lang === "uz" ? "mijoz sharhlari" : "отзывов клиентов"}
              </p>
            </div>
            <div className="h-10 w-px bg-oryx-line" />
            <div>
              <p className="font-display text-3xl font-bold text-oryx-white">15+</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-oryx-dim">
                {lang === "uz" ? "loyihalar" : "проектов"}
              </p>
            </div>
          </motion.div>
        </section>

        {/* Testimonials grid */}
        <section className="px-[7.6vw] pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={lang}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {shown.map((t, i) => (
                <TestimonialCard key={t.id} t={t} lang={lang} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Load more */}
          <div className="mt-12 flex justify-center">
            {allLoaded ? (
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-mute">
                {c.allLoaded}
              </p>
            ) : (
              <button
                onClick={() => setVisible((v) => Math.min(v + PAGE_SIZE, all.length))}
                className="group inline-flex items-center gap-2 border border-oryx-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-dim transition-all duration-300 hover:border-oryx-white hover:text-oryx-white"
              >
                {c.loadMore}
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </button>
            )}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="border-t border-oryx-line px-[7.6vw] py-12 text-center">
          <p className="mb-6 font-display text-xl font-semibold text-oryx-white">
            {lang === "uz" ? "Keyingi bo'lasizmi?" : "Станьте следующим?"}
          </p>
          <a
            href="/#contact"
            className="group inline-flex items-center gap-2 border border-oryx-white bg-oryx-white px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-black transition-all duration-300 hover:bg-transparent hover:text-oryx-white"
          >
            {lang === "uz" ? "BOG'LANISH" : "СВЯЗАТЬСЯ"}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </>
  );
}
