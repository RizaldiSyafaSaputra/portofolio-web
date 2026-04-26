"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Layers, ChevronLeft, ChevronRight, ImageIcon, Film } from "lucide-react";
import { useState } from "react";
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
        // Only images on home page
        .filter((item: any) => item.type === 'image')
        // Starred first
        .sort((a: any, b: any) => (b.isStarred ? 1 : 0) - (a.isStarred ? 1 : 0))
        // Limit to 3 images per project
        .slice(0, 3)
    } catch {
      return [{ url: url, type: 'image', isStarred: true }]
    }
  }

  const nextMedia = (e: React.MouseEvent, projectId: string, total: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMediaIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % total
    }))
  }

  const prevMedia = (e: React.MouseEvent, projectId: string, total: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMediaIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + total) % total
    }))
  }

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2" />

      <div className="container mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
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
              className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none"
            >
              Building <br />
              Digital <span className="text-blue-500">Solutions.</span>
            </motion.h2>
          </div>
          <Link
            href="/projects"
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
          >
            Explore All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Project Grid */}
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
                className="group relative bg-slate-900/40 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-sm flex flex-col"
              >
                {/* Image Section / Slider */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentMedia?.url}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      {currentMedia?.url ? (
                        <img
                          src={currentMedia.url}
                          alt={project.nama_project || ""}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900">
                          <ImageIcon className="w-12 h-12 text-slate-700" />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {media.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => prevMedia(e, project.id_project, media.length)}
                        className="p-2 rounded-full bg-slate-950/80 border border-white/10 text-white hover:bg-cyan-500 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => nextMedia(e, project.id_project, media.length)}
                        className="p-2 rounded-full bg-slate-950/80 border border-white/10 text-white hover:bg-cyan-500 transition-all"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Media Counter */}
                  {media.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-slate-950/80 border border-white/10 text-[9px] font-black text-white/60 tracking-widest">
                      {currentIndex + 1} / {media.length}
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-white mb-3 tracking-tight">
                    {project.nama_project}
                  </h3>
                  <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed font-medium">
                    {project.deskripsi || "Engineering a seamless user experience through modern architectural patterns."}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {(project.keahlian || "").split(",").slice(0, 3).map((tech, idx) => (
                      <span 
                        key={idx}
                        className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-slate-500 group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-colors"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-blue-600/0 group-hover:from-cyan-500/5 group-hover:to-blue-600/5 transition-all duration-700 pointer-events-none" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
