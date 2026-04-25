import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";
import type { Project } from "@/lib/types/database";

interface ProjectsPreviewProps {
  projects: Project[];
}

export default function ProjectsPreview({ projects }: ProjectsPreviewProps) {
  const displayProjects = projects.slice(0, 3);

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
            <FolderOpen size={14} />
            Projects
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Project Terbaru
          </h2>
        </div>

        {/* Project cards */}
        {displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <div key={project.id_project} className="card p-0 overflow-hidden">
                {/* Image */}
                <div
                  className="w-full h-48 flex items-center justify-center"
                  style={{ background: "var(--accent-light)" }}
                >
                  {project.media_url ? (
                    <img
                      src={project.media_url}
                      alt={project.nama_project || ""}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FolderOpen
                      size={40}
                      style={{ color: "var(--accent)" }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    {project.nama_project}
                  </h3>
                  <p
                    className="text-sm mb-4 line-clamp-2"
                    style={{ color: "var(--foreground-secondary)" }}
                  >
                    {project.deskripsi || "Tidak ada deskripsi"}
                  </p>

                  {/* Tech stack */}
                  {project.keahlian && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.keahlian
                        .split(",")
                        .slice(0, 3)
                        .map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-md"
                            style={{
                              background: "var(--accent-light)",
                              color: "var(--accent-deep)",
                            }}
                          >
                            {tech.trim()}
                          </span>
                        ))}
                    </div>
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
            Belum ada project
          </p>
        )}

        {/* View all */}
        {projects.length > 3 && (
          <div className="text-center mt-10">
            <Link href="/projects" className="btn btn-outline">
              Lihat Semua Project <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
