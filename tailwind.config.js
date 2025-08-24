/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          400: "#38bdf8",
          500: "#06b6d4",
          600: "#0891b2"
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.4)'
      }
    },
  },
  plugins: [],
}
