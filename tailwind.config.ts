import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#FFA500", // Bright Halloween orange for accents
        primary: "#3F3F46", // Sophisticated dark gray for main elements (remains unchanged)
        background: "#09090B", // Very dark, almost black background (remains unchanged)
        foreground: "#18181B", // Dark gray for surfaces/cards (remains unchanged)
        deposit: "#0CD982", // Slightly lighter accent for deposits
        withdraw: "#F93232", // Slightly lighter red for withdrawals
        text: {
          primary: "#F4F4F5", // Almost white text (remains unchanged)
          secondary: "#A1A1AA", // Muted text (remains unchanged)
        },
        border: "#27272A", // Subtle borders (remains unchanged)
        hover: {
          accent: "#FFB84D", // Lighter orange for hover states
          primary: "#52525B", // Lighter primary for hover states (remains unchanged)
        },
      },
    },
  },
  plugins: [],
};
export default config;
