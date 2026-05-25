"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/lib/translations";

const LANGS: { code: Lang; label: string }[] = [
  { code: "uz", label: "UZ" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="flex items-center gap-1"
      style={{ fontFamily: "var(--font-jetbrains),monospace" }}
    >
      {LANGS.map(({ code, label }, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 && (
            <span
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.18)",
                margin: "0 2px",
              }}
            >
              /
            </span>
          )}
          <button
            onClick={() => setLang(code)}
            aria-label={`Switch to ${label}`}
            aria-current={lang === code ? "true" : undefined}
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              color: lang === code ? "#f6f6f7" : "#4f4f55",
              background: "none",
              border: "none",
              cursor: lang === code ? "default" : "pointer",
              padding: "2px 0",
              transition: "color 0.2s",
              textTransform: "uppercase",
            }}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  );
}
