import { getCertifications } from "@/lib/actions/certified";
import { CertifiedManager } from "@/components/admin/CertifiedManager";
import { GlowingBackground } from "@/components/ui/GlowingBackground";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage Certifications | Admin Control Panel",
};

export default async function AdminSertifikasiPage() {
  let certifications = [];
  
  try {
    certifications = await getCertifications();
  } catch (error) {
    console.error("Failed to fetch certifications:", error);
  }

  return (
    <div className="relative space-y-12">
      <GlowingBackground />
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Certifications & Awards</h2>
        <p className="text-slate-400 text-sm">
          Display your professional achievements and credentials. 
          Manage your licenses, certificates, and awards here.
        </p>
      </div>

      <CertifiedManager initialCertifications={certifications || []} />
    </div>
  );
}
