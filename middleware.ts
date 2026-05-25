import { NextRequest, NextResponse } from "next/server";

const COOKIE       = "oryx-lang";
const COOKIE_TTL   = 60 * 60 * 24 * 365; // 1 year
const BOT_RE       = /bot|crawl|spider|slurp|googlebot|bingbot|yandex|baidu|gpt|chatgpt|claude|perplexity|ccbot|facebookexternalhit|linkedinbot|twitterbot|applebot/i;

/** Parse Accept-Language and return "ru" | "uz" | null */
function detectLang(header: string): "ru" | "uz" | null {
  const langs = header
    .split(",")
    .map((part) => {
      const [code, q] = part.trim().split(";q=");
      return { code: code.split("-")[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of langs) {
    if (code === "ru") return "ru";
    if (code === "uz") return "uz";
  }
  return null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Bots: never redirect — let them crawl every URL unmodified ──────────────
  const ua = req.headers.get("user-agent") ?? "";
  if (BOT_RE.test(ua)) return NextResponse.next();

  // ── /ru or /uz: user landed here intentionally → persist their choice ───────
  if (pathname === "/ru" || pathname === "/uz") {
    const lang = pathname.slice(1) as "ru" | "uz";
    const existing = req.cookies.get(COOKIE)?.value;
    if (existing === lang) return NextResponse.next(); // already saved — no extra header
    const res = NextResponse.next();
    res.cookies.set(COOKIE, lang, { maxAge: COOKIE_TTL, path: "/", sameSite: "lax" });
    return res;
  }

  // ── / only: auto-redirect if we know the user's language ────────────────────
  if (pathname !== "/") return NextResponse.next();

  // 1. Cookie (explicit past choice) takes priority
  const saved = req.cookies.get(COOKIE)?.value;
  if (saved === "ru" || saved === "uz") {
    const url = req.nextUrl.clone();
    url.pathname = `/${saved}`;
    return NextResponse.redirect(url, 302);
  }

  // 2. Accept-Language header (first visit)
  const acceptLang = req.headers.get("accept-language") ?? "";
  const detected = acceptLang ? detectLang(acceptLang) : null;
  if (detected) {
    const url = req.nextUrl.clone();
    url.pathname = `/${detected}`;
    const res = NextResponse.redirect(url, 302);
    res.cookies.set(COOKIE, detected, { maxAge: COOKIE_TTL, path: "/", sameSite: "lax" });
    return res;
  }

  // 3. Default: stay on / (English)
  return NextResponse.next();
}

export const config = {
  // Only run on the three language routes — nothing else
  matcher: ["/", "/ru", "/uz"],
};
