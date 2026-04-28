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
  studies: any[];
}

export default function AboutPreview({ profile, skills, studies }: AboutPreviewProps) {
  const { isPowerMode } = useAnimation();
  const [educationIndex, setEducationIndex] = useState(-1);

  const featuredSkills = skills.filter(s => s.is_featured).slice(0, 6);
  const currentStudy = educationIndex === -1 ? null : studies[educationIndex];

  const techLogos = [
    { name: "Next.js", slug: "nextdotjs", color: "#ffffff" },
    { name: "Node.js", slug: "nodedotjs", color: "#339933" },
    { name: "React", slug: "react", color: "#61DAFB" },
    { name: "Tailwind", slug: "tailwindcss", color: "#06B6D4" },
    { name: "Supabase", slug: "supabase", color: "#3ECF8E" },
    { name: "Figma", slug: "figma", color: "#F24E1E" },
  ];

  const cycleEducation = () => {
    setEducationIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex >= studies.length ? -1 : nextIndex;
    });
  };

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
            className="md:col-span-8 group relative will-change-transform"
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
                  <div className="flex -space-x-2">
                    {techLogos.map((logo, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ 
                          scale: 1.2, 
                          zIndex: 20,
                          y: -5
                        }}
                        className={`w-12 h-12 rounded-full border-2 border-[#0a0a0a] bg-neutral-900/50 ${isPowerMode ? 'backdrop-blur-md' : ''} flex items-center justify-center transition-all cursor-pointer group/logo relative`}
                        title={logo.name}
                      >
                        <img 
                          src={`https://cdn.simpleicons.org/${logo.slug}/808080`} 
                          alt={logo.name} 
                          className="w-6 h-6 grayscale group-hover/logo:grayscale-0 transition-all duration-500"
                          style={{ filter: `drop-shadow(0 0 8px ${logo.color}40)` }}
                          onMouseEnter={(e) => {
                            e.currentTarget.src = `https://cdn.simpleicons.org/${logo.slug}/${logo.color.replace('#', '')}`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.src = `https://cdn.simpleicons.org/${logo.slug}/808080`;
                          }}
                        />
                        {isPowerMode && (
                          <div 
                            className="absolute inset-0 rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity blur-md -z-10" 
                            style={{ backgroundColor: `${logo.color}30` }} 
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isPowerMode ? 'text-cyan-400' : 'text-slate-500'}`}>System Architect</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Core Tech Stack</span>
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
            onClick={cycleEducation}
            className="md:col-span-4 group relative cursor-pointer will-change-transform"
          >
            {isPowerMode && (
              <div className="absolute -inset-px bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-[3rem] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            )}
            <div className={`relative h-full ${isPowerMode ? 'bg-gradient-to-br from-cyan-600/20 to-blue-800/20 backdrop-blur-2xl' : 'bg-cyan-900'} border border-white/10 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 ${isPowerMode ? 'group-hover:scale-[0.98]' : ''}`}>
              {isPowerMode && <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.2),transparent_70%)]" />}
              
              <AnimatePresence mode="wait">
                {educationIndex === -1 ? (
                  <motion.div 
                    key="cover"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 w-full flex flex-col items-center"
                  >
                    <div className="w-24 h-24 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center mb-8 shadow-2xl backdrop-blur-xl">
                      <Sparkles className={`w-10 h-10 ${isPowerMode ? 'text-cyan-400 animate-pulse' : 'text-white'}`} />
                    </div>
                    <h3 className="text-6xl font-black text-white tracking-tighter mb-2 italic">
                      {studies.length}+
                    </h3>
                    <p className={`text-[12px] font-black uppercase tracking-[0.5em] ${isPowerMode ? 'text-cyan-400' : 'text-slate-400'}`}>Evolution</p>
                    <div className="mt-8 flex flex-col items-center gap-2">
                       <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Academic History</span>
                       <div className="flex gap-1.5">
                         {studies.map((_, i) => (
                           <div key={i} className="w-1 h-1 rounded-full bg-white/20" />
                         ))}
                       </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key={educationIndex}
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 w-full flex flex-col items-center"
                  >
                    <div className="mb-6 flex items-center justify-center">
                      <h3 className="text-7xl font-black text-white tracking-tighter shadow-xl">
                        {educationIndex + 1}
                      </h3>
                      <div className="flex flex-col items-start ml-4">
                         <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${isPowerMode ? 'text-cyan-300' : 'text-cyan-500'}`}>Evolution</p>
                         <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Phase {educationIndex + 1}</p>
                      </div>
                    </div>

                    <div className="text-left w-full mt-4 space-y-3">
                      <div className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-4`}>
                        <Sparkles className={`w-4 h-4 ${isPowerMode ? 'text-cyan-300' : 'text-cyan-500'}`} />
                      </div>
                      <h4 className="text-xl lg:text-2xl font-black text-white leading-tight uppercase tracking-tighter line-clamp-2">
                        {currentStudy?.jurusan || "Technical Education"}
                      </h4>
                      <p className="text-xs font-bold text-white/60 line-clamp-1">{currentStudy?.nama_sekolah || "Modern Engineering Inst."}</p>
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 inline-block">
                          <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">{currentStudy?.tanggal_selesai || "2024"}</p>
                        </div>
                        <span className="text-[8px] font-black text-cyan-400/60 uppercase tracking-widest animate-pulse">Click to rotate</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isPowerMode && (
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/5 overflow-hidden">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Tech Stack Card */}
          <motion.div
            initial={isPowerMode ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={isPowerMode ? { delay: 0.2, duration: 0.6 } : { duration: 0 }}
            className="md:col-span-6 group relative will-change-transform"
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
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Featured Capabilities</h3>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Primary Skillset</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {featuredSkills.length > 0 ? featuredSkills.map((skill, i) => (
                  <motion.div
                    key={skill.id_skills || i}
                    whileHover={isPowerMode ? { 
                      scale: 1.05, 
                      x: 5,
                      backgroundColor: "rgba(6, 182, 212, 0.05)"
                    } : {}}
                    className={`px-5 py-4 ${isPowerMode ? 'bg-white/[0.03]' : 'bg-neutral-800'} border border-white/5 rounded-[1.5rem] text-[11px] font-bold text-slate-300 ${isPowerMode ? 'hover:text-cyan-400 hover:border-cyan-500/30' : ''} transition-all flex items-center gap-3 group/item shadow-sm`}
                  >
                    <div className={`w-2 h-2 rounded-full ${isPowerMode ? 'bg-purple-500/30 group-hover/item:bg-cyan-500 group-hover/item:shadow-[0_0_8px_rgba(6,182,212,1)]' : 'bg-slate-700'} transition-all`} />
                    {skill.nama_keahlian}
                  </motion.div>
                )) : (
                  <div className="col-span-2 py-8 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                    No starred skills detected
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Global Connectivity Card */}
          <motion.div
            initial={isPowerMode ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={isPowerMode ? { delay: 0.3, duration: 0.6 } : { duration: 0 }}
            className="md:col-span-6 group relative will-change-transform"
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
