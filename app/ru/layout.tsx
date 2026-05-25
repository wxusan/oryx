import type { ReactNode } from "react";
import { LangSetter } from "@/components/LangSetter";

export default function RuLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Override the root layout's html[lang="uz"] to "ru" on the client */}
      <LangSetter lang="ru" />
      {children}
    </>
  );
}
