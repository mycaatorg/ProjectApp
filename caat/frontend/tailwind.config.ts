import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Covers all Next.js App Router files
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Ensures Tailwind works in reusable components
    "./public/**/*.html" // Covers static HTML files (if applicable)
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainCustomColor: "#BD2031" // Keeping custom color from previous config
      },
    },
  },
  plugins: [],
};

export default config;
