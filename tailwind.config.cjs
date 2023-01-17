/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
   darkMode: "class",
   theme: {
      extend: {
         colors: {
            brand: {
               backgroundDark: "#10181cff",
               background: "#17242cff",
               backgroundLight: "#283c49",
               subtle: "#526074ff",
               title: "#ecededff",
               body: "#fcfcfcff",
               secondaryDark: "#2a7275ff",
               secondary: "#2b7d7dff",
               secondaryLight: "#bfe8e9ff",
               accent: "#e0c463ff",
            },
         },
      },
      plugins: [],
   },
};