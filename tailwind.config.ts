import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data.tsx"],
  theme: {
    extend: {
      colors: {
        usc: {
          red: "#990000",
          gold: "#FFCC00",
          ink: "#120607",
          wine: "#2A0A0A",
          ember: "#B31212",
        },
      },
      fontFamily: {
        serifDisplay: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        sansModern: ["var(--font-sans)", "ui-sans-serif", "system-ui", "Inter"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,204,0,.25), 0 20px 60px rgba(153,0,0,.28)",
        lift: "0 18px 50px rgba(0,0,0,.35)",
        insetGlow: "inset 0 0 0 1px rgba(255,255,255,.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      backdropBlur: {
        xl: "24px",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-30%)" },
          "100%": { transform: "translateX(130%)" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-60px, 40px, 0)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        drift: "drift 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;