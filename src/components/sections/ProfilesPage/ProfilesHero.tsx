'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Download, User, Calendar, X, ShieldCheck, Terminal, Fingerprint, CheckCircle2, Star, Zap } from 'lucide-react'
import type { Profile, Sosmed } from '@/lib/types/database'
import Image from 'next/image'
import GridBackground from '../../ui/GridBackground'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import AnimatedDescription from "@/components/ui/AnimatedDescription"
import { useAnimation } from '@/context/AnimationContext'
import { ToolOrbit } from "../../ui/ToolOrbit"

interface ProfilesHeroProps {
  profile: Partial<Profile>
  sosmeds: Sosmed[]
}

export function ProfilesHero({ profile, sosmeds }: ProfilesHeroProps) {
  const { isPowerMode } = useAnimation()
  const [isDossierOpen, setIsDossierOpen] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanned, setIsScanned] = useState(false)
  const scanInterval = useRef<NodeJS.Timeout | null>(null)

  // Scroll Lock Logic
  useEffect(() => {
    if (isDossierOpen) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('modalOpen'));
    } else {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new CustomEvent('modalClose'));
      setScanProgress(0);
      setIsScanned(false);
    }
    return () => { 
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new CustomEvent('modalClose'));
    };
  }, [isDossierOpen]);

  // Fingerprint Scan Logic
  const startScan = () => {
    if (isScanned) return;
    scanInterval.current = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          if (scanInterval.current) clearInterval(scanInterval.current);
          setIsScanned(true);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
  };

  const stopScan = () => {
    if (isScanned) return;
    if (scanInterval.current) {
      clearInterval(scanInterval.current);
      setScanProgress(0);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-32 px-4 sm:px-6 lg:px-8">
        <GridBackground />

        {/* Background Accent Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Bottom Fade Mask */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Header / Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-2">
                  <span className="inline-block text-slate-400 font-medium text-2xl md:text-3xl lg:text-4xl mb-2">I'm</span>
                  <br />
                  <span className="animate-gradient-text bg-[length:300%_auto] bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-600 via-blue-500 to-cyan-400 transition-all duration-500 hover:from-purple-500 hover:via-cyan-400 hover:to-blue-500">
                    {profile.nama || 'John Doe'}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl font-medium text-cyan-400 mb-6">
                  {profile.title || 'Full Stack Developer'}
                </p>
              </motion.div>

              {/* Bio Section with Dossier Trigger */}
              <motion.div
                className="mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <AnimatedDescription 
                  text={profile.bio || 'A passionate developer bridging the gap between design and functional code.'}
                  className="text-slate-300 text-lg mb-4 leading-relaxed"
                />
                <button
                  onClick={() => { setIsDossierOpen(true); }}
                  data-cursor="view"
                  className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2 group mx-auto lg:mx-0"
                >
                  <div className="w-8 h-px bg-cyan-500/30 group-hover:w-12 transition-all" />
                  Access Full Dossier
                  <Fingerprint className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </motion.div>

              {/* Quick Info Grid */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm text-slate-300 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {(profile.tempat_lahir || profile.tanggal_lahir) && (
                  <div className="flex items-center justify-center lg:justify-start gap-3 bg-neutral-900/50 p-3 rounded-xl border border-slate-700/50">
                    <Calendar className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span>{profile.tempat_lahir}, {profile.tanggal_lahir}</span>
                  </div>
                )}
                {profile.alamat && (
                  <div className="flex items-center justify-center lg:justify-start gap-3 bg-neutral-900/50 p-3 rounded-xl border border-slate-700/50">
                    <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{profile.alamat}</span>
                  </div>
                )}
                {profile.email && (
                  <div className="flex items-center justify-center lg:justify-start gap-3 bg-neutral-900/50 p-3 rounded-xl border border-slate-700/50">
                    <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{profile.email}</span>
                  </div>
                )}
                {profile.no_handphone && (
                  <div className="flex items-center justify-center lg:justify-start gap-3 bg-neutral-900/50 p-3 rounded-xl border border-slate-700/50">
                    <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span>{profile.no_handphone}</span>
                  </div>
                )}
              </motion.div>

              {/* Actions & Socials */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {profile.resume_url && (
                  <motion.a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="click"
                    className="relative px-6 py-3 font-semibold text-white rounded-lg overflow-hidden group w-full sm:w-auto text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all" />
                    <span className="relative flex items-center justify-center gap-2 text-white">
                      Download CV <Download className="w-4 h-4" />
                    </span>
                  </motion.a>
                )}

                {/* Social Links */}
                {sosmeds.length > 0 && (
                  <div className="flex gap-3">
                    {sosmeds.map((sosmed, idx) => (
                      <motion.a
                        key={idx}
                        href={sosmed.url_sosmed || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="click"
                        className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-slate-300 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        title={sosmed.nama_sosmed || 'Social Media'}
                      >
                        {sosmed.jenis_sosmed ? (
                          <Image
                            src={`/${sosmed.jenis_sosmed}.png`}
                            alt={sosmed.nama_sosmed || 'Social Media'}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        ) : (
                          <span className="font-bold text-sm uppercase">
                            {sosmed.nama_sosmed ? sosmed.nama_sosmed.slice(0, 2) : 'Link'}
                          </span>
                        )}
                      </motion.a>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Right Content - Photo */}
            <motion.div
              className="flex-shrink-0 relative lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-72 h-80 md:w-[500px] md:h-[600px] flex items-center justify-center">
                {/* Background Decorative Elements (Behind Photo) */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3] 
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-[120%] h-[120%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"
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
                      <User className="w-48 h-48 text-slate-700 opacity-20" />
                    </div>
                  )}
                </div>

                {/* Floating Spheres */}
                <motion.div
                  animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 -right-12 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-[2px] shadow-[0_0_30px_rgba(34,211,238,0.5)] z-0"
                />
                <motion.div
                  animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-1/3 -left-8 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-[3px] shadow-[0_0_40px_rgba(79,70,229,0.4)] z-0"
                />

                {/* Ambient Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Dossier Modal Portal */}
      {typeof document !== 'undefined' && isDossierOpen && createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDossierOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-neutral-950 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Personnel Dossier</h3>
                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mt-0.5">Access Level: High-Clearance Admin</p>
                  </div>
                </div>
                
                {/* Redesigned Close Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setIsDossierOpen(false); }}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all flex items-center justify-center border border-white/10 hover:border-red-500/30 group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 max-h-[70vh] overflow-y-auto custom-scrollbar text-slate-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-8">
                    <section>
                      <h4 className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Background Narrative</h4>
                      <p className="text-lg leading-relaxed font-medium italic">
                        "{profile.bio}"
                      </p>
                      <p className="text-slate-400 mt-6 leading-relaxed">
                        Berfokus pada pengembangan arsitektur web yang skalabel dan pengalaman pengguna yang intuitif. Memiliki dedikasi tinggi dalam mengeksplorasi teknologi terbaru untuk menciptakan solusi yang efisien dan modern.
                      </p>
                    </section>
                    
                    <div className="p-6 rounded-3xl/50 border border-white/5 space-y-4">
                      <div className="flex items-center gap-3 text-cyan-400">
                        <Terminal className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Core Mission</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium">
                        Menciptakan jembatan antara imajinasi desain dan fungsionalitas kode yang presisi, memastikan setiap pixel memiliki tujuan.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Metadata</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-[10px] font-black text-slate-500 uppercase">Status</span>
                          <span className="text-xs font-bold text-green-400 uppercase tracking-widest flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Available
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-[10px] font-black text-slate-500 uppercase">Location</span>
                          <span className="text-xs font-bold text-slate-300">{profile.alamat || 'Jakarta, ID'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-[10px] font-black text-slate-500 uppercase">Role</span>
                          <span className="text-xs font-bold text-slate-300">{profile.title || 'Developer'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8">
                       <div 
                         className="aspect-square rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden group cursor-pointer select-none"
                         onMouseDown={startScan}
                         onMouseUp={stopScan}
                         onMouseLeave={stopScan}
                         onTouchStart={startScan}
                         onTouchEnd={stopScan}
                       >
                         <AnimatePresence mode="wait">
                           {!isScanned ? (
                             <motion.div 
                               key="scanner"
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               exit={{ opacity: 0 }}
                               className="relative flex flex-col items-center gap-4"
                             >
                               <div className="relative">
                                 <Fingerprint className={`w-20 h-20 transition-colors duration-300 ${scanProgress > 0 ? 'text-cyan-400' : 'text-cyan-500/20'}`} />
                                 {/* Scan Line Effect */}
                                 {scanProgress > 0 && (
                                   <motion.div 
                                     animate={{ top: ['0%', '100%', '0%'] }}
                                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                     className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10"
                                   />
                                 )}
                               </div>
                               <div className="flex flex-col items-center">
                                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">
                                   {scanProgress > 0 ? `Scanning: ${scanProgress}%` : 'Hold to Authenticate'}
                                 </span>
                                 <div className="w-24 h-1 bg-neutral-950 rounded-full overflow-hidden border border-white/5">
                                   <motion.div 
                                     className="h-full bg-cyan-500" 
                                     style={{ width: `${scanProgress}%` }}
                                   />
                                 </div>
                               </div>
                             </motion.div>
                           ) : (
                             <motion.div 
                               key="profile-photo"
                               initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                               animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                               className="relative w-full h-full flex items-center justify-center"
                             >
                               {profile.photo_url ? (
                                 <div className="relative w-full h-full p-2">
                                   <img 
                                     src={profile.photo_url} 
                                     alt="Authenticated" 
                                     className="w-full h-full object-contain object-top rounded-2xl"
                                   />
                                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                   <div className="absolute top-4 right-4 bg-green-500 rounded-full p-1.5 shadow-lg shadow-green-500/50 z-20">
                                     <CheckCircle2 className="w-4 h-4 text-white" />
                                   </div>
                                 </div>
                               ) : (
                                 <div className="flex flex-col items-center gap-2">
                                   <User className="w-16 h-16 text-cyan-400" />
                                   <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Verified</span>
                                 </div>
                               )}
                             </motion.div>
                           )}
                         </AnimatePresence>
                         
                         {/* Ambient Background Glow when scanning */}
                         {scanProgress > 0 && !isScanned && (
                           <div className="absolute inset-0 bg-cyan-500/5 animate-pulse pointer-events-none" />
                         )}
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
