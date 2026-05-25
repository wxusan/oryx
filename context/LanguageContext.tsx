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
  if (saved === "en" || saved === "ru" || saved === "uz") return saved;
  const nav = navigator.language || "";
  if (nav.startsWith("uz")) return "uz";
  if (nav.startsWith("ru")) return "ru";
  return "en";
}

interface LanguageProviderProps {
  children: ReactNode;
  /**
   * Pin the language for this tree — used by /ru and /uz routes so the
   * server-rendered HTML is already in the correct language instead of
   * defaulting to English and switching on the client.
   */
  initialLang?: Lang;
}

export function LanguageProvider({ children, initialLang }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Lang>(initialLang ?? "en");

  useEffect(() => {
    // If a language is pinned (e.g. /ru route) don't override it from localStorage.
    if (initialLang) return;
    setLangState(detectLang());
  }, [initialLang]);

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
