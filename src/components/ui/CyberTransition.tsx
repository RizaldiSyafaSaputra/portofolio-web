"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function CyberTransition({ isExiting, onComplete }: { isExiting: boolean, onComplete?: () => void }) {
  const [isDone, setIsDone] = useState(false);

  // Number of shutters
  const shutterCount = 10;

  return (
    <div className="fixed inset-0 z-[999999] pointer-events-none overflow-hidden">
      <AnimatePresence onExitComplete={onComplete}>
        {isExiting && (
          <div className="absolute inset-0 flex flex-col">
            {[...Array(shutterCount)].map((_, i) => (
              <motion.div
                key={`shutter-top-${i}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex-grow bg-slate-950 border-y border-cyan-500/10 relative"
              >
                {/* Tech Line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isExiting && !isDone && (
          <div className="absolute inset-0 flex flex-col">
            {[...Array(shutterCount)].map((_, i) => (
              <motion.div
                key={`shutter-bottom-${i}`}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onAnimationComplete={() => {
                  if (i === shutterCount - 1) setIsDone(true);
                }}
                className="flex-grow bg-slate-950 border-y border-cyan-500/10 relative"
              >
                {/* Tech Line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
              </motion.div>
            ))}
            
            {/* Center Loading Text during entry */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] font-black text-cyan-400 tracking-[0.5em] uppercase animate-pulse">
                  Calibrating Reality
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
