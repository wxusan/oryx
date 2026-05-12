"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * HeroBackground
 * - Layer 1: base black (#030303 via parent)
 * - Layer 2: responsive <picture> with desktop/tablet/mobile WebP
 * - Layer 3: left-to-right readability gradient
 * - Layer 4: radial vignette (focus on the object on the right)
 * - Layer 5: SVG grain to unify image + page
 *
 * Accepts mouse-parallax offsets from the parent (Hero).
 */
export function HeroBackground({
  parallaxX = 0,
  parallaxY = 0,
}: {
  parallaxX?: number;
  parallaxY?: number;
}) {
  const reduceMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  // Make sure the image fades in even if it was cached and the load event already fired
  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Image layer */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{
          opacity: loaded ? 1 : 0,
          scale: 1,
          x: reduceMotion ? 0 : parallaxX,
          y: reduceMotion ? 0 : parallaxY,
        }}
        transition={{
          opacity: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 6, ease: [0.22, 1, 0.36, 1] },
          x: { type: "spring", stiffness: 40, damping: 18, mass: 1.2 },
          y: { type: "spring", stiffness: 40, damping: 18, mass: 1.2 },
        }}
      >
        {/*
          Order of <source> matters — browsers pick the first matching type.
          AVIF first (smallest, best quality per byte), WebP fallback.
          Each source uses density-aware srcSet so retina screens get the 2x asset.
        */}
        <picture>
          {/* MOBILE — AVIF then WebP */}
          <source
            media="(max-width: 640px)"
            type="image/avif"
            srcSet="/hero-mobile@1x.avif 1x, /hero-mobile@2x.avif 2x"
          />
          <source
            media="(max-width: 640px)"
            type="image/webp"
            srcSet="/hero-mobile@1x.webp 1x, /hero-mobile@2x.webp 2x"
          />
          {/* TABLET */}
          <source
            media="(max-width: 1024px)"
            type="image/avif"
            srcSet="/hero-tablet@1x.avif 1x, /hero-tablet@2x.avif 2x"
          />
          <source
            media="(max-width: 1024px)"
            type="image/webp"
            srcSet="/hero-tablet@1x.webp 1x, /hero-tablet@2x.webp 2x"
          />
          {/* DESKTOP */}
          <source
            type="image/avif"
            srcSet="/hero-desktop@1x.avif 1x, /hero-desktop@2x.avif 2x"
          />
          <source
            type="image/webp"
            srcSet="/hero-desktop@1x.webp 1x, /hero-desktop@2x.webp 2x"
          />
          <img
            src="/hero-desktop@2x.webp"
            srcSet="/hero-desktop@1x.webp 1x, /hero-desktop@2x.webp 2x"
            alt=""
            onLoad={() => setLoaded(true)}
            className="h-full w-full object-cover object-[center_right] sm:object-[75%_center]"
            style={{ imageRendering: "auto" }}
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </motion.div>

      {/* Readability gradient: left = solid, right = mostly transparent. Stops short of full transparency to keep cohesion. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #030303 0%, rgba(3,3,3,0.96) 28%, rgba(3,3,3,0.78) 46%, rgba(3,3,3,0.32) 72%, rgba(3,3,3,0.18) 100%)",
        }}
      />

      {/* Mobile gets a stronger top-bottom gradient since text overlaps image */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,3,3,0.85) 0%, rgba(3,3,3,0.55) 35%, rgba(3,3,3,0.45) 60%, rgba(3,3,3,0.92) 100%)",
        }}
      />

      {/* Cinematic vignette — gentler, just enough to pull focus toward the object */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 78% 52%, transparent 0%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.62) 100%)",
        }}
      />

      {/* Grain — softer + finer so it unifies without amplifying noise */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.028] mix-blend-soft-light"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.6"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      {/* Bottom fade-out into the page so the hero blends into whatever follows */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,3,3,0) 0%, rgba(3,3,3,0.85) 70%, #030303 100%)",
        }}
      />
    </div>
  );
}
