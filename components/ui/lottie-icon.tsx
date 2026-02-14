"use client";

import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";

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
    const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

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
            className={cn("relative", className)}
            onMouseEnter={() => {
                if (hover && dotLottie) {
                    dotLottie.play();
                }
            }}
            onMouseLeave={() => {
                if (hover && dotLottie) {
                    dotLottie.stop();
                }
            }}
        >
            <DotLottieReact
                src={src}
                loop={loop}
                autoplay={autoplay && !hover}
                dotLottieRefCallback={setDotLottie}
            />
        </div>
    );
}
