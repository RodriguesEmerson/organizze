/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {  
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        fadeIn: {
          '0%': { backgroundColor: 'rgb(209, 213, 219)' },
          '20%': { backgroundColor: 'rgb(255, 255, 255)' },
          '40%': { backgroundColor: 'rgb(209, 213, 219)' },
          '60%': { backgroundColor: 'rgb(255, 255, 255)' },
          '80%': { backgroundColor: 'rgb(209, 213, 219)' },
          '100%': { backgroundColor: 'rgb(255, 255, 255)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 3s ease-in',
      },
    },
  },
  plugins: [
    function({addUtilities}){
      addUtilities({
        '.btn-primary': {
          padding: '0.5rem 1rem',
          backgroundColor: 'var(--foreground)',
          color: 'var(--background)',
          borderRadius: '0.375rem',
          fontWeight: '600',
        },
      })
    }
  ],
};
