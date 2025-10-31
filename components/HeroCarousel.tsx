"use client";
import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/LanguageContext";
import { useReducedMotion, createAnimation } from "@/lib/useReducedMotion";

const baseFadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const fadeUpAnimation = createAnimation(baseFadeUp);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeroCarouselProps {
  // Empty interface for consistent component props pattern
}

export default function HeroCarousel({}: HeroCarouselProps) {
  const { t } = useLanguage();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const workRef = React.useRef<HTMLDivElement>(null);
  const stickyRef = React.useRef<HTMLDivElement>(null);
  const workCtasRef = React.useRef<HTMLDivElement>(null);
  const lifeCtasRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const fadeUp = fadeUpAnimation(prefersReducedMotion);
  const [isMobile, setIsMobile] = React.useState(false);
  const [showLifeImage, setShowLifeImage] = React.useState(false);
  const [isShort, setIsShort] = React.useState(false);
  const [forceCompact, setForceCompact] = React.useState(false);
  // Hysteresis for compact-mode toggling to avoid flicker
  const compactRef = React.useRef(false);
  const missCountRef = React.useRef(0);
  const hitCountRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  
  React.useEffect(() => {
    const checkViewport = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsMobile(w < 1024);
      // Consider short if lg width but height below 960px
      setIsShort(w >= 1024 && h < 960);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Expose CSS variable for viewport-height-based sizing (stable across mobile UI chrome)
  React.useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Compute visibility of active CTA group and toggle compact mode with hysteresis
  const evaluateCtaVisibility = React.useCallback(() => {
    // Only relevant on lg and above, and when sticky container is present
    if (window.innerWidth < 1024 || !stickyRef.current) {
      if (compactRef.current) {
        compactRef.current = false;
        setForceCompact(false);
      }
      missCountRef.current = 0;
      hitCountRef.current = 0;
      return;
    }

    const latest = scrollYProgress.get();
    const activeRef = latest > 0.5 ? lifeCtasRef.current : workCtasRef.current;
    if (!activeRef) return;

    const rect = activeRef.getBoundingClientRect();
    const stickyBounds = stickyRef.current.getBoundingClientRect();
    // Use sticky bounds explicitly so we require CTAs to be inside the sticky viewport
    const topLimit = stickyBounds.top + 8; // small padding from top
    const bottomLimit = stickyBounds.bottom - 8; // small padding from bottom
    const visible = rect.top >= topLimit && rect.bottom <= bottomLimit;

    const MISS_THRESHOLD = 2; // frames/events below before enabling compact
    const HIT_THRESHOLD = 3; // frames/events fully visible before disabling

    if (visible) {
      hitCountRef.current += 1;
      missCountRef.current = 0;
      if (compactRef.current && hitCountRef.current >= HIT_THRESHOLD) {
        compactRef.current = false;
        setForceCompact(false);
      }
    } else {
      missCountRef.current += 1;
      hitCountRef.current = 0;
      if (!compactRef.current && missCountRef.current >= MISS_THRESHOLD) {
        compactRef.current = true;
        setForceCompact(true);
      }
    }
  }, [scrollYProgress]);

  // Re-check CTA visibility on resize to keep layout consistent
  React.useEffect(() => {
    const onResize = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        evaluateCtaVisibility();
        rafRef.current = null;
      });
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [evaluateCtaVisibility]);

  // Transform to align Life content with the aside, accounting for padding
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-27%"]);
  
  // Opacity animations with custom easing
  // Work fades out quickly (ease-in), Life fades in slowly (ease-out)
  const workOpacity = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [1, 0.5, 0],
    { ease: (t) => t * t } // Quadratic ease-in for faster fade-out
  );
  const lifeOpacity = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [0, 0.5, 1],
    { ease: (t) => 1 - Math.pow(1 - t, 2) } // Quadratic ease-out for slower fade-in
  );

  // Switch image when Life section comes into view (at 50% scroll progress)
  React.useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setShowLifeImage(latest > 0.5);
      // Determine if active CTA group is sufficiently visible; if not, toggle compact mode with hysteresis
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        evaluateCtaVisibility();
        rafRef.current = null;
      });
    });
  }, [scrollYProgress, evaluateCtaVisibility]);

  // Disable parallax only if user prefers reduced motion
  const finalX = prefersReducedMotion ? "0%" : x;

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // Ensure focus stays within visible section during parallax
        const progress = scrollYProgress.get();
        if (progress > 0.5) {
          // Life section is active - ensure focus management
          // Additional focus management logic if needed
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [scrollYProgress]);

  return (
    <div className="w-full">
      {/* Main page heading for accessibility */}
      <h1 className="sr-only">
        {t.profile.name} - {t.profile.role}
      </h1>
      
  {/* Anchor for about-work navigation */}
  <div id="about-work" className="absolute -top-20"></div>
      
  {/* Anchor for about-life navigation - positioned where life section is centered */}
  <div id="about-life" className="absolute lg:top-full top-1/2"></div>
      
      {/* Parallax Container */}
      <div 
        ref={containerRef}
        className="lg:h-[200vh] w-full relative" 
      >
        <div 
          ref={stickyRef}
          className={"lg:sticky lg:top-16 lg:h-[calc(100vh-7rem)] w-full bg-background md:rounded-2xl lg:overflow-hidden scroll-mt-20"} 
          style={{boxShadow: 'inset 0 0 40px rgba(0,0,0,0.08)'}}
        >
          <div className="w-full max-w-6xl mx-auto h-full">
            <motion.div 
              className={"flex flex-col lg:flex-row lg:w-[200%] lg:h-full"}
              style={{ x: isMobile ? "0%" : finalX }}
              role="region"
              aria-label={t.hero.aboutWorkTitle + " and " + t.hero.aboutLifeTitle}
            >
            {/* Work Section */}
            <motion.section 
              ref={workRef}
              className="w-full lg:w-1/4 h-full flex-shrink-0"
              aria-labelledby="work-heading"
              role="region"
              style={{ opacity: isMobile ? 1 : workOpacity }}
            >
              <div id="about-work-content" className="w-full px-5 md:px-8 lg:px-12 h-full scroll-mt-20">
                <div className="h-full flex flex-col">
                  
                  {/* Content grid */}
                  <div className={`grid ${(isShort || forceCompact) ? 'gap-5' : 'gap-8'} flex-1 h-full`}>
                    <motion.div {...fadeUp} className={`${(isShort || forceCompact) ? 'grid' : 'flex flex-col'} justify-start h-full`} style={(isShort || forceCompact) ? { gridTemplateRows: 'auto auto 1fr auto auto' } : undefined}>
                      {/* Section Header verplaatst naar de contentkolom */}
                      <motion.div {...fadeUp} className={`${(isShort || forceCompact) ? 'pt-6' : 'pt-16'} pb-5 mb-3`}>
                        <h2 id="work-heading" className={`${(isShort || forceCompact) ? '' : 'text-5xl md:text-7xl'} font-bold`} style={(isShort || forceCompact) ? { fontSize: 'clamp(2rem, calc(var(--vh) * 5.75), 3.5rem)' } : undefined}>{t.hero.aboutWorkTitle}</h2>
                      </motion.div>
                      {/* Titel nu binnen de grid, in de contentkolom */}
                      <motion.div {...fadeUp} className="mb-3">
                        <h3 className={`font-semibold leading-none max-w-fit ${(isShort || forceCompact) ? '' : 'text-2xl md:text-4xl'}`} style={(isShort || forceCompact) ? { fontSize: 'clamp(1.125rem, calc(var(--vh) * 3.0), 2.125rem)' } : undefined}>
                          {t.profile.role}
                        </h3>
                      </motion.div>
                      <p className={`${(isShort || forceCompact) ? 'text-base leading-tight' : 'text-lg'} prose-measure mb-5`}>{t.profile.summary}</p>
                      <div className={`${(isShort || forceCompact) ? 'mt-4 mb-4' : 'mt-6 mb-6'}`}>
                        <div className="flex flex-wrap gap-2">
                          {t.profile.skills.map((s: string) => (
                            <Badge key={s}>{s}</Badge>
                          ))}
                        </div>
                      </div>
                      <div ref={workCtasRef} className="flex flex-wrap gap-3 pb-1">
                        {t.hero.workLinks.map((link: { title: string; url: string }) => (
                          <Button key={link.title} asChild variant={link.url.startsWith('#') ? 'default' : 'outline'}>
                            <a 
                              href={link.url} 
                              target={link.url.startsWith('#') ? '_self' : '_blank'} 
                              rel={link.url.startsWith('#') ? undefined : 'noopener noreferrer'}
                              aria-label={link.url.startsWith('#') ? link.title : `${link.title} (opens in new tab)`}
                            >
                              {link.title}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Shared Aside - switches image based on scroll */}
            <motion.aside {...fadeUp} className="w-full lg:w-1/4 min-h-[400px] lg:h-full flex items-end justify-center overflow-hidden">
              <div className="relative w-full h-full lg:max-h-[calc(100vh-8rem)]">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: showLifeImage ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-end"
                >
                  <div className="relative w-full aspect-[3/4] lg:h-full lg:aspect-auto">
                    <Image
                      src="/martijn-portrait-work.png" 
                      alt={`${t.profile.name} professional portrait`}
                      fill
                      className="object-contain object-bottom"
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showLifeImage ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-end h-full"
                >
                  <div className="relative w-full aspect-[3/4] lg:h-full lg:aspect-auto">
                    <Image
                      src="/martijn-portrait-life.png" 
                      alt={`${t.profile.name} personal portrait`}
                      fill
                      className="object-contain object-bottom"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.aside>

            {/* Life Section */}
            <motion.section 
              className="w-full lg:w-1/4 h-full flex-shrink-0"
              aria-labelledby="life-heading"
              role="region"
              style={{ opacity: isMobile ? 1 : lifeOpacity }}
            >
              <div id="about-life-content" className="w-full px-5 md:px-8 lg:px-12 h-full scroll-mt-20">
                <div className="h-full flex flex-col">
                  
                  {/* Content grid */}
                  <div className={`grid ${(isShort || forceCompact) ? 'gap-5' : 'gap-8'} flex-1 h-full`}>
                    <motion.div {...fadeUp} className={`${(isShort || forceCompact) ? 'grid' : 'flex flex-col'} justify-start h-full`} style={(isShort || forceCompact) ? { gridTemplateRows: 'auto auto 1fr auto auto' } : undefined}>
                      {/* Section Header verplaatst naar de contentkolom */}
                      <motion.div {...fadeUp} className={`${(isShort || forceCompact) ? 'pt-6' : 'pt-16'} pb-5 mb-3`}>
                        <h2 id="life-heading" className={`${(isShort || forceCompact) ? '' : 'text-5xl md:text-7xl'} font-bold`} style={(isShort || forceCompact) ? { fontSize: 'clamp(2rem, calc(var(--vh) * 5.75), 3.5rem)' } : undefined}>{t.hero.aboutLifeTitle}</h2>
                      </motion.div>
                      {/* Titel nu binnen de grid, in de contentkolom */}
                      <motion.div {...fadeUp} className="mb-3">
                        <h3 className={`font-semibold leading-none max-w-fit ${(isShort || forceCompact) ? '' : 'text-2xl md:text-4xl'}`} style={(isShort || forceCompact) ? { fontSize: 'clamp(1.125rem, calc(var(--vh) * 3.0), 2.125rem)' } : undefined}>
                          {t.profileLife.role}
                        </h3>
                      </motion.div>
                      <p className={`${(isShort || forceCompact) ? 'text-base leading-tight' : 'text-lg'} prose-measure mb-5`}>{t.profileLife.summary}</p>
                      <div className={`${(isShort || forceCompact) ? 'mt-4 mb-4' : 'mt-6 mb-6'}`}>
                        <div className="flex flex-wrap gap-2">
                          {t.profileLife.skills.map((s: string) => (
                            <Badge key={s}>{s}</Badge>
                          ))}
                        </div>
                      </div>
                      <div ref={lifeCtasRef} className="flex flex-wrap gap-3 pb-1">
                        {t.hero.lifeLinks.map((link: { title: string; url: string }) => (
                          <Button key={link.title} asChild variant={link.url.startsWith('#') ? 'default' : 'outline'}>
                            <a 
                              href={link.url} 
                              target={link.url.startsWith('#') ? '_self' : '_blank'} 
                              rel={link.url.startsWith('#') ? undefined : 'noopener noreferrer'}
                              aria-label={link.url.startsWith('#') ? link.title : `${link.title} (opens in new tab)`}
                            >
                              {link.title}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}