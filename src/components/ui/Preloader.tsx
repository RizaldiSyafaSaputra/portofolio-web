"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Play } from "lucide-react";

const LOADING_STEPS = [
  { threshold: 0, text: "Mendownload libraries..." },
  { threshold: 25, text: "Menghapus cache..." },
  { threshold: 50, text: "Menyiapkan website..." },
  { threshold: 75, text: "Siap melakukan perjalanan." },
  { threshold: 100, text: "Sistem Siap!" },
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_STEPS[0].text);
  const [isFinished, setIsFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Entry animation
      tl.fromTo(".loader-content", 
        { opacity: 0, scale: 0.9, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
      );

      // Progress animation (Slowed down to 6 seconds)
      tl.to({ val: 0 }, {
        val: 100,
        duration: 6,
        ease: "power1.inOut",
        onUpdate: function() {
          const p = Math.round(this.targets()[0].val);
          setProgress(p);
          
          // Update Message
          const currentStep = [...LOADING_STEPS].reverse().find(step => p >= step.threshold);
          if (currentStep) setLoadingMsg(currentStep.text);

          if (progressRef.current) {
            progressRef.current.style.width = `${p}%`;
          }
        },
        onComplete: () => {
          setIsFinished(true);
        }
      });

      // Subtle pulse for blobs
      gsap.to(".loader-blob", {
        scale: 1.2,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleLaunch = () => {
    setIsExiting(true);
    
    // Smooth Slide-to-Right Transition
    const tl = gsap.timeline({
      onComplete: onComplete
    });

    // Fade out content slightly before sliding
    tl.to(".loader-content", {
      opacity: 0,
      x: 50,
      duration: 0.8,
      ease: "power2.inOut"
    });

    // Slide the entire container to the right
    tl.to(containerRef.current, {
      xPercent: 100,
      duration: 1.5,
      ease: "power4.inOut"
    }, "-=0.4");
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden select-none"
    >
      {/* Flash Overlay for Transition */}
      <div className="flash-overlay absolute inset-0 bg-white opacity-0 z-[100] pointer-events-none" />

      {/* Dynamic Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="loader-blob absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="loader-blob absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="loader-blob absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="loader-content relative z-10 flex flex-col items-center w-full max-w-xl px-8">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              className="flex flex-col items-center w-full"
            >
              <div className="mb-12 overflow-hidden text-center">
                <h2 className="loading-text text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none">
                  PRECISE <span className="text-cyan-500">ENGINEERING</span>
                </h2>
              </div>

              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-6 border border-white/5 relative">
                <div 
                  ref={progressRef}
                  className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  style={{ width: "0%" }}
                />
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.5em] text-slate-500">
                  <span className="text-cyan-400 min-w-[40px]">{progress}%</span>
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                  <motion.span
                    key={loadingMsg}
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-slate-300"
                  >
                    {loadingMsg}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="launch-button"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-2">
                  System <span className="text-emerald-400">Ready</span>
                </h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">All protocols initialized</p>
              </div>

              <button
                onClick={handleLaunch}
                disabled={isExiting}
                className="group relative px-12 py-5 bg-white rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_70px_rgba(52,211,153,0.4)] transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-3 text-black font-black uppercase tracking-widest text-sm group-hover:scale-110 transition-transform">
                  Enter Portfolio <Play className="w-4 h-4 fill-black" />
                </span>
                
                {/* Button Glow Effect */}
                <div className="absolute -inset-2 bg-emerald-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Scanner Line */}
      {!isExiting && (
        <motion.div 
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-cyan-500/20 z-0 pointer-events-none"
        />
      )}

      {/* Decorative Corner Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-white/10 rounded-tl-3xl" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-white/10 rounded-br-3xl" />
      
      {/* UI Metadata Accents */}
      <div className="absolute top-10 right-10 text-[8px] font-black text-slate-700 uppercase tracking-[0.5em] hidden md:block">
        Auth Protocol: v2.0.4<br />
        Clearance: Level 5
      </div>
      <div className="absolute bottom-10 left-10 text-[8px] font-black text-slate-700 uppercase tracking-[0.5em] hidden md:block">
        Lat: -6.2088 | Long: 106.8456<br />
        Status: Secure Connection
      </div>
    </div>
  );
}
