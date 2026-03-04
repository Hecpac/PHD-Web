"use client";

import { Suspense, useCallback, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Float } from "@react-three/drei";
import * as THREE from "three";

import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { getLenisInstance } from "@/lib/lenis";

const LOGO_SRC = "/logo/PHD_logo_white.png";
const ASPECT = 754 / 331; // real logo aspect ratio ~2.27

function LogoMesh({ paused, hovered }: { paused: boolean; hovered: boolean }) {
  const texture = useTexture(LOGO_SRC);
  
  // Optimize texture quality and color accuracy
  texture.anisotropy = 16;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

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
        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
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
    <div className="pointer-events-none fixed bottom-32 right-2 z-[85] h-16 w-36 md:bottom-24 md:right-6 md:h-28 md:w-64">
      
      <Canvas
        className="relative z-10 w-full h-full"
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: "none", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5)) drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}
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
        {/* Maximum legibility lighting */}
        <ambientLight intensity={3.0} />
        <directionalLight position={[0, 0, 5]} intensity={4.0} />
        <directionalLight position={[2, 2, 3]} intensity={2.0} />
        <directionalLight position={[-2, -2, 3]} intensity={2.0} />
        
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
