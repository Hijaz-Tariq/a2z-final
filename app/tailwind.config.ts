// // import type { Config } from "tailwindcss";
// // import  defaultTheme  from "tailwindcss/defaultTheme";
// // const config: Config = {
// //   content: [
// //     "./app/**/*.{js,ts,jsx,tsx,mdx}",
// //     "./components/**/*.{js,ts,jsx,tsx,mdx}",
// //     "./src/**/*.{js,ts,jsx,tsx,mdx}",
// //   ],
// //   theme: {
// //     container: {
// //       center: true,
// //       padding: "2rem",
// //       screens: {
// //         "2xl": "1400px",
// //       },
// //     },
// //     extend: {
// //       colors: {
// //         border: "hsl(var(--border))",
// //         input: "hsl(var(--input))",
// //         ring: "hsl(var(--ring))",
// //         background: "hsl(var(--background))",
// //         foreground: "hsl(var(--foreground))",
// //         primary: {
// //           DEFAULT: "#0d457d",
// //           foreground: "#ffffff",
// //         },
// //         secondary: {
// //           DEFAULT: "#028ac9",
// //           foreground: "#ffffff",
// //         },
// //         accent: {
// //           DEFAULT: "#ff9305",
// //           foreground: "#000000",
// //         },
// //       },
// //       fontFamily: {
// //         sans: [
// //           "var(--font-sans)",
// //           ...defaultTheme.fontFamily.sans,
// //         ],
// //       },
// //       borderRadius: {
// //         lg: "var(--radius)",
// //         md: "calc(var(--radius) - 2px)",
// //         sm: "calc(var(--radius) - 4px)",
// //       },
// //     },
// //   },
// //   plugins: [require("tailwindcss-animate")],
// // };

// // export default config;

// import type { Config } from "tailwindcss";
// import defaultTheme from "tailwindcss/defaultTheme";

// const config: Config = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//       },
//     },
//     extend: {
//       colors: {
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//       },
//       fontFamily: {
//         sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       keyframes: {
//         "slide-in": {
//           "0%": { transform: "translateX(-100%)" },
//           "100%": { transform: "translateX(0)" },
//         },
//         "pop-in": {
//           "0%": { opacity: "0", transform: "translateY(-5px) scale(0.9)" },
//           "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
//         },
//         "meteor-trail": {
//           "0%": { opacity: "1" },
//           "100%": {
//             opacity: "0",
//             transform: "translateY(100px) translateX(100px)",
//           },
//         },
//       },
//       animation: {
//         "slide-in": "slide-in 0.3s ease-out",
//         "pop-in": "pop-in 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards",
//         "meteor-trail": "meteor-trail 1s infinite",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// };

// export default config;


import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate"; // ES module import

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "translateY(-5px) scale(0.9)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "meteor-trail": {
          "0%": { opacity: "1" },
          "100%": {
            opacity: "0",
            transform: "translateY(100px) translateX(100px)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-out",
        "pop-in": "pop-in 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards",
        "meteor-trail": "meteor-trail 1s infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate], // Use the imported plugin
};

export default config;