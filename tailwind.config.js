/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lavender: "#F2E6EE",
          blush:    "#FFECF2",
          violet:   "#977DFF",
          electric: "#0033FF",
          deep:     "#0600AB",
          navy:     "#00033D",
        },
      },
      backgroundImage: {
        "gradient-radial":       "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "brand-gradient":        "linear-gradient(135deg, #977DFF 0%, #0033FF 100%)",
        "brand-gradient-soft":   "linear-gradient(135deg, #F2E6EE 0%, #977DFF 50%, #0033FF 100%)",
        "brand-gradient-radial": "radial-gradient(ellipse at center, #977DFF 0%, #0033FF 60%, #00033D 100%)",
      },
      boxShadow: {
        soft:           "0 8px 30px rgba(0, 0, 0, 0.04)",
        glass:          "0 4px 30px rgba(0, 0, 0, 0.1)",
        "glow-violet":  "0 0 32px rgba(151, 125, 255, 0.45)",
        "glow-electric":"0 0 32px rgba(0, 51, 255, 0.45)",
        "glow-soft":    "0 0 60px rgba(151, 125, 255, 0.18)",
        "glow-card":    "0 4px 32px rgba(151, 125, 255, 0.12)",
      },
      keyframes: {
        slide: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 16px rgba(151, 125, 255, 0.3)" },
          "50%":       { boxShadow: "0 0 40px rgba(151, 125, 255, 0.6)" },
        },
      },
      animation: {
        slide:       "slide 40s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
