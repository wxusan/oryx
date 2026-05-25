import { NextRequest, NextResponse } from "next/server";

<<<<<<< HEAD
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
=======
// Common bot/crawler user-agent patterns — Googlebot must NOT be redirected
const BOT_UA =
  /bot|crawl|slurp|spider|mediapartners|google|baidu|bing|msn|duckduckgo|teoma|yandex|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|developers\.google\.com/i;
>>>>>>> ed705e0 (feat: URL-based i18n routing — / (uz), /en, /ru)

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

<<<<<<< HEAD
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
=======
  // Only intercept the root path
  if (pathname !== "/") return NextResponse.next();

  // Never redirect bots — they must crawl all three URLs freely
  const ua = req.headers.get("user-agent") ?? "";
  if (BOT_UA.test(ua)) return NextResponse.next();

  // Cookie-based redirect only
  const cookie = req.cookies.get("oryx-lang")?.value;
  if (cookie === "en") {
    return NextResponse.redirect(new URL("/en", req.url));
  }
  if (cookie === "ru") {
    return NextResponse.redirect(new URL("/ru", req.url));
  }

  // No cookie → stay on "/" and serve Uzbek
>>>>>>> ed705e0 (feat: URL-based i18n routing — / (uz), /en, /ru)
  return NextResponse.next();
}

export const config = {
<<<<<<< HEAD
  // Only run on the three language routes — nothing else
  matcher: ["/", "/ru", "/uz"],
=======
  // Only run on the root path; skip all static assets and API routes
  matcher: ["/"],
>>>>>>> ed705e0 (feat: URL-based i18n routing — / (uz), /en, /ru)
};
