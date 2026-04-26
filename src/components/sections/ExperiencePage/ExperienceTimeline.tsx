'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExperienceCard } from './ExperienceCard'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ImageIcon, 
  Film, 
  Calendar, 
  MapPin, 
  Sparkles,
  Info
} from 'lucide-react'

export interface Experience {
  id: string
  companyName: string
  position: string
  description: string
  startDate: string
  endDate: string
  location: string
  jobType: string
  programType: string
  skills: string[]
  media: { url: string; type: string; isStarred: boolean }[]
}

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null)
  const [activeMediaIndex, setActiveMediaIndex] = useState(0)

  // Scroll lock for modal
  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new Event('modalOpen'));
    } else {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new Event('modalClose'));
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedExp]);

  const isVideo = (item: { url: string; type: string }) => {
    if (!item) return false;
    if (item.type === 'video') return true;
    return (
      item.url.match(/\.(mp4|webm|ogg|mov)$/i) || 
      item.url.includes('youtube.com') || 
      item.url.includes('youtu.be') || 
      item.url.includes('drive.google.com')
    );
  };

  const handleNextMedia = () => {
    if (selectedExp?.media && selectedExp.media.length > 0) {
      setActiveMediaIndex((prev) => (prev + 1) % selectedExp.media.length)
    }
  }

  const handlePrevMedia = () => {
    if (selectedExp?.media && selectedExp.media.length > 0) {
      setActiveMediaIndex((prev) => (prev - 1 + selectedExp.media.length) % selectedExp.media.length)
    }
  }

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-20">
      {/* Vertical Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden md:block" />

      <div className="space-y-24">
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0
          return (
            <div key={exp.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-1/2 top-10 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-500 z-10 hidden md:block shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
              
              <div className={`flex flex-col md:flex-row items-center gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Content Side */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <ExperienceCard
                    id={exp.id}
                    companyName={exp.companyName}
                    position={exp.position}
                    skills={exp.skills}
                    jobType={exp.jobType}
                    programType={exp.programType}
                    startDate={exp.startDate}
                    endDate={exp.endDate}
                    location={exp.location}
                    description={exp.description}
                    media={exp.media.map(m => m.url)}
                    index={index}
                    isActive={activeIndex === index}
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    onViewDetails={(data) => {
                      setSelectedExp(exp); // Use the original exp which has the correct media objects
                      setActiveMediaIndex(0);
                    }}
                  />
                </div>

                {/* Empty Side (For Zig-Zag) */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Global Ultra-Stable Modal */}
      <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-6xl h-full max-h-[85vh] bg-slate-900/60 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] z-50 flex flex-col lg:flex-row"
            >
              <button 
                onClick={() => setSelectedExp(null)}
                className="absolute top-6 right-6 z-[70] p-4 bg-slate-800/90 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-cyan-500 transition-all shadow-2xl group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              </button>

              {/* Media Slider Section */}
              <div className="w-full lg:w-[55%] relative bg-black flex items-center justify-center group/slider overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMediaIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full flex items-center justify-center p-6 md:p-10"
                  >
                    {selectedExp.media && selectedExp.media.length > 0 ? (
                      <div className="w-full h-full relative rounded-3xl overflow-hidden flex items-center justify-center bg-slate-900/20 border border-white/5">
                        {(() => {
                          const item = selectedExp.media[activeMediaIndex];
                          return isVideo(item) ? (
                            <div className="w-full aspect-video rounded-2xl overflow-hidden">
                              {item.url.includes('youtube.com') || item.url.includes('youtu.be') ? (
                                <iframe 
                                  src={`https://www.youtube.com/embed/${item.url.split('v=')[1]?.split('&')[0] || item.url.split('/').pop()}`}
                                  className="w-full h-full border-0"
                                  allowFullScreen
                                />
                              ) : item.url.includes('drive.google.com') ? (
                                <iframe 
                                  src={item.url.replace('/view', '/preview').replace('?usp=sharing', '')}
                                  className="w-full h-full border-0"
                                  allowFullScreen
                                />
                              ) : (
                                <video 
                                  src={item.url} 
                                  className="w-full h-full object-contain"
                                  controls
                                  autoPlay
                                />
                              )}
                            </div>
                          ) : (
                            <img 
                              src={item.url} 
                              className="max-w-full max-h-full object-contain shadow-2xl rounded-2xl border border-white/10" 
                              style={{ imageRendering: 'auto' }}
                              alt=""
                            />
                          );
                        })()}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4 opacity-20">
                        <ImageIcon size={64} className="text-slate-500" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Documentary Missing</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {selectedExp.media && selectedExp.media.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handlePrevMedia(); }}
                      className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-slate-900/80 border border-white/10 text-white opacity-0 group-hover/slider:opacity-100 transition-all z-[65] shadow-2xl hover:bg-cyan-500"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleNextMedia(); }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-slate-900/80 border border-white/10 text-white opacity-0 group-hover/slider:opacity-100 transition-all z-[65] shadow-2xl hover:bg-cyan-500"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-cyan-400 tracking-[0.2em] z-[65] shadow-xl">
                      {activeMediaIndex + 1} <span className="text-slate-600 mx-2">/</span> {selectedExp.media.length}
                    </div>
                  </>
                )}
              </div>

              {/* Right Column: Information */}
              <div className="w-full lg:w-[45%] p-10 lg:p-16 overflow-y-auto custom-scrollbar flex flex-col bg-slate-900/20">
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em]">Experience Dossier</span>
                </div>

                <div className="space-y-12">
                  <div>
                    <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tighter leading-none uppercase">
                      {selectedExp.position}
                    </h2>
                    <p className="text-cyan-400 text-xl font-bold tracking-tight">{selectedExp.companyName}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    <div className="flex items-center gap-5 group/info">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center text-cyan-500 group-hover/info:bg-cyan-500 group-hover/info:text-slate-950 transition-all shadow-inner">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Timeframe</p>
                        <p className="text-white font-bold text-lg">{selectedExp.startDate} — {selectedExp.endDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-5 group/info">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center text-cyan-500 group-hover/info:bg-cyan-500 group-hover/info:text-slate-950 transition-all shadow-inner">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Base Location</p>
                        <p className="text-white font-bold text-lg">{selectedExp.location}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Info className="w-4 h-4 text-slate-600" />
                      <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Operational Summary</h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-medium text-lg">
                      {selectedExp.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Technical Proficiency</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedExp.skills.map((skill: string, i: number) => (
                        <div key={i} className="px-5 py-3 rounded-2xl bg-slate-800/50 border border-white/5 text-xs text-white font-bold flex items-center gap-3 hover:border-cyan-500/30 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-16">
                  <button 
                    onClick={() => setSelectedExp(null)}
                    className="w-full py-5 rounded-2xl bg-white text-slate-950 font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all shadow-2xl"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
