'use client'

import { motion } from 'framer-motion'
import { Rocket, Code2, Sparkles } from 'lucide-react'
import GridBackground from '../../ui/GridBackground'
import AnimatedDescription from '@/components/ui/AnimatedDescription'

export function ProjectsHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-32 pb-32 px-4 sm:px-6 lg:px-8">
      <GridBackground />
      
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Bottom Fade Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Icon container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-3 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl group"
          >
            <div className="bg-gradient-to-tr from-cyan-400 to-blue-600 p-3 rounded-xl">
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Main heading */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter"
            >
              Featured <br />
              <span className="animate-gradient-text">
                Creative Projects
              </span>
            </motion.h1>

            <AnimatedDescription 
              text="A curated showcase of my engineering journey. From complex web architectures to interactive user experiences, exploring the boundaries of modern technology."
              className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mx-auto font-medium"
            />
          </div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500"
          >
            <span className="flex items-center gap-2 px-6 py-2 bg-slate-900/50 rounded-full border border-white/5">
              <Code2 className="w-4 h-4 text-cyan-400" /> Development
            </span>
            <span className="flex items-center gap-2 px-6 py-2 bg-slate-900/50 rounded-full border border-white/5">
              <Sparkles className="w-4 h-4 text-purple-400" /> UI/UX Design
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

