import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
      colors: {
        'intense-gray': '#131222',
        'moderate-gray': '#232230',
        'light-gray': '#363543',
        'moderate-red': '#CE4F58',
        'moderate-white': '#E9F2DD',
        'intense-blue': '#1565c0',
        'moderate-violeta':'#9c27b0'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        custom:[
          "Roboto", "Roboto Condensed", 'sans-serif'
        ]
      },
      spacing: {
          sm: '8px',
          md: '12px',
          lg: '13px',
          xl: '24px',
      },
      fontSize:{
          sm:'12px',
          md:'13px',
          lg:'18px',
          xl:'22px'
      }
    },
  },
  plugins: [],
};
export default config;
