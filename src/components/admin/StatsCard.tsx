"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  delay?: number;
}

export function StatsCard({ title, value, icon, trend, trendUp, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
      <div className="relative bg-neutral-950/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:bg-neutral-950/80 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center border border-white/5 shadow-inner">
            {icon}
          </div>
          {trend && (
            <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
              trendUp 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {trendUp ? '+' : '-'}{trend}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
          <p className="text-3xl font-black text-white tracking-tight">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
