/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto, sans-serif'],
        logo: ['Rubik Glitch', 'sans-serif']
      },
      colors: {
        green: {
          300: '#00B37E',
          500: '#31A78A',
          700: '#015F43',
        },
        blue: {
          500: '#81D8F7',
        },
        orange: {
          500: '#FF5C00',
          600: '#B15A35',
        },
        red: {
          600: '#CF5964',
          300: '#FA5A69',
          500: '#CF3D4B',
        },
        gray: {
          100: '#E1E1E6',
          200: '#AEAEAE',
          250: '#C9C9C9',
          300: '#646466',
          500: '#6B6D6E',
          600: '#313236',
          700: '#1F1F21',
          900: '#161819'
        },
        pink: {
          500: '#BB267F',
        },
        yellow: {
          500: '#FC9801',
        }
      },
    }
  },
  plugins: [],
}
