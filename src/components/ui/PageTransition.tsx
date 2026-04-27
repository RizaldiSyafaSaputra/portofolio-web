"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          filter: "blur(0px)"
        }}
        exit={{ 
          opacity: 0, 
          scale: 1.02,
          filter: "blur(10px)"
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="min-h-screen flex flex-col"
      >
        {/* Progress Bar Top */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-cyan-500 z-[9999] origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
