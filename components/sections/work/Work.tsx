"use client";
import React, { useState, useRef, createRef, useMemo, useLayoutEffect } from "react";
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
  const [lightboxThumbIndex, setLightboxThumbIndex] = useState(0);
  const ref0 = useRef<HTMLDivElement | null>(null);
  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);
  const featuredImgRefs = useMemo(() => [ref0, ref1, ref2], []);
  const otherImgRefs = useMemo(
    () => Array.from({ length: otherCases.length }, () => createRef<HTMLDivElement | null>()),
    [otherCases.length]
  );

  const openLightbox = (images: ImageItem[], index = 0, thumbIndex = 0) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxThumbIndex(thumbIndex);
    setLightboxOpen(true);
  };

  useLayoutEffect(() => {
    if (lightboxOpen) {
      if (lightboxImages.length === featuredImgRefs.length) {
        const rects = featuredImgRefs.map((r) =>
          r.current instanceof HTMLElement ? r.current.getBoundingClientRect() : null
        );
        requestAnimationFrame(() => setLightboxRects(rects));
      } else if (otherImgRefs.length > 0) {
        const rect =
          otherImgRefs[lightboxThumbIndex] &&
          otherImgRefs[lightboxThumbIndex].current instanceof HTMLElement
            ? otherImgRefs[lightboxThumbIndex].current.getBoundingClientRect()
            : null;
        requestAnimationFrame(() => setLightboxRects([rect]));
      } else {
        requestAnimationFrame(() => setLightboxRects([]));
      }
    }
  }, [lightboxOpen, lightboxImages.length, featuredImgRefs, otherImgRefs, lightboxThumbIndex]);

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
