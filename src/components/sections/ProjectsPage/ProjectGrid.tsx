'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  ImageIcon,
  Film,
  Info,
  Rocket,
  Code2,
  ExternalLink
} from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Project } from '@/lib/types/database'
import { TiltCard } from "@/components/ui/TiltCard";
import AnimatedDescription from "@/components/ui/AnimatedDescription";

interface ProjectGridProps {
  projects: Project[]
}

import { createPortal } from 'react-dom'
import { memo } from 'react'
import { usePremiumSound } from '@/hooks/usePremiumSound'
import dynamic from 'next/dynamic'

const LightRays = dynamic(() => import('@/components/ui/LightRays'), { ssr: false });

// Memoize ProjectCard to prevent re-renders when modal opens
const ProjectCard = memo(({ project, onClick, getMediaUrls, isVideo }: { project: Project; onClick: () => void; getMediaUrls: (url: string | null) => any[]; isVideo: (item: any) => boolean }) => {
  const [isHovered, setIsHovered] = useState(false)
  const playHover = usePremiumSound('/sounds/blip.mp3', 0.05);
  const playClick = usePremiumSound('/sounds/click.mp3', 0.1);

  const handleClick = () => {
    playClick();
    onClick();
  };
  const media = getMediaUrls(project.media_url)
  const mainThumbnail = media[0] || null

  const maxMediaVisible = Math.min(media.length > 0 ? media.length : 1, 5)
  
  return (
    <TiltCard className="w-full">
      <div 
        className="relative flex flex-col items-center group cursor-pointer"
        data-cursor="view"
        onMouseEnter={() => {
          setIsHovered(true);
          playHover();
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
      <div className="relative w-full aspect-[4/3] flex items-center justify-center mb-8">
        {[...Array(maxMediaVisible)].map((_, index) => {
          const isMain = index === 0
          const totalMedia = maxMediaVisible
          const middleIndex = (totalMedia - 1) / 2
          const relativeIndex = index - middleIndex

          const rotation = isHovered ? relativeIndex * 8 : 0
          const xOffset = isHovered ? relativeIndex * 45 : 0
          const yOffset = isHovered ? (Math.abs(relativeIndex) * 10) : index * -2

          const currentMedia = media[index] || mainThumbnail

          return (
            <motion.div
              key={`${project.id_project}-media-${index}`}
              className={`absolute w-full h-full rounded-3xl border border-white/5 shadow-2xl overflow-hidden bg-white/[0.02] transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] group-hover:bg-white/[0.05] ${
                isMain ? 'z-20' : 'z-10'
              }`}
              animate={{
                rotate: rotation,
                x: xOffset,
                y: yOffset,
                scale: isHovered ? 1.02 : 1 - (index * 0.02),
                opacity: isHovered ? (isMain ? 1 : 0.7) : (isMain ? 1 : 0),
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {currentMedia?.url ? (
                <>
                  {isVideo(currentMedia) ? (
                    <div className="w-full h-full relative">
                      <video src={currentMedia.url} className="w-full h-full object-cover" muted playsInline />
                      <div className="absolute inset-0/40 flex items-center justify-center">
                        <Film className="w-6 h-6 text-white/50" />
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={currentMedia.url} 
                      alt=""
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isMain && !isHovered ? 'blur-sm opacity-60 scale-110' : 'blur-0 opacity-100 scale-100'
                      }`}
                    />
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-950">
                   <ImageIcon className="w-6 h-6 text-slate-800" />
                </div>
              )}
              {!isMain && <div className="absolute inset-0/40" />}
            </motion.div>
          )
        })}

        <motion.div 
          className="absolute z-30 pointer-events-none px-6 py-4 border border-white/20/60 backdrop-blur-xl rounded-2xl max-w-[90%] shadow-2xl overflow-hidden"
          animate={{
            y: isHovered ? 110 : 0, 
            scale: isHovered ? 0.9 : 1,
            opacity: 1,
            borderColor: isHovered ? 'rgba(34, 211, 238, 0.4)' : 'rgba(255, 255, 255, 0.2)',
            boxShadow: isHovered ? '0 0 30px rgba(34, 211, 238, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.5)'
          }}
          transition={{ type: "spring", stiffness: 140, damping: 24 }}
        >
          <div className="flex flex-col items-center gap-2">
            <motion.h3 
              className={`text-sm md:text-base font-black tracking-wider uppercase transition-colors duration-300 text-center break-words leading-tight animate-gradient-text bg-gradient-to-r from-white via-cyan-300 to-white bg-clip-text text-transparent`}
            >
              {project.nama_project}
            </motion.h3>
            
            {isHovered && project.deskripsi && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 text-center"
              >
                <AnimatedDescription 
                  text={project.deskripsi.substring(0, 80) + '...'}
                  className="text-[10px] text-slate-400 font-medium leading-relaxed"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? 0 : 20,
          scale: isHovered ? 1 : 0.8,
          borderColor: isHovered ? 'rgba(34, 211, 238, 0.5)' : 'rgba(34, 211, 238, 0)'
        }}
        className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 bg-cyan-500/10 px-6 py-3 rounded-full border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
      >
        <Rocket className="w-3.5 h-3.5 text-cyan-400 animate-bounce" /> Analyze System
      </motion.div>
      </div>
    </TiltCard>
  )
})

ProjectCard.displayName = 'ProjectCard'

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeMediaIndex, setActiveMediaIndex] = useState<{ [key: string]: number }>({})
  const [mounted, setMounted] = useState(false)
  const itemsPerPage = 6

  const playHover = usePremiumSound('/sounds/blip.mp3', 0.05);
  const playClick = usePremiumSound('/sounds/click.mp3', 0.1);

  useEffect(() => {
    setMounted(true)
  }, [])

  const totalPages = Math.ceil(projects.length / itemsPerPage)
  const safeTotalPages = totalPages === 0 ? 1 : totalPages
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProjects = projects.slice(startIndex, startIndex + itemsPerPage)

  const selectedProject = projects.find(p => p.id_project === selectedId)

  const handleNextPage = () => {
    if (currentPage < safeTotalPages) {
      playClick();
      setCurrentPage(prev => prev + 1)
      window.scrollTo({ top: 400, behavior: 'smooth' })
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      playClick();
      setCurrentPage(prev => prev - 1)
      window.scrollTo({ top: 400, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new Event('modalOpen'));
    } else {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new Event('modalClose'));
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedId]);

  const getMediaUrls = (url: string | null) => {
    if (!url) return []
    try {
      const parsed = JSON.parse(url)
      const items = Array.isArray(parsed) ? parsed : [{ url: url, type: 'image', isStarred: true }]
      return items
        .map((item: any) => typeof item === 'string' ? { url: item, type: 'image', isStarred: false } : item)
        .sort((a: any, b: any) => (b.isStarred ? 1 : 0) - (a.isStarred ? 1 : 0))
    } catch {
      return [{ url: url, type: 'image', isStarred: true }]
    }
  }

  const nextMedia = (projectId: string, total: number) => {
    setActiveMediaIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % total
    }))
  }

  const prevMedia = (projectId: string, total: number) => {
    setActiveMediaIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + total) % total
    }))
  }

  const isVideo = (item: any) => {
    if (!item) return false;
    const url = typeof item === 'string' ? item : item.url;
    const type = typeof item === 'string' ? '' : item.type;
    if (type === 'video') return true;
    return (
      url.match(/\.(mp4|webm|ogg|mov)$/i) || 
      url.includes('youtube.com') || 
      url.includes('youtu.be') || 
      url.includes('drive.google.com')
    );
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[800px]">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <LightRays 
          raysOrigin="top-right" 
          raysColor="#083344" 
          raysSpeed={0.5} 
          lightSpread={0.8}
          rayLength={2.5}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {paginatedProjects.map((project) => (
            <ProjectCard 
              key={project.id_project} 
              project={project} 
              onClick={() => {
                setSelectedId(project.id_project);
                setActiveMediaIndex(prev => ({ ...prev, [project.id_project]: 0 }));
              }}
              getMediaUrls={getMediaUrls}
              isVideo={isVideo}
            />
          ))}
        </div>

        {safeTotalPages > 1 && (
          <div className="mt-20 flex flex-col items-center gap-8">
            <div className="flex items-center gap-6">
              <button
                onClick={handlePrevPage}
                onMouseEnter={playHover}
                disabled={currentPage === 1}
                className={`group flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  currentPage === 1 
                    ? 'bg-neutral-950/50 text-slate-700 border border-white/5 cursor-not-allowed' 
                    : 'bg-neutral-950 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10'
                }`}
              >
                <ChevronLeft className={`w-4 h-4 transition-transform ${currentPage !== 1 ? 'group-hover:-translate-x-1' : ''}`} /> Previous
              </button>
              
              <div className="flex items-center gap-2">
                {[...Array(safeTotalPages)].map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      currentPage === i + 1 ? 'w-8 bg-cyan-500' : 'w-2 bg-neutral-900'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPage}
                onMouseEnter={playHover}
                disabled={currentPage === safeTotalPages}
                className={`group flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  currentPage === safeTotalPages 
                    ? 'bg-neutral-950/50 text-slate-700 border border-white/5 cursor-not-allowed' 
                    : 'bg-neutral-950 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10'
                }`}
              >
                Next <ChevronRight className={`w-4 h-4 transition-transform ${currentPage !== safeTotalPages ? 'group-hover:translate-x-1' : ''}`} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PORTAL MODAL - Improved stability by keeping Portal mounted for AnimatePresence */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence mode="wait">
          {selectedId && selectedProject && (
            <motion.div 
              key="project-modal-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999999] flex items-center justify-center p-4 md:p-12 overflow-hidden/90 backdrop-blur-md"
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            >
              <div 
                className="absolute inset-0" 
                onClick={() => setSelectedId(null)} 
              />

              <motion.div
                key={`project-modal-content-${selectedId}`}
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className="relative w-full max-w-6xl h-full max-h-[85vh] bg-neutral-950/60 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => { playClick(); setSelectedId(null); }}
                  onMouseEnter={playHover}
                  data-cursor="close"
                  className="absolute top-6 right-6 z-[70] p-4 bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-cyan-500 transition-all shadow-2xl group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                </button>

                <div className="w-full lg:w-[55%] relative flex items-center justify-center group/slider overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
                  {(() => {
                    const media = getMediaUrls(selectedProject.media_url);
                    const currentIndex = activeMediaIndex[selectedProject.id_project] || 0;
                    const currentMedia = media[currentIndex];

                    return (
                      <div className="w-full h-full relative">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`media-${selectedId}-${currentIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full flex items-center justify-center p-6 md:p-10"
                          >
                            <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-neutral-950/20 border border-white/5 flex items-center justify-center relative">
                              {currentMedia?.url ? (
                                isVideo(currentMedia) ? (
                                  <div className="w-full aspect-video rounded-2xl overflow-hidden">
                                    {currentMedia.url.includes('youtube.com') || currentMedia.url.includes('youtu.be') ? (
                                      <iframe 
                                        src={`https://www.youtube.com/embed/${currentMedia.url.split('v=')[1]?.split('&')[0] || currentMedia.url.split('/').pop()}`}
                                        className="w-full h-full border-0"
                                        allowFullScreen
                                      />
                                    ) : currentMedia.url.includes('drive.google.com') ? (
                                      <iframe 
                                        src={currentMedia.url.replace('/view', '/preview').replace('?usp=sharing', '')}
                                        className="w-full h-full border-0"
                                        allowFullScreen
                                      />
                                    ) : (
                                      <video 
                                        src={currentMedia.url} 
                                        className="w-full h-full object-contain"
                                        controls
                                        autoPlay
                                        playsInline
                                      />
                                    )}
                                  </div>
                                ) : (
                                  <img 
                                    src={currentMedia.url} 
                                    alt="" 
                                    className="max-w-full max-h-full object-contain select-none shadow-2xl rounded-2xl border border-white/10"
                                  />
                                )
                              ) : (
                                <div className="flex flex-col items-center gap-4 opacity-20">
                                  <ImageIcon size={64} className="text-slate-500" />
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </AnimatePresence>

                        {media.length > 1 && (
                          <>
                            <button 
                              onClick={(e) => { e.stopPropagation(); playClick(); prevMedia(selectedProject.id_project, media.length); }}
                              onMouseEnter={playHover}
                              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-neutral-950/80 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-cyan-500 transition-all opacity-0 group-hover/slider:opacity-100 z-[65] shadow-2xl"
                            >
                              <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); playClick(); nextMedia(selectedProject.id_project, media.length); }}
                              onMouseEnter={playHover}
                              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-neutral-950/80 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-cyan-500 transition-all opacity-0 group-hover/slider:opacity-100 z-[65] shadow-2xl"
                            >
                              <ChevronRight className="w-6 h-6" />
                            </button>
                          </>
                        )}
                      </div>
                    );
                  })()}
                </div>

                <div 
                  className="w-full lg:w-[45%] p-10 lg:p-16 overflow-y-auto overscroll-contain custom-scrollbar flex flex-col bg-neutral-950/20 transform-gpu"
                  data-lenis-prevent="true"
                >
                  <div className="flex items-center gap-3 mb-10">
                    <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                      <Rocket className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em]">Project Intelligence</span>
                  </div>

                  <div className="space-y-12">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tighter leading-none">
                        {selectedProject.nama_project}
                      </h2>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.tools && selectedProject.tools.split(',').map((tool, i) => (
                          <span key={i} className="text-cyan-400 text-[10px] font-black uppercase tracking-widest bg-cyan-400/5 px-3 py-1 rounded-md border border-cyan-400/10">
                            {tool.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <Info className="w-4 h-4 text-slate-600" />
                        <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Project Narrative</h4>
                      </div>
                      <p className="text-slate-300 leading-relaxed font-medium text-lg">
                        {selectedProject.deskripsi}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">System Architecture</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.keahlian && selectedProject.keahlian.split(',').map((skill, i) => (
                          <div key={i} className="px-5 py-3 rounded-2xl bg-neutral-900/50 border border-white/5 text-xs text-white font-bold flex items-center gap-3 hover:border-cyan-500/30 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                            {skill.trim()}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                    <div className="mt-auto pt-16">
                      <button 
                        onClick={() => { playClick(); setSelectedId(null); }}
                        onMouseEnter={playHover}
                        className="w-full py-5 rounded-2xl bg-white text-slate-950 font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all shadow-2xl"
                      >
                        Close Analysis
                      </button>
                    </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
