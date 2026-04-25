import { ProfilesHero } from "@/components/sections/ProfilesPage/ProfilesHero";
import { ProfilesStudy } from "@/components/sections/ProfilesPage/ProfilesStudy";
import { ProfilesSkills } from "@/components/sections/ProfilesPage/ProfilesSkills";
import type { Metadata } from "next";
import type { Profile, Skill, Study, Sosmed } from "@/lib/types/database";
import { JenisKeahlian, LevelKeahlian } from "@/lib/types/database";

export const metadata: Metadata = {
  title: "Profiles — Rizaldi Syafa Saputra",
  description: "Profil lengkap, pendidikan, dan keahlian Rizaldi Syafa Saputra.",
};

// DUMMY DATA (Seperti di pengalaman/page.tsx)
const profile: Partial<Profile> = {
  nama: "Rizaldi Syafa Saputra",
  title: "Full Stack Web Developer",
  bio: "I am a passionate software engineer focused on building scalable web applications. With a strong foundation in modern JavaScript frameworks, I love to bridge the gap between design and functionality.",
  photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80",
  resume_url: "#",
  tempat_lahir: "Jakarta",
  tanggal_lahir: "15 Agustus 1998",
  email: "hello@rizaldisyafa.com",
  no_handphone: "+62 812-3456-7890",
  alamat: "Jl. Sudirman No. 123, Jakarta Selatan, Indonesia",
};

const sosmeds: Sosmed[] = [
  {
    id_sosmed: "1",
    id: "1",
    nama_sosmed: "GitHub",
    jenis_sosmed: "github",
    url_sosmed: "https://github.com",
    icon_sosmed: "",
    created_at: "",
    updated_at: ""
  },
  {
    id_sosmed: "2",
    id: "1",
    nama_sosmed: "LinkedIn",
    jenis_sosmed: "linkedin",
    url_sosmed: "https://linkedin.com",
    icon_sosmed: "",
    created_at: "",
    updated_at: ""
  },
  {
    id_sosmed: "3",
    id: "1",
    nama_sosmed: "Instagram",
    jenis_sosmed: "instagram",
    url_sosmed: "https://instagram.com",
    icon_sosmed: "",
    created_at: "",
    updated_at: ""
  }
];

const studies: Study[] = [
  {
    id_study: "1",
    id: "1",
    nama_sekolah: "Universitas Indonesia",
    fakultas: "Fakultas Ilmu Komputer",
    jurusan: "Sistem Informasi",
    nilai: "3.85 / 4.00",
    deskripsi: "Graduated with Cum Laude honors. Active in multiple student organizations including the Computer Science Student Association. Completed a thesis on scalable microservices architecture.",
    lokasi_sekolah: "Depok, Jawa Barat",
    tanggal_masuk: "Aug 2016",
    tanggal_selesai: "Jul 2020",
    created_at: "",
    updated_at: ""
  },
  {
    id_study: "2",
    id: "1",
    nama_sekolah: "SMA Negeri 1 Jakarta",
    fakultas: null,
    jurusan: "Ilmu Pengetahuan Alam (IPA)",
    nilai: "90.5 / 100",
    deskripsi: "Active member of the Science Club. Participated in National Olympiads for Computer Science.",
    lokasi_sekolah: "Jakarta Pusat",
    tanggal_masuk: "Jul 2013",
    tanggal_selesai: "May 2016",
    created_at: "",
    updated_at: ""
  }
];

const skills: Skill[] = [
  // Hard Skills
  { id_skills: "1", id: "1", jenis_keahlian: JenisKeahlian.HARD_SKILLS, nama_keahlian: "React & Next.js", level_keahlian: LevelKeahlian.ADVANCED, created_at: "", updated_at: "" },
  { id_skills: "2", id: "1", jenis_keahlian: JenisKeahlian.HARD_SKILLS, nama_keahlian: "TypeScript", level_keahlian: LevelKeahlian.ADVANCED, created_at: "", updated_at: "" },
  { id_skills: "3", id: "1", jenis_keahlian: JenisKeahlian.HARD_SKILLS, nama_keahlian: "Node.js & Express", level_keahlian: LevelKeahlian.INTERMEDIATE, created_at: "", updated_at: "" },
  { id_skills: "4", id: "1", jenis_keahlian: JenisKeahlian.HARD_SKILLS, nama_keahlian: "PostgreSQL & Prisma", level_keahlian: LevelKeahlian.INTERMEDIATE, created_at: "", updated_at: "" },
  { id_skills: "5", id: "1", jenis_keahlian: JenisKeahlian.HARD_SKILLS, nama_keahlian: "Docker & AWS", level_keahlian: LevelKeahlian.BEGINNER, created_at: "", updated_at: "" },
  // Soft Skills
  { id_skills: "6", id: "1", jenis_keahlian: JenisKeahlian.SOFT_SKILLS, nama_keahlian: "Problem Solving", level_keahlian: LevelKeahlian.ADVANCED, created_at: "", updated_at: "" },
  { id_skills: "7", id: "1", jenis_keahlian: JenisKeahlian.SOFT_SKILLS, nama_keahlian: "Team Communication", level_keahlian: LevelKeahlian.ADVANCED, created_at: "", updated_at: "" },
  { id_skills: "8", id: "1", jenis_keahlian: JenisKeahlian.SOFT_SKILLS, nama_keahlian: "Project Management", level_keahlian: LevelKeahlian.INTERMEDIATE, created_at: "", updated_at: "" },
  // Language
  { id_skills: "9", id: "1", jenis_keahlian: JenisKeahlian.LANGUAGE_SKILLS, nama_keahlian: "Indonesian (Native)", level_keahlian: LevelKeahlian.ADVANCED, created_at: "", updated_at: "" },
  { id_skills: "10", id: "1", jenis_keahlian: JenisKeahlian.LANGUAGE_SKILLS, nama_keahlian: "English (Professional)", level_keahlian: LevelKeahlian.INTERMEDIATE, created_at: "", updated_at: "" },
];

export default function ProfilesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      <ProfilesHero profile={profile} sosmeds={sosmeds} />
      <ProfilesStudy studies={studies} />
      <ProfilesSkills skills={skills} />
    </div>
  );
}
