import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:"#0a5d5d",
        imgBg:"#f6f6f6d4"
      },
      
      fontFamily:{
        Jost:['Jost'],
        Poppins:['Poppins']
      },
      container: {
        center: true,
        padding:'1rem'
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      animation: {
        "slide-left-right": "slideLR 1s infinite ease-in-out",
      },
      keyframes: {
        slideLR: {
          "0%, 100%": { transform: "translateX(0)",color:'white' },
          "50%": { transform: "translateX(5px)",color:'orange' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
