"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context/language-context";
import { useReducedMotion, createAnimation } from "@/lib/hooks/use-reduced-motion";

const baseFadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const fadeUpAnimation = createAnimation(baseFadeUp);

export default function Writing() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const fadeUp = fadeUpAnimation(prefersReducedMotion);

  return (
    <>
      <motion.div {...fadeUp} className="mb-6 flex items-center gap-3 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
        <FileText className="h-6 w-6" aria-hidden="true" />
        <h2 id="writing-heading" className="text-2xl md:text-3xl font-semibold">{t.writingTitle}</h2>
      </motion.div>
      <div className="space-y-1 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
        {t.writing.map((w: { title: string; link: string; meta: string }) => (
          <a 
            key={w.title} 
            href={w.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${w.title} (opens in new tab)`}
            className="group block py-6 border-b border-border/50 last:border-b-0 hover:bg-muted/60 transition-colors -mx-5 md:-mx-8 lg:-mx-12 px-5 md:px-8 lg:px-12"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
              {/* Meta/Type Section */}
              <div className="md:w-32 md:flex-shrink-0">
                <Badge>
                  {w.meta}
                </Badge>
              </div>
              
              {/* Content Section */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium leading-snug mb-2 group-hover:text-foreground transition-colors">
                  {w.title}
                </h3>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors inline-flex items-center gap-1">
                  {t.readMore}
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}