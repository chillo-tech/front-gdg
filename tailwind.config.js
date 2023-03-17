/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        'app-yellow': '#ffd75e',
        'app-brown': '#ffd75e',
        'app-black': '#292929',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
