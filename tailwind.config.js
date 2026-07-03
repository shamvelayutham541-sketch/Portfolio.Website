/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050b18",
        cyan: {
          accent: "#00e5ff",
        },
        purple: {
          accent: "#7c3aed",
        },
        surface: "#0f1f3d"
      },
      fontFamily: {
        grotesk: ["'Space Grotesk'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
        syncopate: ["'Syncopate'", "sans-serif"],
        syne: ["'Syne'", "sans-serif"],
        major: ["'Major Mono Display'", "monospace"],
      }
    },
  },
  plugins: [],
}
