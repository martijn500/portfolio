import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const THEME_COLORS = {
  lightBackground: "#f0fff6",
  darkBackground: "#241305",
} as const;
