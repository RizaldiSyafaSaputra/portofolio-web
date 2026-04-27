"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

interface TechIcon {
  src: string;
  label: string;
  color: string;
}

const ALL_ICONS: TechIcon[] = [
  { src: "/images/tech/React.svg", label: "React", color: "#61DAFB" },
  { src: "/images/tech/next_js.svg", label: "Next.js", color: "#FFFFFF" },
  { src: "/images/tech/vue.svg", label: "Vue", color: "#4FC08D" },
  { src: "/images/tech/javascript.svg", label: "JavaScript", color: "#F7DF1E" },
  { src: "/images/tech/node_js.svg", label: "Node.js", color: "#339933" },
  { src: "/images/tech/docker.svg", label: "Docker", color: "#2496ED" },
  { src: "/images/tech/Tailwind.svg", label: "Tailwind", color: "#06B6D4" },
  { src: "/images/tech/supabase.svg", label: "Supabase", color: "#3ECF8E" },
  { src: "/images/tech/figma.svg", label: "Figma", color: "#F24E1E" },
  { src: "/images/tech/Canva.svg", label: "Canva", color: "#00C4CC" },
  { src: "/images/tech/Excel.svg", label: "Excel", color: "#217346" },
];

export function ToolOrbit({ isPowerMode }: { isPowerMode: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Rotate to the next batch of 5 icons every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 5) % ALL_ICONS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Determine current 5 icons based on currentIndex
  const currentIcons: TechIcon[] = [];
  for (let i = 0; i < 5; i++) {
    currentIcons.push(ALL_ICONS[(currentIndex + i) % ALL_ICONS.length]);
  }

  // Split into 2 arrays for the orbits:
  const middleIcons = currentIcons.slice(0, 3);
  const outerIcons = currentIcons.slice(3, 5);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Orbit 1 - Inner (Empty, just spinning line) */}
      <motion.div
        animate={isPowerMode ? { rotate: 360 } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[45%] h-[45%] border border-cyan-500/20 border-dashed rounded-full shadow-[0_0_30px_rgba(34,211,238,0.1)]"
      />

      {/* Orbit 2 - Middle (3 items) */}
      <motion.div
        animate={isPowerMode ? { rotate: -360 } : {}}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[75%] h-[75%] border border-purple-500/20 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.1)]"
      >
        <AnimatePresence>
          {middleIcons.map((icon, i) => (
            <OrbitIcon 
              key={`${icon.label}-${currentIndex}`} 
              icon={icon} 
              angle={(i * 360) / middleIcons.length} 
              isPowerMode={isPowerMode} 
              duration={40} 
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Orbit 3 - Outer (2 items) */}
      <motion.div
        animate={isPowerMode ? { rotate: 360 } : {}}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[105%] h-[105%] border border-blue-500/20 border-dashed rounded-full shadow-[0_0_30px_rgba(59,130,246,0.1)]"
      >
        <AnimatePresence>
          {outerIcons.map((icon, i) => (
            <OrbitIcon 
              key={`${icon.label}-${currentIndex}`} 
              icon={icon} 
              angle={((i * 360) / outerIcons.length) + 45} 
              isPowerMode={isPowerMode} 
              duration={60} 
              reverse 
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Static Glows */}
      <div className="absolute w-[120%] h-[120%] bg-cyan-500/5 blur-[100px] rounded-full -z-10" />
    </div>
  );
}

function OrbitIcon({ 
  icon, 
  angle, 
  isPowerMode,
  duration,
  reverse = false
}: { 
  icon: TechIcon, 
  angle: number, 
  isPowerMode: boolean,
  duration: number,
  reverse?: boolean
}) {
  const left = `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 50}%)`;
  const top = `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 50}%)`;

  return (
    <motion.div 
      className="absolute origin-center" 
      style={{ left, top }}
      initial={{ scale: 0, opacity: 0, rotate: -180, x: "-50%", y: "-50%" }}
      animate={{ scale: 1, opacity: 1, rotate: 0, x: "-50%", y: "-50%" }}
      exit={{ scale: 0, opacity: 0, rotate: 180, x: "-50%", y: "-50%" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
    >
      <motion.div 
        className="relative group origin-center"
        animate={isPowerMode ? { rotate: reverse ? -360 : 360 } : {}}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center p-2.5 md:p-3 bg-neutral-950/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden hover:border-white/30 transition-all duration-300 pointer-events-auto">
          {/* Intense Neon Glow Effect */}
          <div 
            className="absolute inset-0 rounded-2xl blur-xl opacity-30 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" 
            style={{ backgroundColor: icon.color }}
          />
          <div 
            className="absolute inset-0 rounded-2xl blur-md opacity-20 group-hover:opacity-80 transition-opacity duration-500" 
            style={{ backgroundColor: icon.color }}
          />
          
          {/* Icon Image */}
          <motion.img
            src={icon.src}
            alt={icon.label}
            className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-500 group-hover:scale-110"
            whileHover={{ y: -2 }}
          />

          {/* Label Tooltip */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/20 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white whitespace-nowrap z-30 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-xl pointer-events-none">
            {icon.label}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
