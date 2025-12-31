import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        background: "hsl(210, 20%, 98%)",
        card: "hsl(0, 0%, 100%)",
        muted: "hsl(215, 16%, 92%)",
        border: "hsl(216, 12%, 84%)",
        primary: {
          DEFAULT: "hsl(222, 90%, 56%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        accent: {
          DEFAULT: "hsl(160, 84%, 39%)",
          foreground: "hsl(160, 84%, 94%)",
        },
        warning: {
          DEFAULT: "hsl(36, 92%, 55%)",
        },
        danger: {
          DEFAULT: "hsl(0, 78%, 62%)",
        },
      },
      boxShadow: {
        card: "0 10px 30px rgba(15, 23, 42, 0.08)",
        subtle: "0 5px 15px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
