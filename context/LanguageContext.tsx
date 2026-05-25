"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import t, { type Lang, type Translations } from "@/lib/translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "uz",
  setLang: () => {},
  tr: t.uz,
});

interface LanguageProviderProps {
  lang: Lang;
  children: ReactNode;
}

export function LanguageProvider({ lang, children }: LanguageProviderProps) {
  const router = useRouter();

  const setLang = (l: Lang) => {
    // Persist preference as cookie so middleware can redirect on next "/" visit
    const oneYear = 60 * 60 * 24 * 365;
    document.cookie = `oryx-lang=${l}; path=/; max-age=${oneYear}; SameSite=Lax`;

    // Navigate to the canonical URL for the chosen language
    if (l === "uz") {
      router.push("/");
    } else {
      router.push(`/${l}`);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
