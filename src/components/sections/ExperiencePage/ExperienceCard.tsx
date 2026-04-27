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
import { TiltCard } from '@/components/ui/TiltCard'
import { usePremiumSound } from '@/hooks/usePremiumSound'

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
  isActive?: boolean
  onClick?: () => void
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
  isActive = false,
  onClick,
  onViewDetails,
  noAnimation = false
}: ExperienceCardProps & { noAnimation?: boolean }) {
  const playHover = usePremiumSound('/sounds/blip.mp3', 0.05);
  const playClick = usePremiumSound('/sounds/click.mp3', 0.1);

  const handleAction = () => {
    playClick();
    onViewDetails({ companyName, position, skills, startDate, endDate, location, description, media });
  };

  return (
    <motion.div
      className="relative group w-full whitespace-normal h-full"
      data-cursor="view"
      onMouseEnter={playHover}
      initial={noAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      whileInView={noAnimation ? undefined : { opacity: 1, scale: 1 }}
      animate={noAnimation ? { opacity: 1, scale: 1 } : undefined}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      viewport={noAnimation ? undefined : { once: true, amount: 0.1, margin: "100px" }}
    >
      <TiltCard className="h-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div
          onClick={handleAction}
          className={`relative bg-slate-900/40 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-500 cursor-pointer shadow-2xl flex flex-col h-full min-h-[520px]`}
        >
          {/* Header Section */}
          <div className="p-8 md:p-10 flex-grow">
            <div className="flex items-start justify-between gap-6 mb-8">
              <div className="flex-1 min-h-[80px]">
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-2 uppercase leading-none line-clamp-2">
                  {position}
                </h3>
                <p className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">
                  {companyName}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-slate-800/50 border border-white/5 flex items-center justify-center shrink-0 shadow-xl group-hover:scale-110 transition-transform duration-500">
                <Briefcase className="w-7 h-7 text-cyan-400" />
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-8 min-h-[80px]">
              <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <Calendar className="w-4 h-4 text-cyan-500" />
                {startDate} — {endDate === 'Present' || endDate === 'NOW' ? <span className="text-cyan-400">Now</span> : endDate}
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span className="line-clamp-1">{location}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              <Badge className="bg-slate-950/50 text-cyan-400 border-cyan-500/20 px-4 py-1.5 text-[9px] uppercase tracking-widest font-black rounded-full">
                {jobType}
              </Badge>
              <Badge className="bg-slate-950/50 text-purple-400 border-purple-500/20 px-4 py-1.5 text-[9px] uppercase tracking-widest font-black rounded-full">
                {programType}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 4).map((skill, i) => (
                <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[9px] text-slate-400 font-bold uppercase tracking-widest group-hover:text-white group-hover:border-white/10 transition-colors">
                  {skill}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest self-center ml-2">
                  +{skills.length - 4} More
                </span>
              )}
            </div>
          </div>

          {/* Action indicator - Pushed to bottom */}
          <div className="px-8 py-5 bg-white/5 border-t border-white/5 flex items-center justify-between group-hover:bg-cyan-500/10 transition-colors mt-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-cyan-400 transition-colors">
              Access Dossier
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-cyan-400 text-[10px] font-black uppercase tracking-widest group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all shadow-lg">
                <Sparkles size={12} className="animate-pulse" /> View Details
              </div>
              <ChevronRight className="w-5 h-5 text-cyan-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
