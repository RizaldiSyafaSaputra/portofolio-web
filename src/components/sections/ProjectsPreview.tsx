"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Layers, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import type { Project } from "@/lib/types/database";

interface ProjectsPreviewProps {
  projects: Project[];
}

export default function ProjectsPreview({ projects }: ProjectsPreviewProps) {
  const displayProjects = projects.slice(0, 3);
  const [activeMediaIndex, setActiveMediaIndex] = useState<{ [key: string]: number }>({});

  const getMediaUrls = (url: string | null) => {
    if (!url) return []
    try {
      const parsed = JSON.parse(url)
      const items = Array.isArray(parsed) ? parsed : [{ url: url, type: 'image', isStarred: true }]
      
      return items
        .map((item: any) => typeof item === 'string' ? { url: item, type: 'image', isStarred: false } : item)
        .filter((item: any) => item.type === 'image')
        .sort((a: any, b: any) => (b.isStarred ? 1 : 0) - (a.isStarred ? 1 : 0))
        .slice(0, 3)
    } catch {
      return [{ url: url, type: 'image', isStarred: true }]
    }
  }

  const nextMedia = (e: React.MouseEvent, projectId: string, total: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMediaIndex(prev => ({ ...prev, [projectId]: ((prev[projectId] || 0) + 1) % total }))
  }

  const prevMedia = (e: React.MouseEvent, projectId: string, total: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMediaIndex(prev => ({ ...prev, [projectId]: ((prev[projectId] || 0) - 1 + total) % total }))
  }

  return (
    <section className="relative py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Featured Work</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none"
            >
              Selected <br />
              Digital <span className="text-blue-500 underline decoration-blue-500/20 decoration-8 underline-offset-4">Artifacts.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/projects"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
            >
              Explore Full Archive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, i) => {
            const media = getMediaUrls(project.media_url);
            const currentIndex = activeMediaIndex[project.id_project] || 0;
            const currentMedia = media[currentIndex];

            return (
              <motion.div
                key={project.id_project}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white/[0.02] border border-white/5 hover:border-blue-500/50 hover:bg-white/[0.04] transition-all duration-500 rounded-[2.5rem] overflow-hidden backdrop-blur-sm flex flex-col h-[500px]"
              >
                <div className="relative h-64 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${project.id_project}-${currentIndex}`}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      {currentMedia?.url ? (
                        <img
                          src={currentMedia.url}
                          alt={project.nama_project || ""}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                          <ImageIcon className="w-12 h-12 text-slate-700" />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {media.length > 1 && (
                    <div className="absolute inset-x-0 bottom-4 px-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-1">
                        {media.map((_, idx) => (
                          <div 
                            key={idx}
                            className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-blue-500' : 'w-2 bg-white/30'}`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => prevMedia(e, project.id_project, media.length)}
                          className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => nextMedia(e, project.id_project, media.length)}
                          className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-white mb-3 tracking-tight">
                    {project.nama_project}
                  </h3>
                  <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                    {project.deskripsi || "Building innovative solutions with modern technology stacks."}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {(project.keahlian || "").split(",").slice(0, 3).map((tech, idx) => (
                        <div 
                          key={idx}
                          className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center"
                          title={tech.trim()}
                        >
                          <span className="text-[8px] font-bold text-slate-500">{tech.trim()[0]}</span>
                        </div>
                      ))}
                    </div>
                    <Link 
                      href={`/projects/${project.id_project}`}
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Case Study <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
