"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import t, { type Lang, type Translations } from "@/lib/translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  tr: t.en,
});

function detectLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("oryx-lang") as Lang | null;
  if (saved === "en" || saved === "ru") return saved;
  const nav = navigator.language || "";
  return nav.startsWith("ru") || nav.startsWith("uz") ? "ru" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(detectLang());
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("oryx-lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
