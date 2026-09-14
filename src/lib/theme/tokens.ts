/**
 * Accent color presets for the "color themes" setting.
 * Each preset only overrides the accent-related CSS variables; surface,
 * border, and text variables stay identical across presets so switching
 * accents never breaks contrast. Add a preset here and it shows up
 * everywhere `useThemeSettings` is used — no component changes needed.
 */
export type AccentTheme = "blue" | "green" | "violet" | "amber";

export const accentPresets: Record<
  AccentTheme,
  { light: { accent: string; accentBg: string }; dark: { accent: string; accentBg: string } }
> = {
  blue: {
    light: { accent: "37 99 235", accentBg: "219 234 254" },
    dark: { accent: "96 165 250", accentBg: "30 58 138" },
  },
  green: {
    light: { accent: "21 128 61", accentBg: "220 252 231" },
    dark: { accent: "74 222 128", accentBg: "20 83 45" },
  },
  violet: {
    light: { accent: "109 40 217", accentBg: "237 233 254" },
    dark: { accent: "167 139 250", accentBg: "76 29 149" },
  },
  amber: {
    light: { accent: "180 83 9", accentBg: "254 243 199" },
    dark: { accent: "251 191 36", accentBg: "120 53 15" },
  },
};

export const DEFAULT_ACCENT: AccentTheme = "blue";
