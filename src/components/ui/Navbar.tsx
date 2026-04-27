"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Zap, ZapOff } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/utils/constants";
import { usePremiumSound } from "@/hooks/usePremiumSound";
import { useAnimation } from "@/context/AnimationContext";

export default function Navbar() {
  const { isPowerMode, togglePowerMode } = useAnimation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const pathname = usePathname();

  const playHover = usePremiumSound('/sounds/hover.mp3', 0.05);
  const playClick = usePremiumSound('/sounds/click.mp3', 0.1);

  useEffect(() => {
    const handleOpen = () => setIsModalActive(true);
    const handleClose = () => setIsModalActive(false);
    window.addEventListener('modalOpen', handleOpen);
    window.addEventListener('modalClose', handleClose);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('modalOpen', handleOpen);
      window.removeEventListener('modalClose', handleClose);
    };
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 pt-4 md:pt-6 pointer-events-none">
      <div className="container mx-auto px-4 flex justify-center pointer-events-auto">
        <motion.nav
          initial={{ y: -20, opacity: 0, width: "100%", maxWidth: "1152px" }}
          animate={{ 
            y: isModalActive ? -120 : 0, 
            opacity: isModalActive ? 0 : 1,
            width: "100%",
            maxWidth: isScrolled ? "896px" : "1152px",
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            width: { duration: 0.5 }, // Smooth width transition
            maxWidth: { duration: 0.5 }
          }}
          className={`relative flex items-center justify-between gap-8 px-6 h-14 md:h-16 rounded-full border transition-colors duration-500 ${
            isScrolled
              ? "bg-black/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <Link 
            href="/" 
            onMouseEnter={playHover}
            onClick={playClick}
            className="relative group flex items-center gap-2 shrink-0"
          >
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${isPowerMode ? 'from-cyan-500 to-blue-600 shadow-cyan-500/20 group-hover:shadow-cyan-500/40' : 'from-slate-700 to-slate-900 border border-white/10'} flex items-center justify-center font-black text-white text-sm transition-all duration-300 shadow-lg`}>
              R
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight leading-none">
                {SITE_CONFIG.name}
              </span>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">
                Fresh Graduate
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => {
                    setHoveredLink(link.href);
                    playHover();
                  }}
                  onClick={playClick}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? "text-cyan-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  
                  {hoveredLink === link.href && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/5 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className={`absolute -bottom-1 left-4 right-4 h-0.5 ${isPowerMode ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'bg-slate-500'} rounded-full z-0`}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section: Power Toggle & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Power Mode Toggle */}
            <button
              onClick={() => {
                togglePowerMode();
                playClick();
              }}
              onMouseEnter={playHover}
              className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500 ${
                isPowerMode 
                  ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" 
                  : "bg-neutral-900 border-white/10 text-slate-500"
              }`}
              title={isPowerMode ? "Switch to Low Power Mode" : "Switch to High Power Mode"}
            >
              {isPowerMode ? (
                <Zap className="w-3.5 h-3.5 fill-cyan-400 animate-pulse" />
              ) : (
                <ZapOff className="w-3.5 h-3.5" />
              )}
              <span className="hidden lg:inline text-[9px] font-black uppercase tracking-[0.2em]">
                {isPowerMode ? "High" : "Low"}
              </span>
            </button>

            <button
              onMouseEnter={playHover}
              onClick={() => {
                setIsMobileOpen(!isMobileOpen);
                playClick();
              }}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-neutral-950 border border-white/10 text-white"
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Detached Logo for Focus Mode */}
      <AnimatePresence>
        {isModalActive && (
          <motion.div
            initial={{ x: -100, opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ x: -100, opacity: 0, scale: 0.5, rotate: -45 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="fixed top-8 left-8 z-[101] pointer-events-auto"
          >
            <Link href="/" className="relative group block">
              <div className="w-12 h-12 rounded-2xl bg-black/80 backdrop-blur-xl border border-cyan-500/30 flex items-center justify-center font-black text-cyan-400 text-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-500 group-hover:scale-110">
                R
              </div>
              <div className="absolute -inset-2 bg-cyan-500/5 blur-xl rounded-full -z-10 group-hover:bg-cyan-500/10 transition-all duration-500" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 mt-4 p-6 rounded-[2rem] bg-black border border-white/10 backdrop-blur-2xl shadow-2xl z-50 pointer-events-auto"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                        : "bg-neutral-950/50 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="text-sm font-bold uppercase tracking-[0.2em]">
                      {link.label}
                    </span>
                    <ArrowUpRight className={`w-4 h-4 ${isActive ? "opacity-100" : "opacity-0"}`} />
                  </Link>
                );
              })}
              
              <Link
                href="/contact"
                className="mt-4 w-full py-5 rounded-2xl bg-white text-black text-center text-sm font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors"
              >
                Let's Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}