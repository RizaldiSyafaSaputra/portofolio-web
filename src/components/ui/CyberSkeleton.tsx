"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  variant?: "rect" | "circle" | "text";
}

export default function CyberSkeleton({ className = "", variant = "rect" }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden bg-slate-900/50 backdrop-blur-sm border border-white/5 ${
      variant === "circle" ? "rounded-full" : "rounded-2xl"
    } ${className}`}>
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />
      
      {/* Glitch Overlay (Subtle) */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />
      
      {/* Base "Empty" Content to define height if not provided */}
      {variant === "text" && <div className="h-4 w-full" />}
    </div>
  );
}
