"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FolderOpen, Layers, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/types/database";

interface ProjectsPreviewProps {
  projects: Project[];
}

export default function ProjectsPreview({ projects }: ProjectsPreviewProps) {
  const displayProjects = projects.slice(0, 3);

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
          {displayProjects.map((project, i) => (
            <motion.div
              key={project.id_project}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-slate-900/40 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-sm"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/50 group-hover:bg-transparent transition-colors duration-500 z-10" />
                {project.media_url ? (
                  <img
                    src={project.media_url}
                    alt={project.nama_project || ""}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800">
                    <FolderOpen className="w-12 h-12 text-slate-700" />
                  </div>
                )}
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 z-20">
                   <div className="p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-4 h-4" />
                   </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">
                  {project.nama_project}
                </h3>
                <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                  {project.deskripsi || "Engineering a seamless user experience through modern architectural patterns."}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {(project.keahlian || "React, Next.js, Tailwind").split(",").slice(0, 3).map((tech, idx) => (
                    <span 
                      key={idx}
                      className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-slate-500 group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-colors"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-blue-600/0 group-hover:from-cyan-500/5 group-hover:to-blue-600/5 transition-all duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
