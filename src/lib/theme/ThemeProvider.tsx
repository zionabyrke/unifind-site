"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { accentPresets, DEFAULT_ACCENT, type AccentTheme } from "./tokens";

type Mode = "light" | "dark";

interface ThemeContextValue {
  mode: Mode;
  accent: AccentTheme;
  toggleMode: () => void;
  setAccent: (accent: AccentTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const MODE_KEY = "unifind:theme-mode";
const ACCENT_KEY = "unifind:theme-accent";

function applyAccentVars(mode: Mode, accent: AccentTheme) {
  const vars = accentPresets[accent][mode];
  const root = document.documentElement;
  root.style.setProperty("--accent-rgb", vars.accent);
  root.style.setProperty("--accent-bg-rgb", vars.accentBg);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("light");
  const [accent, setAccentState] = useState<AccentTheme>(DEFAULT_ACCENT);

  // Runs once on mount: read persisted preference, or fall back to the
  // OS-level color scheme so first paint matches the user's system.
  useEffect(() => {
    const storedMode = localStorage.getItem(MODE_KEY) as Mode | null;
    const storedAccent = localStorage.getItem(ACCENT_KEY) as AccentTheme | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolvedMode = storedMode ?? (systemPrefersDark ? "dark" : "light");
    const resolvedAccent = storedAccent ?? DEFAULT_ACCENT;

    setMode(resolvedMode);
    setAccentState(resolvedAccent);
    document.documentElement.classList.toggle("dark", resolvedMode === "dark");
    applyAccentVars(resolvedMode, resolvedAccent);
  }, []);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem(MODE_KEY, next);
      document.documentElement.classList.toggle("dark", next === "dark");
      applyAccentVars(next, accent);
      return next;
    });
  };

  const setAccent = (next: AccentTheme) => {
    setAccentState(next);
    localStorage.setItem(ACCENT_KEY, next);
    applyAccentVars(mode, next);
  };

  const value = useMemo(
    () => ({ mode, accent, toggleMode, setAccent }),
    [mode, accent]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeSettings() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeSettings must be used within ThemeProvider");
  return ctx;
}
