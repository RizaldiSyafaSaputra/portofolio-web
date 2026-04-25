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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-950">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            y: [0, 30, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold">
              Career Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional Timeline
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A curated collection of my professional experiences, showcasing growth and expertise across various roles and industries.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6">
          {/* Vertical line indicator */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500/0 via-cyan-500/50 to-blue-500/0" />

          {/* Timeline grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                className={`${idx % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-8">
                  <motion.div
                    className={`w-4 h-4 rounded-full border-4 ${
                      activeId === exp.id
                        ? 'bg-cyan-500 border-cyan-400'
                        : 'bg-slate-900 border-slate-700'
                    }`}
                    animate={{
                      scale: activeId === exp.id ? 1.3 : 1,
                      boxShadow:
                        activeId === exp.id
                          ? '0 0 20px 4px rgba(34, 211, 238, 0.4)'
                          : '0 0 0 0 rgba(34, 211, 238, 0)',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

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

        {/* Stats footer */}
        <motion.div
          className="mt-20 pt-12 border-t border-slate-700/50 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Total Experience', value: '5+ Years' },
            { label: 'Companies Worked', value: experiences.length.toString() },
            { label: 'Skills Developed', value: '50+' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-slate-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
