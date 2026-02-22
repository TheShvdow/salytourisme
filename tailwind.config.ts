import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#e8f4fd",
          100: "#c5e2f8",
          200: "#9ecef2",
          300: "#70b5ea",
          400: "#4aa0e3",
          500: "#1E6B9C",
          600: "#195e8a",
          700: "#134f76",
          800: "#0d3f5f",
          900: "#082d45",
        },
        sand: {
          50: "#fdf8ee",
          100: "#f9edd4",
          200: "#f4e0b5",
          300: "#edd192",
          400: "#E8B96F",
          500: "#e0a04a",
          600: "#c8863a",
          700: "#a86b2c",
          800: "#87531f",
          900: "#653c13",
        },
        tropical: {
          50: "#e8f5ed",
          100: "#c5e5d0",
          200: "#9dd3b1",
          300: "#70c090",
          400: "#48b074",
          500: "#2E8B57",
          600: "#267a4b",
          700: "#1c663d",
          800: "#135030",
          900: "#093a21",
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "ocean-gradient": "linear-gradient(135deg, #1E6B9C 0%, #082d45 100%)",
        "sand-gradient": "linear-gradient(135deg, #E8B96F 0%, #c8863a 100%)",
        "hero-gradient":
          "linear-gradient(to bottom, rgba(8,45,69,0.3) 0%, rgba(8,45,69,0.7) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
