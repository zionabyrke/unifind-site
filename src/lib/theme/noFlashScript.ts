import { accentPresets, DEFAULT_ACCENT } from "./tokens";

const MODE_KEY = "unifind:theme-mode";
const ACCENT_KEY = "unifind:theme-accent";

/**
 * Returns a self-contained JS string to run via a blocking <script> tag in
 * <head>, BEFORE React hydrates. It reads the same localStorage keys
 * ThemeProvider uses, so whatever it sets here is what ThemeProvider's
 * first useEffect will read back — no mismatch, no flash.
 */
export function getNoFlashScript(): string {
  const presetsJson = JSON.stringify(accentPresets);

  return `(function(){
    try {
      var presets = ${presetsJson};
      var mode = localStorage.getItem(${JSON.stringify(MODE_KEY)});
      var accent = localStorage.getItem(${JSON.stringify(ACCENT_KEY)}) || ${JSON.stringify(DEFAULT_ACCENT)};
      if (!mode) {
        mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      if (mode === "dark") document.documentElement.classList.add("dark");
      var vars = (presets[accent] || presets[${JSON.stringify(DEFAULT_ACCENT)}])[mode];
      document.documentElement.style.setProperty("--color-accent", vars.accent);
      document.documentElement.style.setProperty("--color-accent-bg", vars.accentBg);
    } catch (e) {}
  })();`;
}
