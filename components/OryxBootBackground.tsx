"use client";

import { CSSProperties, useMemo } from "react";
import { motion } from "framer-motion";

type OryxBootBackgroundProps = {
  ready?: boolean;
  className?: string;
};

type Star = {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  delay: number;
  duration: number;
  bright: boolean;
  mobileHidden: boolean;
};

type Ray = {
  id: number;
  x2: number;
  y2: number;
  opacity: number;
  width: number;
  bright: boolean;
  shimmer: boolean;
  mobileHidden: boolean;
};

type FieldLine = {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  width: number;
};

type MatrixPath = {
  id: number;
  d: string;
  opacity: number;
  width: number;
  dash?: string;
};

type ConstellationLine = {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
};

const VIEWBOX_WIDTH = 1920;
const VIEWBOX_HEIGHT = 1080;
const CENTER_X = VIEWBOX_WIDTH * 0.86;
const CENTER_Y = VIEWBOX_HEIGHT * 0.58;

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function lerp(min: number, max: number, amount: number) {
  return min + (max - min) * amount;
}

function r4(n: number) {
  return Math.round(n * 1e4) / 1e4;
}

function starStyle(star: Star) {
  return {
    "--star-min": String(r4(Math.max(0.05, star.opacity * 0.36))),
    "--star-mid": String(r4(star.opacity)),
    animationDelay: `${r4(star.delay)}s`,
    animationDuration: `${r4(star.duration)}s`,
  } as CSSProperties;
}

function rayStyle(ray: Ray) {
  return {
    "--ray-min": String(r4(Math.max(0.01, ray.opacity * 0.76))),
    "--ray-mid": String(r4(Math.min(0.13, ray.opacity * 1.18))),
  } as CSSProperties;
}

import React from "react";

function OryxBootBackgroundInner({
  ready = false,
  className = "",
}: OryxBootBackgroundProps) {
  const { stars, rays, fieldLines, matrixPaths, constellationLines } = useMemo(() => {
    const random = seededRandom(2049);

    const manualStars: Star[] = [
      [1198, 154, 1.3, 0.86, true],
      [1330, 154, 1.15, 0.74, true],
      [1524, 382, 1.28, 0.58, true],
      [1295, 733, 1.1, 0.62, true],
      [1140, 438, 0.72, 0.28, false],
      [1006, 372, 0.62, 0.22, false],
      [950, 130, 0.48, 0.16, false],
      [835, 884, 0.58, 0.21, false],
      [1465, 246, 0.56, 0.2, false],
      [1564, 196, 0.62, 0.25, false],
      [1718, 270, 0.52, 0.18, false],
      [1768, 518, 0.72, 0.26, false],
      [1826, 640, 0.58, 0.24, false],
      [1688, 784, 0.54, 0.2, false],
      [1490, 914, 0.5, 0.18, false],
      [1168, 926, 0.52, 0.17, false],
      [1078, 770, 0.48, 0.15, false],
      [1382, 484, 0.48, 0.18, false],
    ].map(([x, y, radius, opacity, bright], id) => ({
      id,
      x: x as number,
      y: y as number,
      radius: radius as number,
      opacity: opacity as number,
      delay: lerp(0, 5.5, random()),
      duration: bright ? lerp(3, 5.4, random()) : lerp(7, 12, random()),
      bright: bright as boolean,
      mobileHidden: !bright && id % 3 !== 0,
    }));

    const fillerStars: Star[] = Array.from({ length: 46 }, (_, index) => {
      const id = manualStars.length + index;
      const sparseMiddle = index < 8;
      const x = sparseMiddle
        ? lerp(VIEWBOX_WIDTH * 0.42, VIEWBOX_WIDTH * 0.64, random())
        : lerp(VIEWBOX_WIDTH * 0.56, VIEWBOX_WIDTH * 0.985, random());
      const y = lerp(VIEWBOX_HEIGHT * 0.07, VIEWBOX_HEIGHT * 0.93, random());
      const bright = index > 39 && index % 2 === 0;

      return {
        id,
        x,
        y,
        radius: bright ? lerp(1.05, 1.42, random()) : lerp(0.34, 0.86, random()),
        opacity: bright ? lerp(0.5, 0.72, random()) : lerp(0.055, 0.26, random()),
        delay: lerp(0, 8.5, random()),
        duration: bright ? lerp(3.5, 5.8, random()) : lerp(7.5, 13.5, random()),
        bright,
        mobileHidden: index % 4 !== 0 && !bright,
      };
    });

    const generatedStars = [...manualStars, ...fillerStars];

    function makeRay(
      id: number,
      angleDeg: number,
      length: number,
      opacity: number,
      width: number,
      shimmer = false,
    ): Ray {
      const angle = (angleDeg * Math.PI) / 180;

      return {
        id,
        x2: r4(CENTER_X + Math.cos(angle) * length),
        y2: r4(CENTER_Y + Math.sin(angle) * length),
        opacity,
        width,
        bright: opacity > 0.082,
        shimmer,
        mobileHidden: id % 16 !== 0,
      };
    }

    const manualRaySpecs = [
      [180, 900, 0.108, 0.42, true],
      [176, 760, 0.074, 0.36, false],
      [184, 780, 0.07, 0.36, false],
      [191, 980, 0.052, 0.34, true],
      [169, 720, 0.058, 0.32, false],
      [199, 820, 0.06, 0.35, false],
      [156, 710, 0.05, 0.32, false],
      [144, 650, 0.044, 0.3, false],
      [132, 520, 0.038, 0.28, false],
      [120, 450, 0.034, 0.27, false],
      [214, 720, 0.048, 0.31, false],
      [226, 620, 0.043, 0.3, false],
      [238, 500, 0.034, 0.27, false],
      [250, 360, 0.032, 0.26, false],
      [96, 230, 0.032, 0.25, false],
      [72, 220, 0.035, 0.26, false],
      [42, 280, 0.042, 0.28, false],
      [14, 340, 0.052, 0.32, false],
      [-10, 310, 0.046, 0.3, false],
      [-34, 240, 0.04, 0.28, false],
      [-62, 180, 0.034, 0.26, false],
      [266, 200, 0.03, 0.25, false],
    ] as const;

    const manualRays = manualRaySpecs.map(([angle, length, opacity, width, shimmer], id) =>
      makeRay(id, angle, length, opacity, width, shimmer),
    );

    const fillerRays: Ray[] = Array.from({ length: 94 }, (_, index) => {
      const id = manualRays.length + index;
      const leftSheetRay = index < 70;
      const angleDeg = leftSheetRay ? lerp(116, 244, random()) : lerp(-78, 82, random());
      const longRay = index % 13 === 0;
      const length = leftSheetRay
        ? lerp(longRay ? 650 : 230, longRay ? 1120 : 760, random())
        : lerp(100, 360, random());
      const brighter = index % 23 === 0;

      return makeRay(
        id,
        angleDeg,
        length,
        brighter ? lerp(0.052, 0.078, random()) : lerp(0.012, 0.044, random()),
        brighter ? lerp(0.32, 0.42, random()) : lerp(0.22, 0.34, random()),
        index % 31 === 0,
      );
    });

    const generatedRays = [...manualRays, ...fillerRays];

    const matrixPaths: MatrixPath[] = [
      { id: 0, d: `M 1036 178 C 1192 184 1398 302 ${CENTER_X - 18} ${CENTER_Y - 114}`, opacity: 0.034, width: 0.42 },
      { id: 1, d: `M 1076 240 C 1240 242 1432 356 ${CENTER_X - 8} ${CENTER_Y - 78}`, opacity: 0.045, width: 0.48 },
      { id: 2, d: `M 1112 304 C 1280 304 1458 412 ${CENTER_X - 2} ${CENTER_Y - 42}`, opacity: 0.062, width: 0.5 },
      { id: 3, d: `M 1058 368 C 1254 366 1468 462 ${CENTER_X + 2} ${CENTER_Y - 12}`, opacity: 0.072, width: 0.52 },
      { id: 4, d: `M 1018 432 C 1238 426 1458 508 ${CENTER_X} ${CENTER_Y + 14}`, opacity: 0.066, width: 0.48 },
      { id: 5, d: `M 980 500 C 1216 488 1444 552 ${CENTER_X - 4} ${CENTER_Y + 38}`, opacity: 0.052, width: 0.44 },
      { id: 6, d: `M 1048 574 C 1250 552 1456 586 ${CENTER_X - 10} ${CENTER_Y + 68}`, opacity: 0.058, width: 0.45 },
      { id: 7, d: `M 1110 648 C 1298 616 1478 630 ${CENTER_X - 18} ${CENTER_Y + 98}`, opacity: 0.046, width: 0.42 },
      { id: 8, d: `M 1164 726 C 1330 678 1496 678 ${CENTER_X - 30} ${CENTER_Y + 134}`, opacity: 0.034, width: 0.4 },
      { id: 9, d: `M 1220 808 C 1374 728 1518 720 ${CENTER_X - 40} ${CENTER_Y + 172}`, opacity: 0.026, width: 0.38 },
      { id: 10, d: `M 1166 92 C 1204 262 1342 454 ${CENTER_X - 68} ${CENTER_Y - 20}`, opacity: 0.034, width: 0.4 },
      { id: 11, d: `M 1266 72 C 1288 272 1402 482 ${CENTER_X - 46} ${CENTER_Y + 2}`, opacity: 0.044, width: 0.44 },
      { id: 12, d: `M 1360 82 C 1376 300 1462 508 ${CENTER_X - 24} ${CENTER_Y + 12}`, opacity: 0.056, width: 0.5 },
      { id: 13, d: `M 1458 82 C 1464 326 1522 526 ${CENTER_X - 8} ${CENTER_Y + 10}`, opacity: 0.062, width: 0.48 },
      { id: 14, d: `M 1558 76 C 1556 350 1590 548 ${CENTER_X + 4} ${CENTER_Y + 4}`, opacity: 0.054, width: 0.44 },
      { id: 15, d: `M 1664 86 C 1648 350 1646 536 ${CENTER_X + 4} ${CENTER_Y - 2}`, opacity: 0.04, width: 0.38 },
      { id: 16, d: `M 1776 112 C 1714 372 1678 542 ${CENTER_X + 10} ${CENTER_Y - 6}`, opacity: 0.034, width: 0.36 },
      { id: 17, d: `M 1880 160 C 1766 392 1708 550 ${CENTER_X + 18} ${CENTER_Y - 8}`, opacity: 0.028, width: 0.34 },
      { id: 18, d: `M 1110 1010 C 1244 800 1414 700 ${CENTER_X - 54} ${CENTER_Y + 42}`, opacity: 0.028, width: 0.36 },
      { id: 19, d: `M 1240 1012 C 1344 788 1468 696 ${CENTER_X - 34} ${CENTER_Y + 28}`, opacity: 0.034, width: 0.38 },
      { id: 20, d: `M 1380 1018 C 1432 790 1514 704 ${CENTER_X - 18} ${CENTER_Y + 18}`, opacity: 0.036, width: 0.38 },
      { id: 21, d: `M 1514 1018 C 1518 790 1562 704 ${CENTER_X - 4} ${CENTER_Y + 8}`, opacity: 0.032, width: 0.36 },
      { id: 22, d: `M 1368 392 C 1484 430 1604 526 1762 632`, opacity: 0.042, width: 0.42, dash: "2 15" },
      { id: 23, d: `M 1320 470 C 1460 480 1602 560 1810 596`, opacity: 0.036, width: 0.38, dash: "1 17" },
      { id: 24, d: `M 1348 560 C 1474 548 1606 592 1818 696`, opacity: 0.038, width: 0.4, dash: "2 18" },
      { id: 25, d: `M 1394 652 C 1502 616 1612 642 1762 774`, opacity: 0.03, width: 0.36, dash: "1 18" },
      { id: 26, d: `M 1274 344 C 1438 352 1578 452 1864 474`, opacity: 0.026, width: 0.34 },
      { id: 27, d: `M 1296 768 C 1436 694 1584 704 1882 814`, opacity: 0.024, width: 0.34 },
      { id: 28, d: `M 1480 278 C 1562 388 1612 502 ${CENTER_X + 96} ${CENTER_Y - 8}`, opacity: 0.032, width: 0.36 },
      { id: 29, d: `M 1488 888 C 1566 768 1618 684 ${CENTER_X + 98} ${CENTER_Y + 10}`, opacity: 0.026, width: 0.34 },
      { id: 30, d: `M 1012 610 C 1190 592 1392 594 1580 634`, opacity: 0.024, width: 0.34, dash: "1 20" },
      { id: 31, d: `M 1046 266 C 1226 282 1410 338 1588 458`, opacity: 0.024, width: 0.34, dash: "1 20" },
    ];

    const generatedFieldLines: FieldLine[] = Array.from({ length: 40 }, (_, id) => {
      const angle = lerp(-84, 84, id / 39) * (Math.PI / 180);
      const inner = lerp(16, 34, random());
      const outer = lerp(118, 330, random());
      return {
        id,
        x1: r4(CENTER_X + Math.cos(angle) * inner),
        y1: r4(CENTER_Y + Math.sin(angle) * inner),
        x2: r4(CENTER_X + Math.cos(angle) * outer),
        y2: r4(CENTER_Y + Math.sin(angle) * outer),
        opacity: lerp(0.018, 0.065, random()),
        width: lerp(0.2, 0.34, random()),
      };
    });

    const rightStars = generatedStars.filter(
      (star) => star.x > VIEWBOX_WIDTH * 0.52 && !star.bright,
    );
    const generatedLines: ConstellationLine[] = [];
    let attempts = 0;

    while (generatedLines.length < 18 && attempts < 180) {
      attempts += 1;
      const first = rightStars[Math.floor(random() * rightStars.length)];
      const second = rightStars[Math.floor(random() * rightStars.length)];
      if (!first || !second || first.id === second.id) continue;

      const distance = Math.hypot(first.x - second.x, first.y - second.y);
      if (distance < 95 || distance > 310) continue;

      generatedLines.push({
        id: generatedLines.length,
        x1: first.x,
        y1: first.y,
        x2: second.x,
        y2: second.y,
        opacity: lerp(0.018, 0.052, random()),
      });
    }

    return {
      stars: generatedStars,
      rays: generatedRays,
      fieldLines: generatedFieldLines,
      matrixPaths,
      constellationLines: generatedLines,
    };
  }, []);

  return (
    <motion.div
      className={`absolute inset-0 overflow-hidden bg-[#030303] pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      data-ready={ready ? "true" : "false"}
      aria-hidden="true"
    >
      <div className="large-grid" />
      <div className="dotted-grid" />

      <svg
        className="boot-svg absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="oryx-right-mask-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="black" />
            <stop offset="38%" stopColor="black" stopOpacity="0" />
            <stop offset="56%" stopColor="white" stopOpacity="0.24" />
            <stop offset="72%" stopColor="white" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
          <mask id="oryx-right-fade-mask">
            <rect
              width={VIEWBOX_WIDTH}
              height={VIEWBOX_HEIGHT}
              fill="url(#oryx-right-mask-gradient)"
            />
          </mask>
          <filter id="oryx-star-glow" x="-160%" y="-160%" width="420%" height="420%">
            <feGaussianBlur stdDeviation="2.25" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="oryx-center-glow-tight" x="-180%" y="-180%" width="460%" height="460%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="oryx-soft-atmosphere" x="-160%" y="-160%" width="420%" height="420%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
        </defs>

        <g className="matrix-sheet-layer" mask="url(#oryx-right-fade-mask)">
          {matrixPaths.map((path) => (
            <path
              key={path.id}
              d={path.d}
              fill="none"
              stroke="white"
              strokeWidth={path.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={path.dash}
              opacity={path.opacity}
            />
          ))}
        </g>

        <g className="constellation-layer" mask="url(#oryx-right-fade-mask)">
          {constellationLines.map((line) => (
            <line
              key={line.id}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="white"
              strokeWidth="0.5"
              opacity={line.opacity}
            />
          ))}
        </g>

        <g className="ray-layer" mask="url(#oryx-right-fade-mask)">
          {rays.map((ray) => (
            <line
              key={ray.id}
              className={`${ray.bright ? "ray ray-bright" : "ray"} ${
                ray.shimmer ? "ray-shimmer-line" : ""
              }`}
              data-mobile-hidden={ray.mobileHidden ? "true" : "false"}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={ray.x2}
              y2={ray.y2}
              stroke="white"
              strokeWidth={ray.width}
              opacity={ray.opacity}
              style={ray.shimmer ? rayStyle(ray) : undefined}
            />
          ))}
        </g>

        <g className="field-line-layer" mask="url(#oryx-right-fade-mask)">
          {fieldLines.map((line) => (
            <line
              key={line.id}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="white"
              strokeWidth={line.width}
              opacity={line.opacity}
            />
          ))}
        </g>

        <g className="star-layer" mask="url(#oryx-right-fade-mask)">
          {stars.map((star) => (
            <circle
              key={star.id}
              className={star.bright ? "star star-bright" : "star"}
              data-mobile-hidden={star.mobileHidden ? "true" : "false"}
              cx={star.x}
              cy={star.y}
              r={star.radius}
              fill="white"
              opacity={star.opacity}
              filter={star.bright ? "url(#oryx-star-glow)" : undefined}
              style={starStyle(star)}
            />
          ))}
        </g>

        <motion.g
          className="center-glow"
          animate={{
            opacity: ready ? [0.9, 1, 0.9] : [0.78, 0.94, 0.78],
            scale: [0.995, 1.015, 0.995],
          }}
          transition={{ duration: ready ? 2.8 : 4.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
        >
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r="82"
            fill="white"
            opacity={ready ? "0.01" : "0.007"}
            filter="url(#oryx-soft-atmosphere)"
          />
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r="22"
            fill="white"
            opacity={ready ? "0.032" : "0.023"}
            filter="url(#oryx-center-glow-tight)"
          />
          <g opacity={ready ? "0.28" : "0.2"}>
            <line
              x1={CENTER_X - 95}
              y1={CENTER_Y}
              x2={CENTER_X + 95}
              y2={CENTER_Y}
              stroke="white"
              strokeWidth="0.38"
              opacity="0.18"
            />
            <line
              x1={CENTER_X}
              y1={CENTER_Y - 82}
              x2={CENTER_X}
              y2={CENTER_Y + 82}
              stroke="white"
              strokeWidth="0.34"
              opacity="0.14"
            />
            <line
              x1={CENTER_X - 62}
              y1={CENTER_Y - 62}
              x2={CENTER_X + 62}
              y2={CENTER_Y + 62}
              stroke="white"
              strokeWidth="0.32"
              opacity="0.1"
            />
            <line
              x1={CENTER_X - 62}
              y1={CENTER_Y + 62}
              x2={CENTER_X + 62}
              y2={CENTER_Y - 62}
              stroke="white"
              strokeWidth="0.32"
              opacity="0.1"
            />
          </g>
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r="5"
            fill="white"
            opacity={ready ? "0.14" : "0.1"}
            filter="url(#oryx-center-glow-tight)"
          />
          <circle cx={CENTER_X} cy={CENTER_Y} r="1.95" fill="white" opacity="1" />
          <circle cx={CENTER_X} cy={CENTER_Y} r="0.85" fill="#030303" opacity="0.22" />
        </motion.g>
      </svg>

      <div className="vignette" />
      <div className="left-readability-gradient" />

      <style jsx>{`
        .large-grid,
        .dotted-grid,
        .vignette,
        .left-readability-gradient {
          position: absolute;
          inset: 0;
        }

        .large-grid {
          opacity: 0.98;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.055) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 124px 124px;
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            transparent 42%,
            rgba(0, 0, 0, 0.34) 60%,
            black 100%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            transparent 42%,
            rgba(0, 0, 0, 0.34) 60%,
            black 100%
          );
        }

        .dotted-grid {
          opacity: 0.42;
          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.058) 0 0.62px,
            transparent 0.9px
          );
          background-position: 2px 4px;
          background-size: 22px 22px;
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            transparent 47%,
            rgba(0, 0, 0, 0.24) 62%,
            black 100%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            transparent 47%,
            rgba(0, 0, 0, 0.24) 62%,
            black 100%
          );
          animation: dotted-drift 11s ease-in-out infinite alternate;
        }

        .boot-svg {
          opacity: 0.74;
        }

        .matrix-sheet-layer {
          opacity: 0.82;
          animation: matrix-sheet-breathe 13s ease-in-out infinite;
        }

        .ray-layer {
          opacity: 0.56;
          animation: ray-shimmer 10s ease-in-out infinite;
        }

        .ray-shimmer-line {
          animation: selected-ray-shimmer 7s ease-in-out infinite;
          transform-origin: ${CENTER_X}px ${CENTER_Y}px;
        }

        .field-line-layer {
          opacity: 0.48;
        }

        .constellation-layer {
          animation: constellation-breathe 12s ease-in-out infinite;
        }

        .star {
          animation-name: star-pulse;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .star-bright {
          animation-name: bright-star-pulse;
        }

        .vignette {
          background:
            radial-gradient(ellipse at 86% 58%, transparent 0%, transparent 26%, rgba(3, 3, 3, 0.32) 66%, rgba(3, 3, 3, 0.84) 100%),
            linear-gradient(180deg, rgba(3, 3, 3, 0.86) 0%, transparent 25%, transparent 70%, rgba(3, 3, 3, 0.94) 100%),
            linear-gradient(90deg, rgba(3, 3, 3, 0.76) 0%, rgba(3, 3, 3, 0.28) 36%, transparent 82%, rgba(3, 3, 3, 0.5) 100%);
        }

        .left-readability-gradient {
          background: linear-gradient(
            90deg,
            #030303 0%,
            #030303 38%,
            rgba(3, 3, 3, 0.96) 50%,
            rgba(3, 3, 3, 0.58) 64%,
            transparent 82%
          );
        }

        @keyframes dotted-drift {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(2px, -3px, 0);
          }
        }

        @keyframes star-pulse {
          0%,
          100% {
            opacity: var(--star-min);
          }
          48% {
            opacity: var(--star-mid);
          }
        }

        @keyframes bright-star-pulse {
          0%,
          100% {
            opacity: calc(var(--star-mid) * 0.58);
          }
          50% {
            opacity: var(--star-mid);
          }
        }

        @keyframes ray-shimmer {
          0%,
          100% {
            opacity: 0.51;
          }
          52% {
            opacity: 0.56;
          }
        }

        @keyframes selected-ray-shimmer {
          0%,
          100% {
            opacity: var(--ray-min);
          }
          48% {
            opacity: var(--ray-mid);
          }
        }

        @keyframes matrix-sheet-breathe {
          0%,
          100% {
            opacity: 0.68;
          }
          50% {
            opacity: 0.86;
          }
        }

        @keyframes constellation-breathe {
          0%,
          100% {
            opacity: 0.38;
          }
          50% {
            opacity: 0.58;
          }
        }

        @media (max-width: 768px) {
          .large-grid,
          .dotted-grid {
            opacity: 0.22;
            mask-image: linear-gradient(90deg, transparent 0%, transparent 58%, black 100%);
            -webkit-mask-image: linear-gradient(90deg, transparent 0%, transparent 58%, black 100%);
          }

          .boot-svg {
            opacity: 0.34;
            transform: translateX(24vw) scale(1.04);
            transform-origin: 100% 58%;
          }

          .ray[data-mobile-hidden="true"],
          .star[data-mobile-hidden="true"],
          .matrix-sheet-layer,
          .field-line-layer,
          .constellation-layer {
            display: none;
          }

          .left-readability-gradient {
            background: linear-gradient(
              90deg,
              #030303 0%,
              rgba(3, 3, 3, 0.98) 66%,
              rgba(3, 3, 3, 0.72) 100%
            );
          }
        }
      `}</style>
    </motion.div>
  );
}

export const OryxBootBackground = React.memo(OryxBootBackgroundInner);
