/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '344px',
        'md': '575px',  
        'lg': '1024px', 
        'xl': '1280px', 
      },
      gridTemplateColumns: {
        '4':'repeat(4,18rem)',
        '1':'repeat(1,25rem)'
      },
      width:{
        'slider': '98%',
        'product': '28rem',
        'searchform':'30rem',
      }
      
    },
  },
  plugins: [
    
   
  ],
}

