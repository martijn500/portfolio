"use client"

import { createAnimation, useReducedMotion } from '@/lib/hooks/use-reduced-motion'

export const baseFadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

const fadeUpAnimation = createAnimation(baseFadeUp)

export function useFadeUp() {
  const prefersReducedMotion = useReducedMotion();
  return fadeUpAnimation(prefersReducedMotion);
}
