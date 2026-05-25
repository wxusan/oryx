import type { Metadata } from "next";
import { headers } from "next/headers";
import { OryxLanding } from "@/components/OryxLanding";

const SITE = "https://oryx-flame.vercel.app";

export const metadata: Metadata = {
  title: "ORYX — Raqamli Mahsulot Studiyasi | Toshkent, O'zbekiston",
  description:
    "Toshkentda veb-sayt, mobil ilova, CRM va ERP tizimlar, AI avtomatizatsiya ishlab chiqish. Asoschi tomonidan boshqariladigan studio — tez va sifatli, vositachilarsiz.",
  keywords: [
    "veb sayt yasash Toshkent", "veb sayt Toshkent", "mobil ilova ishlab chiqish Toshkent",
    "CRM tizim Toshkent", "ERP tizim O'zbekiston", "AI avtomatizatsiya Toshkent",
    "veb developer O'zbekiston", "ORYX studio", "sayt buyurtma Toshkent",
    "dasturlash Toshkent", "veb ishlab chiqish O'zbekiston",
  ],
  openGraph: {
    title: "ORYX — Raqamli Mahsulot Studiyasi Toshkentda",
    description: "Veb-saytlar, mobil ilovalar, CRM/ERP tizimlar va AI avtomatizatsiya — tez va vositachilarsiz.",
    url: `${SITE}/uz`,
    locale: "uz_UZ",
    type: "website",
    images: [{ url: `${SITE}/og?title=Raqamli+Mahsulot+Studiyasi&sub=Toshkent+%C2%B7+O%27zbekiston`, width: 1200, height: 630, alt: "ORYX — Raqamli Mahsulot Studiyasi, Toshkent" }],
  },
  alternates: {
    canonical: `${SITE}/uz`,
    languages: { "en": `${SITE}/`, "ru": `${SITE}/ru`, "uz": `${SITE}/uz` },
  },
};

const BOT_RE =
  /bot|crawl|spider|slurp|googlebot|bingbot|yandex|baidu|gpt|chatgpt|claude|perplexity|ccbot|facebookexternalhit|linkedinbot/i;

export default function UzPage() {
  const ua    = headers().get("user-agent") ?? "";
  const isBot = BOT_RE.test(ua);
  return <OryxLanding isBot={isBot} defaultLang="uz" />;
}
