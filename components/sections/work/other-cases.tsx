import Image from "next/image";
import { motion } from "framer-motion";
import { BriefcaseBusiness, ArrowRight } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ImageItem } from "@/components/ui/lightbox";
import { useLanguage } from "@/lib/context/language-context";

export type OtherCasesProps = {
  cases: any[];
  imgRefs: React.RefObject<HTMLDivElement | null>[];
  openLightbox: (
    images: ImageItem[],
    index: number,
    thumbIndex: number,
    imgRefs: React.RefObject<HTMLDivElement | null>[]
  ) => void;
};

const OtherCases: React.FC<OtherCasesProps> = ({ cases: otherCases, imgRefs, openLightbox }) => {
  const { t } = useLanguage();

  return (
    <section className="py-10 sm:py-14 lg:py-20">
      <motion.div className="mb-6 flex items-center gap-3 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
        <BriefcaseBusiness className="h-6 w-6" />
        <h3 className="text-2xl md:text-3xl font-semibold">{t.otherWorkTitle}</h3>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-6 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
        {otherCases.map((cs, idx) => {
          const imgRef = imgRefs[idx];
          return (
            <Card key={cs.id} className="overflow-hidden">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center justify-between gap-3">
                  <span className="truncate">{cs.title}</span>
                  <span className="text-accent-foreground text-sm whitespace-nowrap font-normal">
                    <span>{cs.startDate}</span>
                    <span className="inline-flex items-center px-1 align-middle" aria-hidden="true">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    <span>{cs.endDate}</span>
                  </span>
                </CardTitle>
              </CardHeader>
              <div className="relative aspect-video bg-white/70 overflow-hidden">
                <button
                  onClick={() =>
                    openLightbox(cs.images, 0, idx, Array(cs.images?.length ?? 1).fill(imgRef))
                  }
                  className="peer p-0 m-0 bg-transparent border-0 text-left w-full h-full focus:outline-none"
                >
                  <div ref={imgRef} className="relative w-full h-full">
                    <Image
                      src={cs.images?.[0]?.src}
                      alt={cs.images?.[0]?.alt}
                      width={600}
                      height={338}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 peer-focus-visible:opacity-100 shadow-[inset_0_0_0_3px_var(--ring)]"
                />
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
          );
        })}
      </div>
    </section>
  );
};

export default OtherCases;
