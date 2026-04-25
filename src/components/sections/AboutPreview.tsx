"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, User, Terminal, Globe, Palette, Box } from "lucide-react";
import type { Profile, Skill } from "@/lib/types/database";

interface AboutPreviewProps {
  profile: Profile | null;
  skills: Skill[];
}

export default function AboutPreview({ profile, skills }: AboutPreviewProps) {
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
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Core Identity</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none"
            >
              The Mind <br />
              Behind the <span className="text-cyan-500">Code.</span>
            </motion.h2>
          </div>
          <Link
            href="/profiles"
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
          >
            Access Full Dossier <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
          {/* Bio Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-8 bg-slate-900/40 border border-white/10 rounded-[3rem] p-12 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
              <Terminal className="w-48 h-48 text-white" />
            </div>
            
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl text-slate-300 leading-snug font-medium tracking-tight">
                {profile?.bio ||
                  "A visionary developer specializing in high-performance web systems and immersive digital interfaces. My goal is to bridge the gap between imagination and reality through code."}
              </p>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                      <Box className="w-4 h-4 text-cyan-500/50" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Architecture Enthusiast</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-4 bg-gradient-to-br from-cyan-600/20 to-blue-800/20 border border-cyan-500/20 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
            <h3 className="text-7xl font-black text-white mb-3 tracking-tighter">1+</h3>
            <p className="text-xs font-black text-white/60 uppercase tracking-[0.3em]">Cycle of Evolution</p>
            <div className="mt-8 w-16 h-1 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
          </motion.div>

          {/* Tech Stack Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-6 bg-slate-900/40 border border-white/10 rounded-[3rem] p-10 group"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Palette className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Infrastructure</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {skills.slice(0, 6).map((skill, i) => (
                <div
                  key={i}
                  className="px-5 py-3 bg-slate-950/50 border border-white/5 rounded-2xl text-[11px] font-bold text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all flex items-center gap-3 group/item"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover/item:bg-cyan-500 transition-colors" />
                  {skill.nama_keahlian}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Global Connectivity Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-6 bg-slate-900/40 border border-white/10 rounded-[3rem] p-10 flex items-center gap-10 overflow-hidden relative"
          >
            <div className="relative z-10 flex items-center gap-10">
              <div className="w-24 h-24 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center shrink-0 shadow-inner group">
                <Globe className="w-12 h-12 text-cyan-500 animate-spin-slow group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Global Base</h3>
                <p className="text-2xl font-black text-white tracking-tight">Jakarta, IDN</p>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Available Remotely</span>
                </div>
              </div>
            </div>
            {/* Abstract Map Background */}
            <div className="absolute right-0 bottom-0 opacity-[0.02] pointer-events-none">
               <Globe className="w-64 h-64 text-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
