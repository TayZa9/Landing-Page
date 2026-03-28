import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#36d1ff",
        accent: "#36d1ff",
      },
    },
  },
};

export default config;
