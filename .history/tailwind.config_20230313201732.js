/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{html,js,tsx,ts}',
    './src/components/**/*.{html,js,tsx,ts}',
    './src/containers/**/*.{html,js,tsx,ts}'
  ],
  theme: {
    screens: {
      sm: '640px',

      md: '768px',

      lg: '1000px',

      xl: '1280px',

      '2xl': '1280px',
    },
    extend: {
      backgroundImage: {},
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '0rem',
          xl: '0rem',
          '2xl': '0rem',
        },
      },
      gridTemplateRows: {
        // Simple 8 row grid
        8: 'repeat(8, minmax(0, 1fr))',
        9: 'repeat(9, minmax(0, 1fr))',
        10: 'repeat(10, minmax(0, 1fr))',
        layout: '200px minmax(900px, 1fr) 100px',
      },
      colors: {
        white: '#ffffff',
        primary: '#204D52',
        secondary: '#C4FCDC',
        'app-green': '#008100',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
};
