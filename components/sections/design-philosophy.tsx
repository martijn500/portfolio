"use client";
import React from "react";
import { useLanguage } from "@/lib/context/language-context";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DesignPhilosophyProps {
  // Empty interface for consistent component props pattern
}

export default function DesignPhilosophy({}: DesignPhilosophyProps) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
      <div className="py-6">
        <h2 id="philosophy-heading" className="text-5xl md:text-7xl font-bold">{t.hero.philosophyTitle}</h2>
      </div>
      <div className="py-6 leading-relaxed">
        <p className="text-2xl md:text-3xl font-semibold">{t.hero.philosophyText}</p>
      </div>
    </div>
  );
}