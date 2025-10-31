"use client";
import React from "react";
import { motion } from "framer-motion";
import { Eye, Layers, Accessibility } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useReducedMotion, createAnimation } from "@/lib/useReducedMotion";

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
            <div key={p.title}>
              <div className="p-6 border-b">
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent className="h-6 w-6" aria-hidden="true" />
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                </div>
              </div>
              <div className="p-6">{p.description}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}