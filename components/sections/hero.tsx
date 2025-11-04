"use client";
import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { useReducedMotion, createAnimation } from "@/lib/hooks/use-reduced-motion";

const baseFadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const fadeUpAnimation = createAnimation(baseFadeUp);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeroProps {
  // Empty interface for consistent component props pattern
}

export default function Hero({}: HeroProps) {
  const { t } = useLanguage();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const workRef = React.useRef<HTMLDivElement>(null);
  const stickyRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const fadeUp = fadeUpAnimation(prefersReducedMotion);
  const [isMobile, setIsMobile] = React.useState(false);
  const [showLifeImage, setShowLifeImage] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

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
    });
  }, [scrollYProgress]);

  // Disable parallax if user prefers reduced motion
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
          className="lg:sticky lg:top-16 lg:h-[calc(100vh-7rem)] w-full bg-background md:rounded-2xl lg:overflow-hidden scroll-mt-20" 
          style={{boxShadow: 'inset 0 0 40px rgba(0,0,0,0.08)'}}
        >
          <div className="w-full max-w-6xl mx-auto h-full">
            <motion.div 
              className="flex flex-col lg:flex-row lg:w-[200%] lg:h-full"
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
              <div id="about-work-content" className="w-full px-5 md:px-8 lg:px-12 h-full scroll-mt-20 lg:overflow-y-auto">
                <div className="h-full flex flex-col min-h-0">
                  
                  {/* Content grid */}
                  <div className="grid gap-8 flex-1 h-full">
                    <motion.div {...fadeUp} className="flex flex-col justify-start h-full">
                      {/* Section Header verplaatst naar de contentkolom */}
                      <motion.div {...fadeUp} className="pt-16 pb-6 mb-4">
                        <h2 id="work-heading" className="text-5xl md:text-7xl font-bold">{t.hero.aboutWorkTitle}</h2>
                      </motion.div>
                      {/* Titel nu binnen de grid, in de contentkolom */}
                      <motion.div {...fadeUp} className="mb-4">
                        <h3 className="text-2xl md:text-4xl font-semibold leading-none max-w-fit">
                          {t.profile.role}
                        </h3>
                      </motion.div>
                      <p className="text-lg prose-measure mb-6">{t.profile.summary}</p>
                      <div className="mt-6 mb-6">
                        <div className="flex flex-wrap gap-2">
                          {t.profile.skills.map((s: string) => (
                            <Badge key={s}>{s}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
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
              <div id="about-life-content" className="w-full px-5 md:px-8 lg:px-12 h-full scroll-mt-20 lg:overflow-y-auto">
                <div className="h-full flex flex-col min-h-0">
                  
                  {/* Content grid */}
                  <div className="grid gap-8 flex-1 h-full">
                    <motion.div {...fadeUp} className="flex flex-col justify-start h-full">
                      {/* Section Header verplaatst naar de contentkolom */}
                      <motion.div {...fadeUp} className="pt-16 pb-6 mb-4">
                        <h2 id="life-heading" className="text-5xl md:text-7xl font-bold">{t.hero.aboutLifeTitle}</h2>
                      </motion.div>
                      {/* Titel nu binnen de grid, in de contentkolom */}
                      <motion.div {...fadeUp} className="mb-4">
                        <h3 className="text-2xl md:text-4xl font-semibold leading-none max-w-fit">
                          {t.profileLife.role}
                        </h3>
                      </motion.div>
                      <p className="text-lg prose-measure mb-6">{t.profileLife.summary}</p>
                      <div className="mt-6 mb-6">
                        <div className="flex flex-wrap gap-2">
                          {t.profileLife.skills.map((s: string) => (
                            <Badge key={s}>{s}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
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