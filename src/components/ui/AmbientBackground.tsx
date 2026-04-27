"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { useAnimation } from "@/context/AnimationContext";

export function AmbientBackground() {
  const { isPowerMode } = useAnimation();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const background = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.15), transparent 80%)`
  );

  useEffect(() => {
    setMounted(true);

    if (!isPowerMode) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Generate random particles
    const newParticles = [...Array(30)].map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      animationDuration: Math.random() * 10 + 15 + "s",
      animationDelay: Math.random() * -20 + "s",
      size: Math.random() * 3 + 1 + "px",
      opacity: Math.random() * 0.5 + 0.1
    }));
    setParticles(newParticles);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isPowerMode]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
      {/* Interactive Mouse Glow */}
      {isPowerMode && (
        <motion.div
          className="absolute inset-0 z-10 mix-blend-screen opacity-50 md:opacity-100"
          style={{ background }}
        />
      )}

      {/* Base Grid */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isPowerMode ? 'opacity-[0.05]' : 'opacity-[0.02]'}`} 
        style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Particles */}
      {isPowerMode && mounted && particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-0 bg-cyan-400 rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: "0 0 10px rgba(34,211,238,0.8)"
          }}
          animate={{
            y: ["0vh", "-100vh"],
            x: ["0px", Math.random() > 0.5 ? "50px" : "-50px"]
          }}
          transition={{
            duration: parseFloat(p.animationDuration),
            delay: parseFloat(p.animationDelay),
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Sweeping Aurora/Neon Glows */}
      {isPowerMode ? (
        <>
          {/* Top Left Cyan */}
          <motion.div
            animate={{
              scale: [1, 1.2, 0.9, 1],
              opacity: [0.15, 0.25, 0.15],
              x: ["-10%", "10%", "-10%"],
              y: ["-10%", "10%", "-10%"],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-cyan-500/20 rounded-full blur-[120px] -translate-x-1/4 -translate-y-1/4"
          />

          {/* Bottom Right Emerald */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.3, 0.15],
              x: ["10%", "-10%", "10%"],
              y: ["10%", "-10%", "10%"],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-0 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-emerald-500/20 rounded-full blur-[130px] translate-x-1/4 translate-y-1/4"
          />

          {/* Center Purple Sweeping */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 w-[80vw] h-[40vw] max-w-[1000px] max-h-[500px] bg-purple-600/15 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
          />
        </>
      ) : (
        /* Simple static glows for low power mode */
        <>
          <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-cyan-500/5 rounded-full blur-[100px] -translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-emerald-500/5 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />
        </>
      )}
      
      {/* Permanent Bottom Ambient Glow */}
      <div className={`absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-cyan-900/10 via-emerald-900/5 to-transparent blur-xl transition-all duration-1000 ${isPowerMode ? 'opacity-100' : 'opacity-50'}`} />
    </div>
  );
}
