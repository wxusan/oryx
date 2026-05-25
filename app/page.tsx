import { headers } from "next/headers";
import { OryxLanding } from "@/components/OryxLanding";

// Bot user-agent patterns — skip intro loader for crawlers so content is
// visible immediately in the HTML that gets indexed.
const BOT_RE =
  /bot|crawl|spider|slurp|googlebot|bingbot|yandex|baidu|gpt|chatgpt|claude|perplexity|ccbot|facebookexternalhit|linkedinbot|twitterbot|applebot|semrush|ahrefsbot|mj12bot/i;

export default function Home() {
  const ua     = headers().get("user-agent") ?? "";
  const isBot  = BOT_RE.test(ua);
  return <OryxLanding isBot={isBot} />;
}
