"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * HeroParticleOverlay
 *
 * Subtle coded layer on top of the hero image. Provides life: pulse + mouse parallax.
 * The whole field is deterministic (seeded) so SSR hydration matches client.
 *
 * Design rules (from spec):
 *  - 50–70 particles desktop, 25–35 mobile
 *  - 70% tiny field, 25% mid, 5% accent
 *  - bias 65% to the right two-thirds; near-zero in the left third
 *  - opacity range 0.2–0.4, accents 0.6–0.8
 *  - parallax max 8–12px shift
 *  - canvas paints on requestAnimationFrame, mounts after first paint
 */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Particle = {
  fx: number; // 0..1 position in container
  fy: number;
  r: number;  // base radius in CSS px
  baseOp: number;
  pulseAmp: number;
  speed: number;
  phase: number;
  tier: 0 | 1 | 2; // 0 = tiny, 1 = mid, 2 = accent
  parallaxScale: number; // particles deeper "in scene" move less
};

function generateParticles(count: number, seed = 17): Particle[] {
  const rng = mulberry32(seed);
  const out: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const r = rng();
    let tier: 0 | 1 | 2;
    if (r < 0.70) tier = 0;
    else if (r < 0.95) tier = 1;
    else tier = 2;

    // x distribution: 65% sit in right 2/3 of the screen
    const xRoll = rng();
    const fx = xRoll < 0.65 ? 0.34 + rng() * 0.66 : rng() * 0.34;

    const fy = rng();

    const baseRadius =
      tier === 0 ? 0.4 + rng() * 0.6 :
      tier === 1 ? 1.0 + rng() * 1.0 :
                   1.6 + rng() * 1.4;

    const baseOp =
      tier === 0 ? 0.18 + rng() * 0.22 :
      tier === 1 ? 0.32 + rng() * 0.18 :
                   0.55 + rng() * 0.25;

    out.push({
      fx,
      fy,
      r: baseRadius,
      baseOp,
      pulseAmp: 0.1 + rng() * 0.15,
      speed: 0.25 + rng() * 0.55,
      phase: rng() * Math.PI * 2,
      tier,
      parallaxScale: 0.3 + rng() * 0.7,
    });
  }
  return out;
}

export function HeroParticleOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  // We hold mouse position outside of React state to avoid re-renders every frame
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const [mounted, setMounted] = useState(false);

  // Defer mount until after first paint so the canvas doesn't block LCP
  useEffect(() => {
    const cb = () => setMounted(true);
    const ric = (
      window as unknown as {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout: number },
        ) => number;
        cancelIdleCallback?: (id: number) => void;
      }
    );
    if (typeof ric.requestIdleCallback === "function") {
      const id = ric.requestIdleCallback(cb, { timeout: 800 });
      return () => ric.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(cb, 250);
    return () => window.clearTimeout(t);
  }, []);

  // Adjust particle count for narrow screens
  const [count, setCount] = useState(60);
  useEffect(() => {
    const update = () => setCount(window.innerWidth < 768 ? 30 : 60);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const particles = useMemo(() => generateParticles(count, 17), [count]);

  // Mouse tracking for parallax — applied to the canvas wrapper transform
  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseRef.current.tx = (e.clientX / w - 0.5) * 2; // -1..1
      mouseRef.current.ty = (e.clientY / h - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion]);

  // Canvas paint loop
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0;
    let start: number | null = null;

    const frame = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = (ts - start) / 1000;

      // ease mouse toward target
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.06;

      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = reduceMotion
          ? 1
          : 1 + p.pulseAmp * Math.sin(elapsed * p.speed + p.phase);
        const op = Math.max(0, Math.min(1, p.baseOp * pulse));

        // Per-particle parallax (deeper particles move less)
        const offsetX = reduceMotion
          ? 0
          : -mouseRef.current.x * 10 * p.parallaxScale;
        const offsetY = reduceMotion
          ? 0
          : -mouseRef.current.y * 8 * p.parallaxScale;

        const x = p.fx * W + offsetX;
        const y = p.fy * H + offsetY;

        // Accent particles get a soft halo
        if (p.tier === 2) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 5);
          g.addColorStop(0, `rgba(255,255,255,${op * 0.55})`);
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, p.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(255,255,255,${op})`;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [mounted, particles, reduceMotion]);

  return (
    <motion.canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: mounted ? 1 : 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
