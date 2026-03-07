'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function HeroRenderSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    // Lazy load video only after component is mounted and visible
    // Use requestIdleCallback or setTimeout to defer video loading
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      aria-label="Render 3D"
      className="relative z-40 w-full overflow-hidden border-y border-line bg-black"
    >
      <div
        ref={containerRef}
        className="relative h-[58vh] min-h-[340px] w-full sm:h-[62vh] md:h-[66vh] lg:h-[72vh]"
      >
        {shouldLoadVideo ? (
          <video
            className="absolute inset-0 block h-full w-full bg-black object-cover"
            poster="/media/render-3d-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="3D render showcase"
          >
            {/* WebM for better compression (~2MB), MP4 as fallback */}
            <source src="/media/render-3d.webm" type="video/webm" />
            <source src="/media/render-3d.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        ) : (
          /* Show poster image while video is not yet loaded */
          <Image
            src="/media/render-3d-poster.jpg"
            alt="3D render showcase"
            fill
            sizes="100vw"
            className="absolute inset-0 bg-black object-cover"
            priority={false}
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-canvas via-canvas/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-black/10" />
      </div>
    </section>
  );
}
