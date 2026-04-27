"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, User, Terminal, Globe, Palette, Box, Sparkles } from "lucide-react";
import type { Profile, Skill } from "@/lib/types/database";
import LightRays from "../ui/LightRays";
import { useAnimation } from "@/context/AnimationContext";

interface AboutPreviewProps {
  profile: Profile | null;
  skills: Skill[];
  highestStudy?: any;
}

export default function AboutPreview({ profile, skills, highestStudy }: AboutPreviewProps) {
  const { isPowerMode } = useAnimation();
  const [isEvolutionFlipped, setIsEvolutionFlipped] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      {/* Background Effects */}
      {isPowerMode && (
        <LightRays 
          raysOrigin="left" 
          raysColor="#06b6d4" 
          raysSpeed={0.5} 
          lightSpread={0.6}
          rayLength={1.5}
          className="absolute inset-0 opacity-80 pointer-events-none"
        />
      )}
      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div 
              initial={isPowerMode ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={isPowerMode ? { duration: 0.5 } : { duration: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${isPowerMode ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-neutral-900 border-white/10'} border mb-6`}
            >
              <User className={`w-3.5 h-3.5 ${isPowerMode ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isPowerMode ? 'text-cyan-400' : 'text-slate-500'}`}>Core Identity</span>
            </motion.div>
            <motion.h2 
              initial={isPowerMode ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={isPowerMode ? { delay: 0.1, duration: 0.5 } : { duration: 0 }}
              className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none"
            >
              The Mind <br />
              Behind the <span className={isPowerMode ? "text-cyan-500" : "text-white italic"}>Code.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={isPowerMode ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={isPowerMode ? { delay: 0.2, duration: 0.5 } : { duration: 0 }}
          >
            <Link
              href="/profiles"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
            >
              Access Full Dossier <ArrowUpRight className={`w-4 h-4 ${isPowerMode ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : ''} transition-transform`} />
            </Link>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bio Card */}
          <motion.div
            initial={isPowerMode ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={isPowerMode ? { duration: 0.6 } : { duration: 0 }}
            className="md:col-span-8 group relative"
          >
            {isPowerMode && (
              <div className="absolute -inset-px bg-gradient-to-br from-cyan-500/20 to-transparent rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}
            <div className={`relative h-full ${isPowerMode ? 'bg-[#0a0a0a]/80 backdrop-blur-2xl' : 'bg-neutral-900'} border border-white/10 rounded-[3rem] p-12 overflow-hidden transition-all duration-500 ${isPowerMode ? 'group-hover:border-cyan-500/30 group-hover:shadow-[0_0_50px_rgba(6,182,212,0.15)]' : ''}`}>
              <div className={`absolute top-0 right-0 p-10 opacity-[0.03] ${isPowerMode ? 'group-hover:opacity-[0.1] group-hover:scale-110 group-hover:rotate-6' : ''} transition-all duration-700`}>
                <Terminal className="w-48 h-48 text-white" />
              </div>
              
              <div className="relative z-10">
                <motion.p 
                  initial={isPowerMode ? { opacity: 0 } : { opacity: 1 }}
                  whileInView={{ opacity: 1 }}
                  transition={isPowerMode ? { delay: 0.2, duration: 0.5 } : { duration: 0 }}
                  className="text-2xl md:text-3xl text-slate-200 leading-snug font-medium tracking-tight"
                >
                  {profile?.bio ||
                    "A visionary developer specializing in high-performance web systems and immersive digital interfaces. My goal is to bridge the gap between imagination and reality through code."}
                </motion.p>
                
                <div className="mt-12 flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`w-12 h-12 rounded-full border-2 border-[#0a0a0a] bg-neutral-900/50 ${isPowerMode ? 'backdrop-blur-md group-hover:border-cyan-500/50' : ''} flex items-center justify-center transition-colors`}>
                        <Box className={`w-5 h-5 ${isPowerMode ? 'text-cyan-500/50' : 'text-slate-700'}`} />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isPowerMode ? 'text-cyan-400' : 'text-slate-500'}`}>System Architect</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Architecture Enthusiast</span>
                  </div>
                </div>
              </div>

              {/* Bottom Decoration */}
              {isPowerMode && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
              )}
            </div>
          </motion.div>

          {/* Stats Card / Cycle of Evolution */}
          <motion.div
            initial={isPowerMode ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={isPowerMode ? { delay: 0.1, duration: 0.6 } : { duration: 0 }}
            onClick={() => setIsEvolutionFlipped(!isEvolutionFlipped)}
            className="md:col-span-4 group relative cursor-pointer"
          >
            {isPowerMode && (
              <div className="absolute -inset-px bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-[3rem] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            )}
            <div className={`relative h-full ${isPowerMode ? 'bg-gradient-to-br from-cyan-600/20 to-blue-800/20 backdrop-blur-2xl' : 'bg-cyan-900'} border border-white/10 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 ${isPowerMode ? 'group-hover:scale-[0.98]' : ''}`}>
              {isPowerMode && <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.2),transparent_70%)]" />}
              
              <div className={`relative z-10 transition-all duration-500 ${isEvolutionFlipped ? 'opacity-0 scale-90 -rotate-12' : 'opacity-100 scale-100 rotate-0'}`}>
                <h3 className="text-8xl font-black text-white mb-3 tracking-tighter shadow-xl">1+</h3>
                <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${isPowerMode ? 'text-cyan-300' : 'text-cyan-500'}`}>Cycle of Evolution</p>
                {isPowerMode && (
                  <div className="mt-8 w-20 h-1.5 bg-white/20 rounded-full mx-auto relative overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,1)]"
                    />
                  </div>
                )}
              </div>

              <div className={`absolute inset-0 p-10 flex flex-col justify-center text-left transition-all duration-500 ${isEvolutionFlipped ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-12 pointer-events-none'}`}>
                <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6`}>
                  <Sparkles className={`w-5 h-5 ${isPowerMode ? 'text-cyan-300' : 'text-cyan-500'}`} />
                </div>
                <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${isPowerMode ? 'text-cyan-300' : 'text-cyan-500'}`}>Latest Achievement</p>
                <h4 className="text-2xl font-black text-white leading-tight mb-2 uppercase tracking-tighter">{highestStudy?.jurusan || "Technical Education"}</h4>
                <p className="text-sm font-bold text-white/60 mb-2">{highestStudy?.nama_sekolah || "Modern Engineering Inst."}</p>
                <div className="mt-4 px-4 py-2 bg-white/5 rounded-xl border border-white/10 inline-block">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{highestStudy?.tanggal_selesai || "2024"}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack Card */}
          <motion.div
            initial={isPowerMode ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={isPowerMode ? { delay: 0.2, duration: 0.6 } : { duration: 0 }}
            className="md:col-span-6 group relative"
          >
            {isPowerMode && (
              <div className="absolute -inset-px bg-gradient-to-br from-purple-500/20 to-transparent rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}
            <div className={`relative h-full ${isPowerMode ? 'bg-[#0a0a0a]/80 backdrop-blur-2xl' : 'bg-neutral-900'} border border-white/10 rounded-[3rem] p-10 transition-all duration-500 ${isPowerMode ? 'group-hover:border-purple-500/30' : ''}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-2xl ${isPowerMode ? 'bg-purple-500/10 border-purple-500/20 group-hover:bg-purple-500/20' : 'bg-neutral-800 border-white/10'} flex items-center justify-center border transition-colors`}>
                  <Palette className={`w-6 h-6 ${isPowerMode ? 'text-purple-400' : 'text-slate-500'}`} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Infrastructure</h3>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Technology Stack</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {skills.slice(0, 6).map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover={isPowerMode ? { scale: 1.05, x: 5 } : {}}
                    className={`px-5 py-4 ${isPowerMode ? 'bg-white/[0.03]' : 'bg-neutral-800'} border border-white/5 rounded-[1.5rem] text-[11px] font-bold text-slate-300 ${isPowerMode ? 'hover:text-cyan-400 hover:border-cyan-500/30' : ''} transition-all flex items-center gap-3 group/item shadow-sm`}
                  >
                    <div className={`w-2 h-2 rounded-full ${isPowerMode ? 'bg-purple-500/30 group-hover/item:bg-cyan-500 group-hover/item:shadow-[0_0_8px_rgba(6,182,212,1)]' : 'bg-slate-700'} transition-all`} />
                    {skill.nama_keahlian}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Global Connectivity Card */}
          <motion.div
            initial={isPowerMode ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={isPowerMode ? { delay: 0.3, duration: 0.6 } : { duration: 0 }}
            className="md:col-span-6 group relative"
          >
            {isPowerMode && (
              <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/20 to-transparent rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}
            <div className={`relative h-full ${isPowerMode ? 'bg-[#0a0a0a]/80 backdrop-blur-2xl' : 'bg-neutral-900'} border border-white/10 rounded-[3rem] p-10 flex items-center gap-10 overflow-hidden transition-all duration-500 ${isPowerMode ? 'group-hover:border-emerald-500/30' : ''}`}>
              <div className="relative z-10 flex items-center gap-10">
                <div className={`w-28 h-28 rounded-full border border-white/10 flex items-center justify-center shrink-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] bg-white/[0.02] ${isPowerMode ? 'group-hover:border-emerald-500/50' : ''} transition-all duration-700`}>
                  <Globe className={`w-14 h-14 ${isPowerMode ? 'text-emerald-500 animate-spin-slow group-hover:text-white' : 'text-slate-500'} transition-colors`} />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">Global Base</h3>
                  <p className={`text-3xl font-black text-white tracking-tighter leading-tight ${isPowerMode ? 'group-hover:text-emerald-400' : ''} transition-colors`}>{profile?.alamat || "Bandung, IDN"}</p>
                  <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full ${isPowerMode ? 'bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/20' : 'bg-neutral-800 border-white/10'} transition-all`}>
                    <div className={`w-2 h-2 rounded-full bg-emerald-500 ${isPowerMode ? 'animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]' : ''}`} />
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isPowerMode ? 'text-emerald-400' : 'text-slate-500'}`}>Active & Available</span>
                  </div>
                </div>
              </div>
              {/* Abstract Map Background */}
              <div className={`absolute -right-10 -bottom-10 opacity-[0.02] ${isPowerMode ? 'group-hover:opacity-[0.05] group-hover:scale-110' : ''} transition-all duration-1000 pointer-events-none`}>
                 <Globe className="w-80 h-80 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
