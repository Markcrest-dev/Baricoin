/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A97458',
          light: '#C19B86',
          dark: '#8E5A40',
        },
        secondary: '#E6D5C3',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        cream: {
          50: '#fffcf7',
          100: '#fef1df',
          200: '#fbe4c3',
          300: '#f7d2a1',
          400: '#f2b575',
          500: '#ed994f',
          600: '#e47d32',
          700: '#c86128',
          800: '#a64f26',
          900: '#864122',
        }
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
