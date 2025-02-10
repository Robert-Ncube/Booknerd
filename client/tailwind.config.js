/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3490dc",
        secondary: "#f1c40f",
        danger: "#e74c3c",
        success: "#2ecc71",
        info: "#34495e",
        warning: "#e67e22",
        light: "#ecf0f1",
        dark: "#343a40",
        tprimary: "#FFCE1A",
        tsecondary: "#0D0842",
        background: "#F3F3F3",
        fav: "#FF5841",
      },
      spacing: {
        12: "3rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
