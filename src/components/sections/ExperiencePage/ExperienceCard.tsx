'use client'

import { motion } from 'framer-motion'
import { ChevronRight, MapPin, Calendar, Award, Briefcase, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { useState } from 'react'

interface ExperienceCardProps {
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
  index: number
  isActive: boolean
  onClick: () => void
}

export function ExperienceCard({
  companyName,
  position,
  skills,
  jobType,
  programType,
  startDate,
  endDate,
  location,
  description,
  media,
  index,
  isActive,
  onClick,
}: ExperienceCardProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <motion.div
      onClick={onClick}
      className="relative group cursor-pointer h-full"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500" />

      {/* Card content */}
      <motion.div
        className={`relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 ${
          isActive
            ? 'border-cyan-500/50 bg-slate-900/95 shadow-2xl shadow-cyan-500/20'
            : 'border-slate-700/50 hover:border-slate-600/70'
        }`}
        whileHover={{ y: -4 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <motion.h3
              className="text-xl font-bold text-white mb-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.1 }}
            >
              {position}
            </motion.h3>
            <motion.p
              className="text-sm text-cyan-400 font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.15 }}
            >
              {companyName}
            </motion.p>
          </div>
          <motion.div
            className="rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3"
            whileHover={{ rotate: 45 }}
          >
            <Briefcase className="w-5 h-5 text-cyan-400" />
          </motion.div>
        </div>

        {/* Meta information */}
        <div className="space-y-3 mb-4">
          {/* Date */}
          <motion.div
            className="flex items-center gap-2 text-sm text-slate-300"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>
              {startDate} {' - '} {endDate === 'Present' ? <span className="text-cyan-400 font-semibold">Now</span> : endDate}
            </span>
          </motion.div>

          {/* Location */}
          <motion.div
            className="flex items-center gap-2 text-sm text-slate-300"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.25 }}
          >
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>{location}</span>
          </motion.div>

          {/* Job Type & Program */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:bg-slate-700">
              <Award className="w-3 h-3 mr-1" />
              {jobType}
            </Badge>
            <Badge className="bg-slate-800 text-purple-300 border border-purple-500/30 hover:bg-slate-700">
              {programType}
            </Badge>
          </div>
        </div>

        {/* Description */}
        {isActive && (
          <motion.div
            className="mb-4 pb-4 border-t border-slate-700/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-slate-300 leading-relaxed mt-4">{description}</p>
          </motion.div>
        )}

        {/* Skills */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <div className="text-xs text-slate-400 mb-2">Key Skills</div>
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, isActive ? skills.length : 3).map((skill, idx) => (
              <motion.div
                key={idx}
                className="relative"
                onHoverStart={() => setHoveredSkill(skill)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                <div className="px-2 py-1 rounded-md bg-slate-800/50 text-xs text-slate-300 border border-slate-700/50 hover:border-cyan-500/50 transition-colors cursor-default">
                  {skill}
                </div>
                {hoveredSkill === skill && (
                  <motion.div
                    className="absolute -top-8 left-0 px-2 py-1 rounded-md bg-slate-800 text-xs text-cyan-300 border border-cyan-500/30 whitespace-nowrap"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Media Gallery */}
        {isActive && media && media.length > 0 && (
          <motion.div
            className="mb-4 pb-4 border-t border-slate-700/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-xs text-slate-400 mb-3 mt-4 font-semibold">Documentation & Media</div>
            <div className="grid grid-cols-2 gap-3">
              {media.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group/media overflow-hidden rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.alt || 'Experience media'}
                      className="w-full h-32 object-cover group-hover/media:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-32 bg-slate-700 flex items-center justify-center">
                      <div className="text-cyan-400">Video</div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action indicator */}
        <motion.div
          className="flex items-center justify-between pt-4 border-t border-slate-700/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <span className="text-xs text-slate-400">
            {isActive ? 'Viewing Details' : 'Click to expand'}
          </span>
          <motion.div animate={{ x: isActive ? 5 : 0 }}>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
