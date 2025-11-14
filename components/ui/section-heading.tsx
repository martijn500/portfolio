"use client";
import React from "react";
import { motion } from "framer-motion";
import { useFadeUp } from "@/lib/animations";

type SectionHeadingProps = {
  id?: string;
  children: React.ReactNode;
};

export default function SectionHeading({ id, children }: SectionHeadingProps) {
  // Centralized H2 styling for sections (exclude hero)
  const base = "text-5xl md:text-7xl font-bold [font-family:var(--font-merriweather)]";
  const fadeUp = useFadeUp();

  return (
    <motion.div {...fadeUp} className="mb-6 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
      <h2 id={id} className={base}>
        {children}
      </h2>
    </motion.div>
  );
}
