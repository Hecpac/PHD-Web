"use client";

import { Suspense, useCallback, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Float } from "@react-three/drei";
import * as THREE from "three";

import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { getLenisInstance } from "@/lib/lenis";

const LOGO_SRC = "/logo/logo.png";
const ASPECT = 3040 / 1408; // real logo aspect ratio ~2.16

function LogoMesh({ paused, hovered }: { paused: boolean; hovered: boolean }) {
  const texture = useTexture(LOGO_SRC);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current && !paused) {
      // Dynamic movement on hover/touch
      const targetScale = hovered ? 1.15 : 1;
      const targetRotationX = hovered ? -0.15 : 0;
      const targetRotationY = hovered ? 0.25 : 0;

      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 10)
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, targetRotationX, delta * 8
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, targetRotationY, delta * 8
      );
    }
  });

  const mesh = (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[ASPECT, 1]} />
        <meshStandardMaterial
          map={texture}
          transparent
          metalness={0.4}
          roughness={0.1}
        />
      </mesh>
    </group>
  );

  if (paused) {
    return mesh;
  }

  return (
    <Float
      speed={2.5}
      rotationIntensity={0.5}
      floatIntensity={1.2}
      floatingRange={[-0.06, 0.06]}
    >
      {mesh}
    </Float>
  );
}

export function FloatingLogoScene() {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") {
        e.preventDefault();
        const lenis = getLenisInstance();
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          // Native fallback — also covers when Lenis is not active
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    },
    [pathname],
  );

  return (
    <div className="pointer-events-none fixed bottom-20 left-4 z-[85] h-16 w-36 md:bottom-24 md:left-6 md:h-20 md:w-44">
      {/* Balanced backdrop glow for legibility over dark backgrounds */}
      <div className="absolute -inset-2 z-0 rounded-[50%] bg-white/30 blur-[16px] dark:bg-white/20" aria-hidden="true" />
      
      <Canvas
        className="relative z-10"
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
        {/* Bright studio lighting setup for high legibility */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 5, 3]} intensity={2.5} />
        <directionalLight position={[-2, -5, -3]} intensity={1.5} />
        <spotLight position={[0, 0, 5]} intensity={2} penumbra={1} />
        
        <Suspense fallback={null}>
          <LogoMesh paused={shouldReduceMotion} hovered={hovered} />
        </Suspense>
      </Canvas>

      <Link
        href="/"
        aria-label="Premium Home Design — Go to homepage"
        className="pointer-events-auto absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        data-cursor="link"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
      >
        <span className="sr-only">Premium Home Design — Go to homepage</span>
      </Link>
    </div>
  );
}
