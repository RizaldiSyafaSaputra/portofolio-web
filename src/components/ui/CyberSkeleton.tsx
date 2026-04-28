'use client'

import { motion } from 'framer-motion'

interface CyberSkeletonProps {
  className?: string
  count?: number
}

export function CyberSkeleton({ className = "", count = 3 }: CyberSkeletonProps) {
  return (
    <div className={`space-y-4 w-full ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative overflow-hidden bg-neutral-900/50 border border-white/5 rounded-2xl p-6">
          {/* Scanning Line Effect */}
          <motion.div
            animate={{ 
              top: ['-100%', '200%'],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 0.2
            }}
            className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none z-10"
          />

          <div className="flex gap-4">
            {/* Thumbnail Placeholder */}
            <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/5 shrink-0 relative overflow-hidden">
               <motion.div 
                 animate={{ opacity: [0.3, 0.6, 0.3] }}
                 transition={{ duration: 1.5, repeat: Infinity }}
                 className="absolute inset-0 bg-cyan-500/10"
               />
            </div>
            
            <div className="flex-1 space-y-3">
              {/* Title Line */}
              <div className="h-4 w-1/3 bg-white/5 rounded-full relative overflow-hidden">
                <motion.div 
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              </div>
              
              {/* Subtitle Line */}
              <div className="h-3 w-1/2 bg-white/5 rounded-full relative overflow-hidden">
                <motion.div 
                   animate={{ x: ['-100%', '200%'] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              </div>

              {/* Meta Tags */}
              <div className="flex gap-2 pt-2">
                <div className="h-2 w-12 bg-cyan-500/10 rounded-full" />
                <div className="h-2 w-16 bg-cyan-500/10 rounded-full" />
              </div>
            </div>
          </div>

          {/* Pulse border effect */}
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 border border-cyan-500/10 rounded-2xl pointer-events-none"
          />
        </div>
      ))}
    </div>
  )
}
