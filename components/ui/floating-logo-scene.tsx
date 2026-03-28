"use client";

import Image from "next/image";
import {
  Component,
  Suspense,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import { type Group, MathUtils } from "three";

import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { getLenisInstance } from "@/lib/lenis";
import { cn } from "@/lib/utils";

const LOGO_DEFAULT = "/logo/PHD_logo-removebg-preview.png";
const LOGO_DRAFTING = "/logo/PHD_drafting_logo.png";
const HOME_HREF = "/";
const ASPECT_DEFAULT = 3040 / 1408;
const ASPECT_DRAFTING = 1536 / 1024;

type SceneBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
  onError: () => void;
};

type SceneBoundaryState = {
  hasError: boolean;
};

class SceneBoundary extends Component<SceneBoundaryProps, SceneBoundaryState> {
  state: SceneBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function LogoMesh({ paused, hovered, logoSrc, aspect }: { paused: boolean; hovered: boolean; logoSrc: string; aspect: number }) {
  const texture = useTexture(logoSrc);
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && !paused) {
      const targetScale = hovered ? 1.15 : 1;
      const targetRotationX = hovered ? -0.15 : 0;
      const targetRotationY = hovered ? 0.25 : 0;

      groupRef.current.scale.setScalar(
        MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 10),
      );
      groupRef.current.rotation.x = MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        delta * 8,
      );
      groupRef.current.rotation.y = MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        delta * 8,
      );
    }
  });

  const mesh = (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[aspect, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
          color="#ffffff"
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

function canCreateWebGlContext() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function FloatingLogoScene() {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isForBuilders = pathname.startsWith("/for-builders");
  const logoSrc = isForBuilders ? LOGO_DRAFTING : LOGO_DEFAULT;
  const logoAspect = isForBuilders ? ASPECT_DRAFTING : ASPECT_DEFAULT;
  const logoAlt = isForBuilders ? "Premium Home Drafting" : "Premium Home Design";
  const [hovered, setHovered] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const canRenderScene = useMemo(() => canCreateWebGlContext(), []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname !== "/") {
        return;
      }

      e.preventDefault();

      const lenis = getLenisInstance();
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [pathname],
  );

  const fallbackLogo = (
    <div className="relative z-10 flex h-full w-full items-center justify-center px-3 py-2">
      <Image
        src={logoSrc}
        alt={logoAlt}
        fill
        className="object-contain"
        sizes="256px"
      />
    </div>
  );

  const shouldUseStaticLogo = !canRenderScene || sceneFailed;

  return (
    <div className={cn(
      "pointer-events-none fixed bottom-20 right-3 z-[85] md:bottom-24 md:right-6",
      isForBuilders
        ? "h-24 w-36 md:h-40 md:w-60"
        : "h-16 w-36 md:h-28 md:w-64",
    )}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-white/90 blur-[32px]" />

      {shouldUseStaticLogo ? (
        fallbackLogo
      ) : (
        <SceneBoundary fallback={fallbackLogo} onError={() => setSceneFailed(true)}>
          <Canvas
            className="relative z-10 h-full w-full"
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true }}
            style={{ pointerEvents: "none" }}
            camera={{ position: [0, 0, 1.8], fov: 45 }}
          >
            <ambientLight intensity={3.0} />
            <directionalLight position={[0, 0, 5]} intensity={4.0} />
            <directionalLight position={[2, 2, 3]} intensity={2.0} />
            <directionalLight position={[-2, -2, 3]} intensity={2.0} />

            <Suspense fallback={null}>
              <LogoMesh paused={shouldReduceMotion} hovered={hovered} logoSrc={logoSrc} aspect={logoAspect} />
            </Suspense>
          </Canvas>
        </SceneBoundary>
      )}

      <Link
        href={HOME_HREF}
        aria-label={`${logoAlt} - Go to home`}
        className="pointer-events-auto absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        data-cursor="link"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
      >
        <span className="sr-only">{logoAlt} - Go to home</span>
      </Link>
    </div>
  );
}
