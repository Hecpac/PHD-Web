"use client";

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type ScrollRevealImageProps = ImageProps & {
    wrapperClassName?: string;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
};

export function ScrollRevealImage({
    wrapperClassName,
    className,
    direction = "up",
    delay = 0,
    alt,
    ...props
}: ScrollRevealImageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const shouldReduceMotion = useReducedMotion();

    // Directions mapping to clip-path insets
    // inset(top right bottom left)
    const variants = {
        hidden: {
            clipPath:
                direction === "up"
                    ? "inset(100% 0 0 0)"
                    : direction === "down"
                        ? "inset(0 0 100% 0)"
                        : direction === "left"
                            ? "inset(0 0 0 100%)"
                            : "inset(0 100% 0 0)", // right
        },
        visible: {
            clipPath: "inset(0 0 0 0)",
            transition: {
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1.0] as const, // cubic-bezier
                delay: delay,
            },
        },
    };

    if (shouldReduceMotion) {
        return (
            <div className={cn("relative overflow-hidden", wrapperClassName)}>
                <Image alt={alt} className={cn("object-cover", className)} {...props} />
            </div>
        );
    }

    return (
        <div ref={ref} className={cn("relative overflow-hidden", wrapperClassName)}>
            <motion.div
                className="h-full w-full"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
            >
                <Image alt={alt} className={cn("object-cover", className)} {...props} />
            </motion.div>
        </div>
    );
}
