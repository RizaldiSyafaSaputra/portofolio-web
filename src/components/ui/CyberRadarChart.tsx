"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useAnimation } from "@/context/AnimationContext";

interface SkillData {
  name: string;
  value: number;
}

interface CyberRadarChartProps {
  data: SkillData[];
  size?: number;
}

export default function CyberRadarChart({ data, size = 400 }: CyberRadarChartProps) {
  const { isPowerMode } = useAnimation();
  const center = size / 2;
  const radius = (size / 2) * 0.8;
  const angleStep = (Math.PI * 2) / data.length;

  const points = useMemo(() => {
    return data.map((d, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = center + radius * (d.value / 100) * Math.cos(angle);
      const y = center + radius * (d.value / 100) * Math.sin(angle);
      return { x, y, angle };
    });
  }, [data, center, radius, angleStep]);

  const webPoints = useMemo(() => {
    // Generate the background web (hexagons/circles)
    const webs = [0.2, 0.4, 0.6, 0.8, 1];
    return webs.map(w => {
      return data.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = center + radius * w * Math.cos(angle);
        const y = center + radius * w * Math.sin(angle);
        return { x, y };
      });
    });
  }, [data, center, radius, angleStep]);

  const polygonPath = points.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.4" />
          </linearGradient>
          <filter id="radarGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Grids */}
        {webPoints.map((web, idx) => (
          <polygon
            key={idx}
            points={web.map(p => `${p.x},${p.y}`).join(" ")}
            className="fill-none stroke-white/10 stroke-[0.5]"
          />
        ))}

        {/* Axis Lines */}
        {points.map((p, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const endX = center + radius * Math.cos(angle);
          const endY = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={endX}
              y2={endY}
              className="stroke-white/10 stroke-[0.5]"
            />
          );
        })}

        {/* Data Area */}
        <motion.polygon
          points={polygonPath}
          initial={isPowerMode ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={isPowerMode ? { duration: 1.5, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
          fill="url(#radarGradient)"
          className="stroke-cyan-400 stroke-2"
          filter={isPowerMode ? "url(#radarGlow)" : ""}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Data Points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            initial={isPowerMode ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={isPowerMode ? { delay: 0.5 + i * 0.1 } : { duration: 0 }}
            className="fill-cyan-400 shadow-[0_0_10px_#22d3ee]"
          />
        ))}

        {/* Labels */}
        {data.map((d, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelDist = radius + 35;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);
          
          return (
            <g key={i}>
              <text
                x={lx}
                y={ly}
                className="fill-slate-400 text-[10px] font-black uppercase tracking-widest"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {d.name}
              </text>
              <text
                x={lx}
                y={ly + 14}
                className="fill-cyan-400/60 text-[8px] font-bold"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {d.value}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Center Glow */}
      <div 
        className="absolute w-2 h-2 bg-cyan-400 rounded-full blur-[4px] opacity-50"
        style={{ left: center - 4, top: center - 4 }}
      />
    </div>
  );
}
