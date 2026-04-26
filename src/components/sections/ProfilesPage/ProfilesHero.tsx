'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Download, User, Calendar } from 'lucide-react'
import type { Profile, Sosmed } from '@/lib/types/database'
import Image from 'next/image'
import GridBackground from '../../ui/GridBackground'

interface ProfilesHeroProps {
  profile: Partial<Profile>
  sosmeds: Sosmed[]
}

export function ProfilesHero({ profile, sosmeds }: ProfilesHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-32 pb-32 px-4 sm:px-6 lg:px-8">
      <GridBackground />

      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Bottom Fade Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />

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
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {profile.nama || 'John Doe'}
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-medium text-cyan-400 mb-6">
                {profile.title || 'Full Stack Developer'}
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-slate-300 text-lg mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {profile.bio || 'A passionate developer bridging the gap between design and functional code.'}
            </motion.p>

            {/* Quick Info Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm text-slate-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {(profile.tempat_lahir || profile.tanggal_lahir) && (
                <div className="flex items-center justify-center lg:justify-start gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                  <Calendar className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span>{profile.tempat_lahir}, {profile.tanggal_lahir}</span>
                </div>
              )}
              {profile.alamat && (
                <div className="flex items-center justify-center lg:justify-start gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                  <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{profile.alamat}</span>
                </div>
              )}
              {profile.email && (
                <div className="flex items-center justify-center lg:justify-start gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                  <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
              )}
              {profile.no_handphone && (
                <div className="flex items-center justify-center lg:justify-start gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
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
                      className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
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
              
              {/* Geometric Rings (Behind Photo) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                    className="absolute rounded-full border border-white/5"
                    style={{ 
                      width: `${60 + i * 15}%`, 
                      height: `${60 + i * 15}%`,
                      borderStyle: i % 2 === 0 ? 'dashed' : 'solid'
                    }}
                  />
                ))}
              </div>

              {/* The Photo (Borderless with Bottom Fade) */}
              <div className="relative z-10 w-full h-full group [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
                {profile.photo_url ? (
                  <motion.img
                    src={profile.photo_url}
                    alt={profile.nama || "Profile"}
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

              {/* Floating Spheres (Living Elements - Behind Photo) */}
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

              {/* Floating Tech Badges (Now Behind Photo) */}
              <motion.div
                animate={{ y: [0, -20, 0], x: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-24 -left-10 z-0 p-4 rounded-3xl bg-slate-950/80 backdrop-blur-xl border border-white/10 flex items-center gap-4 shadow-2xl group/badge"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center group-hover/badge:scale-110 transition-transform">
                  <span className="text-white font-bold text-xs">FE</span>
                </div>
                <div className="flex flex-col pr-4">
                  <span className="text-xs font-black text-white uppercase tracking-wider">Frontend</span>
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Expertise Layer</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-24 -right-10 z-0 p-4 rounded-3xl bg-slate-950/80 backdrop-blur-xl border border-white/10 flex items-center gap-4 shadow-2xl group/badge"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] flex items-center justify-center group-hover/badge:scale-110 transition-transform">
                  <span className="text-white font-bold text-xs">BE</span>
                </div>
                <div className="flex flex-col pr-4">
                  <span className="text-xs font-black text-white uppercase tracking-wider">Backend</span>
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Infrastructure</span>
                </div>
              </motion.div>

              {/* Ambient Glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
