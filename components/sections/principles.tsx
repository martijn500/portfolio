"use client";
import React from "react";
import { motion } from "framer-motion";
import { Eye, Layers, Accessibility } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { useReducedMotion, createAnimation } from "@/lib/hooks/use-reduced-motion";

const baseFadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const fadeUpAnimation = createAnimation(baseFadeUp);

export default function Principles() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const fadeUp = fadeUpAnimation(prefersReducedMotion);

  // Icon mapping for principles
  const iconMap = {
    Eye,
    Layers,
    Accessibility,
  } as const;

  return (
    <>
      <motion.div {...fadeUp} className="mb-6 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
        <h2 id="principles-heading" className="text-5xl md:text-7xl font-bold">{t.principlesTitle}</h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
        {t.principles.map((p: { title: string; icon: string; description: string }) => {
          const IconComponent = iconMap[p.icon as keyof typeof iconMap];
          return (
            <div key={p.title} className="flex gap-4">
              {/* Icon on the left */}
              <div className="flex-shrink-0">
                <IconComponent className="h-6 w-6" aria-hidden="true" />
              </div>
              
              {/* Title and description stacked on the right */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">{p.title}</h3>
                <p>{p.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}