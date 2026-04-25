'use client'

import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, Award, ChevronRight } from 'lucide-react'
import type { Study } from '@/lib/types/database'
import { useState } from 'react'

interface ProfilesStudyProps {
  studies: Study[]
}

export function ProfilesStudy({ studies }: ProfilesStudyProps) {
  const [activeId, setActiveId] = useState<string | null>(studies[0]?.id_study || null)

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Academic Background
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Educational History
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            My formal academic journey, degrees, and institutions that have shaped my foundational knowledge.
          </p>
        </motion.div>

        {/* Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {studies.map((study, idx) => {
            const isActive = activeId === study.id_study

            return (
              <motion.div
                key={study.id_study}
                onClick={() => setActiveId(isActive ? null : study.id_study)}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500" />

                {/* Card content */}
                <motion.div
                  className={`relative h-full bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 ${
                    isActive
                      ? 'border-cyan-500/50 bg-slate-900/95 shadow-2xl shadow-cyan-500/20'
                      : 'border-slate-700/50 hover:border-slate-600/70'
                  }`}
                  whileHover={{ y: -4 }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 pr-4">
                      <motion.h3
                        className="text-xl font-bold text-white mb-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 + 0.1 }}
                      >
                        {study.nama_sekolah}
                      </motion.h3>
                      <motion.p
                        className="text-sm text-cyan-400 font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 + 0.15 }}
                      >
                        {study.jurusan ? `${study.jurusan}` : ''}
                        {study.fakultas ? ` • ${study.fakultas}` : ''}
                      </motion.p>
                    </div>
                    <motion.div
                      className="rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 flex-shrink-0"
                      whileHover={{ rotate: 15, scale: 1.1 }}
                    >
                      <GraduationCap className="w-6 h-6 text-cyan-400" />
                    </motion.div>
                  </div>

                  {/* Meta information */}
                  <div className="space-y-3 mb-4">
                    {/* Date */}
                    {(study.tanggal_masuk || study.tanggal_selesai) && (
                      <motion.div
                        className="flex items-center gap-2 text-sm text-slate-300"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                      >
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span>
                          {study.tanggal_masuk} {' - '} 
                          {study.tanggal_selesai ? study.tanggal_selesai : <span className="text-cyan-400 font-semibold">Present</span>}
                        </span>
                      </motion.div>
                    )}

                    {/* Location */}
                    {study.lokasi_sekolah && (
                      <motion.div
                        className="flex items-center gap-2 text-sm text-slate-300"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.25 }}
                      >
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span>{study.lokasi_sekolah}</span>
                      </motion.div>
                    )}

                    {/* Grade/GPA */}
                    {study.nilai && (
                      <motion.div
                        className="flex items-center gap-2 text-sm text-slate-300"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.3 }}
                      >
                        <Award className="w-4 h-4 text-purple-400" />
                        <span>Grade / GPA: <span className="text-purple-300 font-bold">{study.nilai}</span></span>
                      </motion.div>
                    )}
                  </div>

                  {/* Description */}
                  {isActive && study.deskripsi && (
                    <motion.div
                      className="mb-4 pb-4 border-t border-slate-700/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm text-slate-300 leading-relaxed mt-4 whitespace-pre-line">
                        {study.deskripsi}
                      </p>
                    </motion.div>
                  )}

                  {/* Action indicator */}
                  <motion.div
                    className="flex items-center justify-between pt-4 border-t border-slate-700/50 mt-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.4 }}
                  >
                    <span className="text-xs text-slate-400">
                      {isActive ? 'Viewing Details' : 'Click to expand details'}
                    </span>
                    <motion.div animate={{ rotate: isActive ? 90 : 0 }}>
                      <ChevronRight className="w-4 h-4 text-cyan-400" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {studies.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No education data available.</p>
          </div>
        )}
      </div>
    </section>
  )
}
