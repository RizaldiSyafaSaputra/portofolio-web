'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Globe, 
  Code2, 
  Sparkles,
  ImageIcon,
  Film,
  Info,
  Rocket
} from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Project } from '@/lib/types/database'

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeMediaIndex, setActiveMediaIndex] = useState<{ [key: string]: number }>({})
  const itemsPerPage = 6

  const totalPages = Math.ceil(projects.length / itemsPerPage)
  const safeTotalPages = totalPages === 0 ? 1 : totalPages
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProjects = projects.slice(startIndex, startIndex + itemsPerPage)

  const selectedProject = projects.find(p => p.id_project === selectedId)

  const handleNextPage = () => {
    if (currentPage < safeTotalPages) {
      setCurrentPage(prev => prev + 1)
      window.scrollTo({ top: 400, behavior: 'smooth' })
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
      window.scrollTo({ top: 400, behavior: 'smooth' })
    }
  }

  // Sync scroll lock with Lightbox
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
        // Starred first
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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
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

        {/* Pagination */}
        {safeTotalPages > 1 && (
          <div className="mt-20 flex flex-col items-center gap-8">
            <div className="flex items-center gap-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`group flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  currentPage === 1 
                    ? 'bg-slate-900/50 text-slate-700 border border-white/5 cursor-not-allowed' 
                    : 'bg-slate-900 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10'
                }`}
              >
                <ChevronLeft className={`w-4 h-4 transition-transform ${currentPage !== 1 ? 'group-hover:-translate-x-1' : ''}`} /> Previous
              </button>
              
              <div className="flex items-center gap-2">
                {[...Array(safeTotalPages)].map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      currentPage === i + 1 ? 'w-8 bg-cyan-500' : 'w-2 bg-slate-800'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === safeTotalPages}
                className={`group flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  currentPage === safeTotalPages 
                    ? 'bg-slate-900/50 text-slate-700 border border-white/5 cursor-not-allowed' 
                    : 'bg-slate-900 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10'
                }`}
              >
                Next <ChevronRight className={`w-4 h-4 transition-transform ${currentPage !== safeTotalPages ? 'group-hover:translate-x-1' : ''}`} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global Ultra-Stable Modal (Fix Overlap & Stability) */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl"
            />

            <motion.div
              layoutId={`card-container-${selectedId}`}
              className="relative w-full max-w-6xl h-full max-h-[85vh] bg-slate-900/60 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row z-50"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 z-[70] p-4 bg-slate-800/90 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-cyan-500 transition-all shadow-2xl group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              </button>

              {/* Left: Media Slider Section */}
              <div className="w-full lg:w-[55%] relative bg-black flex items-center justify-center group/slider overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
                {(() => {
                  const media = getMediaUrls(selectedProject.media_url);
                  const currentIndex = activeMediaIndex[selectedProject.id_project] || 0;
                  const currentMedia = media[currentIndex];

                  return (
                    <div className="w-full h-full relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentMedia?.url}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full flex items-center justify-center p-6 md:p-10"
                        >
                          <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-slate-900/20 border border-white/5 flex items-center justify-center relative group/media">
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
                                  alt={selectedProject.nama_project || ''} 
                                  className="max-w-full max-h-full object-contain select-none shadow-2xl rounded-2xl border border-white/10"
                                  style={{ imageRendering: 'auto' }}
                                />
                              )
                            ) : (
                              <div className="flex flex-col items-center gap-4 opacity-20">
                                <ImageIcon size={64} className="text-slate-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Asset Unavailable</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {media.length > 1 && (
                        <>
                          <button 
                            onClick={(e) => { e.stopPropagation(); prevMedia(selectedProject.id_project, media.length); }}
                            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-cyan-500 transition-all opacity-0 group-hover/slider:opacity-100 z-[65] shadow-2xl"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); nextMedia(selectedProject.id_project, media.length); }}
                            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-cyan-500 transition-all opacity-0 group-hover/slider:opacity-100 z-[65] shadow-2xl"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-cyan-400 tracking-[0.2em] z-[65] shadow-xl">
                            {currentIndex + 1} <span className="text-slate-600 mx-2">/</span> {media.length}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Right: Info Section */}
              <div className="w-full lg:w-[45%] p-10 lg:p-16 overflow-y-auto custom-scrollbar flex flex-col bg-slate-900/20">
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
                        <div key={i} className="px-5 py-3 rounded-2xl bg-slate-800/50 border border-white/5 text-xs text-white font-bold flex items-center gap-3 hover:border-cyan-500/30 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                          {skill.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-auto pt-16">
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="w-full py-5 rounded-2xl bg-white text-slate-950 font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all shadow-2xl"
                  >
                    Close Analysis
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({ project, onClick, getMediaUrls, isVideo }: { project: Project; onClick: () => void; getMediaUrls: (url: string | null) => any[]; isVideo: (item: any) => boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const media = getMediaUrls(project.media_url)
  const mainThumbnail = media[0] || null

  const maxMediaVisible = Math.min(media.length > 0 ? media.length : 1, 5)
  
  return (
    <div 
      className="relative flex flex-col items-center group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Container Media */}
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
              key={index}
              className={`absolute w-full h-full rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-slate-900 transition-all duration-500 ${
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
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
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
                <div className="w-full h-full flex items-center justify-center bg-slate-900">
                   <ImageIcon className="w-6 h-6 text-slate-800" />
                </div>
              )}
              {!isMain && <div className="absolute inset-0 bg-black/40" />}
            </motion.div>
          )
        })}

        <motion.div 
          className="absolute z-30 pointer-events-none px-5 py-3 border border-white/20 bg-slate-950/60 backdrop-blur-xl rounded-2xl max-w-[85%] shadow-2xl"
          animate={{
            y: isHovered ? 140 : 0, 
            scale: isHovered ? 0.85 : 1,
            opacity: 1,
            borderColor: isHovered ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.2)',
            backgroundColor: isHovered ? 'rgba(2, 6, 23, 0)' : 'rgba(2, 6, 23, 0.6)'
          }}
          transition={{ type: "spring", stiffness: 140, damping: 24 }}
        >
          <motion.h3 
            className={`text-[10px] md:text-xs font-black tracking-[0.2em] uppercase transition-colors duration-300 text-center break-words leading-relaxed`}
            style={{ color: isHovered ? '#22d3ee' : 'white' }}
          >
            {project.nama_project}
          </motion.h3>
        </motion.div>
      </div>

      <motion.div
        animate={{ 
          opacity: isHovered ? 0.8 : 0, 
          y: isHovered ? 0 : 20,
          scale: isHovered ? 1 : 0.8 
        }}
        className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 bg-cyan-500/10 px-6 py-3 rounded-full border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
      >
        <Sparkles className="w-3 h-3 animate-pulse" /> Intelligence View
      </motion.div>
    </div>
  )
}
