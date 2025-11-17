"use client";
import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import Image from "next/image";

type ImageItem = { src: string; alt?: string };

type LightboxProps = {
  images: ImageItem[];
  initialIndex?: number;
  onClose: () => void;
};

export default function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);
  const prevFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!images || images.length === 0) return;
    prevFocused.current = document.activeElement as HTMLElement | null;
    // prevent body scroll while open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
      // restore focus
      prevFocused.current?.focus();
    };
  }, [images]);

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    if (!images || images.length === 0) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => (i - 1 + images.length) % images.length);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => (i + 1) % images.length);
        return;
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [images]);

  return (
    <Dialog.Root defaultOpen onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed inset-0 z-60 flex items-center justify-center p-4"
          onInteractOutside={() => onClose()}
        >
          <Dialog.Title className="sr-only">
            {images[index].alt || `Image ${index + 1}`}
          </Dialog.Title>
          <Dialog.Description className="sr-only">{`Image ${index + 1} of ${images.length}`}</Dialog.Description>

          <Dialog.Close asChild>
            <IconButton
              aria-label="Close image"
              className="absolute top-4 right-4 z-60 bg-black/40 text-white"
            >
              <X className="w-5 h-5" />
            </IconButton>
          </Dialog.Close>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-4 z-20 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <div className="max-w-full max-h-full flex items-center justify-center">
            <div
              className="relative w-[90vw] h-[80vh]"
              onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                const endX = e.changedTouches[0].clientX;
                const startX = touchStartX.current ?? endX;
                const dx = endX - startX;
                const threshold = 50; // px
                if (dx > threshold) {
                  goPrev();
                } else if (dx < -threshold) {
                  goNext();
                }
              }}
            >
              {/* Title/Description moved to be direct children of Dialog.Content for Radix accessibility requirements */}
              <Image
                src={images[index].src}
                alt={images[index].alt || ""}
                fill
                sizes="(max-width: 1024px) 90vw, 1600px"
                className="object-contain rounded"
                priority
              />
            </div>
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-4 z-20 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
