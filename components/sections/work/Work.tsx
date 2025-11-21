"use client";
import React, { useState, useRef, createRef, useMemo, useEffect } from "react";
import { useLanguage } from "@/lib/context/language-context";
import SectionHeading from "@/components/ui/section-heading";
import Lightbox, { ImageItem } from "@/components/ui/lightbox";
import FeaturedCase from "@/components/sections/work/FeaturedCase";
import OtherCases from "@/components/sections/work/OtherCases";

type WorkProps = Record<string, never>;

const Work: React.FC<WorkProps> = () => {
  const { t } = useLanguage();
  const featured = (t as any).cases?.[0];
  const otherCases = (t as any).cases?.slice(1) ?? [];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<ImageItem[]>([]);
  const [lightboxRects, setLightboxRects] = useState<(DOMRect | null)[]>([]);
  const ref0 = useRef<HTMLDivElement | null>(null);
  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);
  const featuredImgRefs = useMemo(() => [ref0, ref1, ref2], []);
  const otherImgRefs = useMemo(
    () => Array.from({ length: otherCases.length }, () => createRef<HTMLDivElement | null>()),
    [otherCases.length]
  );

  const openLightbox = (images: ImageItem[], index = 0) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (lightboxOpen) {
      if (lightboxImages.length === featuredImgRefs.length) {
        const rects = featuredImgRefs.map((r) =>
          r.current instanceof HTMLElement ? r.current.getBoundingClientRect() : null
        );
        setLightboxRects(rects);
      } else if (otherImgRefs.length > 0) {
        const rects = otherImgRefs.map((r) =>
          r.current instanceof HTMLElement ? r.current.getBoundingClientRect() : null
        );
        setLightboxRects(rects);
      } else {
        setLightboxRects([]);
      }
    }
  }, [lightboxOpen, lightboxImages.length, featuredImgRefs, otherImgRefs]);

  return (
    <>
      <SectionHeading id="work-heading">{t.workTitle}</SectionHeading>
      <FeaturedCase
        featured={featured}
        featuredImgRefs={featuredImgRefs}
        openLightbox={openLightbox}
      />
      <OtherCases otherCases={otherCases} otherImgRefs={otherImgRefs} openLightbox={openLightbox} />
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          thumbnailRects={lightboxRects}
        />
      )}
    </>
  );
};

export default Work;
