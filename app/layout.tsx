import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap", weight: ["400","500","600","700"] });

const SITE = "https://oryx.uz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "ORYX — Digital Product Studio | Tashkent, Uzbekistan",
    template: "%s | ORYX",
  },
  description:
    "Founder-led digital product studio in Tashkent. We build websites, mobile apps, CRM/ERP systems, and AI automations for businesses in Uzbekistan and the CIS region. Fast delivery, premium design, no middlemen.",
  keywords: [
    "web development Tashkent", "digital agency Uzbekistan", "website builder Tashkent",
    "mobile app development Uzbekistan", "CRM development Tashkent", "AI automation Uzbekistan",
    "ORYX studio", "веб студия Ташкент", "разработка сайтов Ташкент", "вебсайт ясаш Тошкент",
    "Next.js agency Tashkent", "React development Uzbekistan",
  ],
  openGraph: {
    title: "ORYX — Digital Product Studio",
    description: "Websites, mobile apps, CRM/ERP systems, and AI automations — built fast and built well in Tashkent, Uzbekistan.",
    url: SITE,
    siteName: "ORYX",
    locale: "en_US",
    type: "website",
    images: [{ url: `${SITE}/og?title=Digital+Product+Studio&sub=Tashkent+%C2%B7+Uzbekistan`, width: 1200, height: 630, alt: "ORYX — Digital Product Studio, Tashkent" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORYX — Digital Product Studio",
    description: "Websites, mobile apps, CRM/ERP, and AI automations. Built in Tashkent.",
    images: [`${SITE}/og?title=Digital+Product+Studio&sub=Tashkent+%C2%B7+Uzbekistan`],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: {
    canonical: SITE,
    languages: {
      uz:          `${SITE}/`,
      en:          `${SITE}/en`,
      ru:          `${SITE}/ru`,
      "x-default": `${SITE}/`,
    },
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: [{ url: "/favicon.png" }],
    apple: [{ url: "/favicon.png" }],
  },
};

// ── JSON-LD ────────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "ORYX",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/oryx-logo.png` },
      description: "Founder-led digital product studio in Tashkent, Uzbekistan. Building websites, mobile apps, CRM/ERP systems, and AI automations.",
      telephone: "+998770411222",
      email: "hello@oryx-studio.uz",
      areaServed: [
        { "@type": "Country", name: "Uzbekistan" },
        { "@type": "Country", name: "Kazakhstan" },
        { "@type": "Country", name: "Russia" },
      ],
      knowsAbout: ["Web Development","Mobile App Development","CRM Systems","ERP Systems","AI Automation","UI/UX Design","Next.js","React Native"],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE}/#localbusiness`,
      name: "ORYX Digital Product Studio",
      url: SITE,
      telephone: "+998770411222",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tashkent",
        addressRegion: "Tashkent",
        addressCountry: "UZ",
      },
      geo: { "@type": "GeoCoordinates", latitude: 41.2995, longitude: 69.2401 },
      description: "Founder-led digital product studio in Tashkent. Websites, mobile apps, CRM/ERP systems, and AI automations for businesses in Uzbekistan and the CIS region.",
      priceRange: "$$",
      openingHours: "Mo-Fr 09:00-18:00",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Product Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website & Platform Development", description: "High-performance marketing websites, landing pages, e-commerce stores, and web platforms built with Next.js and React." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "CRM & ERP System Development", description: "Custom CRM and ERP systems for client management, inventory, operations, and internal workflows." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development", description: "Cross-platform iOS and Android apps built with React Native for consumer and B2B use cases." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation & Custom Systems", description: "AI agents, chatbots, workflow automations, data pipelines, and custom software systems." } },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.74",
        reviewCount: "113",
        bestRating: "5",
      },
      sameAs: ["https://t.me/wxusan"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "ORYX",
      publisher: { "@id": `${SITE}/#organization` },
      potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${SITE}/?s={search_term_string}` }, "query-input": "required name=search_term_string" },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // Default language is Uzbek. Nested /en and /ru layouts override via LangSetter.
    <html lang="uz">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* hreflang — multilingual signals (/ = UZ default, /en = EN, /ru = RU) */}
        <link rel="alternate" hrefLang="uz"        href={`${SITE}/`} />
        <link rel="alternate" hrefLang="en"        href={`${SITE}/en`} />
        <link rel="alternate" hrefLang="ru"        href={`${SITE}/ru`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE}/`} />

        {/* Hero image preloads */}
        <link rel="preload" as="image" href="/hero-desktop@2x.avif" type="image/avif" media="(min-width: 1025px)" />
        <link rel="preload" as="image" href="/hero-tablet@2x.avif"  type="image/avif" media="(min-width: 641px) and (max-width: 1024px)" />
        <link rel="preload" as="image" href="/hero-mobile@2x.avif"  type="image/avif" media="(max-width: 640px)" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
        {children}
        <GoogleAnalytics gaId="G-E5NDB2Q2FH" />
        {/* Microsoft Clarity — loads after page is interactive, non-blocking */}
        <Script id="microsoft-clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wwqri096e1");
        `}</Script>
      </body>
    </html>
  );
}
