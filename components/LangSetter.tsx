"use client";

import { useEffect } from "react";

/**
 * Sets the <html lang="…"> attribute client-side for nested routes
 * (/en, /ru) whose layout cannot override the root layout's html element.
 */
export function LangSetter({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
