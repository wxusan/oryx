"use client";

import { useState } from "react";
import { IntroLoader } from "@/components/IntroLoader";
import { Hero } from "@/components/Hero";
import { BuildStack } from "@/components/BuildStack";

export function OryxLanding() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <main className="min-h-screen bg-oryx-black text-oryx-white">
      <IntroLoader onComplete={() => setLoaderDone(true)} />
      <Hero active={loaderDone} />
      <BuildStack />
    </main>
  );
}
