import HeroSection from "@/components/sections/HeroSection";
import AboutPreview from "@/components/sections/AboutPreview";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import ExperiencePreview from "@/components/sections/ExperiencePreview";
import CertificatesPreview from "@/components/sections/CertificatesPreview";

import { getProfile } from "@/lib/actions/profiles";
import { getSkills } from "@/lib/actions/skills";
import { getProjects } from "@/lib/actions/project";
import { getExperiences } from "@/lib/actions/experience";
import { getCertifications } from "@/lib/actions/certified";
import type { Skill, Project, Experience, Certified } from "@/lib/types/database";

export default async function HomePage() {
  // Fetch all data in parallel
  let profile = null;
  let skills: Skill[] = [];
  let projects: Project[] = [];
  let experiences: Experience[] = [];
  let certifications: Certified[] = [];

  try {
    [profile, skills, projects, experiences, certifications] =
      await Promise.all([
        getProfile().catch(() => null),
        getSkills().catch(() => []),
        getProjects().catch(() => []),
        getExperiences().catch(() => []),
        getCertifications().catch(() => []),
      ]);
  } catch {
    // Silently handle errors — sections will show empty state
  }

  return (
    <>
      <HeroSection profile={profile} />
      <AboutPreview profile={profile} skills={skills} />
      <ProjectsPreview projects={projects} />
      <ExperiencePreview experiences={experiences} />
      <CertificatesPreview certifications={certifications} />
    </>
  );
}
