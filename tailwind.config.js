module.exports = {
  darkMode: ["class"],
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#12275c",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1f3b84",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#038fa8",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        franky: {
          navy: "#12275c",
          blue: "#1f3b84",
          orange: "#d0260e",
          yellow: "#f3d535",
          cyan: "#038fa8",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "glow-slow": "glow-slow 4s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "cyber-pulse": "cyber-pulse 2s ease-in-out infinite",
        drift: "drift 20s linear infinite",
        "connection-pulse": "connection-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        "glow-slow": {
          "0%": { boxShadow: "0 0 5px #d0260e, 0 0 10px #d0260e, 0 0 15px #d0260e" },
          "100%": { boxShadow: "0 0 10px #d0260e, 0 0 20px #d0260e, 0 0 30px #d0260e" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(5deg)" },
        },
        "cyber-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        drift: {
          "0%": { transform: "translateX(-100px)" },
          "100%": { transform: "translateX(100vw)" },
        },
        "connection-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
