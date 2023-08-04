/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  darkMode:['class', '[data-theme="dark"]'],
  content: [
    './src/**/*.{html,ts,tsx,js}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary:"rgb(var(--color-primary) / <alpha-value>)",
        secondary:"rgb(var(--color-secondary) / <alpha-value>)",
        tertiary:"hsl(var(--color-tertiary) / <alpha-value>)",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        '2xl': "1536px",
        '3xl': "1920px",
        '4xl': "2560px",
      },
    },

   
    

  
  },
  plugins: [],
};
