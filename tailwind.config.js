/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1000px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1280px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      body: ['HelveticaNeue', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        header: "url('/assets/images/bg-header.png')",
        contact: "url('/assets/images/bg-contact.png')",
      },
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
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',

        // Complex site-specific row configuration
        'layout': '200px minmax(900px, 1fr) 100px',
      },
      colors: {
        'app-light-yellow': '#FFD75E26',
        'app-dark-yellow': '#FFD75E80',
        'app-yellow': '#FFD75E',
        'app-brown': '#42210B',
        'app-black': '#292929',
        'app-beige': '#FFD75E26',
        'app-green': '#3ACB3A',
        'app-gray': '#eeeeee',
        'app-white': '#F6F6F6',
        'app-small-black': '#29292955',
        'app-xs-black': '#29292924',
        'app-sm-white': '#F6F6F6'
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
