import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--bg-primary)",
        ink: "var(--text-primary)",
        muted: "var(--text-muted)",
        accent: "var(--accent)",
        surface: "var(--surface)"
      },
      fontFamily: {
        sans: ["var(--font-femur)", "var(--font-fallback)", "sans-serif"]
      },
      letterSpacing: {
        editorial: "-0.03em",
        micro: "0.15em",
        macro: "0.3em"
      },
      boxShadow: {
        cursor: "0 0 0 1px rgba(10, 10, 10, 0.12)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" }
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-3%, -4%)" },
          "30%": { transform: "translate(2%, -2%)" },
          "50%": { transform: "translate(-1%, 3%)" },
          "70%": { transform: "translate(3%, 1%)" },
          "90%": { transform: "translate(-2%, 2%)" }
        }
      },
      animation: {
        marquee: "marquee 24s linear infinite",
        grain: "grain 8s steps(10) infinite"
      }
    }
  },
  plugins: []
};

export default config;
