import { motion, AnimatePresence } from "framer-motion";
import { Zap, ZapOff, Sparkles } from "lucide-react";
import { useAnimation } from "@/context/AnimationContext";
import { useEffect, useState } from "react";

export default function AnimationToggle() {
  const { isPowerMode, togglePowerMode } = useAnimation();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleToggle = () => {
    togglePowerMode();
  };

  return (
    <div className="fixed bottom-10 right-10 z-[9999]">
      <motion.button
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative group flex items-center gap-3 px-6 py-3 rounded-2xl border overflow-hidden shadow-2xl ${
          isPowerMode 
            ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400" 
            : "bg-neutral-950/80 border-white/10 text-slate-500"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow Background */}
        <AnimatePresence>
          {isPowerMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10"
              style={{ backgroundSize: "200% 200%" }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          )}
        </AnimatePresence>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="relative">
            {isPowerMode ? (
              <Zap className="w-4 h-4 fill-cyan-400 animate-pulse" />
            ) : (
              <ZapOff className="w-4 h-4" />
            )}
          </div>

          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              {isPowerMode ? "Power Mode" : "Simple Mode"}
            </span>
            <span className={`text-[8px] font-bold uppercase tracking-[0.1em] transition-colors ${
              isPowerMode ? "text-cyan-400/60" : "text-slate-600"
            }`}>
              {isPowerMode ? "Premium UI Active" : "Performance Mode"}
            </span>
          </div>
        </div>

        {/* Hover Border Effect */}
        <motion.div 
          className="absolute inset-0 border border-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        />
      </motion.button>
    </div>
  );
}
