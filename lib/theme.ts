/**
 * Theme utilities and shared types.
 *
 * Use a string union for `ThemeMode`. This keeps runtime values as plain strings
 * (no JS enum overhead) and gives good ergonomics in TypeScript for literals.
 */
export const THEME_MODES = ["light", "dark", "system"] as const;

export type ThemeMode = (typeof THEME_MODES)[number];

export const THEME_STORAGE_KEY = "theme-preference";
