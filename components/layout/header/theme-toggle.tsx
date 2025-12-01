"use client";
import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ThemeMode } from "@/lib/theme";
import { useLanguage } from "@/lib/context/language-context";

interface ThemeToggleProps {
  themeMode: ThemeMode;
  onThemeModeChange: (mode: ThemeMode) => void;
}

export function ThemeToggle({ themeMode, onThemeModeChange }: ThemeToggleProps) {
  const { t } = useLanguage();
  const headerCopy = t.header;
  const themeGroupLabel = headerCopy.themeToggle.label;
  
  const themeOptions = [
    {
      value: "light" as const,
      Icon: Sun,
      label: headerCopy.themeToggle.options.light.label,
      aria: headerCopy.themeToggle.options.light.aria,
    },
    {
      value: "system" as const,
      Icon: Monitor,
      label: headerCopy.themeToggle.options.system.label,
      aria: headerCopy.themeToggle.options.system.aria,
    },
    {
      value: "dark" as const,
      Icon: Moon,
      label: headerCopy.themeToggle.options.dark.label,
      aria: headerCopy.themeToggle.options.dark.aria,
    },
  ];

  return (
    <div>
      <h3
        className="text-sm font-medium text-foreground/70 mb-3 font-sans"
        id="theme-section"
      >
        {themeGroupLabel}
      </h3>
      <div
        role="radiogroup"
        aria-labelledby="theme-section"
        className="flex flex-col gap-2"
        onKeyDown={(e) => {
          const options = themeOptions.map((o) => o.value);
          const currentIndex = options.indexOf(themeMode);

          if (e.key === "ArrowDown" || e.key === "ArrowRight") {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % options.length;
            onThemeModeChange(options[nextIndex]);
          } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + options.length) % options.length;
            onThemeModeChange(options[prevIndex]);
          }
        }}
      >
        {themeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={themeMode === option.value}
            aria-label={option.aria}
            onClick={() => onThemeModeChange(option.value)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors text-left",
              themeMode === option.value
                ? "bg-primary text-primary-foreground font-medium"
                : "hover:bg-muted text-foreground"
            )}
            tabIndex={0}
          >
            <option.Icon className="h-4 w-4" aria-hidden="true" />
            <span>{option.label}</span>
            {themeMode === option.value && (
              <span className="sr-only">{headerCopy.selected}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
