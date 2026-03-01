"use client";

import { Suspense, useRef } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import type { Mesh } from "three";

import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const LOGO_SRC = "/logo/logo.png";
const ASPECT = 3040 / 1408; // real logo aspect ratio ~2.16

function LogoMesh({ paused }: { paused: boolean }) {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(LOGO_SRC);

  useFrame(({ clock }) => {
    if (paused || !meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.05;
    meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.12;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.04;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[ASPECT, 1]} />
      <meshStandardMaterial
        map={texture}
        transparent
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
}

export function FloatingLogoScene() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed bottom-24 left-6 z-[85] hidden h-20 w-44 md:block">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: "none" }}
        camera={{ position: [0, 0, 1.8], fov: 45 }}
        fallback={
          <Link
            href="/"
            className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-[0.15em] text-gold"
            aria-label="Premium Home Design — Go to homepage"
          >
            PHD
          </Link>
        }
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 3]} intensity={1} />
        <Suspense fallback={null}>
          <LogoMesh paused={shouldReduceMotion} />
        </Suspense>
      </Canvas>

      <Link
        href="/"
        aria-label="Premium Home Design — Go to homepage"
        className="pointer-events-auto absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        data-cursor="link"
      >
        <span className="sr-only">Premium Home Design — Go to homepage</span>
      </Link>
    </div>
  );
}
