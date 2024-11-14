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
        primary:"#0a5d5d"
      },
      
      fontFamily:{
        Jost:['Jost'],
        Poppins:['Poppins']
      },
      container: {
        center: true,
        padding:'1rem'
      },
    },
  },
  plugins: [],
} satisfies Config;
