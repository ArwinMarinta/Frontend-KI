const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      colors: {
        PRIMARY01: "#0A61AA",
        PRIMARY02: "#FBD159",
        PRIMARY03: "#ED1C24",
        YELLOW01: "#FFF3CD",
        YELLOW02: "#664D03",
        BLUE01: "#EBF3FC",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
