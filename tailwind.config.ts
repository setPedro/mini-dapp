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
        accent: "#00FFC6", // Neon Mint (used for interactive elements like buttons or highlights)
        primary: "#1A73E8", // Soft Blue (main color for links or key text)
        background: "#121212", // Dark Background (overall background of the dApp)
        foreground: "#E0E0E0", // Light Grey (for text and icons to contrast against background)
      },
    },
  },
  plugins: [],
};
export default config;
