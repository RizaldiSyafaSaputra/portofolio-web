'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExperienceCard } from './ExperienceCard'

export interface Experience {
  id: string
  companyName: string
  position: string
  skills: string[]
  jobType: string
  programType: string
  startDate: string
  endDate: string
  location: string
  description: string
  media?: {
    type: 'image' | 'video'
    url: string
    alt?: string
  }[]
}

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const [activeId, setActiveId] = useState<string | null>(experiences[0]?.id || null)

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <motion.div
          className="absolute top-1/2 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]"
          animate={{
            y: [0, 50, -50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]"
          animate={{
            y: [0, -50, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="flex flex-col items-center text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Career Journey
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Professional Timeline
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl font-medium">
            A curated collection of my professional experiences, showcasing growth and expertise across various roles and industries.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-12">
          {/* Vertical line indicator */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* Timeline grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-y-24">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                className={`${idx % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:mt-24'}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ExperienceCard
                  {...exp}
                  index={idx}
                  isActive={activeId === exp.id}
                  onClick={() => setActiveId(activeId === exp.id ? null : exp.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

  )
}
