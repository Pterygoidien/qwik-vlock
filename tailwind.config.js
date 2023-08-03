/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:['class', '[data-theme="dark"]'],
  content: [
    './src/**/*.{html,ts,tsx,js}',
  ],
  theme: {
    extend: {},
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
