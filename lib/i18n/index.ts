import { en } from "./en";
import { nl } from "./nl";
import type { I18nDictionary, LangKey } from "./types";

export const i18n = {
  en,
  nl,
} as const;

export type { I18nDictionary, LangKey };
