import type { Metadata } from "next";
import { OryxLanding } from "@/components/OryxLanding";

const BASE_URL = "https://oryx.uz";

export const metadata: Metadata = {
  title: "ORYX — Raqamli mahsulot studiyasi",
  description:
    "Veb-saytlar, MVP, avtomatizatsiya va AI tizimlari uchun raqamli mahsulot studiyasi.",
  alternates: {
    canonical: `${BASE_URL}/`,
    languages: {
      uz:          `${BASE_URL}/`,
      en:          `${BASE_URL}/en`,
      ru:          `${BASE_URL}/ru`,
      "x-default": `${BASE_URL}/`,
    },
  },
};

export default function Home() {
  return <OryxLanding lang="uz" />;
}
