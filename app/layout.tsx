import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ORYX — Digital Product Studio | Tashkent, Uzbekistan",
  description:
    "Founder-led digital product studio in Tashkent. We build websites, mobile apps, CRM/ERP systems, and AI automations for businesses in Uzbekistan and the CIS region.",
  keywords: [
    "web development Tashkent",
    "digital agency Uzbekistan",
    "website builder Tashkent",
    "mobile app development Uzbekistan",
    "CRM development Tashkent",
    "AI automation Uzbekistan",
    "ORYX studio",
    "вебсайт Ташкент",
    "разработка сайтов Ташкент",
    "веб студия Узбекистан",
    "вебсайт ясаш Тошкент",
  ],
  openGraph: {
    title: "ORYX — Digital Product Studio",
    description:
      "Websites, mobile apps, CRM/ERP systems, and AI automations — built fast and built well.",
    url: "https://oryx-flame.vercel.app",
    siteName: "ORYX",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://oryx-flame.vercel.app",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
};

// JSON-LD structured data — LocalBusiness + WebSite schema
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://oryx-flame.vercel.app/#organization",
      name: "ORYX",
      url: "https://oryx-flame.vercel.app",
      logo: {
        "@type": "ImageObject",
        url: "https://oryx-flame.vercel.app/oryx-logo.png",
      },
      description:
        "Founder-led digital product studio based in Tashkent, Uzbekistan. Building websites, mobile apps, CRM/ERP systems, and AI automations.",
      areaServed: [
        { "@type": "Country", name: "Uzbekistan" },
        { "@type": "Country", name: "Kazakhstan" },
        { "@type": "Country", name: "Russia" },
      ],
      knowsAbout: [
        "Web Development",
        "Mobile App Development",
        "CRM Systems",
        "ERP Systems",
        "AI Automation",
        "UI/UX Design",
        "Next.js",
        "React Native",
      ],
      sameAs: [],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://oryx-flame.vercel.app/#localbusiness",
      name: "ORYX Digital Product Studio",
      url: "https://oryx-flame.vercel.app",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tashkent",
        addressCountry: "UZ",
      },
      description:
        "Founder-led digital product studio in Tashkent. We build high-quality websites, mobile apps, CRM/ERP systems, and AI automations for businesses in Uzbekistan and the CIS region.",
      priceRange: "$$",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Product Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Website & Platform Development",
              description:
                "High-performance marketing websites, landing pages, e-commerce stores, and web platforms built with Next.js and React.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "CRM & ERP System Development",
              description:
                "Custom CRM and ERP systems for client management, inventory, operations, and internal workflows.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobile App Development",
              description:
                "Cross-platform iOS and Android apps built with React Native for consumer and B2B use cases.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Automation & Custom Systems",
              description:
                "AI agents, chatbots, workflow automations, data pipelines, and custom software systems.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://oryx-flame.vercel.app/#website",
      url: "https://oryx-flame.vercel.app",
      name: "ORYX",
      publisher: { "@id": "https://oryx-flame.vercel.app/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD structured data for search engines and AI models */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/*
          Preload AVIF @2x for retina; the browser picks the right one based on media.
          The picture element falls back to WebP for browsers that don't support AVIF.
        */}
        <link
          rel="preload"
          as="image"
          href="/hero-desktop@2x.avif"
          type="image/avif"
          media="(min-width: 1025px)"
        />
        <link
          rel="preload"
          as="image"
          href="/hero-tablet@2x.avif"
          type="image/avif"
          media="(min-width: 641px) and (max-width: 1024px)"
        />
        <link
          rel="preload"
          as="image"
          href="/hero-mobile@2x.avif"
          type="image/avif"
          media="(max-width: 640px)"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
