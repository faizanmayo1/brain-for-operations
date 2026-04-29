import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--bg-canvas)",
        surface: "var(--bg-surface)",
        "surface-2": "var(--bg-surface-2)",
        elevated: "var(--bg-elevated)",
        "border-subtle": "var(--border-subtle)",
        "border-strong": "var(--border-strong)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "text-disabled": "var(--text-disabled)",
        accent: {
          50: "var(--accent-50)",
          200: "var(--accent-200)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
        },
        risk: {
          critical: "var(--risk-critical)",
          high: "var(--risk-high)",
          medium: "var(--risk-medium)",
          low: "var(--risk-low)",
        },
        info: "var(--info)",
        ai: "var(--ai-glow)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["11px", { lineHeight: "16px", letterSpacing: "0.06em" }],
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        elevated:
          "0 1px 2px rgba(15,18,22,0.04), 0 1px 3px rgba(15,18,22,0.04)",
        popover: "0 8px 24px rgba(0,0,0,0.32)",
        "ai-glow": "0 0 0 1px rgba(124,92,255,0.25), 0 8px 30px rgba(91,108,255,0.18)",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(91,108,255,0.45)" },
          "70%": { boxShadow: "0 0 0 10px rgba(91,108,255,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(91,108,255,0)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.5s cubic-bezier(0.2, 0, 0, 1) both",
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.2, 0, 0, 1) infinite",
        "soft-pulse": "soft-pulse 2.4s ease-in-out infinite",
        "draw-line": "draw-line 1.6s cubic-bezier(0.2, 0, 0, 1) forwards",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
