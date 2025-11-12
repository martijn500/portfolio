"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Spotlight, BriefcaseBusiness } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/context/language-context";
import { useFadeUp } from "@/lib/animations";

type WorkProps = Record<string, never>;

export default function Work({}: WorkProps) {
  const { t } = useLanguage();
  const fadeUp = useFadeUp();

  return (
    <>
      <motion.div {...fadeUp} className="mx-auto max-w-6xl px-5 md:px-8 lg:px-12 mb-12">
        <h2 id="work-heading" className="text-5xl md:text-7xl font-bold [font-family:var(--font-merriweather)]">
          {t.workTitle}
        </h2>
      </motion.div>
      {/* FEATURED CASE */}
      <div>
        <motion.div {...fadeUp} className="mb-6 flex items-center gap-3 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
          <Spotlight className="h-6 w-6" />
          <h3 className="text-2xl md:text-3xl font-semibold">{t.featured.title}</h3>
          <span className="text-sm text-muted-foreground">{t.featured.period}</span>
        </motion.div>

        <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
          <div className="py-6 grid lg:grid-cols-2 gap-8 mx-auto max-w-6xl">
            <div className="lg:col-span-1 space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t.featured.clientLabel}</p>
                <p className="font-medium">{t.featured.client}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t.featured.challengeLabel}</p>
                <p className="prose-measure">{t.featured.challenge}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t.featured.roleLabel}</p>
                <p className="prose-measure">{t.featured.role}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t.featured.contribLabel}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {t.featured.bullets.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t.featured.resultLabel}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {t.featured.results.map((r: string, i: number) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            <figure className="lg:col-span-1 grid grid-cols-2 gap-3 self-start">
              <div className="aspect-4/3 rounded-xl bg-white/70 border overflow-hidden">
                <Image
                  src="/bmwgroup-1.png"
                  alt="BMW Group Design System - Component Library interface showing design tokens and components"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-4/3 rounded-xl bg-white/70 border overflow-hidden">
                <Image
                  src="/bmwgroup-2.png"
                  alt="BMW Group Design System - Documentation page with detailed component specifications"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 aspect-video rounded-xl bg-white/70 border overflow-hidden">
                <Image
                  src="/bmwgroup-3.png"
                  alt="BMW Group Design System - Complete overview dashboard showing implementation guidelines"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="col-span-2 text-xs text-muted-foreground">BMW Group Design System screenshots showcasing component library and implementation.</figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* OTHER WORK */}
      <section className="py-10 sm:py-14 lg:py-20">
        <motion.div {...fadeUp} className="mb-6 flex items-center gap-3 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
          <BriefcaseBusiness className="h-6 w-6" />
          <h3 className="text-2xl md:text-3xl font-semibold">{t.otherWorkTitle}</h3>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
          {t.otherCases.map((cs: { id: string; title: string; period: string; client: string; summary: string; image: string; outcomes: readonly string[] }) => (
            <Card key={cs.id} className="overflow-hidden">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center justify-between gap-3">
                  <span className="truncate">{cs.title}</span>
                  <span className="text-muted-foreground text-sm whitespace-nowrap font-normal">{cs.period}</span>
                </CardTitle>
              </CardHeader>
              {/* Image Full Width */}
              <div className="aspect-video bg-muted overflow-hidden">
                <Image src={`/${cs.image}`} alt={`${cs.title} project screenshot - ${cs.client}`} width={600} height={338} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">{cs.client}</p>
                <p className="mb-4">{cs.summary}</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {cs.outcomes.map((o: string, i: number) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
