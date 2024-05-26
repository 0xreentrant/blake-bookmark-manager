import presetQuick from "franken-ui/shadcn-ui/preset-quick";
import { violet, blackA, mauve, green } from "@radix-ui/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./features/**/*.{js,tsx}",
    "./pages/**/*.{js,tsx}",
    "./app/**/*.{js,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...violet,
        ...green,
        ...blackA,
      },
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
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