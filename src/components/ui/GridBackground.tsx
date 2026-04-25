"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GridBackground() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    // Generate particles only on the client
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      initialOpacity: Math.random() * 0.5,
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      duration: Math.random() * 5 + 5,
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Radial Glows */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />
      
      {/* Moving Particles (Simulated) */}
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
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-cyan-500 rounded-full blur-[1px]"
          />
        ))}
      </div>
    </div>
  );
}

