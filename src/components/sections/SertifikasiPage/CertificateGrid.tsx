'use client'

import { motion } from 'framer-motion'
import { Calendar, Building, Award, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Certified } from '@/lib/types/database'

import { useState } from 'react'

interface CertificateGridProps {
  certifications: Certified[]
}

export function CertificateGrid({ certifications }: CertificateGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {paginatedCertifications.map((cert, idx) => (
            <motion.div
              key={cert.id_certified || idx}
              className="group relative flex flex-col bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden hover:border-cyan-500/30 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 border-b border-slate-700">
                {cert.media_url ? (
                  <>
                    <img 
                      src={cert.media_url} 
                      alt={cert.nama_sertifikasi || 'Certificate'} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-600">
                    <Award className="w-16 h-16 mb-2 opacity-50" />
                    <span className="text-sm font-medium">No Image Available</span>
                  </div>
                )}
                
                {/* Overlay link icon on hover */}
                {cert.media_url && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/40 backdrop-blur-[2px]">
                    <a 
                      href={cert.media_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-cyan-500 text-slate-900 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-cyan-500/30"
                    >
                      <ExternalLink className="w-5 h-5 ml-0.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4 flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                    {cert.nama_sertifikasi}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-slate-300 text-sm mb-3">
                    <Building className="w-4 h-4 text-cyan-500" />
                    <span className="font-medium">{cert.lembaga_penerbit || 'Unknown Issuer'}</span>
                  </div>
                </div>

                <div className="space-y-2 mt-auto pt-4 border-t border-slate-700/50">
                  <div className="flex items-center justify-between text-xs text-slate-400">
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
                    <div className="inline-block mt-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-purple-400">
                      Score / Grade: {cert.skor}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Glow effect outline */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              currentPage === 1 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                : 'bg-slate-800 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20'
            }`}
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>
          <span className="text-slate-400 font-medium">
            Page {currentPage} of {safeTotalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === safeTotalPages}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              currentPage === safeTotalPages 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                : 'bg-slate-800 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20'
            }`}
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {certifications.length === 0 && (
          <div className="text-center py-20">
            <Award className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-400">No certifications found</h3>
          </div>
        )}
      </div>
    </section>
  )
}
