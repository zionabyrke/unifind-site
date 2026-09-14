import type { Config } from "tailwindcss";

const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "surface-1": withOpacity("--surface-1"),
        "surface-2": withOpacity("--surface-2"),
        border: withOpacity("--border"),
        "border-strong": withOpacity("--border-strong"),
        "text-primary": withOpacity("--text-primary"),
        "text-secondary": withOpacity("--text-secondary"),
        "text-muted": withOpacity("--text-muted"),
        "text-warning": withOpacity("--text-warning"),
        "bg-warning": withOpacity("--bg-warning"),
        "text-danger": withOpacity("--text-danger"),
        "bg-danger": withOpacity("--bg-danger"),
        "text-success": withOpacity("--text-success"),
        "bg-success": withOpacity("--bg-success"),
        accent: withOpacity("--accent-rgb"),
        "accent-bg": withOpacity("--accent-bg-rgb"),
      },
      borderRadius: {
        DEFAULT: "8px",
      },
    },
  },
  plugins: [],
} satisfies Config;
