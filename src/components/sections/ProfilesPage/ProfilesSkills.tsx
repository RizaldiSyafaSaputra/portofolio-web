'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code2, Brain, Languages, Star, Zap, Terminal, Sparkles } from 'lucide-react'
import type { Skill } from '@/lib/types/database'
import { JenisKeahlian, LevelKeahlian } from '@/lib/types/database'
import CyberRadarChart from '@/components/ui/CyberRadarChart'
import AnimatedDescription from '@/components/ui/AnimatedDescription'
import { useAnimation } from '@/context/AnimationContext'

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
    case LevelKeahlian.BEGINNER: return 'from-blue-500 to-cyan-500';
    case LevelKeahlian.INTERMEDIATE: return 'from-cyan-400 to-blue-600';
    case LevelKeahlian.ADVANCED: return 'from-purple-500 to-cyan-400';
    default: return 'from-slate-500 to-slate-400';
  }
}


export function ProfilesSkills({ skills }: ProfilesSkillsProps) {
  const { isPowerMode } = useAnimation();

  const hardSkills = skills.filter((s) => s.jenis_keahlian === JenisKeahlian.HARD_SKILLS)
  const softSkills = skills.filter((s) => s.jenis_keahlian === JenisKeahlian.SOFT_SKILLS)
  const languageSkills = skills.filter((s) => s.jenis_keahlian === JenisKeahlian.LANGUAGE_SKILLS)

  const [chartSize, setChartSize] = useState(350)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      setChartSize(window.innerWidth < 768 ? 280 : 350)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const hardRadarData = hardSkills.slice(0, 6).map(s => ({
    name: s.nama_keahlian || 'Unknown',
    value: levelToPercent(s.level_keahlian)
  }))

  const softRadarData = softSkills.slice(0, 6).map(s => ({
    name: s.nama_keahlian || 'Unknown',
    value: levelToPercent(s.level_keahlian)
  }))

  const SkillGroup = ({ title, icon: Icon, items, index }: { title: string, icon: any, items: Skill[], index: number }) => {
    if (items.length === 0) return null;

    return (
      <motion.div
        className="relative group h-full"
        initial={isPowerMode ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={isPowerMode ? { delay: index * 0.1, duration: 0.8 } : { duration: 0 }}
        viewport={{ once: true }}
      >
        {/* Neon Aura Background */}
        {isPowerMode && (
          <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-600/20 rounded-[2.5rem] opacity-30 group-hover:opacity-100 group-hover:blur-xl transition-all duration-700" />
        )}
        
        <div className={`relative h-full ${isPowerMode ? 'bg-[#0a0a0a]/60 backdrop-blur-3xl' : 'bg-neutral-900'} rounded-[2.5rem] p-10 border border-white/10 ${isPowerMode ? 'group-hover:border-cyan-500/40' : ''} transition-all duration-500 overflow-hidden shadow-2xl`}>
          {/* Decorative Corner Glow */}
          {isPowerMode && (
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-[50px] group-hover:bg-cyan-500/20 transition-all" />
          )}
          
          <div className="flex items-center gap-5 mb-12">
            <div className={`w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center text-cyan-400 ${isPowerMode ? 'group-hover:scale-110 group-hover:rotate-6 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30' : ''} transition-all duration-500 shadow-xl`}>
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">{title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full bg-cyan-500 ${isPowerMode ? 'animate-pulse shadow-[0_0_8px_#22d3ee]' : ''}`} />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Module Operational</span>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {items.map((skill, idx) => (
              <motion.div 
                key={skill.id_skills || idx}
                whileHover={isPowerMode ? { x: 10 } : {}}
                className="relative group/skill"
              >
                <div className="flex justify-between items-end mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-1.5 h-1.5 bg-neutral-800 ${isPowerMode ? 'group-hover/skill:bg-cyan-400 group-hover/skill:shadow-[0_0_8px_#22d3ee]' : ''} transition-all rounded-full`} />
                    <span className="text-base font-black text-white/90 uppercase tracking-tight">{skill.nama_keahlian || 'Unnamed Skill'}</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-black tracking-widest uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    {skill.level_keahlian}
                  </span>
                </div>
                
                <div className="h-[8px] w-full bg-neutral-900 rounded-full overflow-hidden relative border border-white/5 shadow-inner">
                  <motion.div 
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${levelToColor(skill.level_keahlian)} rounded-full z-10 ${isPowerMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.3)]' : ''}`}
                    initial={isPowerMode ? { width: 0 } : { width: `${levelToPercent(skill.level_keahlian)}%` }}
                    whileInView={{ width: `${levelToPercent(skill.level_keahlian)}%` }}
                    transition={isPowerMode ? { duration: 1.5, delay: 0.3 + (idx * 0.1), ease: "circOut" } : { duration: 0 }}
                    viewport={{ once: true }}
                  >
                    {isPowerMode && (
                      <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-1/2 z-20"
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section className="relative py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Cinematic Background Decoration */}
      {isPowerMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/5 blur-[150px] rounded-full" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-32"
          initial={isPowerMode ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={isPowerMode ? { duration: 0.8 } : { duration: 0 }}
          viewport={{ once: true }}
        >
          <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-full ${isPowerMode ? 'bg-neutral-950 border-white/5 text-cyan-400' : 'bg-neutral-900 border-white/10 text-slate-500'} text-[10px] font-black uppercase tracking-[0.5em] mb-8 shadow-2xl`}>
            <Terminal className={`w-3 h-3 ${isPowerMode ? 'animate-pulse' : ''}`} />
            Technical Architecture
          </div>
          <h2 className={`text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic ${isPowerMode ? 'animate-gradient-text' : 'text-white'}`}>
            Capability Matrix
          </h2>
          <AnimatedDescription 
            text="Menyelami repositori keahlian teknis dan kemampuan interpersonal yang dikalibrasi untuk solusi digital modern."
            className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed mb-20"
          />

          {/* Radar Charts Visualization */}
          {mounted && (hardRadarData.length >= 3 || softRadarData.length >= 3) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-32">
              {/* Hard Skills Radar */}
              <motion.div 
                whileHover={isPowerMode ? { scale: 1.02 } : {}}
                className={`relative p-10 ${isPowerMode ? 'bg-neutral-950/40 backdrop-blur-3xl border-white/10' : 'bg-neutral-900 border-white/5'} rounded-[3rem] border group overflow-hidden shadow-2xl`}
              >
                {isPowerMode && (
                  <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8 justify-center">
                    <Code2 className={`w-4 h-4 ${isPowerMode ? 'text-cyan-400' : 'text-slate-600'}`} />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Hard Skills Analysis</span>
                  </div>
                  <div className="flex justify-center">
                    <CyberRadarChart data={hardRadarData} size={chartSize} />
                  </div>
                </div>
              </motion.div>

              {/* Soft Skills Radar */}
              <motion.div 
                whileHover={isPowerMode ? { scale: 1.02 } : {}}
                className={`relative p-10 ${isPowerMode ? 'bg-neutral-950/40 backdrop-blur-3xl border-white/10' : 'bg-neutral-900 border-white/5'} rounded-[3rem] border group overflow-hidden shadow-2xl`}
              >
                {isPowerMode && (
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-transparent rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8 justify-center">
                    <Brain className={`w-4 h-4 ${isPowerMode ? 'text-purple-400' : 'text-slate-600'}`} />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Soft Skills Analysis</span>
                  </div>
                  <div className="flex justify-center">
                    <CyberRadarChart data={softRadarData} size={chartSize} />
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          <SkillGroup title="Core Hard Skills" icon={Code2} items={hardSkills} index={0} />
          <SkillGroup title="Cognitive Soft Skills" icon={Brain} items={softSkills} index={1} />
          <SkillGroup title="Linguistic Mastery" icon={Languages} items={languageSkills} index={2} />
        </div>

        {skills.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className={`w-24 h-24 rounded-3xl bg-neutral-950 border border-white/5 flex items-center justify-center mb-8 ${isPowerMode ? 'animate-pulse' : ''}`}>
              <Zap className="w-10 h-10 text-slate-700" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic tracking-widest">No Data Detected</h3>
            <p className="text-slate-600 mt-4 max-w-xs mx-auto font-bold uppercase text-[10px] tracking-widest">Awaiting skill ingestion via secure terminal...</p>
          </div>
        )}
      </div>
    </section>
  )
}
