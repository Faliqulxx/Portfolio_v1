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
          lavender: "#E6FFFA",
          blush:    "#ECFDF5",
          violet:   "#06b6d4",
          electric: "#10b981",
          deep:     "#047857",
          navy:     "#082f49",
        },
      },
      backgroundImage: {
        "gradient-radial":       "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "brand-gradient":        "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)",
        "brand-gradient-soft":   "linear-gradient(135deg, #E6FFFA 0%, #06b6d4 50%, #10b981 100%)",
        "brand-gradient-radial": "radial-gradient(ellipse at center, #06b6d4 0%, #10b981 60%, #082f49 100%)",
      },
      boxShadow: {
        soft:           "0 8px 30px rgba(0, 0, 0, 0.04)",
        glass:          "0 4px 30px rgba(0, 0, 0, 0.1)",
        "glow-violet":  "0 0 32px rgba(6, 182, 212, 0.45)",
        "glow-electric":"0 0 32px rgba(16, 185, 129, 0.45)",
        "glow-soft":    "0 0 60px rgba(6, 182, 212, 0.18)",
        "glow-card":    "0 4px 32px rgba(6, 182, 212, 0.12)",
      },
      keyframes: {
        slide: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 16px rgba(6, 182, 212, 0.3)" },
          "50%":       { boxShadow: "0 0 40px rgba(6, 182, 212, 0.6)" },
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
