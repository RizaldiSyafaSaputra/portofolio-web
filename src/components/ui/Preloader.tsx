"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Final exit animation
          gsap.to(containerRef.current, {
            opacity: 0, 
            duration: 1,
            ease: "power4.inOut",
            onComplete: onComplete
          });
        }
      });

      // Entry animation
      tl.fromTo(".loader-content", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Progress animation
      tl.to({ val: 0 }, {
        val: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: function() {
          const p = Math.round(this.targets()[0].val);
          setProgress(p);
          if (progressRef.current) {
            progressRef.current.style.width = `${p}%`;
          }
        }
      }, "-=0.5");

      // Text stagger animation
      tl.fromTo(".loading-text span",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: "power2.out" },
        "-=2"
      );

      // Exit blobs
      tl.to(".loader-blob", {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.in(1.7)"
      }, "-=0.3");

      tl.to(".loader-content", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.in"
      }, "-=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Dynamic Background Blobs - Neon Aesthetic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="loader-blob absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px] opacity-60" />
        <div className="loader-blob absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[120px] opacity-60" />
        <div className="loader-blob absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-green-500/20 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="loader-content relative z-10 flex flex-col items-center">
        <div className="mb-8 overflow-hidden">
          <h2 className="loading-text text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
            {"PRECISE".split("").map((char, i) => (
              <span key={i} className="inline-block">{char}</span>
            ))}
            <span className="mx-2" />
            {"ENGINEERING".split("").map((char, i) => (
              <span key={i} className="inline-block text-cyan-500/50">{char}</span>
            ))}
          </h2>
        </div>

        <div className="w-64 md:w-80 h-1 bg-white/5 rounded-full overflow-hidden mb-4 border border-white/5">
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            style={{ width: "0%" }}
          />
        </div>

        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
          <span className="text-cyan-400">{progress}%</span>
          <div className="w-1.5 h-1.5 bg-neutral-800 rounded-full border border-white/5" />
          <span>System Initialization</span>
        </div>
      </div>

      {/* Decorative Corner Lines - Neon Accents */}
      <div className="absolute top-10 left-10 w-20 h-px bg-white/10" />
      <div className="absolute top-10 left-10 w-px h-20 bg-white/10" />
      <div className="absolute bottom-10 right-10 w-20 h-px bg-white/10" />
      <div className="absolute bottom-10 right-10 w-px h-20 bg-white/10" />
    </div>
  );
}
