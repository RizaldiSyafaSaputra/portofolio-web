"use client";

import { motion } from "framer-motion";

interface GlowingBackgroundProps {
  variant?: "cyan" | "indigo" | "sunset";
}

export function GlowingBackground({ variant = "cyan" }: GlowingBackgroundProps) {
  const colors = {
    cyan: ["bg-cyan-500/20", "bg-purple-500/20", "bg-blue-500/10"],
    indigo: ["bg-indigo-500/20", "bg-blue-600/20", "bg-slate-500/10"],
    sunset: ["bg-orange-500/20", "bg-pink-500/20", "bg-red-500/10"],
  };

  const currentColors = colors[variant];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Dark Base */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full ${currentColors[0]} blur-[120px]`}
      />
      
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full ${currentColors[1]} blur-[120px]`}
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className={`absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full ${currentColors[2]} blur-[100px]`}
      />

      {/* Grid overlay for texture */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </div>
  );
}
