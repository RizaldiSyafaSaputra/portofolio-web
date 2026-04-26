'use client'

import { motion } from 'framer-motion'
import { 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Sparkles
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

interface ExperienceCardProps {
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
  media?: string[]
  index: number
  isActive: boolean
  onClick: () => void
  onViewDetails: (data: any) => void
}

export function ExperienceCard({
  id,
  companyName,
  position,
  skills,
  jobType,
  programType,
  startDate,
  endDate,
  location,
  description,
  media = [],
  index,
  isActive,
  onClick,
  onViewDetails
}: ExperienceCardProps) {
  return (
    <motion.div
      className="relative group w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <motion.div
        onClick={onClick}
        className={`relative bg-slate-900/40 backdrop-blur-xl rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer ${
          isActive
            ? 'border-cyan-500/40 bg-slate-900/80 shadow-2xl shadow-cyan-500/10'
            : 'border-white/5 hover:border-white/10'
        }`}
        layout
      >
        {/* Header Section */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <motion.h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2 uppercase">
                {position}
              </motion.h3>
              <motion.p className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
                {companyName}
              </motion.p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center shrink-0 shadow-lg">
              <Briefcase className="w-6 h-6 text-cyan-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <Calendar className="w-4 h-4 text-cyan-500/60" />
              {startDate} — {endDate === 'Present' ? <span className="text-cyan-400">Now</span> : endDate}
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <MapPin className="w-4 h-4 text-cyan-500/60" />
              {location}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-slate-950/50 text-cyan-400 border-cyan-500/20 px-3 py-1 text-[9px] uppercase tracking-widest font-black">
              {jobType}
            </Badge>
            <Badge className="bg-slate-950/50 text-purple-400 border-purple-500/20 px-3 py-1 text-[9px] uppercase tracking-widest font-black">
              {programType}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.slice(0, isActive ? skills.length : 3).map((skill, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-slate-950/30 border border-white/5 text-[9px] text-slate-400 font-black uppercase tracking-widest">
                {skill}
              </span>
            ))}
            {!isActive && skills.length > 3 && (
              <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest self-center ml-2">
                +{skills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action indicator */}
        <div className="px-6 py-4 bg-slate-950/20 border-t border-white/5 flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
            {isActive ? 'Details Active' : 'Expand Journey'}
          </span>
          <div className="flex items-center gap-3">
            {isActive && (
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  onViewDetails({ companyName, position, skills, startDate, endDate, location, description, media });
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-cyan-500/20"
              >
                <Sparkles size={12} /> Intelligence View
              </button>
            )}
            <motion.div animate={{ rotate: isActive ? 90 : 0 }}>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
