'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code2, Brain, Languages, Star, Zap, Terminal, Sparkles } from 'lucide-react'
import type { Skill } from '@/lib/types/database'
import { JenisKeahlian, LevelKeahlian } from '@/lib/types/database'
import { usePremiumSound } from '@/hooks/usePremiumSound'
import CyberRadarChart from '@/components/ui/CyberRadarChart'
import AnimatedDescription from '@/components/ui/AnimatedDescription'

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
  const playHover = usePremiumSound('/sounds/blip.mp3', 0.05);

  const hardSkills = skills.filter((s) => s.jenis_keahlian === JenisKeahlian.HARD_SKILLS)
  const softSkills = skills.filter((s) => s.jenis_keahlian === JenisKeahlian.SOFT_SKILLS)
  const languageSkills = skills.filter((s) => s.jenis_keahlian === JenisKeahlian.LANGUAGE_SKILLS)

  const [chartSize, setChartSize] = useState(500)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      setChartSize(window.innerWidth < 768 ? 300 : 500)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const radarData = hardSkills.slice(0, 8).map(s => ({
    name: s.nama_keahlian || 'Unknown Skill',
    value: levelToPercent(s.level_keahlian)
  }))

  const SkillGroup = ({ title, icon: Icon, items, index }: { title: string, icon: any, items: Skill[], index: number }) => {
    if (items.length === 0) return null;

    return (
      <motion.div
        className="relative group h-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.8 }}
        viewport={{ once: true }}
        onMouseEnter={playHover}
        data-cursor="mastery"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative h-full bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/5 group-hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
          {/* Cyber Decorative Lines */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-cyan-500/10 transition-colors" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight uppercase italic">{title}</h3>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Core</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {items.map((skill, idx) => (
              <div 
                key={skill.id_skills || idx}
                className="relative group/skill"
              >
                <div className="flex justify-between items-end mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-cyan-500 group-hover/skill:h-4 transition-all" />
                    <span className="text-sm font-black text-white uppercase tracking-wider">{skill.nama_keahlian || 'Unnamed Skill'}</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-black tracking-widest uppercase opacity-70">
                    {skill.level_keahlian}
                  </span>
                </div>
                
                <div className="h-[6px] w-full bg-slate-800/50 rounded-full overflow-hidden relative border border-white/5">
                  {/* Glowing Track */}
                  <motion.div 
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${levelToColor(skill.level_keahlian)} rounded-full z-10`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${levelToPercent(skill.level_keahlian)}%` }}
                    transition={{ duration: 1.5, delay: 0.3 + (idx * 0.1), ease: "circOut" }}
                    viewport={{ once: true }}
                  >
                    {/* Flowing Pulse Effect */}
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2 z-20"
                    />
                  </motion.div>
                  
                  {/* Subtle Background Markings */}
                  <div className="absolute inset-0 flex justify-between px-1 opacity-20 pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="w-px h-full bg-slate-600" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section className="relative py-40 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Cinematic Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/5 blur-[150px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-32"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-900 border border-white/5 text-cyan-400 text-[10px] font-black uppercase tracking-[0.5em] mb-8 shadow-2xl">
            <Terminal className="w-3 h-3 animate-pulse" />
            Technical Architecture
          </div>
          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic animate-gradient-text">
            Capability Matrix
          </h2>
          <AnimatedDescription 
            text="Menyelami repositori keahlian teknis dan kemampuan interpersonal yang dikalibrasi untuk solusi digital modern."
            className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed mb-20"
          />

          {/* Radar Chart Visualization */}
          {mounted && radarData.length >= 3 && (
            <div className="flex justify-center mb-32">
              <div className="relative p-12 bg-slate-900/20 backdrop-blur-3xl rounded-[3rem] border border-white/5 shadow-2xl">
                <div className="absolute inset-0 bg-cyan-500/5 rounded-[3rem] blur-3xl" />
                <CyberRadarChart data={radarData} size={chartSize} />
              </div>
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
            <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center mb-8 animate-pulse">
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
