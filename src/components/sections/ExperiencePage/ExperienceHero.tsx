'use client'

import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import GridBackground from '../../ui/GridBackground'

export function ExperienceHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-32 pb-32 px-4 sm:px-6 lg:px-8">
      <GridBackground />
      
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Bottom Fade Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col items-center text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon container */}
          <motion.div
            className="relative w-24 h-24 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-2xl group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Briefcase className="w-10 h-10 text-blue-400 relative z-10" />
            <motion.div
              className="absolute inset-0 rounded-3xl border-2 border-blue-500/30"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Main heading */}
          <div className="space-y-4">
            <motion.h1
              className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Professional <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Experience
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mx-auto font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Explore my professional journey, from startups to enterprise. Each role has shaped my expertise and driven innovation.
            </motion.p>
          </div>


        </motion.div>
      </div>
    </section>
  )
}

