import type { Metadata } from "next";
import { headers } from "next/headers";
import { OryxLanding } from "@/components/OryxLanding";

const SITE = "https://oryx-flame.vercel.app";

const BOT_RE = /bot|crawl|spider|slurp|googlebot|bingbot|yandex|baidu|gpt|chatgpt|claude|perplexity|ccbot|facebookexternalhit|linkedinbot|twitterbot|applebot|semrush|ahrefsbot|mj12bot/i;

export const metadata: Metadata = {
  title: "ORYX — Студия цифровых продуктов в Ташкенте | Сайты, приложения, CRM, ИИ",
  description:
    "ORYX — студия разработки цифровых продуктов в Ташкенте. Создаём сайты, мобильные приложения, CRM/ERP системы и ИИ-автоматизации для бизнеса в Узбекистане.",
  keywords: [
    "разработка сайтов Ташкент",
    "мобильные приложения Узбекистан",
    "CRM система Ташкент",
    "ИИ автоматизация",
    "веб-студия Ташкент",
    "ORYX студия",
  ],
  openGraph: {
    title: "ORYX — Студия цифровых продуктов · Ташкент",
    description: "Сайты, мобильные приложения, CRM-системы и ИИ-автоматизации. Разработка под ключ в Ташкенте.",
    url: `${SITE}/ru`,
    locale: "ru_RU",
    images: [{ url: `${SITE}/og?title=%D0%A1%D1%82%D1%83%D0%B4%D0%B8%D1%8F+%D1%86%D0%B8%D1%84%D1%80%D0%BE%D0%B2%D1%8B%D1%85+%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%BE%D0%B2&sub=%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82+%C2%B7+%D0%A3%D0%B7%D0%B1%D0%B5%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD`, width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${SITE}/ru`,
    languages: { en: `${SITE}/`, ru: `${SITE}/ru`, uz: `${SITE}/uz` },
  },
};

export default async function RuHome() {
  const headersList = await headers();
  const ua    = headersList.get("user-agent") ?? "";
  const isBot = BOT_RE.test(ua);
  return <OryxLanding isBot={isBot} defaultLang="ru" />;
}
