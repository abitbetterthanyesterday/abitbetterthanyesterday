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
    },
    plugins: [],
  },
};