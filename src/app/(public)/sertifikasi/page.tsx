import type { Metadata } from "next";
import { SertifikasiHero } from "@/components/sections/SertifikasiPage/SertifikasiHero";
import { CertificateGrid } from "@/components/sections/SertifikasiPage/CertificateGrid";
import { getCertifications } from "@/lib/actions/certified";

export const metadata: Metadata = {
  title: "Sertifikasi — Rizaldi Syafa Saputra",
  description: "Daftar sertifikasi dan lisensi profesional Rizaldi Syafa Saputra.",
};

export default async function SertifikasiPage() {
  let certifications = [];

  try {
    certifications = await getCertifications();
  } catch {
    // Silently handle — CertificateGrid will show empty state
  }

  return (
    <div className="min-h-screen bg-black">
      <SertifikasiHero />
      <CertificateGrid certifications={certifications} />
    </div>
  );
}
