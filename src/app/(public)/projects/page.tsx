import type { Metadata } from "next";
import { ProjectsHero } from "@/components/sections/ProjectsPage/ProjectsHero";
import { ProjectGrid } from "@/components/sections/ProjectsPage/ProjectGrid";
import { getProjects } from "@/lib/actions/project";

export const metadata: Metadata = {
  title: "Projects — Rizaldi Syafa Saputra",
  description: "Showcase of my latest creative projects and engineering work.",
};

export default async function ProjectsPage() {
  let projects = [];

  try {
    projects = await getProjects();
  } catch {
    // Silently handle — ProjectGrid will show empty state
  }

  return (
    <div className="min-h-screen bg-black">
      <ProjectsHero />
      <ProjectGrid projects={projects} />
    </div>
  );
}
