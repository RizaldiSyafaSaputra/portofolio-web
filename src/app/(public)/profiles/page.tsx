import { ProfilesHero } from "@/components/sections/ProfilesPage/ProfilesHero";
import { ProfilesStudy } from "@/components/sections/ProfilesPage/ProfilesStudy";
import { ProfilesSkills } from "@/components/sections/ProfilesPage/ProfilesSkills";
import type { Metadata } from "next";
import type { Skill, Study, Sosmed } from "@/lib/types/database";

import { getProfile } from "@/lib/actions/profiles";
import { getSkills } from "@/lib/actions/skills";
import { getStudies } from "@/lib/actions/study";
import { getSosmeds } from "@/lib/actions/sosmed";

export const metadata: Metadata = {
  title: "Profiles — Rizaldi Syafa Saputra",
  description: "Profil lengkap, pendidikan, dan keahlian Rizaldi Syafa Saputra.",
};

export default async function ProfilesPage() {
  let profile = {};
  let skills: Skill[] = [];
  let studies: Study[] = [];
  let sosmeds: Sosmed[] = [];

  try {
    [profile, skills, studies, sosmeds] = await Promise.all([
      getProfile().catch(() => ({})),
      getSkills().catch(() => []),
      getStudies().catch(() => []),
      getSosmeds().catch(() => []),
    ]);
  } catch {
    // Silently handle errors
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <ProfilesHero profile={profile} sosmeds={sosmeds} />
      <ProfilesStudy studies={studies} />
      <ProfilesSkills skills={skills} />
    </div>
  );
}
