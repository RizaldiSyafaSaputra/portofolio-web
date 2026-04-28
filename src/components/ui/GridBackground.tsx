"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useAnimation } from "@/context/AnimationContext";

export default function GridBackground() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  const { isPowerMode } = useAnimation();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse movement
  const springConfig = { damping: 40, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const background = useTransform(
    [smoothX, smoothY],
    ([x, y]) => isPowerMode 
      ? `radial-gradient(400px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.12), transparent 80%)`
      : 'none'
  );

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Generate particles only on the client
    const newParticles = [...Array(15)].map((_, i) => ({
      id: i,
      initialOpacity: Math.random() * 0.3,
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      duration: Math.random() * 8 + 8,
    }));
    setParticles(newParticles);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Interactive Mouse Glow */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ background }}
      />

      {/* Base Grid */}
      <div 
        className="absolute inset-0 opacity-[0.04]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
      
      {/* Static Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.08),transparent_50%)]" />
      
      {/* Moving Particles */}
      {isPowerMode && (
        <div className="absolute inset-0">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ 
                opacity: p.initialOpacity,
                x: p.x, 
                y: p.y 
              }}
              animate={{
                opacity: [p.initialOpacity, p.initialOpacity + 0.2, p.initialOpacity],
                y: ["-2%", "102%"],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
              className="absolute w-[1px] h-20 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
            />
          ))}
        </div>
      )}
    </div>
  );
}
