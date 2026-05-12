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
  title: "ORYX",
  description:
    "Founder-led digital product studio for websites, MVPs, automations, and AI systems.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
