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
        "refer-hero": "url('/images/refer-bg.svg')",
        "refer-hero-card": "url('/images/test.svg')",
        "refer-hero-card-2": "url('/images/refer-card-2.svg')",
        "task-hero-card-2": "url('/images/allpoint.svg')",
        "login-bg": "url('/images/loginbg.svg')",
        "refer-gradient":
          "linear-gradient(to right,rgba(255, 255, 255, 0.21) ,rgba(42, 1, 68, 0.21))",
      },
      colors: {
        main: "rgb(var(--background))",
        ring: "rgb(var(--ring))",
        orange: "rgb(var(--orange))",
        lilac: "#2A0144",
      },
      gridTemplateColumns: {
        "three-columns": "repeat(auto-fill, minmax(280px, 350px))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
