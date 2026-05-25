import type { Metadata } from "next";
import { headers } from "next/headers";
import { OryxLanding } from "@/components/OryxLanding";

const SITE = "https://oryx-flame.vercel.app";

export const metadata: Metadata = {
  title: "ORYX — Студия цифровых продуктов | Ташкент, Узбекистан",
  description:
    "Разработка сайтов, мобильных приложений, CRM и ERP систем, AI автоматизаций в Ташкенте. Студия под руководством основателя — без посредников, быстро и качественно.",
  keywords: [
    "разработка сайтов Ташкент", "веб студия Ташкент", "создание сайтов Узбекистан",
    "разработка мобильных приложений Ташкент", "CRM система Ташкент", "ERP система Узбекистан",
    "AI автоматизация Ташкент", "веб разработчик Узбекистан", "ORYX студия",
    "заказать сайт Ташкент", "разработка приложений Узбекистан",
  ],
  openGraph: {
    title: "ORYX — Студия цифровых продуктов в Ташкенте",
    description: "Сайты, мобильные приложения, CRM/ERP системы и AI автоматизации — быстро и без посредников.",
    url: `${SITE}/ru`,
    locale: "ru_RU",
    type: "website",
    images: [{ url: `${SITE}/og?title=%D0%A1%D1%82%D1%83%D0%B4%D0%B8%D1%8F+%D1%86%D0%B8%D1%84%D1%80%D0%BE%D0%B2%D1%8B%D1%85+%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%BE%D0%B2&sub=%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82+%C2%B7+%D0%A3%D0%B7%D0%B1%D0%B5%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD`, width: 1200, height: 630, alt: "ORYX — Студия цифровых продуктов, Ташкент" }],
  },
  alternates: {
    canonical: `${SITE}/ru`,
    languages: { "en": `${SITE}/`, "ru": `${SITE}/ru`, "uz": `${SITE}/uz` },
  },
};

const BOT_RE =
  /bot|crawl|spider|slurp|googlebot|bingbot|yandex|baidu|gpt|chatgpt|claude|perplexity|ccbot|facebookexternalhit|linkedinbot/i;

export default function RuPage() {
  const ua    = headers().get("user-agent") ?? "";
  const isBot = BOT_RE.test(ua);
  return <OryxLanding isBot={isBot} defaultLang="ru" />;
}
