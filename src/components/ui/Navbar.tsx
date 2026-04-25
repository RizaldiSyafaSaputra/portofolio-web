"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/utils/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 pt-4 md:pt-6">
      <div className="container mx-auto px-4 flex justify-center">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`relative flex items-center justify-between gap-8 px-6 h-14 md:h-16 rounded-full border transition-all duration-500 ${
            isScrolled
              ? "w-full max-w-4xl bg-slate-950/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "w-full max-w-6xl bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="relative group flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-sm shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
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
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? "text-cyan-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Hover Background Pill */}
                  {hoveredLink === link.href && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/5 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute -bottom-1 left-4 right-4 h-0.5 bg-cyan-500 rounded-full z-0 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section: CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 border border-white/10 text-white"
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 mt-4 p-6 rounded-[2rem] bg-slate-950 border border-white/10 backdrop-blur-2xl shadow-2xl z-50"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                        : "bg-slate-900/50 border-white/5 text-slate-400 hover:text-white"
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