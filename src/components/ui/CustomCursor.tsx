"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";

export default function CustomCursor() {
  const { isPowerMode } = useAnimation();
  const [mounted, setMounted] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement;
      
      if (cursorTarget) {
        setHoverType(cursorTarget.getAttribute("data-cursor"));
      } else if (target.closest("a") || target.closest("button")) {
        setHoverType("pointer");
      } else {
        setHoverType(null);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted || !isPowerMode) return null;

  return (
    <>
      {/* Primary Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Trailing Ring & Label Container */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* The Ring */}
        <motion.div
          className="absolute border border-cyan-400 rounded-full"
          animate={{
            width: hoverType ? (hoverType === 'view' ? 80 : 50) : 32,
            height: hoverType ? (hoverType === 'view' ? 80 : 50) : 32,
            opacity: hoverType ? 0.8 : 0.4,
            backgroundColor: hoverType ? "rgba(34, 211, 238, 0.15)" : "rgba(34, 211, 238, 0)",
            rotate: hoverType ? 90 : 0
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />

        {/* Dynamic Label */}
        <AnimatePresence>
          {hoverType && hoverType !== 'pointer' && (
            <motion.span
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 10 }}
              className="text-[8px] font-black text-white uppercase tracking-[0.2em] bg-cyan-500 px-2 py-1 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)] z-20"
            >
              {hoverType}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Ambient Glow (Power Mode) */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none -z-10"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
