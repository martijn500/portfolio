"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";
import { useFadeUp } from "@/lib/animations";

type CommunityProps = Record<string, never>;

export default function Community({}: CommunityProps) {
  const { t } = useLanguage();
  // const fadeUp = useFadeUp(); // Commented out as we will use useFadeUp directly in JSX

  return (
    <>
      <motion.div {...useFadeUp()} className="mb-6 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
        <h2
          id="community-heading"
          className="text-5xl md:text-7xl font-bold [font-family:var(--font-merriweather)]"
        >
          {t.communityTitle}
        </h2>
      </motion.div>
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
        <p className="text-xl my-8 max-w-4xl">{t.communitySummary}</p>
        <ul className="space-y-2">
          {t.community.map((x: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
