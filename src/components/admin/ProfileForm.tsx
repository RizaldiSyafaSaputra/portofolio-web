"use client";

import { useState, useTransition, useRef } from "react";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Phone, Briefcase, Calendar, Image as ImageIcon, FileText, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { updateProfile } from "@/lib/actions/profiles";
import type { Profile } from "@/lib/types/database";
import { MediaUpload } from "@/components/admin/MediaUpload";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Textarea } from "@/components/ui/Textarea";

interface ProfileFormProps {
  initialData: Partial<Profile> | null;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const formDataRef = useRef<FormData | null>(null);

  const requestSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formDataRef.current = new FormData(e.currentTarget);
    setConfirmOpen(true);
  };

  const handleConfirmSave = async () => {
    setConfirmOpen(false);
    if (!formDataRef.current) return;
    
    setStatus({ type: null, message: "" });
    
    const formData = formDataRef.current;
    
    const updates = {
      nama: formData.get("nama") as string,
      title: formData.get("title") as string,
      email: formData.get("email") as string,
      no_handphone: formData.get("no_handphone") as string,
      tempat_lahir: formData.get("tempat_lahir") as string,
      tanggal_lahir: formData.get("tanggal_lahir") as string,
      alamat: formData.get("alamat") as string,
      bio: formData.get("bio") as string,
      photo_url: formData.get("photo_url") as string,
      resume_url: formData.get("resume_url") as string,
    };

    startTransition(async () => {
      try {
        await updateProfile(updates);
        setStatus({ type: 'success', message: "Profile successfully updated!" });
        setTimeout(() => setStatus({ type: null, message: "" }), 3000);
      } catch (error: any) {
        setStatus({ type: 'error', message: error.message || "Failed to update profile." });
      }
    });
  };

  const InputGroup = ({ label, name, defaultValue, icon: Icon, type = "text", placeholder = "", required = false }: any) => (
    <div className="space-y-2 w-full">
      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-cyan-500" /> {label}
      </label>
      <div className="relative group">
        <input
          type={type}
          name={name}
          defaultValue={defaultValue || ""}
          required={required}
          placeholder={placeholder}
          className="w-full bg-neutral-950/50 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all hover:bg-neutral-950/80"
        />
      </div>
    </div>
  );

  return (
    <>
      <form onSubmit={requestSave} className="space-y-8">
        {status.type && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border flex items-center gap-3 ${
              status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}
          >
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <p className="text-sm font-semibold">{status.message}</p>
          </motion.div>
        )}

        {/* Top Full Width - Main Info */}
        <div className="bg-neutral-950/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden group transition-all duration-500 hover:border-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 transition-all duration-700 group-hover:bg-cyan-500/10 pointer-events-none" />
          
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" /> Personal Identity
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InputGroup label="Full Name" name="nama" defaultValue={initialData?.nama} icon={User} required />
            <InputGroup label="Professional Title" name="title" defaultValue={initialData?.title} icon={Briefcase} placeholder="e.g. Full Stack Developer" required />
            <InputGroup label="Place of Birth" name="tempat_lahir" defaultValue={initialData?.tempat_lahir} icon={MapPin} />
            <InputGroup label="Date of Birth" name="tanggal_lahir" defaultValue={initialData?.tanggal_lahir} icon={Calendar} placeholder="DD Month YYYY" />
          </div>

          <Textarea
            label="Bio / About Me"
            name="bio"
            icon={FileText}
            defaultValue={initialData?.bio || ""}
            rows={4}
            placeholder="Tell the world about yourself..."
          />
        </div>

        {/* Bottom Split - Contact & Media */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-neutral-950/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 transition-all duration-500 hover:border-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/5">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-400" /> Contact Info
            </h3>
            <div className="space-y-6">
              <InputGroup label="Email Address" name="email" type="email" defaultValue={initialData?.email} icon={Mail} />
              <InputGroup label="Phone Number" name="no_handphone" defaultValue={initialData?.no_handphone} icon={Phone} />
              
              <Textarea
                label="Address"
                name="alamat"
                icon={MapPin}
                defaultValue={initialData?.alamat || ""}
                rows={3}
              />
            </div>
          </div>

          <div className="bg-neutral-950/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 transition-all duration-500 hover:border-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/5">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-cyan-400" /> Media Links
            </h3>
            <div className="space-y-6 flex flex-col h-full">
              <MediaUpload 
                label="Profile Photo" 
                name="photo_url" 
                defaultValue={initialData?.photo_url} 
                icon={ImageIcon} 
                multiple={false}
                accept="image/*"
              />
              <MediaUpload 
                label="Resume/CV (PDF)" 
                name="resume_url" 
                defaultValue={initialData?.resume_url} 
                icon={FileText} 
                accept=".pdf, application/pdf"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1"
          >
            {isPending ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Save className="w-5 h-5" />
              </motion.div>
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isPending ? "Saving Changes..." : "Save Profile"}
          </button>
        </div>
      </form>

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Save Profile"
        message="Are you sure you want to save all changes to your profile?"
        onConfirm={handleConfirmSave}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
