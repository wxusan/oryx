import type { ReactNode } from "react";
import { LangSetter } from "@/components/LangSetter";

export default function EnLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Override the root layout's html[lang="uz"] to "en" on the client */}
      <LangSetter lang="en" />
      {children}
    </>
  );
}
