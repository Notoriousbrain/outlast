/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        border: '#10101088',
        lightBorder: '#10101033',
        text: '#000000',
        secondary: '#f2f2f2',
        primaryDark: '#000000',
        secondaryDark: '#e5e5e5',
        textDark: '#ffffff',
        lightText: '#999999',
        lightBackground: '#37322Fcc',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

