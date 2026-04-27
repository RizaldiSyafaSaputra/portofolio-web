// ============================================
// Enums
// ============================================

export enum JenisKeahlian {
  HARD_SKILLS = "Hard Skills",
  SOFT_SKILLS = "Soft Skills",
  LANGUAGE_SKILLS = "Langguange Skills",
}

export enum LevelKeahlian {
  BEGINNER = "Begginer",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}

// ============================================
// Table Types
// ============================================

/**
 * Profiles - Data diri user (1 row per auth user)
 * PK: id (references auth.users.id)
 */
export interface Profile {
  id: string;
  nik: number;
  nama: string | null;
  tempat_lahir: string | null;
  tanggal_lahir: string | null;
  no_handphone: string | null;
  email: string | null;
  alamat: string | null;
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  photos: any[] | null;
  resume_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ProfileInsert {
  id: string;
  nik: number;
  nama?: string | null;
  tempat_lahir?: string | null;
  tanggal_lahir?: string | null;
  no_handphone?: string | null;
  email?: string | null;
  alamat?: string | null;
  title?: string | null;
  bio?: string | null;
  photo_url?: string | null;
  photos?: any[] | null;
  resume_url?: string | null;
}

export interface ProfileUpdate {
  nik?: number;
  nama?: string | null;
  tempat_lahir?: string | null;
  tanggal_lahir?: string | null;
  no_handphone?: string | null;
  email?: string | null;
  alamat?: string | null;
  title?: string | null;
  bio?: string | null;
  photo_url?: string | null;
  photos?: any[] | null;
  resume_url?: string | null;
  updated_at?: string | null;
}

// ============================================

/**
 * Certified - Sertifikasi
 * PK: id_certified, FK: id → profiles.id
 */
export interface Certified {
  id_certified: string;
  id: string;
  nama_sertifikasi: string | null;
  lembaga_penerbit: string | null;
  tanggal_penerbitan: string | null;
  tanggal_kadaluarsa: string | null;
  skor: string | null;
  media_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CertifiedInsert {
  id_certified?: string;
  id: string;
  nama_sertifikasi?: string | null;
  lembaga_penerbit?: string | null;
  tanggal_penerbitan?: string | null;
  tanggal_kadaluarsa?: string | null;
  skor?: string | null;
  media_url?: string | null;
}

export interface CertifiedUpdate {
  nama_sertifikasi?: string | null;
  lembaga_penerbit?: string | null;
  tanggal_penerbitan?: string | null;
  tanggal_kadaluarsa?: string | null;
  skor?: string | null;
  media_url?: string | null;
  updated_at?: string | null;
}

// ============================================

/**
 * Experience - Pengalaman Kerja
 * PK: id_experience, FK: id → profiles.id
 */
export interface Experience {
  id_experience: string;
  id: string;
  nama_perusahaan: string | null;
  posisi: string | null;
  keahlian: string | null;
  jenis_pekerjaan: string | null;
  jenis_program: string | null;
  tanggal_masuk: string | null;
  tanggal_selesai: string | null;
  lokasi_perusahaan: string | null;
  deskripsi: string | null;
  media_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ExperienceInsert {
  id_experience?: string;
  id: string;
  nama_perusahaan?: string | null;
  posisi?: string | null;
  keahlian?: string | null;
  jenis_pekerjaan?: string | null;
  jenis_program?: string | null;
  tanggal_masuk?: string | null;
  tanggal_selesai?: string | null;
  lokasi_perusahaan?: string | null;
  deskripsi?: string | null;
  media_url?: string | null;
}

export interface ExperienceUpdate {
  nama_perusahaan?: string | null;
  posisi?: string | null;
  keahlian?: string | null;
  jenis_pekerjaan?: string | null;
  jenis_program?: string | null;
  tanggal_masuk?: string | null;
  tanggal_selesai?: string | null;
  lokasi_perusahaan?: string | null;
  deskripsi?: string | null;
  media_url?: string | null;
  updated_at?: string | null;
}

// ============================================

/**
 * Project - Daftar Project
 * PK: id_project, FK: id → profiles.id
 */
export interface Project {
  id_project: string;
  id: string;
  nama_project: string | null;
  deskripsi: string | null;
  keahlian: string | null;
  tools: string | null;
  media_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ProjectInsert {
  id_project?: string;
  id: string;
  nama_project?: string | null;
  deskripsi?: string | null;
  keahlian?: string | null;
  tools?: string | null;
  media_url?: string | null;
}

export interface ProjectUpdate {
  nama_project?: string | null;
  deskripsi?: string | null;
  keahlian?: string | null;
  tools?: string | null;
  media_url?: string | null;
  updated_at?: string | null;
}

// ============================================

/**
 * Skills - Keahlian
 * PK: id_skills, FK: id → profiles.id
 */
export interface Skill {
  id_skills: string;
  id: string;
  jenis_keahlian: JenisKeahlian;
  nama_keahlian: string | null;
  level_keahlian: LevelKeahlian;
  created_at: string | null;
  updated_at: string | null;
}

export interface SkillInsert {
  id_skills?: string;
  id: string;
  jenis_keahlian: JenisKeahlian;
  nama_keahlian?: string | null;
  level_keahlian: LevelKeahlian;
}

export interface SkillUpdate {
  jenis_keahlian?: JenisKeahlian;
  nama_keahlian?: string | null;
  level_keahlian?: LevelKeahlian;
  updated_at?: string | null;
}

// ============================================

/**
 * Sosmed - Social Media
 * PK: id_sosmed, FK: id → profiles.id
 */
export interface Sosmed {
  id_sosmed: string;
  id: string;
  nama_sosmed: string | null;
  jenis_sosmed: string | null;
  url_sosmed: string | null;
  icon_sosmed: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface SosmedInsert {
  id_sosmed?: string;
  id: string;
  nama_sosmed?: string | null;
  jenis_sosmed?: string | null;
  url_sosmed?: string | null;
  icon_sosmed?: string | null;
}

export interface SosmedUpdate {
  nama_sosmed?: string | null;
  jenis_sosmed?: string | null;
  url_sosmed?: string | null;
  icon_sosmed?: string | null;
  updated_at?: string | null;
}

// ============================================

/**
 * Study - Pendidikan
 * PK: id_study, FK: id → profiles.id
 */
export interface Study {
  id_study: string;
  id: string;
  nama_sekolah: string | null;
  fakultas: string | null;
  jurusan: string | null;
  nilai: string | null;
  deskripsi: string | null;
  lokasi_sekolah: string | null;
  tanggal_masuk: string | null;
  tanggal_selesai: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface StudyInsert {
  id_study?: string;
  id: string;
  nama_sekolah?: string | null;
  fakultas?: string | null;
  jurusan?: string | null;
  nilai?: string | null;
  deskripsi?: string | null;
  lokasi_sekolah?: string | null;
  tanggal_masuk?: string | null;
  tanggal_selesai?: string | null;
}

export interface StudyUpdate {
  nama_sekolah?: string | null;
  fakultas?: string | null;
  jurusan?: string | null;
  nilai?: string | null;
  deskripsi?: string | null;
  lokasi_sekolah?: string | null;
  tanggal_masuk?: string | null;
  tanggal_selesai?: string | null;
  updated_at?: string | null;
}
