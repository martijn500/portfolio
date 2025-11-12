"use client";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context/language-context";
import { useFadeUp } from "@/lib/animations";

export default function Writing() {
  const { t } = useLanguage();

  return (
    <>
      <motion.div
        {...useFadeUp()}
        className="mb-6 flex items-center gap-3 mx-auto max-w-6xl px-5 md:px-8 lg:px-12"
      >
        <FileText className="h-6 w-6" aria-hidden="true" />
        <h2
          id="writing-heading"
          className="text-2xl md:text-3xl font-semibold [font-family:var(--font-merriweather)]"
        >
          {t.writingTitle}
        </h2>
      </motion.div>
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
        {t.writing.map((w: { title: string; link: string; meta: string }, i: number) => (
          <div key={w.title}>
            <a
              href={w.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${w.title} (opens in new tab)`}
              className="group block py-6 lg:rounded-full hover:bg-muted/60 transition-colors -mx-5 md:-mx-8 lg:-mx-12 px-5 md:px-8 lg:px-12"
            >
              <div className="flex flex-col gap-3">
                {/* Title with badge suffix */}
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-medium leading-snug group-hover:text-foreground transition-colors">
                    {w.title}
                  </h3>
                  <Badge className="text-xs bg-foreground/5">{w.meta}</Badge>
                </div>

                {/* Read more link */}
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors inline-flex items-center gap-1">
                  {t.readMore}
                  <svg
                    className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </p>
              </div>
            </a>
            {i !== t.writing.length - 1 && <hr className="border-t border-border mx-0" />}
          </div>
        ))}
      </div>
    </>
  );
}
