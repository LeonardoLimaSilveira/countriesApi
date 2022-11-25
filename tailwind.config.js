/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      sm: '375px',
      lg: '1440px'
    },
    colors: {
      VeryDarkBlueD: '#202c37',
      DarkBlueD: 'hsl(209, 23%, 22%)',
      VeryDarkBlueL: 'hsl(200, 15%, 8%)',
      DarkGrayL: 'hsl(0, 0%, 52%)',
      VeryLightGrayL: 'hsl(0, 0%, 98%)',
      white: '#fff'
    },

    extend: {
      boxShadow: {
        '3xl': '-1px 0px 14px 0px rgba(0,0,0,0.29)'
      }
    }
  },
  plugins: []
}
