"use client";
import { useState, useEffect } from "react";

const getInitialPreference = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => getInitialPreference());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

// Helper function to create reduced motion-safe animations
export function createAnimation(animation: {
  initial: { opacity: number; y: number };
  whileInView: { opacity: number; y: number };
  viewport: { once: boolean; margin: string };
  transition: { duration: number };
}) {
  return (prefersReducedMotion: boolean) => {
    if (prefersReducedMotion) {
      return {
        initial: animation.initial,
        whileInView: animation.whileInView,
        viewport: animation.viewport,
        transition: { duration: 0 }, // No animation
      };
    }
    return animation;
  };
}
