"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useTransform, useSpring } from "framer-motion";

import type { GalleryImage } from "@/lib/types/content";

type LightboxProps = {
  images: GalleryImage[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
};

type LightboxContentProps = {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
  shouldReduceMotion: boolean | null;
};

function LightboxContent({ images, initialIndex, onClose, shouldReduceMotion }: LightboxContentProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Focus trap
  useEffect(() => {
    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab" || !overlayRef.current) return;
      const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  const goPrev = useCallback(
    () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1)),
    [images.length],
  );
  const goNext = useCallback(
    () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length],
  );

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, onClose]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const currentImage = images[currentIndex];
  const reduceMotion = shouldReduceMotion ?? false;

  if (!currentImage) return null;

  return (
    <motion.div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev button */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Image */}
      <motion.div
        className="relative max-h-[85vh] max-w-[90vw]"
        style={
          reduceMotion
            ? undefined
            : {
                perspective: 1000,
                rotateX: springRotateX,
                rotateY: springRotateY,
              }
        }
        onMouseMove={reduceMotion ? undefined : handleMouseMove}
        onMouseLeave={reduceMotion ? undefined : handleMouseLeave}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={currentImage.width}
          height={currentImage.height}
          className="max-h-[85vh] w-auto rounded-lg object-contain"
          sizes="90vw"
        />
      </motion.div>

      {/* Next button */}
      <button
        type="button"
        onClick={goNext}
        aria-label="Next image"
        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Counter */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-sm text-white/70">
        {currentIndex + 1} / {images.length}
      </p>
    </motion.div>
  );
}

export function Lightbox({ images, initialIndex = 0, open, onClose }: LightboxProps) {
  const shouldReduceMotion = useReducedMotion();
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Capture previous focus when opening
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [open]);

  // Restore focus on close
  useEffect(() => {
    if (!open && previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <LightboxContent
          key={`${initialIndex}-${images.length}`}
          images={images}
          initialIndex={initialIndex}
          onClose={onClose}
          shouldReduceMotion={shouldReduceMotion}
        />
      ) : null}
    </AnimatePresence>
  );
}
