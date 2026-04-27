"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  label?: string;
}

export default function LoadingSpinner({ fullScreen = true, label = "INITIALIZING SYSTEM" }: LoadingSpinnerProps) {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
    : "relative w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-transparent";

  return (
    <div className={containerClasses}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full" />
      
      <div className="relative w-32 h-32">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyan-500/20 border-t-cyan-500"
        />
        
        {/* Middle Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border-b-2 border-l-2 border-indigo-500/20 border-b-indigo-500"
        />
        
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 rounded-full border-t-2 border-white/20 border-t-white"
        />

        {/* Center Glow Dot */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[44%] bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"
        />
      </div>

      {/* Loading Text */}
      <div className="mt-12 flex flex-col items-center gap-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1.5"
        >
          {label.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.05,
              }}
              className="text-[10px] font-black text-cyan-400 tracking-[0.3em]"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-1.5 h-3 bg-cyan-400 ml-1"
          />
        </motion.div>

        {/* Loading Progress Bar (Decorative) */}
        <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          />
        </div>
        
        <span className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-1">
          Establishing Secure Connection...
        </span>
      </div>

      {/* Tech Decals */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <div className="text-[8px] text-slate-800 font-mono space-y-1">
          <p>LOAD_SEQ: 0x4492</p>
          <p>MEM_ALLOC: OK</p>
          <p>THREAD_SYNC: ACTIVE</p>
        </div>
      </div>
      <div className="absolute top-10 right-10 hidden md:block">
        <div className="text-[8px] text-slate-800 font-mono text-right space-y-1">
          <p>PORT: 443</p>
          <p>SSL: VERIFIED</p>
          <p>REGION: IDN_JKT</p>
        </div>
      </div>
    </div>
  );
}
