'use client'

import { motion } from 'framer-motion'
import { Code2, Brain, Languages, Star, Zap } from 'lucide-react'
import type { Skill } from '@/lib/types/database'
import { JenisKeahlian, LevelKeahlian } from '@/lib/types/database'

interface ProfilesSkillsProps {
  skills: Skill[]
}

const levelToPercent = (level: LevelKeahlian) => {
  switch (level) {
    case LevelKeahlian.BEGINNER: return 33;
    case LevelKeahlian.INTERMEDIATE: return 66;
    case LevelKeahlian.ADVANCED: return 100;
    default: return 50;
  }
}

const levelToColor = (level: LevelKeahlian) => {
  switch (level) {
    case LevelKeahlian.BEGINNER: return 'bg-blue-400';
    case LevelKeahlian.INTERMEDIATE: return 'bg-cyan-400';
    case LevelKeahlian.ADVANCED: return 'bg-purple-400';
    default: return 'bg-slate-400';
  }
}

export function ProfilesSkills({ skills }: ProfilesSkillsProps) {

  const hardSkills = skills.filter((s) => s.jenis_keahlian === JenisKeahlian.HARD_SKILLS)
  const softSkills = skills.filter((s) => s.jenis_keahlian === JenisKeahlian.SOFT_SKILLS)
  const languageSkills = skills.filter((s) => s.jenis_keahlian === JenisKeahlian.LANGUAGE_SKILLS)

  const SkillGroup = ({ title, icon: Icon, items, index }: { title: string, icon: any, items: Skill[], index: number }) => {
    if (items.length === 0) return null;

    return (
      <motion.div
        className="relative group h-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative h-full bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700/50">
            <div className="p-2 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 shadow-inner">
              <Icon className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>

          <div className="space-y-4">
            {items.map((skill, idx) => (
              <div 
                key={skill.id_skills || idx}
                className="relative"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-300">{skill.nama_keahlian}</span>
                  <span className="text-xs text-slate-500 font-medium px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                    {skill.level_keahlian}
                  </span>
                </div>
                
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <motion.div 
                    className={`h-full ${levelToColor(skill.level_keahlian)} shadow-[0_0_10px_rgba(34,211,238,0.5)]`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${levelToPercent(skill.level_keahlian)}%` }}
                    transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
                    viewport={{ once: true }}
                  />
                </div>

              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <motion.div
          className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]"
          animate={{
            y: [0, 50, -50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Skills Repository
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Technical Proficiency
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            A comprehensive overview of my technical abilities and soft skills developed through various projects and academic pursuits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <SkillGroup title="Hard Skills" icon={Code2} items={hardSkills} index={0} />
          <SkillGroup title="Soft Skills" icon={Brain} items={softSkills} index={1} />
          <SkillGroup title="Languages" icon={Languages} items={languageSkills} index={2} />
        </div>

        {skills.length === 0 && (
          <div className="text-center py-12">
            <Code2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No skills data available.</p>
          </div>
        )}
      </div>
    </section>
  )
}
