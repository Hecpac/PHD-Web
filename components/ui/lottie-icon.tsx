"use client";

import { useEffect, useRef, useState } from "react";
import { DotLottiePlayer, type DotLottieCommonPlayer } from "@dotlottie/react-player";

import { cn } from "@/lib/utils";

type LottieIconProps = {
    src?: string;
    loop?: boolean;
    autoplay?: boolean;
    hover?: boolean;
    className?: string;
};

export function LottieIcon({
    src,
    loop = true,
    autoplay = true,
    hover = false,
    className,
}: LottieIconProps) {
    const lottieRef = useRef<DotLottieCommonPlayer>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!lottieRef.current) return;

        if (hover) {
            if (isHovered) {
                lottieRef.current.play();
            } else {
                lottieRef.current.pause();
                lottieRef.current.seek(0);
            }
        }
    }, [isHovered, hover]);

    // Fallback if no src provided
    if (!src) {
        return (
            <div
                className={cn(
                    "flex items-center justify-center rounded-full bg-accent/10 text-accent",
                    className,
                )}
            >
                <div className="h-1/2 w-1/2 rounded-full bg-current opacity-20" />
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={cn("relative", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <DotLottiePlayer
                ref={lottieRef}
                src={src}
                loop={loop}
                autoplay={autoplay && !hover}
            />
        </div>
    );
}
