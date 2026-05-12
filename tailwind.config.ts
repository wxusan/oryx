import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
        display: [
          "var(--font-space-grotesk)",
          "Space Grotesk",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        oryx: {
          black: "#020202",
          white: "#f6f6f7",
          dim: "#8b8b8f",
          mute: "#4f4f55",
          line: "rgba(255,255,255,0.105)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
