"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeSettings } from "@/lib/theme/ThemeProvider";

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeSettings();

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:bg-surface-2"
    >
      {mode === "light" ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}
