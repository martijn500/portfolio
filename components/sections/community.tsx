"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";
import { useReducedMotion, createAnimation } from "@/lib/hooks/use-reduced-motion";

const baseFadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const fadeUpAnimation = createAnimation(baseFadeUp);

type CommunityProps = Record<string, never>;

export default function Community({}: CommunityProps) {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const fadeUp = fadeUpAnimation(prefersReducedMotion);

  return (
    <>
      <motion.div {...fadeUp} className="mb-6 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
        <h2 id="community-heading" className="text-5xl md:text-7xl font-bold">{t.communityTitle}</h2>
      </motion.div>
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
        <p className="text-xl my-8 max-w-4xl">{t.communitySummary}</p>
        <ul className="space-y-4">
          {t.community.map((x: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-lg">{x}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}