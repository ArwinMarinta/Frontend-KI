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
      containeradmin: {
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
        PRIMARY04: "#EBF3FC",
        YELLOW01: "#FFF3CD",
        YELLOW02: "#664D03",
        YELLOW03: "#FBD159",
        YELLOW04: "#997404",
        BLUE01: "#EBF3FC",
        BORDER01: "#E0E0E0",
        RED01: "#FF0000",
        GREY01: "#F3F3F3",
        GREY02: "#8D9AAA",
        GREY03: "#F8F9FA",
        GREY04: "#6C757D",
        GREY04: "#343A40",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
