import { NextRequest, NextResponse } from "next/server";

// Common bot/crawler user-agent patterns — never redirect bots
const BOT_UA =
  /bot|crawl|slurp|spider|mediapartners|google|baidu|bing|msn|duckduckgo|teoma|yandex|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|developers\.google\.com/i;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only intercept the root path
  if (pathname !== "/") return NextResponse.next();

  // Never redirect bots — they must crawl all three URLs freely
  const ua = req.headers.get("user-agent") ?? "";
  if (BOT_UA.test(ua)) return NextResponse.next();

  // Cookie-based redirect: honour the user's saved language preference
  const cookie = req.cookies.get("oryx-lang")?.value;
  if (cookie === "en") {
    return NextResponse.redirect(new URL("/en", req.url));
  }
  if (cookie === "ru") {
    return NextResponse.redirect(new URL("/ru", req.url));
  }

  // No cookie → stay on "/" and serve Uzbek (the default)
  return NextResponse.next();
}

export const config = {
  // Only run on the root path; skip static assets and API routes
  matcher: ["/"],
};
