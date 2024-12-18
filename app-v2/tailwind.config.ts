import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3067F2",
        secondary: "#FF881A",
        background: "#EFF3FB",
        text: "#000",
        line: "#1E1E1E13",
        grays: "#1E1E1E",
        green: "#13C44F",
        red: "#FF004F",
      },
      userSelect: {
        custom: "none",
      },
    },
  },
  plugins: [],
} satisfies Config;
