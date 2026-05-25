"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type Lang = "en" | "ru" | "uz";

interface FaqItem {
  q: string;
  a: string;
}

// ─── Content ──────────────────────────────────────────────────────────────────
const faqData: Record<Lang, { heading: string; sub: string; back: string; items: FaqItem[] }> = {
  en: {
    heading: "Everything you need to know about ORYX.",
    sub: "Frequently asked questions about our services, process, pricing, and team.",
    back: "← BACK TO HOME",
    items: [
      {
        q: "What does ORYX do?",
        a: "ORYX is a founder-led digital product studio based in Tashkent, Uzbekistan. We design and build websites, landing pages, mobile apps (iOS and Android), CRM and ERP systems, AI automations, and custom software for businesses in Uzbekistan and the CIS region.",
      },
      {
        q: "What services does ORYX offer?",
        a: "We offer four core service lines: (1) Websites & Platforms — high-performance marketing sites, landing pages, e-commerce stores, and booking systems; (2) CRM & ERP Systems — internal tools, client record management, inventory, operational dashboards; (3) Mobile Apps — cross-platform iOS and Android apps for consumer and B2B use cases; (4) AI Automations & Custom Systems — AI agents, chatbots, integrations, workflow automations, and reporting systems.",
      },
      {
        q: "How long does a typical project take?",
        a: "Project timelines depend on scope. A landing page or simple website typically ships in 1–2 weeks. A full-featured web platform or CRM takes 4–8 weeks. A mobile app typically takes 6–12 weeks. AI automations vary from 1 week to 2 months depending on complexity. We always agree on a timeline before starting.",
      },
      {
        q: "How much do ORYX projects cost?",
        a: "Pricing varies by scope and complexity. Simple landing pages start from a few hundred dollars. Full platforms, CRMs, or mobile apps are priced per project after a scoping call. We do not charge hourly — we price the full deliverable. To get a quote, book a free 20-minute discovery call via the contact form on our website.",
      },
      {
        q: "What technologies does ORYX use?",
        a: "We build with modern, production-grade technologies: Next.js, React, TypeScript, and Tailwind CSS for web; React Native and Expo for mobile; Node.js, Python, and PostgreSQL for backends; OpenAI, Anthropic, and LangChain for AI features. We pick the right stack for each project, not a one-size-fits-all template.",
      },
      {
        q: "Who runs ORYX?",
        a: "ORYX is a founder-led studio. There are no account managers or middlemen — you work directly with the engineer and designer building your product. This means faster communication, no lost context, and higher quality output.",
      },
      {
        q: "Does ORYX work with clients outside Uzbekistan?",
        a: "Yes. While most of our clients are based in Tashkent and across Uzbekistan, we work remotely with clients throughout Central Asia, Russia, and internationally. All communication is available in Russian, Uzbek, and English.",
      },
      {
        q: "What industries does ORYX serve?",
        a: "We have built projects for clients in e-commerce, healthcare, real estate, education, logistics, fintech, hospitality, and marketing. We are industry-agnostic — if you have a digital problem to solve, we can help.",
      },
      {
        q: "How does the project process work?",
        a: "Our process has five stages: (1) Discovery call — 20 minutes to understand your goals; (2) Proposal — scope, timeline, and pricing sent within 24 hours; (3) Design — wireframes and UI delivered for your review; (4) Build — we develop and iterate with regular updates; (5) Launch & handoff — full deployment, documentation, and post-launch support.",
      },
      {
        q: "Does ORYX provide support after launch?",
        a: "Yes. Every project includes a post-launch support period. We also offer ongoing maintenance and development retainers for clients who want a long-term partner rather than a one-off vendor.",
      },
      {
        q: "How do I contact ORYX?",
        a: "You can contact us via the form at https://oryx.uz/#contact. Fill in your name, phone, and what you need, and we will respond within 24 hours. You can also reach us on Telegram.",
      },
      {
        q: "What makes ORYX different from other agencies?",
        a: "Three things: (1) Founder-led — you always talk to the person building your product, not a sales rep; (2) Speed — we move fast without cutting corners; (3) Minimalist premium design — our work is clean, modern, and built to perform, not just look good in mockups.",
      },
    ],
  },
  ru: {
    heading: "Всё, что нужно знать об ORYX.",
    sub: "Частые вопросы о наших услугах, процессе, ценах и команде.",
    back: "← НА ГЛАВНУЮ",
    items: [
      {
        q: "Чем занимается ORYX?",
        a: "ORYX — студия цифровых продуктов, основанная основателем, находящаяся в Ташкенте, Узбекистан. Мы проектируем и создаём сайты, лендинги, мобильные приложения (iOS и Android), CRM и ERP системы, AI автоматизации и кастомный софт для бизнеса в Узбекистане и СНГ.",
      },
      {
        q: "Какие услуги предоставляет ORYX?",
        a: "Четыре основных направления: (1) Сайты и Платформы — высокопроизводительные маркетинговые сайты, лендинги, e-commerce и системы бронирования; (2) CRM и ERP Системы — внутренние инструменты, управление клиентской базой, склад, операционные дашборды; (3) Мобильные Приложения — кроссплатформенные iOS и Android приложения; (4) AI Автоматизации и Системы — AI агенты, чатботы, интеграции, автоматизация процессов.",
      },
      {
        q: "Сколько времени занимает проект?",
        a: "Зависит от масштаба. Лендинг или простой сайт — 1–2 недели. Полноценная платформа или CRM — 4–8 недель. Мобильное приложение — 6–12 недель. AI автоматизации — от 1 недели до 2 месяцев. Сроки согласуем до начала работы.",
      },
      {
        q: "Сколько стоят проекты ORYX?",
        a: "Цена зависит от объёма и сложности. Простые лендинги — от нескольких сотен долларов. Платформы, CRM и мобильные приложения оцениваются индивидуально после созвона. Мы не работаем по часовой ставке — фиксированная цена за результат. Для расчёта стоимости запишитесь на бесплатный 20-минутный звонок через форму на сайте.",
      },
      {
        q: "Какие технологии использует ORYX?",
        a: "Мы строим на современном стеке: Next.js, React, TypeScript, Tailwind CSS для веба; React Native и Expo для мобильных; Node.js, Python, PostgreSQL для бэкенда; OpenAI, Anthropic, LangChain для AI. Стек подбирается под каждый проект индивидуально.",
      },
      {
        q: "Кто управляет ORYX?",
        a: "ORYX — студия, которой управляет основатель. Никаких аккаунт-менеджеров и посредников — вы работаете напрямую с инженером и дизайнером, который делает ваш продукт. Это значит: быстрая коммуникация, нет потери контекста, высокое качество.",
      },
      {
        q: "Работает ли ORYX с клиентами за пределами Узбекистана?",
        a: "Да. Большинство клиентов из Ташкента и Узбекистана, но мы работаем удалённо с клиентами по всей Центральной Азии, России и международно. Общение доступно на русском, узбекском и английском.",
      },
      {
        q: "Какие отрасли обслуживает ORYX?",
        a: "Мы делали проекты для e-commerce, медицины, недвижимости, образования, логистики, финтеха, HoReCa и маркетинга. Мы не привязаны к отрасли — если есть цифровая задача, мы её решим.",
      },
      {
        q: "Как устроен процесс работы?",
        a: "Пять этапов: (1) Звонок — 20 минут, чтобы понять задачу; (2) Предложение — scope, сроки и цена в течение 24 часов; (3) Дизайн — вайрфреймы и UI для согласования; (4) Разработка — итеративная разработка с регулярными апдейтами; (5) Запуск и передача — полный деплой, документация, поддержка после запуска.",
      },
      {
        q: "Предоставляет ли ORYX поддержку после запуска?",
        a: "Да. Каждый проект включает период поддержки после запуска. Также предлагаем ретейнеры на техническое обслуживание для клиентов, которым нужен долгосрочный партнёр.",
      },
      {
        q: "Как связаться с ORYX?",
        a: "Через форму на https://oryx.uz/#contact. Заполните имя, телефон и что вам нужно — ответим в течение 24 часов. Также можно написать в Telegram.",
      },
      {
        q: "Чем ORYX отличается от других агентств?",
        a: "Три вещи: (1) Управление основателем — вы всегда общаетесь с тем, кто делает ваш продукт; (2) Скорость — работаем быстро без потери качества; (3) Минималистичный премиум-дизайн — чистый, современный, работающий, а не только красивый на макете.",
      },
    ],
  },
  uz: {
    heading: "ORYX haqida bilishingiz kerak bo'lgan hamma narsa.",
    sub: "Xizmatlarimiz, jarayonimiz, narxlar va jamoa haqida tez-tez beriladigan savollar.",
    back: "← BOSH SAHIFAGA QAYTISH",
    items: [
      {
        q: "ORYX nima bilan shug'ullanadi?",
        a: "ORYX — Toshkent, O'zbekistonda joylashgan, asoschi tomonidan boshqariladigan raqamli mahsulot studiyasi. Biz O'zbekiston va MDH hududidagi bizneslar uchun veb-saytlar, landinglar, mobil ilovalar (iOS va Android), CRM va ERP tizimlar, AI avtomatizatsiyalar va maxsus dasturiy ta'minot yaratamiz.",
      },
      {
        q: "ORYX qanday xizmatlar taqdim etadi?",
        a: "To'rtta asosiy yo'nalish: (1) Veb-saytlar va Platformalar — yuqori samarali marketing saytlar, landinglar, e-commerce va bron tizimlar; (2) CRM va ERP Tizimlar — ichki vositalar, mijozlar bazasi, ombor, operatsion dashboard; (3) Mobil Ilovalar — iOS va Android uchun cross-platform ilovalar; (4) AI Avtomatizatsiya va Tizimlar — AI agentlar, chatbotlar, integratsiyalar va hisobot tizimlari.",
      },
      {
        q: "Loyiha qancha vaqt oladi?",
        a: "Ko'lam va murakkablikka bog'liq. Landing yoki oddiy sayt — 1–2 hafta. To'liq platforma yoki CRM — 4–8 hafta. Mobil ilova — 6–12 hafta. AI avtomatizatsiya — 1 haftadan 2 oygacha. Muddatlarni ish boshlanishidan oldin kelishamiz.",
      },
      {
        q: "ORYX loyihalari qancha turadi?",
        a: "Narx ko'lam va murakkablikka qarab o'zgaradi. Oddiy landinglar bir necha yuz dollardan boshlanadi. Platformalar, CRM va mobil ilovalar qo'ng'iroqdan keyin alohida baholanadi. Soatlik to'lov yo'q — natija uchun to'sabit narx. Narxni bilish uchun saytdagi forma orqali bepul 20 daqiqalik qo'ng'iroqqa yoziling.",
      },
      {
        q: "ORYX qanday texnologiyalardan foydalanadi?",
        a: "Zamonaviy texnologiyalar steki: veb uchun Next.js, React, TypeScript, Tailwind CSS; mobil uchun React Native va Expo; backend uchun Node.js, Python, PostgreSQL; AI uchun OpenAI, Anthropic, LangChain. Har bir loyiha uchun to'g'ri stek tanlanadi.",
      },
      {
        q: "ORYX'ni kim boshqaradi?",
        a: "ORYX asoschi tomonidan boshqariladigan studio. Hech qanday oraliq menejerlar yo'q — siz mahsulotingizni quruvchi muhandis va dizayner bilan to'g'ridan-to'g'ri ishlaysiz. Bu tezroq muloqot, kontekst yo'qolmasligi va yuqori sifat degani.",
      },
      {
        q: "ORYX O'zbekistondan tashqaridagi mijozlar bilan ishlaydimi?",
        a: "Ha. Asosiy mijozlar Toshkent va O'zbekistondan, lekin Markaziy Osiyo, Rossiya va xalqaro miqyosda ham masofadan ishlaymiz. Muloqot rus, o'zbek va ingliz tillarida mavjud.",
      },
      {
        q: "ORYX qaysi sohalarga xizmat ko'rsatadi?",
        a: "E-commerce, tibbiyot, ko'chmas mulk, ta'lim, logistika, fintech, umumiy ovqatlanish va marketing sohalarida loyihalar qilganmiz. Sohaga bog'liq emasmiz — raqamli muammoingiz bo'lsa, hal qilamiz.",
      },
      {
        q: "Ish jarayoni qanday?",
        a: "Besh bosqich: (1) Qo'ng'iroq — 20 daqiqa, vazifani tushunish; (2) Taklif — scope, muddat va narx 24 soat ichida; (3) Dizayn — wireframe va UI kelishish uchun; (4) Ishlab chiqish — muntazam yangilanishlar bilan iterativ ishlab chiqish; (5) Ishga tushirish — to'liq deployment, hujjatlar va ishga tushgandan keyin qo'llab-quvvatlash.",
      },
      {
        q: "ORYX ishga tushirishdan keyin qo'llab-quvvatlaydimi?",
        a: "Ha. Har bir loyiha ishga tushirishdan keyin qo'llab-quvvatlash davrini o'z ichiga oladi. Uzoq muddatli hamkor izlayotgan mijozlar uchun texnik xizmat va rivojlantirish retynerlarini ham taklif qilamiz.",
      },
      {
        q: "ORYX bilan qanday bog'lanish mumkin?",
        a: "https://oryx.uz/#contact saytidagi forma orqali. Ismingizni, telefoningizni va nima kerakligini to'ldiring — 24 soat ichida javob beramiz. Telegram orqali ham murojaat qilishingiz mumkin.",
      },
      {
        q: "ORYX boshqa agentliklardan nimasi bilan farq qiladi?",
        a: "Uch narsa: (1) Asoschi boshqaruvi — har doim mahsulotingizni quruvchi odam bilan gaplashasiz; (2) Tezlik — sifat yo'qotmasdan tez ishlaymiz; (3) Minimalist premium dizayn — makette emas, amalda ham chiroyli va samarali ishlovchi mahsulot.",
      },
    ],
  },
};

// ─── JSON-LD for FAQPage schema ───────────────────────────────────────────────
function JsonLd() {
  const items = faqData.en.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Single accordion item ────────────────────────────────────────────────────
function FaqRow({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-oryx-line"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-6 text-left"
        aria-expanded={open}
      >
        <span className="flex items-start gap-4">
          <span className="mt-0.5 shrink-0 font-mono text-[10px] tracking-[0.16em] text-oryx-mute">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-[15px] font-medium leading-snug text-oryx-white md:text-[17px]">
            {item.q}
          </span>
        </span>
        <span
          className={`mt-0.5 shrink-0 font-mono text-[18px] text-oryx-dim transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-10 text-[14px] leading-[1.75] text-[#b7b7ba] md:text-[15px]">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FaqPage() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("oryx-lang") as Lang | null;
    if (saved === "ru" || saved === "uz") setLang(saved);
  }, []);

  const c = faqData[lang];

  return (
    <>
      <JsonLd />

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
          {/* Language switcher */}
          <div className="flex items-center gap-1">
            {(["en", "ru", "uz"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-all ${
                  lang === l
                    ? "bg-white/[0.08] text-oryx-white"
                    : "text-oryx-mute hover:text-oryx-dim"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Hero */}
        <section className="border-b border-oryx-line px-[7.6vw] pb-16 pt-20">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-6 font-mono text-[11px] uppercase tracking-[0.26em] text-oryx-dim"
          >
            {lang === "en" ? "> ORYX / FAQ" : lang === "ru" ? "> ORYX / ЧаВО" : "> ORYX / FAQ"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 max-w-2xl font-display text-3xl font-bold leading-tight text-oryx-white md:text-4xl lg:text-5xl"
          >
            {c.heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-mono text-[12px] tracking-[0.14em] text-oryx-dim"
          >
            {c.sub}
          </motion.p>
        </section>

        {/* FAQ accordion */}
        <section className="mx-auto max-w-4xl px-[7.6vw] pb-24 pt-4">
          {c.items.map((item, i) => (
            <FaqRow key={i} item={item} index={i} />
          ))}
        </section>

        {/* CTA footer */}
        <div className="border-t border-oryx-line px-[7.6vw] py-12 text-center">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-dim">
            {lang === "en"
              ? "Still have questions?"
              : lang === "ru"
              ? "Остались вопросы?"
              : "Savollar qoldimi?"}
          </p>
          <p className="mb-6 font-display text-xl font-semibold text-oryx-white">
            {lang === "en"
              ? "Talk to us directly."
              : lang === "ru"
              ? "Поговорите с нами напрямую."
              : "Biz bilan to'g'ridan-to'g'ri gaplashing."}
          </p>
          <a
            href="/#contact"
            className="group inline-flex items-center gap-2 border border-oryx-white bg-oryx-white px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-black transition-all duration-300 hover:bg-transparent hover:text-oryx-white"
          >
            {lang === "en" ? "CONTACT ORYX" : lang === "ru" ? "СВЯЗАТЬСЯ" : "BOG'LANISH"}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </>
  );
}
