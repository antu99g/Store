/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Cabin", "sans-serif"],
      },
      fontSize: {
        xs: "0.65rem",
      },
      colors: {
        purple: "#8e2de2",
      },
      backgroundColor: {
        purple: "#8e2de2",
        grey: "rgba(0, 0, 0, 0.5)",
      },
      padding: {
        "5vw": "5vw",
        "10vw": "10vw",
        "15vw": "15vw",
      },
      screens: {
        "sm-list": "500px",
        "md-list": "660px",
        "lg-list": "765px",
        "xl-list": "870px",
        "2xl-list": "960px",
      },
      keyframes: {
        slideX: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        focus: {
          "0%": { width: "60%", borderRadius: "60px" },
          "100%": { width: "100%", borderRadius: "6px" },
        },
        slideY: {
          "0%": { height: "0" },
          "100%": { height: "400%" },
        },
      },
      animation: {
        slideX: "slideX 0.3s ease forwards",
        focus: "focus 0.6s ease forwards",
        slideY: "slideY 0.3s ease forwards",
      },
    },
  },
  plugins: [],
};
