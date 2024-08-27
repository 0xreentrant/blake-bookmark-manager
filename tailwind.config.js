const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        playfair: ["var(--font-playfair-display)"],
      },
      colors: {
        "blake-yellow": "#fcb64d",
        "notion-hover-bg": "rgba(0,0,0,0.04)",
        "notion-panel": "rgb(247,247,245)",
        "notion-base": "rgb(95,94,91)",
        "notion-heading": "rgb(55,53,47)",
        "notion-active": "rgb(29,27,22)",
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          //foreground: "hsl(var(--muted-foreground))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // set colors for horizontal rules and dividers
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        ".divide-x, .divide-y, hr": { color: theme("colors.notion-heading") },
      });
    }),
    // get screen values in css vars
    plugin(function ({ addBase, theme }) {
      const screens = theme("screens");
      const cssVariables = {};

      Object.keys(screens).forEach((key) => {
        cssVariables[`--screen-${key}`] = screens[key];
      });

      addBase({
        ":root": cssVariables,
      });
    }),
    // get padding values in css variables
    plugin(function ({ addBase, theme }) {
      const padding = theme("padding");
      const cssVariables = {};

      Object.keys(padding).forEach((key) => {
        cssVariables[`--padding-${key}`] = padding[key];
      });

      addBase({
        ":root": cssVariables,
      });
    }),
  ],
};
