"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, Award, Calendar, Building, ExternalLink, Loader2, Star, Film } from "lucide-react";
import { createCertification, deleteCertification, updateCertification } from "@/lib/actions/certified";
import type { Certified } from "@/lib/types/database";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { MediaUpload } from "@/components/admin/MediaUpload";

export function CertifiedManager({ initialCertifications }: { initialCertifications: Certified[] }) {
  const [certs, setCerts] = useState<Certified[]>(initialCertifications);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certified | null>(null);
  const [confirmState, setConfirmState] = useState<{ isOpen: boolean, action: (() => void) | null, type: 'save' | 'delete' }>({ isOpen: false, action: null, type: 'save' });

  const openAddModal = () => {
    setEditingCert(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cert: Certified) => {
    setEditingCert(cert);
    setIsModalOpen(true);
  };

  const requestSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const certData = {
      nama_sertifikasi: formData.get("nama_sertifikasi") as string,
      lembaga_penerbit: formData.get("lembaga_penerbit") as string,
      tanggal_penerbitan: formData.get("tanggal_penerbitan") as string,
      tanggal_kadaluarsa: formData.get("tanggal_kadaluarsa") as string,
      skor: formData.get("skor") as string,
      media_url: formData.get("media_url") as string,
    };

    setConfirmState({
      isOpen: true,
      type: 'save',
      action: () => handleSave(certData)
    });
  };

  const handleSave = async (certData: any) => {
    startTransition(async () => {
      try {
        if (editingCert) {
          const updated = await updateCertification(editingCert.id_certified, certData);
          setCerts((prev) => prev.map((c) => c.id_certified === updated.id_certified ? updated : c));
        } else {
          const created = await createCertification({ ...certData, id: "dummy" });
          setCerts((prev) => [created, ...prev]);
        }
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to save certification:", error);
        alert("Failed to save. Please try again.");
      }
    });
  };

  const requestDelete = (id: string) => {
    setConfirmState({
      isOpen: true,
      type: 'delete',
      action: () => handleDelete(id)
    });
  };

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteCertification(id);
        setCerts((prev) => prev.filter((c) => c.id_certified !== id));
      } catch (error) {
        console.error("Failed to delete certification:", error);
        alert("Failed to delete. Please try again.");
      }
    });
  };

  const isVideo = (item: any) => {
    if (!item) return false;
    const url = typeof item === 'string' ? item : item.url;
    const type = typeof item === 'string' ? '' : item.type;
    if (type === 'video') return true;
    return (
      url.match(/\.(mp4|webm|ogg|mov)$/i) || 
      url.includes('youtube.com') || 
      url.includes('youtu.be') || 
      url.includes('drive.google.com')
    );
  };

  const isImage = (item: any) => {
    if (!item) return false;
    const url = typeof item === 'string' ? item : item.url;
    return url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);
  };

  const getMediaUrls = (url: string | null) => {
    if (!url) return [];
    try {
      const parsed = JSON.parse(url);
      const items = Array.isArray(parsed) ? parsed : [{ url: url, type: 'image', isStarred: true }];
      return items
        .map((item: any) => typeof item === 'string' ? { url: item, type: 'image', isStarred: false } : item)
        // Starred first
        .sort((a: any, b: any) => (b.isStarred ? 1 : 0) - (a.isStarred ? 1 : 0));
    } catch {
      return [{ url: url, type: 'image', isStarred: true }];
    }
  };

  return (
    <div className="relative bg-neutral-950/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mt-8 transition-all duration-500 hover:border-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/5 group/manager">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 transition-all duration-700 group-hover/manager:bg-emerald-500/10 pointer-events-none" />
      
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" /> Certifications & Awards
          </h3>
          <p className="text-slate-400 text-xs mt-1">Manage your professional certificates and achievements.</p>
        </div>
        <Button onClick={openAddModal} variant="primary" size="sm" className="!bg-emerald-500/20 !text-emerald-400 !border-emerald-500/50 hover:!bg-emerald-500/30 hover:!shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          <Plus className="w-4 h-4 mr-2" /> Add Certificate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {certs.map((cert) => {
            const media = getMediaUrls(cert.media_url);
            const mainThumbnail = media[0]?.url || null;

            return (
              <motion.div
                key={cert.id_certified}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative overflow-hidden bg-black/50 border border-white/5 p-6 rounded-2xl group transition-all duration-300 hover:border-emerald-500/30 hover:bg-neutral-950/50"
              >
                <div className="flex gap-4">
                  {mainThumbnail ? (
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      {isVideo(media[0]) ? (
                        <div className="w-full h-full bg-neutral-950 flex items-center justify-center">
                          <Film className="w-8 h-8 text-emerald-500/50" />
                        </div>
                      ) : (
                        <img src={mainThumbnail} alt={cert.nama_sertifikasi || ""} className="w-full h-full object-cover" />
                      )}
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <Award className="w-10 h-10 text-emerald-400" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-white font-bold text-lg leading-tight truncate">{cert.nama_sertifikasi}</h4>
                      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEditModal(cert)} className="p-1.5 text-slate-400 hover:text-emerald-400 bg-neutral-900/50 hover:bg-emerald-500/10 rounded-lg transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => requestDelete(cert.id_certified)} className="p-1.5 text-slate-400 hover:text-red-400 bg-neutral-900/50 hover:bg-red-500/10 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-emerald-400 font-medium flex items-center gap-1.5 mt-1">
                      <Building className="w-3.5 h-3.5" /> {cert.lembaga_penerbit}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        {cert.tanggal_penerbitan} {cert.tanggal_kadaluarsa ? `- ${cert.tanggal_kadaluarsa}` : '(No Expiry)'}
                      </div>
                      {cert.skor && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          <Star className="w-3.5 h-3.5 fill-emerald-400/20" /> Score: {cert.skor}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {mainThumbnail && (
                  <a 
                    href={mainThumbnail} 
                    target="_blank" 
                    rel="noreferrer"
                    className="absolute bottom-4 right-4 p-2 text-slate-500 hover:text-emerald-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingCert ? "Edit Certification" : "Add New Certification"}
      >
        <form onSubmit={requestSave} className="space-y-6">
          <Input 
            label="Certification Name" 
            name="nama_sertifikasi" 
            defaultValue={editingCert?.nama_sertifikasi || ""} 
            placeholder="e.g. AWS Certified Solutions Architect" 
            required 
            icon={Award}
          />
          <Input 
            label="Issuing Organization" 
            name="lembaga_penerbit" 
            defaultValue={editingCert?.lembaga_penerbit || ""} 
            placeholder="e.g. Amazon Web Services" 
            required 
            icon={Building}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Issue Date" 
              name="tanggal_penerbitan" 
              defaultValue={editingCert?.tanggal_penerbitan || ""} 
              placeholder="e.g. October 2023" 
              required 
              icon={Calendar}
            />
            <Input 
              label="Expiry Date (Optional)" 
              name="tanggal_kadaluarsa" 
              defaultValue={editingCert?.tanggal_kadaluarsa || ""} 
              placeholder="e.g. October 2026" 
              icon={Calendar}
            />
          </div>

          <Input 
            label="Score / Grade / ID (Optional)" 
            name="skor" 
            defaultValue={editingCert?.skor || ""} 
            placeholder="e.g. 945/1000 or Grade A" 
            icon={Star}
          />

          <MediaUpload 
            label="Certificate File / Image" 
            name="media_url" 
            defaultValue={editingCert?.media_url} 
            accept="image/*,application/pdf"
            multiple={true}
            icon={ExternalLink}
          />

          <div className="flex justify-end gap-3 mt-8">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" className="!bg-emerald-500/20 !text-emerald-400 !border-emerald-500/50 hover:!bg-emerald-500/30" isLoading={isPending}>
              {editingCert ? "Save Changes" : "Create Certification"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.type === 'delete' ? "Delete Certification" : "Save Changes"}
        message={confirmState.type === 'delete' 
          ? "Are you sure you want to delete this certification? This action cannot be undone." 
          : "Are you sure you want to save these certification changes?"}
        variant={confirmState.type === 'delete' ? 'danger' : 'primary'}
        confirmText={confirmState.type === 'delete' ? "Yes, Delete" : "Save"}
        onConfirm={() => {
          setConfirmState(prev => ({ ...prev, isOpen: false }));
          if (confirmState.action) confirmState.action();
        }}
        onCancel={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
