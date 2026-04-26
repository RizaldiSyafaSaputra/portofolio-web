import { getProfile } from "@/lib/actions/profiles";
import { getSkills } from "@/lib/actions/skills";
import { getStudies } from "@/lib/actions/study";
import { getSosmeds } from "@/lib/actions/sosmed";

import { ProfileForm } from "@/components/admin/ProfileForm";
import { SkillsManager } from "@/components/admin/SkillsManager";
import { StudyManager } from "@/components/admin/StudyManager";
import { SosmedManager } from "@/components/admin/SosmedManager";
import { GlowingBackground } from "@/components/ui/GlowingBackground";

export const metadata = {
  title: "Manage Profile | Admin Control Panel",
};

export default async function AdminProfilesPage() {
  let profile = null;
  let skills = [];
  let studies = [];
  let sosmeds = [];
  
  try {
    [profile, skills, studies, sosmeds] = await Promise.all([
      getProfile(),
      getSkills(),
      getStudies(),
      getSosmeds()
    ]);
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
  }

  return (
    <div className="relative space-y-12">
      <GlowingBackground />
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Profile Settings</h2>
        <p className="text-slate-400 text-sm">
          Manage your personal information, contact details, and professional identity. 
          Changes made here will instantly reflect on your public portfolio.
        </p>
      </div>

      <ProfileForm initialData={profile} />
      
      <SkillsManager initialSkills={skills || []} />
      <StudyManager initialStudy={studies || []} />
      <SosmedManager initialSosmed={sosmeds || []} />
    </div>
  );
}
