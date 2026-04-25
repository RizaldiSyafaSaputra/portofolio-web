import type { Metadata } from "next";
import { SertifikasiHero } from "@/components/sections/SertifikasiPage/SertifikasiHero";
import { CertificateGrid } from "@/components/sections/SertifikasiPage/CertificateGrid";
import type { Certified } from "@/lib/types/database";

export const metadata: Metadata = {
  title: "Sertifikasi — Rizaldi Syafa Saputra",
  description: "Daftar sertifikasi dan lisensi profesional Rizaldi Syafa Saputra.",
};

// DUMMY DATA untuk pratinjau desain
const dummyCertifications: Certified[] = [
  {
    id_certified: "1",
    id: "user-1",
    nama_sertifikasi: "AWS Certified Solutions Architect – Associate",
    lembaga_penerbit: "Amazon Web Services",
    tanggal_penerbitan: "May 2023",
    tanggal_kadaluarsa: "May 2026",
    skor: "850 / 1000",
    media_url: "https://images.unsplash.com/photo-1523289217630-0dd16184ca62?fit=crop&w=800&q=80",
    created_at: "",
    updated_at: ""
  },
  {
    id_certified: "2",
    id: "user-1",
    nama_sertifikasi: "Google Cloud Professional Data Engineer",
    lembaga_penerbit: "Google Cloud",
    tanggal_penerbitan: "Jan 2024",
    tanggal_kadaluarsa: "Jan 2026",
    skor: "Pass",
    media_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?fit=crop&w=800&q=80",
    created_at: "",
    updated_at: ""
  },
  {
    id_certified: "3",
    id: "user-1",
    nama_sertifikasi: "Meta Front-End Developer Professional Certificate",
    lembaga_penerbit: "Coursera / Meta",
    tanggal_penerbitan: "Aug 2022",
    tanggal_kadaluarsa: null, // Lifetime
    skor: "98%",
    media_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=800&q=80",
    created_at: "",
    updated_at: ""
  },
  {
    id_certified: "4",
    id: "user-1",
    nama_sertifikasi: "Certified Kubernetes Administrator (CKA)",
    lembaga_penerbit: "Cloud Native Computing Foundation",
    tanggal_penerbitan: "Oct 2023",
    tanggal_kadaluarsa: "Oct 2026",
    skor: "89%",
    media_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?fit=crop&w=800&q=80",
    created_at: "",
    updated_at: ""
  },
  {
    id_certified: "5",
    id: "user-1",
    nama_sertifikasi: "Red Hat Certified System Administrator (RHCSA)",
    lembaga_penerbit: "Red Hat",
    tanggal_penerbitan: "Feb 2023",
    tanggal_kadaluarsa: "Feb 2026",
    skor: "300 / 300",
    media_url: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?fit=crop&w=800&q=80",
    created_at: "",
    updated_at: ""
  },
  {
    id_certified: "6",
    id: "user-1",
    nama_sertifikasi: "Cisco Certified Network Associate (CCNA)",
    lembaga_penerbit: "Cisco",
    tanggal_penerbitan: "Nov 2022",
    tanggal_kadaluarsa: "Nov 2025",
    skor: "Pass",
    media_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?fit=crop&w=800&q=80",
    created_at: "",
    updated_at: ""
  },
  {
    id_certified: "7",
    id: "user-1",
    nama_sertifikasi: "HashiCorp Certified: Terraform Associate",
    lembaga_penerbit: "HashiCorp",
    tanggal_penerbitan: "Mar 2024",
    tanggal_kadaluarsa: "Mar 2026",
    skor: "92%",
    media_url: "https://images.unsplash.com/photo-1607799279861-4ddf5e1f0e4b?fit=crop&w=800&q=80",
    created_at: "",
    updated_at: ""
  }
];

export default function SertifikasiPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <SertifikasiHero />
      <CertificateGrid certifications={dummyCertifications} />
    </div>
  );
}
