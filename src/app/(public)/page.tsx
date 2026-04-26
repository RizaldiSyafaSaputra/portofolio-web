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
import { getGlobalStats, getProfileForHome } from "@/lib/actions/home";
import type { Skill, Project, Experience, Certified } from "@/lib/types/database";

export default async function HomePage() {
  // Fetch all data in parallel
  let profile = null;
  let skills: Skill[] = [];
  let projects: Project[] = [];
  let experiences: Experience[] = [];
  let certifications: Certified[] = [];
  let stats = { projects: 0, experience: 0, certificates: 0 };
  let highestStudy = null;

  try {
    const [
      profileRes, 
      skillsRes, 
      projectsRes, 
      experiencesRes, 
      certificationsRes,
      statsRes,
      homeProfileRes
    ] = await Promise.all([
      getProfile().catch(() => null),
      getSkills().catch(() => []),
      getProjects().catch(() => []),
      getExperiences().catch(() => []),
      getCertifications().catch(() => []),
      getGlobalStats().catch(() => ({ projects: 0, experience: 0, certificates: 0 })),
      getProfileForHome().catch(() => ({ profile: null, highestStudy: null }))
    ]);

    profile = profileRes;
    skills = skillsRes;
    projects = projectsRes;
    experiences = experiencesRes;
    certifications = certificationsRes;
    stats = statsRes;
    highestStudy = homeProfileRes.highestStudy;
  } catch (error) {
    console.error("Home Page Data Fetch Error:", error);
  }

  return (
    <>
      <HeroSection profile={profile} stats={stats} />
      <AboutPreview profile={profile} skills={skills} highestStudy={highestStudy} />
      <ProjectsPreview projects={projects} />
      <ExperiencePreview experiences={experiences} />
      <CertificatesPreview certifications={certifications} />
    </>
  );
}
