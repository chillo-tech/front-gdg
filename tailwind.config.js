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
      },
      container: {
        center: true,
      },
      colors: {
        'app-yellow': '#FFD75E',
        'app-brown': '#42210B',
        'app-black': '#292929',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
