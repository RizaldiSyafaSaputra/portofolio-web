"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useAnimation } from "@/context/AnimationContext";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { isPowerMode } = useAnimation();
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!isPowerMode) return;

    // Prevent GSAP from skipping frames for smoother scroll sync
    gsap.ticker.lagSmoothing(0);

    let lenis: Lenis | null = null;

    const initLenis = () => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      // Synchronize ScrollTrigger with Lenis
      lenis.on('scroll', ScrollTrigger.update);

      // Use GSAP ticker for more stable RAF
      const update = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(update);

      // Force initial resize
      setTimeout(() => {
        lenis?.resize();
      }, 500);

      return () => {
        gsap.ticker.remove(update);
        lenis?.destroy();
        lenisRef.current = null;
      };
    };

    const cleanup = initLenis();

    return () => {
      cleanup?.();
    };
  }, [isPowerMode]);

  // Reset scroll on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
}
