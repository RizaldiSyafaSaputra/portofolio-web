import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import type { Profile, Skill } from "@/lib/types/database";

interface AboutPreviewProps {
  profile: Profile | null;
  skills: Skill[];
}

export default function AboutPreview({ profile, skills }: AboutPreviewProps) {
  return (
    <section className="section" style={{ background: "var(--background-card)" }}>
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
            <User size={14} />
            Tentang Saya
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Sedikit Tentang Saya
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Bio */}
          <div className="flex-1">
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--foreground-secondary)" }}
            >
              {profile?.bio ||
                "Saya adalah seorang developer yang bersemangat dalam membangun solusi digital yang inovatif."}
            </p>
            <Link
              href="/profiles"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: "var(--accent)" }}
            >
              Selengkapnya <ArrowRight size={14} />
            </Link>
          </div>

          {/* Skills preview */}
          <div className="flex-1">
            <h3
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--foreground-muted)" }}
            >
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.slice(0, 10).map((skill) => (
                  <span key={skill.id_skills} className="badge">
                    {skill.nama_keahlian}
                  </span>
                ))
              ) : (
                <p
                  className="text-sm"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  Belum ada data skills
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
