import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import type { Profile } from "@/lib/types/database";

interface HeroSectionProps {
  profile: Profile | null;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
        style={{ background: "var(--accent)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
        style={{ background: "var(--accent-deep)" }}
      />

      <div className="container mx-auto max-w-[1200px] px-6 pt-24 pb-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text content */}
          <div className="flex-1 text-center md:text-left">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-4 animate-fade-in-up"
              style={{ color: "var(--accent)" }}
            >
              Hello, Saya
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-fade-in-up delay-100">
              <span style={{ color: "var(--foreground)" }}>
                {profile?.nama || "Rizaldi Syafa Saputra"}
              </span>
            </h1>

            <p
              className="text-lg md:text-xl mb-2 animate-fade-in-up delay-200"
              style={{ color: "var(--accent-deep)" }}
            >
              {profile?.title || "Web Developer"}
            </p>

            <p
              className="text-base max-w-lg mb-8 animate-fade-in-up delay-300"
              style={{ color: "var(--foreground-secondary)" }}
            >
              {profile?.bio ||
                "Passionate developer yang senang membangun aplikasi web modern dan solusi digital."}
            </p>

            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start animate-fade-in-up delay-400">
              <Link href="/profiles" className="btn btn-primary">
                Lihat Profil <ArrowRight size={16} />
              </Link>
              {profile?.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Download CV <Download size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Profile image */}
          <div className="flex-shrink-0 animate-fade-in delay-300">
            <div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 animate-pulse-glow"
              style={{ borderColor: "var(--accent)" }}
            >
              {profile?.photo_url ? (
                <img
                  src={profile.photo_url}
                  alt={profile.nama || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-6xl font-bold"
                  style={{
                    background: "var(--accent-light)",
                    color: "var(--accent-deep)",
                  }}
                >
                  R
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
