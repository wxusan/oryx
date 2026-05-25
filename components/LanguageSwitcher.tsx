"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const LANG_PATHS = { en: "/", ru: "/ru", uz: "/uz" } as const;

export function LanguageSwitcher() {
  const { lang } = useLanguage();
  const router   = useRouter();

  return (
    <div className="flex items-center gap-1" style={{ fontFamily: "var(--font-jetbrains),monospace" }}>
      {(["en", "ru", "uz"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && (
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.18)", margin: "0 2px" }}>
              /
            </span>
          )}
          <button
            onClick={() => router.push(LANG_PATHS[l])}
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              color: lang === l ? "#f6f6f7" : "#4f4f55",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px 0",
              transition: "color 0.2s",
              textTransform: "uppercase",
            }}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
