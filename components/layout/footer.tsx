"use client";
import { useLanguage } from "@/lib/context/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <div className="py-10 text-sm text-accent-foreground mx-auto max-w-6xl px-5 md:px-8 lg:px-12 flex flex-wrap items-center justify-between gap-3">
      <p>{t.footerAllRights(t.profile.name)}</p>
      <div className="flex items-center gap-4">
        <a
          href="https://www.figma.com/deck/ltOQAl9YHQeNbxipQIt2jD/portfolio"
          className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.hero.ctaPortfolio} (${t.openInNewTab})`}
        >
          {t.hero.ctaPortfolio}
        </a>
        <a
          href="https://www.linkedin.com/in/martijnvanderwijst/"
          className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.hero.ctaLinkedin} (${t.openInNewTab})`}
        >
          {t.hero.ctaLinkedin}
        </a>
        <a
          href="https://github.com/martijn500"
          className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub (${t.openInNewTab})`}
        >
          GitHub
        </a>
        <a
          href="https://www.divotion.com/"
          className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.hero.ctaDivotion} (${t.openInNewTab})`}
        >
          {t.hero.ctaDivotion}
        </a>
      </div>
    </div>
  );
}
