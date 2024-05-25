import presetQuick from "franken-ui/shadcn-ui/preset-quick";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./features/**/*.{js,tsx}",
    "./pages/**/*.{js,tsx}",
    "./app/**/*.{js,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [
    presetQuick({
      overrides: {
        subnav: {
          "hook-item-hover": {
            background: "#eee",
          },
        },
      },
    }),
  ],
};
