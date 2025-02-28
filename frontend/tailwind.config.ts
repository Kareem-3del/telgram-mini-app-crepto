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
       bg_1:"#252531",
       t_green:"#01CC75",
       bt_green:"#187A50"
      },
    },
  },
  plugins: [],
} satisfies Config;
