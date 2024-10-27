import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'card': '0 0 8px 0 rgba(30, 30, 30, 0.125)',
      },
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
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        fadeOut: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },

        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateX(0%)", opacity: "1" },
          "100%": { transform: "translateX(-100%)", opacity: "0" },
        },
      },
      animation: {
        "faded-in": "fadeIn 0.3s ease-out",
        "faded-out": "fadeOut 0.3s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-out": "slideOut 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
export default config;
