/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#C94F78",
          soft: "#F8E1E8",
          blush: "#FCEEF2",
          berry: "#8E294D",
          ivory: "#FFF9F5",
          beige: "#F6EFE8",
          text: "#3B2A2A",
          muted: "#7A6868",
          border: "#EEDCDA"
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "-apple-system", "sans-serif"]
      }
    }
  },
  plugins: []
};
