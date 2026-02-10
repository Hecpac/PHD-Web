"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type NoiseBackgroundProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  gradientColors?: string[];
};

export function NoiseBackground({
  children,
  className,
  containerClassName,
  gradientColors = [
    "rgb(255, 100, 150)",
    "rgb(100, 150, 255)",
    "rgb(255, 200, 100)",
  ],
}: NoiseBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      draw();
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradientColors.forEach((color, i) => {
        gradient.addColorStop(i / (gradientColors.length - 1), color);
      });
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Noise overlay
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 50;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
      ctx.putImageData(imageData, 0, 0);
    }

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [gradientColors]);

  return (
    <div className={cn("relative", containerClassName)}>
      <canvas
        ref={canvasRef}
        className={cn("absolute inset-0 h-full w-full", className)}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
