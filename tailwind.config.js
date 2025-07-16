/** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        'display': ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

