"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once — safe to call multiple times
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Project-wide defaults: architectural precision
gsap.defaults({
  ease: "expo.out",
  duration: 0.8,
});

export { gsap, ScrollTrigger, useGSAP };
