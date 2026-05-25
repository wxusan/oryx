"use client";

import { useState } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { IntroLoader } from "@/components/IntroLoader";
import { Hero } from "@/components/Hero";
import { BuildStack } from "@/components/BuildStack";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import type { Lang } from "@/lib/translations";

interface OryxLandingProps {
  lang: Lang;
}

export function OryxLanding({ lang }: OryxLandingProps) {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <LanguageProvider lang={lang}>
      <main className="min-h-screen bg-oryx-black text-oryx-white">
        <IntroLoader onComplete={() => setLoaderDone(true)} />
        <Hero active={loaderDone} />
        <BuildStack />
        <Work />
        <About />
        <Contact />
      </main>
    </LanguageProvider>
  );
}
