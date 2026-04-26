'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, GitBranch, Code2, Layers, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react'
import type { Project } from '@/lib/types/database'

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
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

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <motion.div
          className="absolute top-1/2 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]"
          animate={{
            y: [0, 50, -50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center mb-8">
              <Sparkles className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3 tracking-tight">No Projects Yet</h3>
            <p className="text-slate-500 max-w-md font-medium">Projects will appear here once they are added through the admin dashboard.</p>
          </div>
        ) : (
          <>
            {/* Grid of Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {paginatedProjects.map((project) => (
                <ProjectCard 
                  key={project.id_project} 
                  project={project} 
                  onClick={() => setSelectedId(project.id_project)} 
                />
              ))}
            </div>


        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              currentPage === 1 
                ? 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800' 
                : 'bg-slate-900 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            Page {currentPage} / {safeTotalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === safeTotalPages}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              currentPage === safeTotalPages 
                ? 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800' 
                : 'bg-slate-900 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20'
            }`}
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Full-screen Detail View */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
              />

              <motion.div
                layoutId={`card-container-${selectedId}`}
                className="relative w-full max-w-6xl bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl flex flex-col lg:flex-row h-full max-h-[90vh]"
              >
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 z-50 p-4 bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="w-full lg:w-[60%] relative bg-black/40 overflow-hidden flex items-center justify-center">
                  {selectedProject.media_url && (
                    <motion.img
                      layoutId={`img-${selectedId}-0`}
                      src={selectedProject.media_url}
                      alt={selectedProject.nama_project || ''}
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>

                <div className="w-full lg:w-[40%] p-10 md:p-14 overflow-y-auto custom-scrollbar">
                   <div className="flex items-center gap-3 mb-6">
                    <div className="h-px w-8 bg-cyan-500" />
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em]">Project Detail</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight">
                    {selectedProject.nama_project}
                  </h2>

                  <div className="space-y-10">
                    <section>
                      <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Layers className="w-3 h-3 text-cyan-500" /> Description
                      </h4>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                        {selectedProject.deskripsi}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Code2 className="w-3 h-3 text-cyan-500" /> Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tools?.split(',').map((tool, i) => (
                          <span key={i} className="px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-xl text-xs text-slate-300">
                            {tool.trim()}
                          </span>
                        ))}
                      </div>
                    </section>

                    <div className="pt-10 flex gap-4">
                      <a href="#" className="flex-1 flex items-center justify-center gap-3 bg-white text-black font-bold py-5 rounded-[1.5rem] hover:bg-cyan-400 transition-all text-sm">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
          </>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  // Maksimal 5 media yang tampil saat fan-out
  const maxMediaVisible = 5
  
  return (
    <div 
      className="relative flex flex-col items-center group h-[360px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Container Media */}
      <div className="relative w-full h-[280px] flex items-center justify-center">
        {/* Stacked Media Fan-Out */}
        {[...Array(maxMediaVisible)].map((_, index) => {
          const isMain = index === 0
          const totalMedia = maxMediaVisible
          const middleIndex = (totalMedia - 1) / 2
          const relativeIndex = index - middleIndex

          const rotation = isHovered ? relativeIndex * 10 : 0
          const xOffset = isHovered ? relativeIndex * 60 : 0
          const yOffset = isHovered ? (Math.abs(relativeIndex) * 12) : index * -2

          return (
            <motion.div
              key={index}
              layoutId={isMain ? `img-${project.id_project}-${index}` : undefined}
              className={`absolute w-full aspect-[4/3] rounded-2xl border border-slate-800 shadow-xl overflow-hidden bg-slate-900 transition-all duration-500 ${
                isMain ? 'z-20' : 'z-10'
              }`}
              animate={{
                rotate: rotation,
                x: xOffset,
                y: yOffset,
                scale: isHovered ? 1.05 : 1 - (index * 0.02),
              }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
            >
              <img 
                src={project.media_url || ''} 
                alt=""
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isMain && !isHovered ? 'blur-md opacity-40 scale-110' : 'blur-0 opacity-100 scale-100'
                }`}
              />
              
              {!isMain && <div className="absolute inset-0 bg-black/60" />}
            </motion.div>
          )
        })}

        {/* Project Name (Initial State: Center with Border) */}
        <motion.div 
          className="absolute z-30 pointer-events-none px-4 py-2.5 border border-white/40 bg-slate-950/40 backdrop-blur-md rounded-xl max-w-[85%]"
          animate={{
            y: isHovered ? 180 : 0, 
            scale: isHovered ? 0.85 : 1,
            opacity: 1,
            borderColor: isHovered ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.4)',
            backgroundColor: isHovered ? 'rgba(2, 6, 23, 0)' : 'rgba(2, 6, 23, 0.4)'
          }}
          transition={{ type: "spring", stiffness: 140, damping: 24 }}
        >
          <motion.h3 
            className={`text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 text-center break-words`}
            style={{ color: isHovered ? '#22d3ee' : 'white' }}
          >
            {project.nama_project}
          </motion.h3>
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: isHovered ? 0.6 : 0, y: isHovered ? 10 : 20 }}
        className="mt-10 text-slate-600 text-[8px] font-bold uppercase tracking-[0.2em] flex items-center gap-2"
      >
        <ChevronRight className="w-3 h-3 text-cyan-500" /> Click to View
      </motion.div>
    </div>
  )
}
