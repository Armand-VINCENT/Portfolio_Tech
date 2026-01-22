/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark mode colors
        "dark-bg": "#0a0a0a",
        "dark-surface": "#121212",
        "dark-border": "#1e1e1e",
        // Neon accents
        "neon-green": "#39ff14",
        "neon-blue": "#00d4ff",
        "neon-purple": "#b026ff",
        // Glassmorphism
        glass: "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Space Grotesk", "Inter", "sans-serif"],
      },
      boxShadow: {
        "neon-green": "0 0 20px rgba(57, 255, 20, 0.5)",
        "neon-blue": "0 0 20px rgba(0, 212, 255, 0.5)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backdropBlur: {
        glass: "10px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          from: { boxShadow: "0 0 10px rgba(57, 255, 20, 0.5)" },
          to: { boxShadow: "0 0 20px rgba(57, 255, 20, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
