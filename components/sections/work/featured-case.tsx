import Image from "next/image";
import { motion } from "framer-motion";
import { Spotlight, ArrowRight } from "lucide-react";
import React from "react";
import type { ImageItem } from "@/components/ui/lightbox";
import { useLanguage } from "@/lib/context/language-context";

export type FeaturedCaseProps = {
  case: any;
  imgRefs: React.RefObject<HTMLDivElement | null>[];
  openLightbox: (
    images: ImageItem[],
    index: number,
    thumbIndex: number,
    imgRefs: React.RefObject<HTMLDivElement | null>[]
  ) => void;
};

const FeaturedCase: React.FC<FeaturedCaseProps> = ({ case: featured, imgRefs, openLightbox }) => {
  const { t } = useLanguage();

  return (
    <div>
      <motion.div className="mb-6 flex items-center gap-3 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
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
              <p className="text-sm text-accent-foreground mb-1">{t.contributionsLabel}</p>
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
            {[0, 1, 2].map((idx) => (
              <div key={idx} className={idx === 2 ? "col-span-2" : undefined}>
                <button
                  onClick={() => openLightbox(featured?.images ?? [], idx, idx, imgRefs)}
                  className="p-0 m-0 bg-transparent border-0 text-left w-full"
                >
                  <div
                    ref={imgRefs[idx]}
                    className={
                      idx === 2
                        ? "col-span-2 aspect-video rounded-xl bg-white/70 border overflow-hidden"
                        : "aspect-4/3 rounded-xl bg-white/70 border overflow-hidden"
                    }
                  >
                    <Image
                      src={featured?.images?.[idx]?.src ?? ""}
                      alt={featured?.images?.[idx]?.alt ?? ""}
                      width={idx === 2 ? 800 : 400}
                      height={idx === 2 ? 450 : 300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              </div>
            ))}
            <figcaption className="col-span-2 text-xs text-accent-foreground">
              {featured?.imageCaption}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCase;
