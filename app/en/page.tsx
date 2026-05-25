import type { Metadata } from "next";
import { OryxLanding } from "@/components/OryxLanding";

const BASE_URL = "https://oryx.uz";

export const metadata: Metadata = {
  title: "ORYX — Digital Product Studio",
  description:
    "Founder-led digital product studio for websites, MVPs, automations, and AI systems.",
  alternates: {
    canonical: `${BASE_URL}/en`,
    languages: {
      uz: `${BASE_URL}/`,
      en: `${BASE_URL}/en`,
      ru: `${BASE_URL}/ru`,
      "x-default": `${BASE_URL}/`,
    },
  },
};

export default function EnglishPage() {
  return <OryxLanding lang="en" />;
}
