import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#0d8f6b",
          700: "#0a7553",
          800: "#075e44",
          900: "#06472f",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        cream: {
          50: "#fdfaf3",
          100: "#f8f1e1",
          200: "#f0e6cd",
        },
        ink: {
          700: "#2a3431",
          800: "#1f2825",
          900: "#141a18",
        },
      },
      fontFamily: {
        sans: ['"Times New Roman"', "Times", "serif"],
        serif: ['"Times New Roman"', "Times", "serif"],
      },
      fontSize: {
        xs: ["1.1rem", { lineHeight: "1.55rem" }],
        sm: ["1.25rem", { lineHeight: "1.8rem" }],
        base: ["1.4rem", { lineHeight: "2.05rem" }],
        lg: ["1.6rem", { lineHeight: "2.25rem" }],
        xl: ["1.8rem", { lineHeight: "2.4rem" }],
        "2xl": ["2.15rem", { lineHeight: "2.7rem" }],
        "3xl": ["2.6rem", { lineHeight: "3.05rem" }],
        "4xl": ["3.25rem", { lineHeight: "3.55rem" }],
        "5xl": ["4.2rem", { lineHeight: "1.05" }],
        "6xl": ["5.2rem", { lineHeight: "1.05" }],
        "7xl": ["6.3rem", { lineHeight: "1.05" }],
      },
      opacity: {
        "8": "0.08",
      },
      backgroundImage: {
        "grain":
          "radial-gradient(rgba(20,26,24,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grain-sm": "16px 16px",
      },
      keyframes: {
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "shine": {
          "0%": { transform: "translateX(-120%) skewX(-12deg)" },
          "100%": { transform: "translateX(220%) skewX(-12deg)" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
          "50%": { opacity: "0.7", transform: "scale(1.18) rotate(12deg)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-10deg)" },
          "75%": { transform: "rotate(10deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "heartbeat": {
          "0%, 100%": { transform: "scale(1)" },
          "10%, 30%": { transform: "scale(1.15)" },
          "20%, 40%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-down": "fade-down 0.6s ease-out both",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
        "shine": "shine 1.6s ease forwards",
        "twinkle": "twinkle 2.6s ease-in-out infinite",
        "wiggle": "wiggle 0.6s ease-in-out",
        "spin-slow": "spin-slow 12s linear infinite",
        "bounce-soft": "bounce-soft 2.4s ease-in-out infinite",
        "heartbeat": "heartbeat 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
