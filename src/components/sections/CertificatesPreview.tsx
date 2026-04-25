import Link from "next/link";
import { ArrowRight, Award, Building2, Calendar } from "lucide-react";
import type { Certified } from "@/lib/types/database";

interface CertificatesPreviewProps {
  certifications: Certified[];
}

export default function CertificatesPreview({
  certifications,
}: CertificatesPreviewProps) {
  const displayCerts = certifications.slice(0, 4);

  return (
    <section className="section" style={{ background: "var(--background)" }}>
      <div className="container mx-auto max-w-[1200px] px-6">
        {/* Section heading */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{
              background: "var(--accent-light)",
              color: "var(--accent-deep)",
            }}
          >
            <Award size={14} />
            Sertifikasi
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Sertifikasi & Pencapaian
          </h2>
        </div>

        {/* Certificates grid */}
        {displayCerts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayCerts.map((cert) => (
              <div key={cert.id_certified} className="card p-5">
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    background: "var(--accent-light)",
                    color: "var(--accent)",
                  }}
                >
                  <Award size={20} />
                </div>

                <h3
                  className="text-sm font-bold mb-2 line-clamp-2"
                  style={{ color: "var(--foreground)" }}
                >
                  {cert.nama_sertifikasi}
                </h3>

                {cert.lembaga_penerbit && (
                  <p
                    className="flex items-center gap-1 text-xs mb-2"
                    style={{ color: "var(--foreground-secondary)" }}
                  >
                    <Building2 size={10} />
                    {cert.lembaga_penerbit}
                  </p>
                )}

                {cert.tanggal_penerbitan && (
                  <p
                    className="flex items-center gap-1 text-xs"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    <Calendar size={10} />
                    {cert.tanggal_penerbitan}
                  </p>
                )}

                {cert.skor && (
                  <div className="mt-3">
                    <span className="badge text-xs">Skor: {cert.skor}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p
            className="text-center text-sm"
            style={{ color: "var(--foreground-muted)" }}
          >
            Belum ada data sertifikasi
          </p>
        )}

        {/* View all */}
        {certifications.length > 4 && (
          <div className="text-center mt-10">
            <Link href="/sertifikasi" className="btn btn-outline">
              Lihat Semua Sertifikasi <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
