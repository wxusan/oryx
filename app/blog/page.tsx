import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://oryx.uz";

export const metadata: Metadata = {
  title: "Blog — Web Development & Digital Products | ORYX",
  description:
    "Insights on web development, mobile apps, CRM systems, AI automation, and building digital products in Uzbekistan. By ORYX studio, Tashkent.",
  openGraph: {
    title: "ORYX Blog — Digital Product Insights",
    description: "Web development, AI, CRM, and product-building insights from Tashkent.",
    url: `${SITE}/blog`,
    images: [{ url: `${SITE}/og?title=Blog+%E2%80%94+Digital+Insights&sub=By+ORYX+Studio`, width: 1200, height: 630 }],
  },
  alternates: { canonical: `${SITE}/blog` },
};

// Posts are added here as the blog grows.
// Each post should also have its own app/blog/[slug]/page.tsx with full content and metadata.
const POSTS: {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
}[] = [
  {
    slug: "why-uzbek-businesses-need-custom-crm",
    date: "2026-05-25",
    category: "CRM / ERP",
    title: "Why Uzbek Businesses Need a Custom CRM (Not Just Excel)",
    excerpt:
      "Most small and mid-size businesses in Uzbekistan still manage clients in spreadsheets. Here's why that breaks at scale and what a proper CRM actually does for you.",
    readTime: "5 min read",
  },
  {
    slug: "next-js-vs-wordpress-for-uzbekistan",
    date: "2026-05-25",
    category: "Web Development",
    title: "Next.js vs WordPress for Businesses in Uzbekistan",
    excerpt:
      "WordPress is everywhere. But for performance, SEO, and scalability in 2025, Next.js wins for serious business sites. Here's a real comparison.",
    readTime: "6 min read",
  },
  {
    slug: "ai-automation-for-small-business-tashkent",
    date: "2026-05-25",
    category: "AI Automation",
    title: "What AI Automation Actually Looks Like for a Small Business in Tashkent",
    excerpt:
      "Not ChatGPT prompts. Real automations: lead qualification bots, Telegram integrations, inventory alerts, and report generation — built and running.",
    readTime: "7 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-[#f6f6f7]">
      {/* Nav */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.07] bg-[#020202]/90 px-[7.6vw] py-4 backdrop-blur-sm">
        <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4f4f55] transition-colors hover:text-[#f6f6f7]">← HOME</Link>
        <Link href="/"><img src="/oryx-logo-white.svg" alt="ORYX" className="h-5 w-auto opacity-70" /></Link>
        <a href="/#contact" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4f4f55] transition-colors hover:text-[#f6f6f7]">CONTACT →</a>
      </div>

      {/* Hero */}
      <section className="border-b border-white/[0.07] px-[7.6vw] pb-16 pt-20">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.26em] text-[#4f4f55]">&gt; ORYX / BLOG</p>
        <h1 className="mb-4 font-display text-4xl font-bold leading-tight tracking-tight text-[#f6f6f7] md:text-5xl">
          Digital product insights.
        </h1>
        <p className="font-mono text-[12px] leading-relaxed tracking-[0.06em] text-[#8b8b8f]">
          Web development, AI, CRM systems, and building products in Uzbekistan.
        </p>
      </section>

      {/* Posts */}
      <section className="px-[7.6vw] py-16">
        <div className="flex flex-col divide-y divide-white/[0.07]">
          {POSTS.map((post) => (
            <article key={post.slug} className="group py-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#4f4f55]">{post.category}</span>
                    <span className="font-mono text-[9px] text-[#3a3a40]">·</span>
                    <time className="font-mono text-[9px] tracking-[0.14em] text-[#3a3a40]" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                    <span className="font-mono text-[9px] text-[#3a3a40]">·</span>
                    <span className="font-mono text-[9px] text-[#3a3a40]">{post.readTime}</span>
                  </div>
                  <h2 className="mb-3 font-display text-xl font-semibold leading-snug text-[#f6f6f7] transition-colors group-hover:text-white md:text-2xl">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-[14px] leading-[1.75] text-[#8b8b8f]">{post.excerpt}</p>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-[#4f4f55] transition-colors hover:text-[#f6f6f7] md:mt-0 md:ml-8"
                >
                  READ →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="border-t border-white/[0.07] px-[7.6vw] py-12 text-center">
        <p className="mb-6 font-display text-xl font-semibold text-[#f6f6f7]">Ready to build your product?</p>
        <a href="/#contact" className="group inline-flex items-center gap-2 border border-[#f6f6f7] bg-[#f6f6f7] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#020202] transition-all duration-300 hover:bg-transparent hover:text-[#f6f6f7]">
          CONTACT ORYX <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </div>
  );
}
