'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Building, Award, ExternalLink, ChevronLeft, ChevronRight, X, Film, Sparkles } from 'lucide-react'
import type { Certified } from '@/lib/types/database'

import { useState, useEffect } from 'react'
import { TiltCard } from "@/components/ui/TiltCard";
import { usePremiumSound } from '@/hooks/usePremiumSound'
import { createPortal } from 'react-dom'

interface CertificateGridProps {
  certifications: Certified[]
}

export function CertificateGrid({ certifications }: CertificateGridProps) {
  const [selectedCert, setSelectedCert] = useState<Certified | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeMediaIndex, setActiveMediaIndex] = useState<{ [key: string]: number }>({})
  const [mounted, setMounted] = useState(false)

  const playHover = usePremiumSound('/sounds/blip.mp3', 0.05);
  const playClick = usePremiumSound('/sounds/click.mp3', 0.1);

  useEffect(() => {
    setMounted(true)
  }, [])
  const itemsPerPage = 6

  const totalPages = Math.ceil(certifications.length / itemsPerPage)
  const safeTotalPages = totalPages === 0 ? 1 : totalPages
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCertifications = certifications.slice(startIndex, startIndex + itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < safeTotalPages) {
      setCurrentPage(prev => prev + 1)
      window.scrollTo({ top: 400, behavior: 'smooth' })
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
      window.scrollTo({ top: 400, behavior: 'smooth' })
    }
  }

  const getMediaUrls = (url: string | null) => {
    if (!url) return []
    try {
      const parsed = JSON.parse(url)
      const items = Array.isArray(parsed) ? parsed : [{ url: url, type: 'image', isStarred: true }]
      return items
        .map((item: any) => typeof item === 'string' ? { url: item, type: 'image', isStarred: false } : item)
        // Starred first
        .sort((a: any, b: any) => (b.isStarred ? 1 : 0) - (a.isStarred ? 1 : 0))
    } catch {
      return [{ url: url, type: 'image', isStarred: true }]
    }
  }

  const isVideo = (item: any) => {
    if (!item) return false;
    const url = typeof item === 'string' ? item : item.url;
    const type = typeof item === 'string' ? '' : item.type;
    if (type === 'video') return true;
    return (
      url.match(/\.(mp4|webm|ogg|mov)$/i) || 
      url.includes('youtube.com') || 
      url.includes('youtu.be') || 
      url.includes('drive.google.com')
    );
  };

  const nextMedia = (certId: string, total: number) => {
    setActiveMediaIndex(prev => ({
      ...prev,
      [certId]: ((prev[certId] || 0) + 1) % total
    }))
  }

  const prevMedia = (certId: string, total: number) => {
    setActiveMediaIndex(prev => ({
      ...prev,
      [certId]: ((prev[certId] || 0) - 1 + total) % total
    }))
  }

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <motion.div
          className="absolute top-1/2 -left-24 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]"
          animate={{
            y: [0, 50, -50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {certifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center mb-8">
              <Award className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3 tracking-tight">No Certifications Yet</h3>
            <p className="text-slate-500 max-w-md font-medium">Certifications will appear here once they are added through the admin dashboard.</p>
          </div>
        ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {paginatedCertifications.map((cert, idx) => {
              const media = getMediaUrls(cert.media_url);
              const mainThumbnail = media[0]?.url || null;

              const handleSelectCert = () => {
                if (mainThumbnail) {
                  playClick();
                  setSelectedCert(cert);
                }
              };

              return (
                <TiltCard key={cert.id_certified || idx} className="h-full">
                  <motion.div
                    className="group relative h-[550px] flex flex-col bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden hover:border-cyan-500/30 transition-all duration-500 cursor-pointer"
                    data-cursor="view"
                    onMouseEnter={playHover}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ y: -5 }}
                    onClick={handleSelectCert}
                  >
                {/* Image Section */}
                <div className="relative h-[240px] w-full overflow-hidden bg-slate-900 border-b border-slate-700">
                  {mainThumbnail ? (
                    <>
                      {isVideo(media[0]) ? (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                          <Award className="w-16 h-16 text-cyan-500/20" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <Film className="w-8 h-8 text-cyan-400 opacity-50" />
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={mainThumbnail} 
                          alt={cert.nama_sertifikasi || 'Certificate'} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-600">
                      <Award className="w-16 h-16 mb-2 opacity-50" />
                      <span className="text-sm font-medium">No Image Available</span>
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-6 flex flex-col h-[280px]">
                  <div className="mb-4 min-h-[140px]">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-3 group-hover:text-cyan-400 transition-colors">
                      {cert.nama_sertifikasi}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-slate-300 text-sm mb-3">
                      <Building className="w-4 h-4 text-cyan-500" />
                      <span className="font-medium">{cert.lembaga_penerbit || 'Unknown Issuer'}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mt-auto pt-4 border-t border-slate-700/50">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Issued: {cert.tanggal_penerbitan || '-'}</span>
                      </div>
                      {cert.tanggal_kadaluarsa && (
                        <span className="text-slate-500">
                          Expires: {cert.tanggal_kadaluarsa}
                        </span>
                      )}
                    </div>
                    
                    {cert.skor && (
                      <div className="inline-block mt-2 px-3 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-semibold text-cyan-400">
                        Score / Grade: {cert.skor}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Glow effect outline */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
              </TiltCard>
            );
          })}
        </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                currentPage === 1 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                  : 'bg-slate-800 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-slate-400 text-xs font-black uppercase tracking-widest">
              {currentPage} / {safeTotalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === safeTotalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                currentPage === safeTotalPages 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                   : 'bg-slate-800 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20'
              }`}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          </>
        )}
      </div>

      {/* Lightbox Modal - Improved stability with Portal */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence mode="wait">
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999999] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl z-50 flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const media = getMediaUrls(selectedCert.media_url);
                  const currentIndex = activeMediaIndex[selectedCert.id_certified] || 0;
                  const currentMedia = media[currentIndex];

                  return (
                    <>
                      <div className="absolute top-6 right-6 z-[110] flex gap-3">
                        {currentMedia?.url && (
                          <a 
                            href={currentMedia.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 transition-colors shadow-2xl"
                            title="Open in new tab"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedCert(null)}
                          data-cursor="close"
                          className="w-12 h-12 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-colors shadow-2xl"
                          title="Close"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex-1 min-w-0 bg-slate-950/50 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center relative group/slider">
                        <AnimatePresence mode="wait">
                          <motion.div 
                            key={currentMedia?.url}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full h-full flex items-center justify-center p-8 md:p-12"
                          >
                            {currentMedia?.url?.toLowerCase().endsWith('.pdf') ? (
                              <iframe 
                                src={currentMedia.url} 
                                className="w-full h-full min-h-[400px] md:min-h-[600px] rounded-xl shadow-2xl"
                                title="Certificate PDF"
                              />
                            ) : isVideo(currentMedia) ? (
                                <video 
                                  src={currentMedia?.url} 
                                  className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
                                  controls
                                  autoPlay
                                />
                            ) : (
                              <img 
                                src={currentMedia?.url} 
                                alt={selectedCert.nama_sertifikasi || 'Certificate'} 
                                className="max-w-full max-h-[70vh] object-contain shadow-2xl rounded-xl border border-white/10"
                              />
                            )}
                          </motion.div>
                        </AnimatePresence>

                        {media.length > 1 && (
                          <>
                            <button 
                              onClick={() => prevMedia(selectedCert.id_certified, media.length)}
                              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-black/60 hover:bg-cyan-500 rounded-full text-white opacity-0 group-hover/slider:opacity-100 transition-all z-10 shadow-2xl"
                            >
                              <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button 
                              onClick={() => nextMedia(selectedCert.id_certified, media.length)}
                              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-black/60 hover:bg-cyan-500 rounded-full text-white opacity-0 group-hover/slider:opacity-100 transition-all z-10 shadow-2xl"
                            >
                              <ChevronRight className="w-6 h-6" />
                            </button>
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/80 backdrop-blur-md rounded-full text-[10px] font-black text-cyan-400 z-10 shadow-xl tracking-widest">
                              {currentIndex + 1} / {media.length}
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className="w-full md:w-[400px] p-10 flex flex-col gap-8 bg-slate-900/50 backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                            <Award className="w-4 h-4 text-cyan-400" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Credential Details</span>
                        </div>

                        <div>
                          <h2 className="text-3xl font-black text-white mb-3 leading-tight tracking-tight uppercase">
                            {selectedCert.nama_sertifikasi}
                          </h2>
                          <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-sm">
                            <Building className="w-5 h-5" />
                            {selectedCert.lembaga_penerbit}
                          </div>
                        </div>

                        <div className="space-y-6 py-8 border-y border-white/5">
                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">Issued On</span>
                            <div className="flex items-center gap-3 text-white font-bold text-lg">
                              <Calendar className="w-5 h-5 text-slate-600" />
                              {selectedCert.tanggal_penerbitan || '-'}
                            </div>
                          </div>
                          {selectedCert.tanggal_kadaluarsa && (
                            <div className="flex flex-col gap-2">
                              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">Valid Until</span>
                              <div className="flex items-center gap-3 text-white font-bold text-lg">
                                <Calendar className="w-5 h-5 text-slate-600" />
                                {selectedCert.tanggal_kadaluarsa}
                              </div>
                            </div>
                          )}
                          {selectedCert.skor && (
                            <div className="flex flex-col gap-2">
                              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">Score / Grade</span>
                              <div className="flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-cyan-500" />
                                <span className="text-cyan-400 font-black text-2xl">{selectedCert.skor}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-auto">
                          <button
                            onClick={() => setSelectedCert(null)}
                            className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-cyan-400 transition-all shadow-2xl"
                          >
                            Close Viewer
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
