import type { Metadata } from "next";
import { headers } from "next/headers";
import { OryxLanding } from "@/components/OryxLanding";

const SITE = "https://oryx-flame.vercel.app";

const BOT_RE = /bot|crawl|spider|slurp|googlebot|bingbot|yandex|baidu|gpt|chatgpt|claude|perplexity|ccbot|facebookexternalhit|linkedinbot|twitterbot|applebot|semrush|ahrefsbot|mj12bot/i;

export const metadata: Metadata = {
  title: "ORYX — Toshkentdagi raqamli mahsulot studiyasi | Saytlar, ilovalar, CRM, AI",
  description:
    "ORYX — Toshkentdagi raqamli mahsulot studiyasi. Veb-saytlar, mobil ilovalar, CRM/ERP tizimlari va AI avtomatizatsiyalarini yaratamiz.",
  keywords: [
    "sayt yaratish Toshkent",
    "mobil ilova Uzbekiston",
    "CRM tizimi Toshkent",
    "AI avtomatizatsiya",
    "veb-studiya Toshkent",
    "ORYX studio",
  ],
  openGraph: {
    title: "ORYX — Raqamli mahsulot studiyasi · Toshkent",
    description: "Veb-saytlar, mobil ilovalar, CRM tizimlari va AI avtomatizatsiyalar. Toshkentda to'liq ishlab chiqish.",
    url: `${SITE}/uz`,
    locale: "uz_UZ",
    images: [{ url: `${SITE}/og?title=Raqamli+mahsulot+studiyasi&sub=Toshkent+%C2%B7+O%27zbekiston`, width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${SITE}/uz`,
    languages: { en: `${SITE}/`, ru: `${SITE}/ru`, uz: `${SITE}/uz` },
  },
};

export default async function UzHome() {
  const headersList = await headers();
  const ua    = headersList.get("user-agent") ?? "";
  const isBot = BOT_RE.test(ua);
  return <OryxLanding isBot={isBot} defaultLang="uz" />;
}
