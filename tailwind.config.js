/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      backgroundImage: {
        hero: "url('/images/Wave.svg')",
        "main-gradient": "linear-gradient(to right, #C064F8, #FF087F)",
        "mobile-sneak": "url('/images/mobile-sneek-bg.jpg')",
        "decoration-line": "url('/images/Decoration Line.svg')",
        "decoration-line-2": "url('/images/Line deco.svg')",
        "sell-bg": "url('/images/sell-hero.svg')",
      },
      colors: {
        main: "rgb(var(--background))",
        ring: "rgb(var(--ring))",
        orange: "rgb(var(--orange))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
