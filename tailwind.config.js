/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "dark-blue": "rgba(42, 1, 68, 1)",
      },
    },
  },
  plugins: [],
};
