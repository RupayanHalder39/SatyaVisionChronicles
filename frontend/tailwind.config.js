import lineClamp from '@tailwindcss/line-clamp';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
      },
      boxShadow: {
        clay: "0 18px 40px rgba(15, 23, 42, 0.15), 0 6px 12px rgba(255, 255, 255, 0.8)",
        glow: "0 0 30px rgba(108, 158, 255, 0.35)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        floatSlow: "floatSlow 10s ease-in-out infinite",
        slideDown: "slideDown 0.5s ease-out",
        fadeIn: "fadeIn 0.8s ease-out",
        scaleIn: "scaleIn 0.6s ease-out",
        orbit: "orbit 16s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(20px, 20px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.8)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(150px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(150px) rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [lineClamp],
};
