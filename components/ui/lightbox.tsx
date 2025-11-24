"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, easeInOut } from "framer-motion";

export type ImageItem = { src: string; alt: string };

type LightboxProps = {
  images: ImageItem[];
  initialIndex?: number;
  onClose: () => void;
  // Pass an array of thumbnail rects so the lightbox can animate back to the
  // correct thumbnail for each image when closing
  thumbnailRects?: (DOMRect | null)[];
};

export default function Lightbox(props: LightboxProps) {
  // Fade animatie voor overlay, X-knop en alt-tekst
  const fadeInitial = { opacity: 0 };
  const fadeAnimate = { opacity: 1, transition: { duration: 0.25, ease: easeInOut } };
  const fadeExit = { opacity: 0, transition: { duration: 0.25, ease: easeInOut } };
  const [isClosing, setIsClosing] = useState(false);

  const { images, initialIndex = 0, onClose, thumbnailRects } = props;

  // Helper om te sluiten met animatie (stable reference)
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250); // match animatie duur
  }, [onClose]);
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!images || images.length === 0) return;
    // prevent body scroll while open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [images]);

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    if (!images || images.length === 0) return;

    function onKey(e: KeyboardEvent) {
      // navigate with arrow keys
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

  // Framer Motion animatie voor shared transition
  let initial = {};
  let animate = {};
  let overlayInitial = {};
  let overlayAnimate = {};

  // Start rect for the shared-element opening animation (the thumbnail that
  // was clicked). This is taken from the initialIndex (the image opened).
  const startRect = thumbnailRects?.[initialIndex] ?? null;
  // Exit rect for the current image index when closing the lightbox.
  const exitRect = thumbnailRects?.[index] ?? null;

  if (startRect) {
    const { top, left, width, height } = startRect;
    const vw = typeof window !== "undefined" ? window.innerWidth : 0;
    const vh = typeof window !== "undefined" ? window.innerHeight : 0;
    const targetWidth = vw * 0.9;
    const targetHeight = vh * 0.8;
    const targetLeft = (vw - targetWidth) / 2;
    const targetTop = (vh - targetHeight) / 2;
    initial = {
      position: "fixed",
      top,
      left,
      width,
      height,
      zIndex: 100,
      borderRadius: 0,
      opacity: 1,
      scale: 1,
    };
    animate = {
      top: targetTop,
      left: targetLeft,
      width: targetWidth,
      height: targetHeight,
      borderRadius: 0,
      transition: { duration: 0.25, ease: easeInOut },
    };
    overlayInitial = { opacity: 0 };
    overlayAnimate = { opacity: 1, transition: { duration: 0.25, ease: easeInOut } };
  }
  // create the exit animation target from the rect for the image being
  // closed (exitRect). The exit object is applied when `isClosing` is true.
  let exit: Record<string, any> = {};
  if (exitRect) {
    const { top, left, width, height } = exitRect;
    exit = {
      position: "fixed",
      top,
      left,
      width,
      height,
      zIndex: 100,
      borderRadius: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.25, ease: easeInOut },
    };
  }

  return (
    <Dialog.Root
      open
      // Let Radix handle keyboard close (Escape). Radix will call onOpenChange(false)
      // — we intercept and run our closing animation (handleClose) before calling
      // the parent's onClose handler.
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay forceMount asChild>
          <motion.div
            initial={fadeInitial}
            animate={isClosing ? fadeExit : fadeAnimate}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
        </Dialog.Overlay>
        <Dialog.Content
          forceMount
          asChild
          className="fixed inset-0 z-60 flex items-center justify-center p-4"
          onInteractOutside={handleClose}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <Dialog.Title className="sr-only">
              {images[index].alt || `Image ${index + 1}`}
            </Dialog.Title>
            <Dialog.Description className="sr-only">{`Image ${index + 1} of ${images.length}`}</Dialog.Description>

            <Dialog.Close asChild>
              <motion.button
                type="button"
                aria-label="Close image"
                className="absolute top-4 right-4 z-60 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={handleClose}
                animate={isClosing ? fadeExit : fadeAnimate}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </Dialog.Close>

            {/* Image */}
            <div className="relative max-w-full max-h-full flex items-center justify-center">
              {startRect ? (
                <motion.figure
                  initial={initial}
                  animate={isClosing ? exit : animate}
                  className="m-0 flex flex-col h-full"
                  style={{ overflow: "hidden" }}
                >
                  <div className="relative flex-1">
                    <Image
                      src={images[index].src}
                      alt={images[index].alt || ""}
                      aria-describedby={images[index].alt ? `lightbox-caption-${index}` : undefined}
                      fill
                      sizes="(max-width: 1024px) 90vw, 1600px"
                      className="object-contain rounded"
                      priority
                    />
                  </div>
                  {images[index].alt ? (
                    <motion.figcaption
                      id={`lightbox-caption-${index}`}
                      className="mt-3 text-sm text-white/90 text-center"
                      animate={isClosing ? fadeExit : fadeAnimate}
                    >
                      {images[index].alt}
                    </motion.figcaption>
                  ) : null}
                </motion.figure>
              ) : (
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
                  <figure className="m-0 flex flex-col h-full">
                    <div className="relative flex-1">
                      <Image
                        src={images[index].src}
                        alt={images[index].alt || ""}
                        aria-describedby={
                          images[index].alt ? `lightbox-caption-${index}` : undefined
                        }
                        fill
                        sizes="(max-width: 1024px) 90vw, 1600px"
                        className="object-contain rounded"
                        priority
                      />
                    </div>
                    {images[index].alt ? (
                      <figcaption
                        id={`lightbox-caption-${index}`}
                        className="mt-3 text-sm text-white/90 text-center"
                      >
                        {images[index].alt}
                      </figcaption>
                    ) : null}
                  </figure>
                </div>
              )}
            </div>

            {/* Prev */}
            {images.length > 1 && (
              <button
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-4 z-100 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <button
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-4 z-100 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
