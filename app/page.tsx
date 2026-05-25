import { headers } from "next/headers";
import { OryxLanding } from "@/components/OryxLanding";

const BOT_RE = /bot|crawl|spider|slurp|googlebot|bingbot|yandex|baidu|gpt|chatgpt|claude|perplexity|ccbot|facebookexternalhit|linkedinbot|twitterbot|applebot|semrush|ahrefsbot|mj12bot/i;

export default async function Home() {
  const headersList = await headers();
  const ua     = headersList.get("user-agent") ?? "";
  const isBot  = BOT_RE.test(ua);
  return <OryxLanding isBot={isBot} />;
}
