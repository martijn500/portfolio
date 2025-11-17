"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Spotlight, BriefcaseBusiness, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/context/language-context";
import { useFadeUp } from "@/lib/animations";
import SectionHeading from "@/components/ui/section-heading";
import Lightbox from "@/components/ui/lightbox";

type WorkProps = Record<string, never>;

export default function Work({}: WorkProps) {
  const { t } = useLanguage();
  const fadeUp = useFadeUp();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt?: string }[]>([]);

  const openLightbox = (images: { src: string; alt?: string }[], index = 0) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const featured = (t as any).cases?.[0];
  const otherCases = (t as any).cases?.slice(1) ?? [];

  return (
    <>
      <SectionHeading id="work-heading">{t.workTitle}</SectionHeading>
      {/* FEATURED CASE */}
      <div>
        <motion.div
          {...fadeUp}
          className="mb-6 flex items-center gap-3 mx-auto max-w-6xl px-5 md:px-8 lg:px-12"
        >
          <Spotlight className="h-6 w-6" />
          <h3 className="text-2xl md:text-3xl font-semibold">{featured?.title}</h3>
          <span className="flex text-sm text-accent-foreground">
            <span>{featured?.startDate}</span>
            <span className="inline-flex items-center px-1 align-middle" aria-hidden="true">
              <ArrowRight className="w-3 h-3" />
            </span>
            <span>{featured?.endDate}</span>
          </span>
        </motion.div>

        <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
          <div className="py-6 grid lg:grid-cols-2 gap-8 mx-auto max-w-6xl">
            <div className="lg:col-span-1 space-y-6">
              <div>
                <p className="text-sm text-accent-foreground mb-1">{t.clientLabel}</p>
                <p className="font-medium">{featured?.client}</p>
              </div>
              <div>
                <p className="text-sm text-accent-foreground mb-1">{t.challengeLabel}</p>
                <p className="prose-measure">{featured?.summary}</p>
              </div>
              <div>
                <p className="text-sm text-accent-foreground mb-1">{t.roleLabel}</p>
                <p className="prose-measure">{featured?.role}</p>
              </div>
              <div>
                <p className="text-sm text-accent-foreground mb-1">{t.contribLabel}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {featured?.bullets?.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-accent-foreground mb-1">{t.resultLabel}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {featured?.outcomes?.map((r: string, i: number) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            <figure className="lg:col-span-1 grid grid-cols-2 gap-3 self-start">
              <div>
                <button
                  onClick={() =>
                    openLightbox((featured?.images ?? []) as { src: string; alt?: string }[], 0)
                  }
                  className="p-0 m-0 bg-transparent border-0 text-left w-full"
                >
                  <div className="aspect-4/3 rounded-xl bg-white/70 border overflow-hidden">
                    <Image
                      src={featured?.images?.[0]?.src ?? ""}
                      alt={featured?.images?.[0]?.alt ?? ""}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              </div>
              <div>
                <button
                  onClick={() =>
                    openLightbox((featured?.images ?? []) as { src: string; alt?: string }[], 1)
                  }
                  className="p-0 m-0 bg-transparent border-0 text-left w-full"
                >
                  <div className="aspect-4/3 rounded-xl bg-white/70 border overflow-hidden">
                    <Image
                      src={featured?.images?.[1]?.src ?? ""}
                      alt={featured?.images?.[1]?.alt ?? ""}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              </div>
              <div className="col-span-2">
                <button
                  onClick={() =>
                    openLightbox((featured?.images ?? []) as { src: string; alt?: string }[], 2)
                  }
                  className="p-0 m-0 bg-transparent border-0 text-left w-full"
                >
                  <div className="col-span-2 aspect-video rounded-xl bg-white/70 border overflow-hidden">
                    <Image
                      src={featured?.images?.[2]?.src ?? ""}
                      alt={featured?.images?.[2]?.alt ?? ""}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              </div>
              <figcaption className="col-span-2 text-xs text-accent-foreground">
                BMW Group Design System screenshots showcasing component library and implementation.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* OTHER WORK */}
      <section className="py-10 sm:py-14 lg:py-20">
        <motion.div
          {...fadeUp}
          className="mb-6 flex items-center gap-3 mx-auto max-w-6xl px-5 md:px-8 lg:px-12"
        >
          <BriefcaseBusiness className="h-6 w-6" />
          <h3 className="text-2xl md:text-3xl font-semibold">{t.otherWorkTitle}</h3>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
          {otherCases.map(
            (cs: {
              id: string;
              title: string;
              startDate: string;
              endDate: string;
              client: string;
              summary: string;
              images: { src: string; alt?: string }[];
              outcomes: readonly string[];
            }) => (
              <Card key={cs.id} className="overflow-hidden">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center justify-between gap-3">
                    <span className="truncate">{cs.title}</span>
                    <span className="text-accent-foreground text-sm whitespace-nowrap font-normal">
                      <span>{cs.startDate}</span>
                      <span
                        className="inline-flex items-center px-1 align-middle"
                        aria-hidden="true"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </span>
                      <span>{cs.endDate}</span>
                    </span>
                  </CardTitle>
                </CardHeader>
                {/* Image Full Width */}
                <div className="aspect-video bg-muted overflow-hidden">
                  <button
                    onClick={() => openLightbox(cs.images as { src: string; alt?: string }[], 0)}
                    className="p-0 m-0 bg-transparent border-0 text-left w-full h-full"
                  >
                    <Image
                      src={cs.images?.[0]?.src ?? ""}
                      alt={cs.images?.[0]?.alt ?? `${cs.title} project screenshot - ${cs.client}`}
                      width={600}
                      height={338}
                      className="w-full h-full object-cover"
                    />
                  </button>
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-accent-foreground mb-1">{cs.client}</p>
                  <p className="mb-4">{cs.summary}</p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {cs.outcomes.map((o: string, i: number) => (
                      <li key={i}>{o}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </section>
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
