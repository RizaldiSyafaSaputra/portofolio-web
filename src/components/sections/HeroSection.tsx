"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Cpu, Zap, Palette, Wifi, Share2 } from "lucide-react";
import type { Profile } from "@/lib/types/database";
import GridBackground from "../ui/GridBackground";
import { Counter } from "../ui/Counter";
import { useAnimation } from "@/context/AnimationContext";
import { useEffect, useState } from "react";
import AnimatedDescription from "../ui/AnimatedDescription";
import { usePremiumSound } from "@/hooks/usePremiumSound";
import GradientText from "../ui/GradientText";
import ProfileCard from "../ui/ProfileCard";

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
  const WORDS = ["Execution", "Imagination", "Boundaries"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-transparent">
      <div className="absolute inset-0 z-0">
        <GridBackground />
      </div>
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={isPowerMode ? containerVariants : {}}
          >
            <motion.div 
              variants={itemVariants} 
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${isPowerMode ? 'bg-cyan-500/10 border-cyan-500/20 backdrop-blur-md' : 'bg-neutral-900 border-white/10'} border mb-8 mx-auto lg:mx-0`}
            >
              <Zap className={`w-3.5 h-3.5 ${isPowerMode ? 'text-cyan-400 fill-cyan-400' : 'text-slate-500'}`} />
              <span className={`text-[11px] font-black uppercase tracking-[0.25em] ${isPowerMode ? 'text-cyan-400' : 'text-slate-500'}`}>System Online v2.0</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
            >
              <div className="mb-4">Beyond</div>
              <div className="h-[1.2em] relative overflow-hidden flex items-center justify-center lg:justify-start w-full min-w-[300px]">
                {isPowerMode ? (
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={currentWord}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute cursor-pointer pb-2"
                    >
                      <GradientText
                        colors={["#0004ff","#FF9FFC","#B497CF"]}
                        animationSpeed={3}
                        showBorder={false}
                        className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter"
                      >
                        {WORDS[currentWord]}
                      </GradientText>
                    </motion.span>
                  </AnimatePresence>
                ) : (
                  <span className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-cyan-400 italic">
                    Evolution
                  </span>
                )}
              </div>
            </motion.h1>

            <AnimatedDescription 
              text={`Hi, I'm ${profile?.nama || "Rizaldi Syafa Saputra"}. Engineering scalable solutions and crafting the next generation of web interfaces.`}
              className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0 font-medium"
            />

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 justify-center lg:justify-start mb-16">
              <Link
                href="/projects"
                onMouseEnter={isPowerMode ? playHover : undefined}
                onClick={playClick}
                className={`group relative px-10 py-4 ${isPowerMode ? 'bg-white text-black hover:bg-cyan-400 hover:scale-[1.02]' : 'bg-cyan-500 text-white'} rounded-2xl font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 active:scale-95`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Launch Projects <ArrowRight className={`w-4 h-4 ${isPowerMode ? 'group-hover:translate-x-1.5' : ''} transition-transform duration-500`} />
                </span>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-12">
              <Counter value={stats.projects} suffix="+" label="Projects Built" delay={0.5} />
              <Counter value={stats.certificates} suffix="+" label="Certifications" delay={0.7} />
              <Counter value={stats.experience} suffix="+" label="Experiences" delay={0.9} />
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-shrink-0 relative lg:col-span-5 flex justify-center"
            initial={isPowerMode ? { opacity: 0, scale: 0.8, rotateY: 30 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            style={{ perspective: "1000px" }}
          >
            <div className="relative w-72 h-80 md:w-[500px] md:h-[600px] flex items-center justify-center">
              {isPowerMode && (
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3] 
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-[120%] h-[120%] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"
                />
              )}
              
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <ProfileCard
                  name={profile?.nama || "Rizaldi Syafa"}
                  title={profile?.title || "Developer"}
                  handle={profile?.nama?.toLowerCase().replace(/\s+/g, '') || "rizaldisyafa"}
                  status="Available for Projects"
                  avatarUrl={profile?.photo_url || ""}
                  showUserInfo={false}
                  enableTilt={isPowerMode}
                  enableMobileTilt={isPowerMode}
                  behindGlowEnabled={isPowerMode}
                  behindGlowColor="rgba(34, 211, 238, 0.4)"
                  iconUrl="/assets/code_pattern.png"
                  innerGradient={isPowerMode ? "linear-gradient(145deg, rgba(8, 145, 178, 0.2) 0%, rgba(34, 211, 238, 0.1) 100%)" : "rgba(10,10,10,0.8)"}
                />
              </div>

              {isPowerMode && (
                <>
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
                  <motion.div
                    animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-8 md:top-10 -left-6 md:-left-28 z-20 opacity-70 p-3 md:p-4 rounded-3xl bg-black/40 hover:bg-black/80 hover:opacity-100 backdrop-blur-md border border-white/10 flex items-center gap-3 md:gap-4 shadow-2xl group/badge transition-all duration-300"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)] flex items-center justify-center group-hover/badge:scale-110 transition-transform">
                      <Palette className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div className="flex flex-col pr-2 md:pr-4">
                      <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider">UI/UX Design</span>
                      <span className="text-[7px] md:text-[8px] text-slate-500 uppercase tracking-widest font-bold">Creative Layer</span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
                    transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-1/2 -translate-y-1/2 -left-10 md:-left-36 z-20 opacity-70 p-3 md:p-4 rounded-3xl bg-black/40 hover:bg-black/80 hover:opacity-100 backdrop-blur-md border border-white/10 flex items-center gap-3 md:gap-4 shadow-2xl group/badge transition-all duration-300"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center justify-center group-hover/badge:scale-110 transition-transform">
                      <Wifi className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div className="flex flex-col pr-2 md:pr-4">
                      <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider">IoT</span>
                      <span className="text-[7px] md:text-[8px] text-slate-500 uppercase tracking-widest font-bold">Connected Systems</span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -20, 0], x: [0, 8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-12 md:bottom-20 -left-6 md:-left-24 z-20 opacity-70 p-3 md:p-4 rounded-3xl bg-black/40 hover:bg-black/80 hover:opacity-100 backdrop-blur-md border border-white/10 flex items-center gap-3 md:gap-4 shadow-2xl group/badge transition-all duration-300"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center group-hover/badge:scale-110 transition-transform">
                      <Code2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div className="flex flex-col pr-2 md:pr-4">
                      <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider">Frontend</span>
                      <span className="text-[7px] md:text-[8px] text-slate-500 uppercase tracking-widest font-bold">Expertise Layer</span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 25, 0], x: [0, -12, 0] }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-1/4 -right-8 md:-right-32 z-20 opacity-70 p-3 md:p-4 rounded-3xl bg-black/40 hover:bg-black/80 hover:opacity-100 backdrop-blur-md border border-white/10 flex items-center gap-3 md:gap-4 shadow-2xl group/badge transition-all duration-300"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] flex items-center justify-center group-hover/badge:scale-110 transition-transform">
                      <Cpu className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div className="flex flex-col pr-2 md:pr-4">
                      <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider">Backend</span>
                      <span className="text-[7px] md:text-[8px] text-slate-500 uppercase tracking-widest font-bold">Infrastructure</span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -25, 0], x: [0, 12, 0] }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute bottom-10 md:bottom-28 -right-8 md:-right-40 z-20 opacity-70 p-3 md:p-4 rounded-3xl bg-black/40 hover:bg-black/80 hover:opacity-100 backdrop-blur-md border border-white/10 flex items-center gap-3 md:gap-4 shadow-2xl group/badge transition-all duration-300"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 shadow-[0_0_15px_rgba(249,115,22,0.4)] flex items-center justify-center group-hover/badge:scale-110 transition-transform">
                      <Share2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div className="flex flex-col pr-2 md:pr-4">
                      <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider">Social Media</span>
                      <span className="text-[7px] md:text-[8px] text-slate-500 uppercase tracking-widest font-bold">Digital Presence</span>
                    </div>
                  </motion.div>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-cyan-500/20 blur-[60px] rounded-full pointer-events-none" />
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

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
