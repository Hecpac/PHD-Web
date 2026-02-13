"use client";

import { useEffect, useRef } from "react";

const HERO_SELECTOR = 'section[aria-label="Hero — DFW custom home builder"]';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function useHeroTypewriter() {
  const hasAnimated = useRef(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(HERO_SELECTOR);
    const line1 = document.querySelector<HTMLElement>('[data-hero-reveal="line-1"]');
    const line2 = document.querySelector<HTMLElement>('[data-hero-reveal="line-2"]');
    const subtitle = document.querySelector<HTMLElement>('[data-hero-reveal="subtitle"]');

    if (!hero || !line1 || !line2 || !subtitle) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const line1Text = line1.textContent ?? "";
    const line2Text = line2.textContent ?? "";
    const subtitleText = subtitle.textContent ?? "";
    const timeouts: number[] = [];
    const intervals: number[] = [];

    const clearPending = () => {
      for (const timeout of timeouts) window.clearTimeout(timeout);
      for (const interval of intervals) window.clearInterval(interval);
    };

    const showStaticText = () => {
      line1.textContent = line1Text;
      line2.textContent = line2Text;
      subtitle.textContent = subtitleText;
      line1.style.opacity = "1";
      line2.style.opacity = "1";
      subtitle.style.opacity = "1";
    };

    const typewriterEffect = (element: HTMLElement, text: string) => {
      element.textContent = "";
      element.style.opacity = "1";
      let charIndex = 0;

      const intervalId = window.setInterval(() => {
        if (charIndex < text.length) {
          element.textContent += text[charIndex];

          if (Math.random() > 0.7) {
            element.classList.add("glitch-effect");
            element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            const glitchTimeout = window.setTimeout(() => {
              element.classList.remove("glitch-effect");
              element.style.transform = "translate(0, 0)";
            }, 120);
            timeouts.push(glitchTimeout);
          }

          charIndex += 1;
          return;
        }

        window.clearInterval(intervalId);
        const cursor = document.createElement("span");
        cursor.textContent = "|";
        cursor.className = "ml-1 inline-block animate-pulse";
        element.appendChild(cursor);

        const cursorTimeout = window.setTimeout(() => {
          cursor.remove();
        }, 1000);
        timeouts.push(cursorTimeout);
      }, 80);

      intervals.push(intervalId);
    };

    const handleScroll = () => {
      if (hasAnimated.current) return;

      const heroRect = hero.getBoundingClientRect();
      const scrollSpan = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const heroProgress = clamp(-heroRect.top / scrollSpan, 0, 1);

      if (heroProgress >= 0.7 && heroProgress <= 0.9) {
        hasAnimated.current = true;

        if (prefersReducedMotion) {
          showStaticText();
          return;
        }

        const line1Timeout = window.setTimeout(() => typewriterEffect(line1, line1Text), 300);
        const line2Timeout = window.setTimeout(() => typewriterEffect(line2, line2Text), 2000);
        const subtitleTimeout = window.setTimeout(() => {
          subtitle.textContent = subtitleText;
          subtitle.style.transition = "opacity 1s ease";
          subtitle.style.opacity = "1";
        }, 3800);

        timeouts.push(line1Timeout, line2Timeout, subtitleTimeout);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearPending();
    };
  }, []);
}
