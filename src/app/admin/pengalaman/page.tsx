import { getExperiences } from "@/lib/actions/experience";
import { ExperienceManager } from "@/components/admin/ExperienceManager";
import { GlowingBackground } from "@/components/ui/GlowingBackground";

export default async function AdminPengalamanPage() {
  const experiences = await getExperiences();

  return (
    <div className="relative min-h-screen">
      <GlowingBackground variant="indigo" />
      
      <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">
        <ExperienceManager initialExperiences={experiences} />
      </div>
    </div>
  );
}
