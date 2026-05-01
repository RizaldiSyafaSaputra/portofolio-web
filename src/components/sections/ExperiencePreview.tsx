"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Briefcase, MapPin, Calendar, Terminal } from "lucide-react";
import type { Experience } from "@/lib/types/database";
import LightRays from "../ui/LightRays";
import { useAnimation } from "@/context/AnimationContext";

interface ExperiencePreviewProps {
  experiences: Experience[];
}

export default function ExperiencePreview({ experiences }: ExperiencePreviewProps) {
  const { isPowerMode } = useAnimation();
  const displayExperiences = experiences.slice(0, 3);

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      {/* Background Effects */}
      {isPowerMode && (
        <LightRays 
          raysOrigin="right" 
          raysColor="#6366f1" 
          raysSpeed={0.5} 
          lightSpread={0.7}
          rayLength={1.8}
          className="absolute inset-0 opacity-70 pointer-events-none"
        />
      )}
      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-20 text-center md:text-left">
          <div className="max-w-2xl flex flex-col items-center md:items-start">
            <motion.div 
              initial={isPowerMode ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={isPowerMode ? { duration: 0.5 } : { duration: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${isPowerMode ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-neutral-900 border-white/10'} border mb-6`}
            >
              <Briefcase className={`w-3.5 h-3.5 ${isPowerMode ? 'text-indigo-400' : 'text-slate-500'}`} />
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isPowerMode ? 'text-indigo-400' : 'text-slate-500'}`}>Career Trajectory</span>
            </motion.div>
            <motion.h2 
              initial={isPowerMode ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={isPowerMode ? { delay: 0.1, duration: 0.5 } : { duration: 0 }}
              className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none"
            >
              Professional <br />
              <span className={isPowerMode ? "text-indigo-500" : "text-white italic"}>Expeditions.</span>
            </motion.h2>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main vertical line */}
          <div className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-px ${isPowerMode ? 'bg-indigo-500/20' : 'bg-white/10'} -translate-x-1/2`} />

          <div className="space-y-16 pb-32">
            {displayExperiences.map((exp, i) => (
              <motion.div
                key={exp.id_experience}
                initial={isPowerMode ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={isPowerMode ? { delay: i * 0.1, duration: 0.5 } : { duration: 0 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Node */}
                <div className={`absolute left-0 md:left-1/2 top-0 w-4 h-4 border-2 ${isPowerMode ? 'border-indigo-500' : 'border-slate-500'} bg-black rounded-full -translate-x-1/2 z-20`} />

                {/* Content Card */}
                <div className={`w-full md:w-[45%] ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"} px-4 md:px-0`}>
                  <div className={`p-5 md:p-8 rounded-[2.5rem] ${isPowerMode ? 'bg-white/[0.02] backdrop-blur-sm' : 'bg-neutral-900'} border border-white/5 ${isPowerMode ? 'hover:border-indigo-500/50 hover:bg-white/[0.04]' : ''} transition-all duration-500 relative overflow-hidden group w-[95%] mx-auto md:w-full`}>
                    <div className={`absolute top-0 right-0 p-6 opacity-[0.03] ${isPowerMode ? 'group-hover:opacity-[0.1]' : ''} transition-opacity`}>
                      <Terminal className="w-20 h-20 text-white" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 ${isPowerMode ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' : 'text-slate-500 bg-neutral-800 border-white/10'} rounded-full border`}>
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
                            <MapPin className={`w-3 h-3 ${isPowerMode ? 'text-indigo-500' : 'text-slate-600'}`} />
                            {exp.lokasi_perusahaan || "Remote"}
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Spacer for empty side */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>

          {/* Centralized CTA Button */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-6">
            <motion.div
              whileHover={isPowerMode ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              {/* Neon Aura Effect */}
              {isPowerMode && (
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
              )}
              
              <Link
                href="/pengalaman"
                className={`relative flex items-center gap-4 px-12 py-6 rounded-full ${isPowerMode ? 'bg-white text-black hover:bg-black hover:text-white' : 'bg-indigo-600 text-white'} text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 border border-white/10`}
              >
                <span className="relative z-10">Go to Experience</span>
                <ArrowUpRight className={`w-4 h-4 ${isPowerMode ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : ''} transition-transform duration-500`} />
              </Link>

              {/* Bottom Neon Line */}
              {isPowerMode && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-indigo-500 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
