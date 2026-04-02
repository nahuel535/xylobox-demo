/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // xylo-* kept as alias → black/white so all existing class usage works
        xylo: {
          50:  "#f9f9f9",
          100: "#f0f0f0",
          200: "#d4d4d4",
          300: "#a3a3a3",
          400: "#737373",
          500: "#171717",  // primary action → near-black
          600: "#0d0d0d",
          700: "#0a0a0a",
          800: "#080808",
          900: "#050505",
        },
        base: {
          bg:     "#0a0a0a",   // page background — deep black
          card:   "#111111",   // card surface
          border: "#232323",   // borders
          text:   "#f5f5f5",   // primary text — near white
          muted:  "#737373",   // secondary text — gray
          subtle: "#1a1a1a",   // subtle backgrounds
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "SF Pro Text", "Helvetica Neue", "sans-serif"],
      },
      boxShadow: {
        soft:     "0 2px 12px rgba(0,0,0,0.4)",
        card:     "0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)",
        elevated: "0 8px 32px rgba(0,0,0,0.5)",
      },
      borderRadius: {
        xl:   "12px",
        "2xl":"16px",
        "3xl":"20px",
      },
    },
  },
  plugins: [],
};
