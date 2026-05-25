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
  /**
   * When true (crawlers / bots detected server-side) the intro loader is
   * skipped entirely so the full page content is visible in the first render.
   */
  isBot?: boolean;
  /**
   * Pin the initial language — used by /ru and /uz routes so content is
   * server-rendered in the correct language without waiting for localStorage.
   */
  defaultLang?: Lang;
}

export function OryxLanding({ isBot = false, defaultLang }: OryxLandingProps) {
  // Bots get loaderDone=true immediately → no loader, content visible at once.
  const [loaderDone, setLoaderDone] = useState(isBot);

  return (
    <LanguageProvider initialLang={defaultLang}>
      <main className="min-h-screen bg-oryx-black text-oryx-white">
        {!isBot && <IntroLoader onComplete={() => setLoaderDone(true)} />}
        <Hero active={loaderDone} />
        <BuildStack />
        <Work />
        <About />
        <Contact />
      </main>
    </LanguageProvider>
  );
}
