"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Code2, Cpu, Zap } from "lucide-react";
import type { Profile } from "@/lib/types/database";
import GridBackground from "../ui/GridBackground";

interface HeroSectionProps {
  profile: Profile | null;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 pt-20">
      <GridBackground />

      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
        >
          {/* Text Content Wrapper */}
          <motion.div 
            className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 backdrop-blur-md"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-cyan-400">System Online v2.0</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className="text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter mb-8"
            >
              Beyond <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">Execution.</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants} 
              className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0 font-medium"
            >
              Hi, I'm <span className="text-white border-b-2 border-cyan-500/30 font-bold">{profile?.nama || "Rizaldi Syafa Saputra"}</span>. 
              Engineering scalable solutions and crafting the next generation of web interfaces.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 justify-center lg:justify-start mb-16">
              <Link
                href="/projects"
                className="group relative px-10 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:bg-cyan-400 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Launch Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500" />
                </span>
              </Link>

              {profile?.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-2xl border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all duration-300 flex items-center gap-2 group"
                >
                  Fetch CV <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>
              )}
            </motion.div>

            {/* Quick Metrics */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-12">
              {[
                { label: "Completed", val: "24+", sub: "Projects" },
                { label: "Uptime", val: "99.9%", sub: "Availability" },
                { label: "Experience", val: "Fresh", sub: "Perspective" },
              ].map((m, i) => (
                <div key={i} className="flex flex-col gap-1.5 text-left border-l border-white/5 pl-5">
                  <span className="text-2xl font-black text-white tracking-tight">{m.val}</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.3em]">{m.sub}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Visual Wrapper */}
          <motion.div 
            className="lg:col-span-5 flex justify-center order-1 lg:order-2"
            variants={itemVariants}
          >
            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
              {/* Spinning Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-[4rem] border-2 border-dashed border-cyan-500/10"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-[3.5rem] border border-blue-500/5"
              />
              
              {/* Main Container */}
              <div className="absolute inset-8 rounded-[3.5rem] overflow-hidden bg-slate-900/50 border border-white/10 backdrop-blur-sm p-3 group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-white/5 z-10" />
                
                {profile?.photo_url ? (
                  <img
                    src={profile.photo_url}
                    alt={profile.nama || "Profile"}
                    className="w-full h-full object-cover rounded-[2.8rem] grayscale hover:grayscale-0 transition-all duration-1000 scale-[1.01] hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 rounded-[2.8rem]">
                    <span className="text-[120px] font-black text-white/5">R</span>
                  </div>
                )}

                {/* Floating Tech Badges */}
                <motion.div
                  animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 -left-10 z-20 p-4 rounded-3xl bg-slate-950/90 backdrop-blur-xl border border-white/10 flex items-center gap-4 shadow-2xl"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col pr-4">
                    <span className="text-xs font-black text-white uppercase tracking-wider">Frontend</span>
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Expertise Layer</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-12 -right-8 z-20 p-4 rounded-3xl bg-slate-950/90 backdrop-blur-xl border border-white/10 flex items-center gap-4 shadow-2xl"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col pr-4">
                    <span className="text-xs font-black text-white uppercase tracking-wider">Backend</span>
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Infrastucture</span>
                  </div>
                </motion.div>

                {/* Scanning Line Effect */}
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-px bg-cyan-500/30 z-20 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-white">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}