"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Briefcase, MapPin, Calendar, Terminal } from "lucide-react";
import type { Experience } from "@/lib/types/database";

interface ExperiencePreviewProps {
  experiences: Experience[];
}

export default function ExperiencePreview({ experiences }: ExperiencePreviewProps) {
  const displayExperiences = experiences.slice(0, 3);

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6"
            >
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Career Trajectory</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none"
            >
              Professional <br />
              <span className="text-indigo-500">Expeditions.</span>
            </motion.h2>
          </div>
        </div>
        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent -translate-x-1/2" />

          <div className="space-y-16 pb-32">
            {displayExperiences.map((exp, i) => (
              <motion.div
                key={exp.id_experience}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Node */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-slate-950 border-2 border-indigo-500 rounded-full -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />

                {/* Content Card */}
                <div className={`w-full md:w-[45%] ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/10 backdrop-blur-sm relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
                      <Terminal className="w-20 h-20 text-white" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                          {exp.jenis_pekerjaan || "Full-Time"}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          <Calendar className="w-3 h-3" />
                          {exp.tanggal_masuk} - {exp.tanggal_selesai || "Present"}
                        </div>
                      </div>

                      <h3 className="text-xl font-black text-white mb-1 tracking-tight">
                        {exp.posisi}
                      </h3>
                      <p className="text-sm font-bold text-slate-400 mb-6">
                        @ {exp.nama_perusahaan}
                      </p>

                      <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                         <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-indigo-500" />
                            {exp.lokasi_perusahaan || "Remote"}
                         </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Spacer for empty side */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>

          {/* Centralized CTA Button */}
          <div className="absolute bottom-0 left-0 md:left-1/2 -translate-x-1/2 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-indigo-500/30 blur-2xl rounded-full animate-pulse" />
              <Link
                href="/pengalaman"
                className="relative group flex items-center gap-4 px-10 py-5 rounded-full bg-slate-900 border-2 border-indigo-500/50 text-white transition-all duration-500 hover:border-indigo-400 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(99,102,241,0.2)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="text-xs font-black uppercase tracking-[0.4em] relative z-10">Go to Experience</span>
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 relative z-10 shadow-lg">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
