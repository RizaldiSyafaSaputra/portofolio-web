import { getProjects } from "@/lib/actions/project";
import { ProjectManager } from "@/components/admin/ProjectManager";
import { GlowingBackground } from "@/components/ui/GlowingBackground";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen p-8 lg:p-12">
      <GlowingBackground />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <ProjectManager initialProjects={projects} />
      </div>
    </div>
  );
}
