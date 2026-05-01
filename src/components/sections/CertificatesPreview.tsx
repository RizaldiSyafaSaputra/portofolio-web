"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Award, Building2, Calendar, ShieldCheck } from "lucide-react";
import type { Certified } from "@/lib/types/database";

interface CertificatesPreviewProps {
  certifications: Certified[];
}

export default function CertificatesPreview({ certifications }: CertificatesPreviewProps) {
  const displayCerts = certifications.slice(0, 4);

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-20 text-center md:text-left">
          <div className="max-w-2xl flex flex-col items-center md:items-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
            >
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Validated Skills</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none"
            >
              Honors & <br />
              <span className="text-cyan-500">Credentials.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/sertifikasi"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
            >
              Archive Registry <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCerts.map((cert, i) => (
            <motion.div
              key={cert.id_certified}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-5 md:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-cyan-500/50 hover:bg-white/[0.04] transition-all duration-500 backdrop-blur-sm overflow-hidden flex flex-col w-[90%] mx-auto sm:w-full"
            >
              {/* Verified Badge */}
              <div className="absolute top-6 right-6">
                 <ShieldCheck className="w-4 h-4 text-cyan-500/50 group-hover:text-cyan-400 transition-colors" />
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
                <Award className="w-6 h-6 text-cyan-400" />
              </div>

              <h3 className="text-sm font-black text-white mb-4 line-clamp-2 leading-tight tracking-tight">
                {cert.nama_sertifikasi}
              </h3>

              <div className="mt-auto space-y-3">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  <Building2 className="w-3 h-3 text-cyan-500" />
                  {cert.lembaga_penerbit || "Global Authority"}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  <Calendar className="w-3 h-3 text-cyan-500" />
                  {cert.tanggal_penerbitan || "2024"}
                </div>
              </div>

              {/* Score Indicator */}
              {cert.skor && (
                <div className="mt-6 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Grade</span>
                    <span className="text-xs font-black text-cyan-400">{cert.skor}</span>
                  </div>
                  <div className="mt-2 h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)] w-[85%]"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
