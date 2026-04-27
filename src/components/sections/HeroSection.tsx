"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Code2, Cpu, Zap, User, Palette, Wifi, Share2 } from "lucide-react";
import type { Profile } from "@/lib/types/database";
import GridBackground from "../ui/GridBackground";

import { Counter } from "../ui/Counter";
import { useAnimation } from "@/context/AnimationContext";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { ToolOrbit } from "../ui/ToolOrbit";
import AnimatedDescription from "../ui/AnimatedDescription";
import { usePremiumSound } from "@/hooks/usePremiumSound";

interface HeroSectionProps {
  profile: Profile | null;
  stats: {
    projects: number;
    experience: number;
    certificates: number;
  };
}

export default function HeroSection({ profile, stats }: HeroSectionProps) {
  const playHover = usePremiumSound('/sounds/hover.mp3', 0.05);
  const playClick = usePremiumSound('/sounds/click.mp3', 0.1);

  const { isPowerMode } = useAnimation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isPowerMode || !titleRef.current) return;

    // GSAP Text Reveal
    const words = titleRef.current.innerText.split(" ");
    titleRef.current.innerHTML = words
      .map(word => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
      .join(" ");

    const wordSpans = titleRef.current.querySelectorAll("span > span");
    
    gsap.fromTo(wordSpans, 
      { y: 100, rotate: 10 }, 
      { 
        y: 0, 
        rotate: 0, 
        duration: 1.2, 
        stagger: 0.1, 
        ease: "power4.out",
        delay: 0.5 
      }
    );
  }, [isPowerMode]);

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
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 pt-20">
      <GridBackground />

      {/* Aurora Background Effect (Power Mode Only) */}
      {isPowerMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{
              x: ["-25%", "25%"],
              y: ["-25%", "25%"],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full"
          />
          <motion.div 
            animate={{
              x: ["25%", "-25%"],
              y: ["25%", "-25%"],
            }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "mirror" }}
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full"
          />
        </div>
      )}

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
              ref={titleRef}
              variants={itemVariants} 
              className="text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter mb-8"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-600 via-blue-500 to-cyan-400 bg-[length:300%_auto] animate-gradient-text transition-all duration-700 hover:from-white hover:via-cyan-400 hover:to-blue-500 cursor-pointer">
                Execution
              </span>
            </motion.h1>

            <AnimatedDescription 
              text={`Hi, I'm ${profile?.nama || "Rizaldi Syafa Saputra"}. Engineering scalable solutions and crafting the next generation of web interfaces.`}
              className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0 font-medium"
            />

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 justify-center lg:justify-start mb-16">
              <Link
                href="/projects"
                onMouseEnter={playHover}
                onClick={playClick}
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
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="px-10 py-4 rounded-2xl border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all duration-300 flex items-center gap-2 group"
                >
                  Fetch CV <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>
              )}
            </motion.div>

            {/* Quick Metrics */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-12">
              <Counter value={stats.projects} suffix="+" label="Projects Built" delay={0.5} />
              <Counter value={stats.certificates} suffix="+" label="Certifications" delay={0.7} />
              <Counter value={stats.experience} suffix="+" label="Experiences" delay={0.9} />
            </motion.div>
          </motion.div>

          {/* Profile Visual Wrapper */}
          <motion.div 
            className="lg:col-span-5 flex justify-center order-1 lg:order-2"
            variants={itemVariants}
          >
            <div className="relative w-72 h-80 md:w-[500px] md:h-[600px] flex items-center justify-center">
              {/* Background Decorative Elements (Behind Photo) */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3] 
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[120%] h-[120%] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"
              />
              
              {/* Tech Orbit System */}
              <ToolOrbit isPowerMode={isPowerMode} />

              {/* The Photo (Borderless with Bottom Fade) */}
              <div className="relative z-10 w-full h-full group [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
                {profile?.photo_url ? (
                  <motion.img
                    src={profile.photo_url}
                    alt={profile?.nama || "Profile"}
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-105"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[180px] font-black text-white/5 select-none">R</span>
                  </div>
                )}
              </div>

              {/* Floating Spheres (Living Elements - Behind Photo) */}
              <motion.div
                animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-12 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-[2px] shadow-[0_0_30px_rgba(34,211,238,0.5)] z-0"
              />
              <motion.div
                animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/3 -right-8 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-[3px] shadow-[0_0_40px_rgba(79,70,229,0.4)] z-0"
              />

              {/* --- FLOATING TECH BADGES --- */}
              {/* 1. UI/UX Design (Top Left) */}
              <motion.div
                animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-8 md:top-10 -left-6 md:-left-28 z-0 p-3 md:p-4 rounded-3xl bg-slate-950/40 hover:bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center gap-3 md:gap-4 shadow-2xl group/badge transition-colors duration-300"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)] flex items-center justify-center group-hover/badge:scale-110 transition-transform">
                  <Palette className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="flex flex-col pr-2 md:pr-4">
                  <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider">UI/UX Design</span>
                  <span className="text-[7px] md:text-[8px] text-slate-500 uppercase tracking-widest font-bold">Creative Layer</span>
                </div>
              </motion.div>

              {/* 2. Internet of Things (Middle Left) */}
              <motion.div
                animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
                transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -translate-y-1/2 -left-10 md:-left-36 z-0 p-3 md:p-4 rounded-3xl bg-slate-950/40 hover:bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center gap-3 md:gap-4 shadow-2xl group/badge transition-colors duration-300"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center justify-center group-hover/badge:scale-110 transition-transform">
                  <Wifi className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="flex flex-col pr-2 md:pr-4">
                  <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider">IoT</span>
                  <span className="text-[7px] md:text-[8px] text-slate-500 uppercase tracking-widest font-bold">Connected Systems</span>
                </div>
              </motion.div>

              {/* 3. Frontend (Bottom Left) */}
              <motion.div
                animate={{ y: [0, -20, 0], x: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 md:bottom-20 -left-6 md:-left-24 z-0 p-3 md:p-4 rounded-3xl bg-slate-950/40 hover:bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center gap-3 md:gap-4 shadow-2xl group/badge transition-colors duration-300"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center group-hover/badge:scale-110 transition-transform">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="flex flex-col pr-2 md:pr-4">
                  <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider">Frontend</span>
                  <span className="text-[7px] md:text-[8px] text-slate-500 uppercase tracking-widest font-bold">Expertise Layer</span>
                </div>
              </motion.div>

              {/* 4. Backend (Top Right) */}
              <motion.div
                animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute top-16 md:top-20 -right-6 md:-right-32 z-0 p-3 md:p-4 rounded-3xl bg-slate-950/40 hover:bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center gap-3 md:gap-4 shadow-2xl group/badge transition-colors duration-300"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] flex items-center justify-center group-hover/badge:scale-110 transition-transform">
                  <Cpu className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="flex flex-col pr-2 md:pr-4">
                  <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider">Backend</span>
                  <span className="text-[7px] md:text-[8px] text-slate-500 uppercase tracking-widest font-bold">Infrastructure</span>
                </div>
              </motion.div>

              {/* 5. Social Media (Bottom Right) */}
              <motion.div
                animate={{ y: [0, -15, 0], x: [0, 15, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                className="absolute bottom-20 md:bottom-28 -right-8 md:-right-36 z-0 p-3 md:p-4 rounded-3xl bg-slate-950/40 hover:bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center gap-3 md:gap-4 shadow-2xl group/badge transition-colors duration-300"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 shadow-[0_0_15px_rgba(249,115,22,0.4)] flex items-center justify-center group-hover/badge:scale-110 transition-transform">
                  <Share2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="flex flex-col pr-2 md:pr-4">
                  <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider">Social Media</span>
                  <span className="text-[7px] md:text-[8px] text-slate-500 uppercase tracking-widest font-bold">Digital Presence</span>
                </div>
              </motion.div>

              {/* Ambient Glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-cyan-500/20 blur-[60px] rounded-full pointer-events-none" />
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
