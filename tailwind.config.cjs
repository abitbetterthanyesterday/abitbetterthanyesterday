const { default: plugin } = require("tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            dark: "#10181cff",
            DEFAULT: "#17242cff",
            light: "#283c49",
          },
          white: {
            subtle: "#526074ff",
            title: "#ecededff",
            body: "#fcfcfcff",
            input: "#64748b",
          },
          secondary: {
            dark: "#2a7275ff",
            DEFAULT: "#2b7d7dff",
            light: "#bfe8e9ff",
          },
          accent: {
            DEFAULT: "#e0c463ff",
          },
        },
      },
      animation: {
        fade: "fadeIn 700ms ease-in-out forwards",
      },
      keyframes: (_) => ({
        fadeIn: {
          "0%": { opacity: 0, top: "-2rem" },
          "100%": { opacity: 1, top: "0" },
        },
      }),
    },
    plugins: [],
  },
};
