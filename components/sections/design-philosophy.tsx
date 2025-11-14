"use client";
import { useLanguage } from "@/lib/context/language-context";
import SectionHeading from "@/components/ui/section-heading";

type DesignPhilosophyProps = Record<string, never>;

export default function DesignPhilosophy({}: DesignPhilosophyProps) {
  const { t } = useLanguage();

  return (
    <>
      <SectionHeading id="philosophy-heading">{t.hero.philosophyTitle}</SectionHeading>

      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-12 py-6 leading-relaxed">
        <p className="text-2xl md:text-3xl font-semibold">{t.hero.philosophyText}</p>
      </div>
    </>
  );
}
