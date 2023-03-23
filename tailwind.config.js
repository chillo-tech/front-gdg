/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
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
      },
      colors: {
        'app-yellow': '#FFD75E',
        'app-brown': '#42210B',
        'app-black': '#292929',
        'app-beige': '#FFD75E26',
        'app-green': '#3ACB3A',
        'app-gray': '#eeeeee'
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
