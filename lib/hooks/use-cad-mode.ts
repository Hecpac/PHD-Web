"use client";

import { useEffect, useState, useCallback } from "react";

export function useCadMode() {
  const [active, setActive] = useState(false);

  const toggle = useCallback(() => {
    setActive((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("cad-mode");
      } else {
        document.documentElement.classList.remove("cad-mode");
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const sequence = ["d", "f", "w"];
    let buffer: string[] = [];
    let timer: ReturnType<typeof setTimeout>;

    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC exits CAD mode
      if (e.key === "Escape" && active) {
        toggle();
        return;
      }

      buffer.push(e.key.toLowerCase());
      clearTimeout(timer);
      timer = setTimeout(() => {
        buffer = [];
      }, 2000);

      if (buffer.length >= 3) {
        const last3 = buffer.slice(-3);
        if (last3[0] === sequence[0] && last3[1] === sequence[1] && last3[2] === sequence[2]) {
          toggle();
          buffer = [];
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [active, toggle]);

  return active;
}
