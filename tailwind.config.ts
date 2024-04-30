import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "280px",

        xsm: "480px",

        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        xxl: "1920px",
        // => @media (min-width: 1920px) { ... }

        uw: "2100px",
      },

      transitionProperty: {
        filter: "filter",
      },

      gridTemplateColumns: {
        ["product"]: "auto 20rem",
        ["product-lg"]: "auto 20rem",
        ["product-image"]: "auto 5rem",
        ["product-image-lg"]: "auto 5rem",
        ["cart"]: "auto 20rem",
        ["profile"]: "14rem auto",
      },
      fontFamily: {
        sans: ["var(--font-clash)"],
      },
      colors: {
        black: "#000000",
        green: {
          300: "#00B37E",
          500: "#31A78A",
          700: "#015F43",
        },
        blue: {
          500: "#81D8F7",
        },
        orange: {
          500: "#FF5C00",
          600: "#B15A35",
        },
        red: {
          600: "#CF5964",
          300: "#FA5A69",
          500: "#CF3D4B",
        },
        gray: {
          100: "#E1E1E6",
          200: "#AEAEAE",
          250: "#C9C9C9",
          300: "#646466",
          350: "#7A7C7E",
          500: "#6B6D6E",
          600: "#313236",
          700: "#1F1F21",
          800: "#1C1C1D",
          900: "#161819",
        },
        pink: {
          500: "#BB267F",
        },
        yellow: {
          500: "#FC9801",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
