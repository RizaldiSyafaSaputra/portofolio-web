import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, Calendar } from "lucide-react";
import type { Experience } from "@/lib/types/database";

interface ExperiencePreviewProps {
  experiences: Experience[];
}

export default function ExperiencePreview({
  experiences,
}: ExperiencePreviewProps) {
  const displayExperiences = experiences.slice(0, 3);

  return (
    <section
      className="section"
      style={{ background: "var(--background-card)" }}
    >
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
            <Briefcase size={14} />
            Pengalaman
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Pengalaman Kerja
          </h2>
        </div>

        {/* Timeline */}
        {displayExperiences.length > 0 ? (
          <div className="max-w-2xl mx-auto space-y-6">
            {displayExperiences.map((exp) => (
              <div
                key={exp.id_experience}
                className="card p-6 flex gap-4"
              >
                {/* Accent bar */}
                <div
                  className="w-1 rounded-full flex-shrink-0"
                  style={{ background: "var(--accent)" }}
                />

                <div className="flex-1">
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    {exp.posisi}
                  </h3>
                  <p
                    className="font-medium mb-2"
                    style={{ color: "var(--accent-deep)" }}
                  >
                    {exp.nama_perusahaan}
                  </p>

                  <div
                    className="flex flex-wrap items-center gap-4 text-sm mb-3"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {exp.tanggal_masuk && (
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {exp.tanggal_masuk} — {exp.tanggal_selesai || "Sekarang"}
                      </span>
                    )}
                    {exp.lokasi_perusahaan && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {exp.lokasi_perusahaan}
                      </span>
                    )}
                  </div>

                  {exp.jenis_pekerjaan && (
                    <span className="badge">{exp.jenis_pekerjaan}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p
            className="text-center text-sm"
            style={{ color: "var(--foreground-muted)" }}
          >
            Belum ada data pengalaman
          </p>
        )}

        {/* View all */}
        {experiences.length > 3 && (
          <div className="text-center mt-10">
            <Link href="/pengalaman" className="btn btn-outline">
              Lihat Semua Pengalaman <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
