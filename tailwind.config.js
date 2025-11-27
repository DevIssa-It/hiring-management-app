/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral Colors
        neutral: {
          10: '#FFFFFF',
          20: '#FAFAFA',
          30: '#EDEDED',
          40: '#E0E0E0',
          50: '#C2C2C2',
          60: '#9E9E9E',
          70: '#757575',
          80: '#616161',
          90: '#404040',
          100: '#1D1F20',
        },
        // Primary Colors (Teal/Cyan)
        primary: {
          main: '#01959F',
          surface: '#F3FBFC',
          border: '#40B5C0',
          hover: '#01777F',
          pressed: '#01595F',
          focus: 'rgba(1, 149, 159, 0.2)',
        },
        // Secondary Colors (Yellow/Orange)
        secondary: {
          main: '#FBC037',
          surface: '#FFFCF5',
          border: '#FEEABC',
          hover: '#F8A92F',
          pressed: '#FA9810',
          focus: 'rgba(251, 192, 55, 0.2)',
        },
        // Danger Colors (Red)
        danger: {
          main: '#E01428',
          surface: '#FFF9FA',
          border: '#F5B1B7',
          hover: '#BC1121',
          pressed: '#700A14',
          focus: 'rgba(224, 20, 40, 0.2)',
        },
        // Warning Colors (Orange)
        warning: {
          main: '#CA7336',
          surface: '#FCF7F3',
          border: '#FEB17B',
          hover: '#B1652F',
          pressed: '#985628',
          focus: 'rgba(202, 115, 54, 0.2)',
        },
        // Success Colors (Green)
        success: {
          main: '#43936C',
          surface: '#F7F7F7',
          border: '#BBDCCA',
          hover: '#367A59',
          pressed: '#20573D',
          focus: 'rgba(67, 147, 108, 0.2)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 25px 0 rgba(0, 0, 0, 0.1)',
        'strong': '0 10px 40px 0 rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
