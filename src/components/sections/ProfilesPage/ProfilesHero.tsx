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
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-blue-400/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl shadow-cyan-500/20 bg-slate-800">
                {profile.photo_url ? (
                  <img 
                    src={profile.photo_url} 
                    alt={profile.nama || 'Profile'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 text-6xl font-bold text-slate-500">
                    <User className="w-24 h-24 text-slate-600" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
