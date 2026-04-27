"use client";

import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/utils/constants";
import { MapPin, Mail, Phone, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePremiumSound } from "@/hooks/usePremiumSound";

export default function Footer() {
  const playHover = usePremiumSound('/sounds/blip.mp3', 0.05);
  const playClick = usePremiumSound('/sounds/click.mp3', 0.1);

  return (
    <footer className="relative border-t border-white/5 bg-slate-950 text-slate-400 overflow-hidden">
      {/* Cinematic Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-10 pt-20 pb-12 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 lg:gap-20 mt-10">
          
          {/* Column 1: Brand & Dossier */}
          <div className="lg:col-span-1 space-y-12">
            <div>
              <Link
                href="/login"
                onMouseEnter={playHover}
                onClick={playClick}
                className="text-3xl font-black tracking-tighter text-white block mb-2 group"
              >
                RSP<span className="text-cyan-400 group-hover:animate-pulse">.</span>
              </Link>
              <div className="h-1 w-12 bg-cyan-500 rounded-full" />
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              {SITE_CONFIG.description}. Membangun masa depan digital dengan presisi teknik dan estetika modern.
            </p>

            {/* Social Media - Premium Icons */}
            <div className="flex items-center gap-4">
              {SITE_CONFIG.socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="click"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/5 flex items-center justify-center neon-hover"
                  title={social.name}
                >
                  <Image 
                    src={`/${social.icon}`} 
                    alt={social.name} 
                    width={22} 
                    height={22}
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity invert"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Map */}
          <div>
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full" />
              Sitemap
            </h3>
            <ul className="space-y-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="text-sm font-semibold hover:text-cyan-400 transition-all flex items-center gap-3 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-cyan-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full" />
              Contact Terminal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <motion.div 
                whileHover={{ x: 5 }}
                onMouseEnter={playHover}
                className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md group hover:border-cyan-500/30 transition-all cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Base Location</p>
                <p className="text-sm text-slate-300 font-bold">{SITE_CONFIG.contact.address}</p>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                onMouseEnter={playHover}
                className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md group hover:border-cyan-500/30 transition-all cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Direct Message</p>
                <p className="text-sm text-slate-300 font-bold truncate">{SITE_CONFIG.contact.email}</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Final Bottom Bar - Optimized spacing */}
        <div className="mt-20 pt-10 pb-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-6">
            <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">
              © {new Date().getFullYear()} {SITE_CONFIG.name}
            </p>
            <div className="w-1 h-1 bg-slate-800 rounded-full" />
            <p className="text-[10px] font-black text-cyan-500/50 uppercase tracking-[0.3em]">
              Precision Engineered Portfolio
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
            <span>Jakarta, ID</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Live Terminal <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
