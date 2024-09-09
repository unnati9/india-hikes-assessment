import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        green: "var(--green)",
        yellow: "var(--yellow)",
        white: "#ffffff",
        black: "#000000",
        gray: "#efefef"
        // yellow: "var(--yellow)",
      },
    },
  },
  plugins: [],
};
export default config;
