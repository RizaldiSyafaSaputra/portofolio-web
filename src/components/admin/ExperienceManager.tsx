"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Loader2, 
  ExternalLink,
  Code2,
  FileText,
  Image as ImageIcon,
  Film,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { 
  createExperience, 
  deleteExperience, 
  updateExperience 
} from "@/lib/actions/experience";
import type { Experience } from "@/lib/types/database";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { MediaUpload } from "./MediaUpload";

export function ExperienceManager({ initialExperiences }: { initialExperiences: Experience[] }) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [confirmState, setConfirmState] = useState<{ 
    isOpen: boolean, 
    action: (() => void) | null, 
    type: 'save' | 'delete' 
  }>({ isOpen: false, action: null, type: 'save' });

  const [isMediaUploading, setIsMediaUploading] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState<{ [key: string]: number }>({});
  const [lightbox, setLightbox] = useState<{ isOpen: boolean, url: string, type: 'image' | 'video' }>({ isOpen: false, url: "", type: 'image' });

  const nextMedia = (id: string, total: number) => {
    setActiveMediaIndex(prev => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % total
    }));
  };

  const prevMedia = (id: string, total: number) => {
    setActiveMediaIndex(prev => ({
      ...prev,
      [id]: ((prev[id] || 0) - 1 + total) % total
    }));
  };

  const openLightbox = (item: any) => {
    setLightbox({
      isOpen: true,
      url: item.url,
      type: isVideo(item) ? 'video' : 'image'
    });
  };

  const openAddModal = () => {
    setEditingExp(null);
    setIsModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setEditingExp(exp);
    setIsModalOpen(true);
  };

  const requestSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isMediaUploading) return;
    
    const formData = new FormData(e.currentTarget);
    
    const expData = {
      nama_perusahaan: formData.get("nama_perusahaan") as string,
      posisi: formData.get("posisi") as string,
      keahlian: formData.get("keahlian") as string,
      jenis_pekerjaan: formData.get("jenis_pekerjaan") as string,
      jenis_program: formData.get("jenis_program") as string,
      tanggal_masuk: formData.get("tanggal_masuk") as string,
      tanggal_selesai: formData.get("tanggal_selesai") as string || null,
      lokasi_perusahaan: formData.get("lokasi_perusahaan") as string,
      deskripsi: formData.get("deskripsi") as string,
      media_url: formData.get("media_url") as string || null,
    };

    setConfirmState({
      isOpen: true,
      type: 'save',
      action: () => handleSave(expData)
    });
  };

  const handleSave = async (expData: any) => {
    startTransition(async () => {
      try {
        if (editingExp) {
          const updated = await updateExperience(editingExp.id_experience, expData);
          setExperiences((prev) => 
            prev.map((e) => e.id_experience === updated.id_experience ? updated : e)
          );
        } else {
          const created = await createExperience({ ...expData, id: "dummy" });
          setExperiences((prev) => [created, ...prev]);
        }
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to save experience:", error);
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
        await deleteExperience(id);
        setExperiences((prev) => prev.filter((e) => e.id_experience !== id));
      } catch (error) {
        console.error("Failed to delete experience:", error);
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
    <div className="relative">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Briefcase className="w-6 h-6 text-indigo-400" />
            </div>
            Work Experience
          </h2>
          <p className="text-slate-400 text-sm mt-1">Manage your professional journey and achievements.</p>
        </div>
        <Button onClick={openAddModal} variant="primary" className="shadow-lg shadow-indigo-500/20">
          <Plus className="w-4 h-4 mr-2" /> Add Experience
        </Button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {experiences.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/30 border border-dashed border-white/10 rounded-3xl p-12 text-center"
            >
              <Briefcase className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <h3 className="text-white font-medium text-lg">No experience found</h3>
              <p className="text-slate-500 text-sm">Start by adding your first work experience.</p>
            </motion.div>
          ) : (
            experiences.map((exp) => {
              const media = getMediaUrls(exp.media_url);
              const currentIndex = activeMediaIndex[exp.id_experience] || 0;

              return (
                <motion.div
                  key={exp.id_experience}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 transition-all duration-500 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Media Slider */}
                    {media.length > 0 && (
                      <div className="lg:w-64 flex flex-col gap-3 shrink-0">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-white/5 group/slider">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={media[currentIndex].url}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="w-full h-full cursor-pointer"
                              onClick={() => openLightbox(media[currentIndex])}
                            >
                              {isVideo(media[currentIndex]) ? (
                                <video 
                                  src={media[currentIndex].url} 
                                  className="w-full h-full object-cover"
                                  muted
                                />
                              ) : (
                                <img 
                                  src={media[currentIndex].url} 
                                  className="w-full h-full object-cover"
                                  alt=""
                                />
                              )}
                            </motion.div>
                          </AnimatePresence>

                          {media.length > 1 && (
                            <>
                              <button 
                                onClick={(e) => { e.stopPropagation(); prevMedia(exp.id_experience, media.length); }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-indigo-600 rounded-full text-white opacity-0 group-hover/slider:opacity-100 transition-all"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); nextMedia(exp.id_experience, media.length); }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-indigo-600 rounded-full text-white opacity-0 group-hover/slider:opacity-100 transition-all"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                {media.map((_, i) => (
                                  <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-indigo-500 w-3' : 'bg-white/30'}`} />
                                ))}
                              </div>
                            </>
                          )}
                          
                          <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-black text-white border border-white/10">
                            {currentIndex + 1} / {media.length}
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter text-center">
                          {media.length} Assets Attached
                        </span>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-md border border-indigo-500/20">
                              {exp.jenis_pekerjaan}
                            </span>
                            <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-md border border-white/5">
                              {exp.jenis_program}
                            </span>
                          </div>
                          <h4 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors">
                            {exp.posisi}
                          </h4>
                          <p className="text-slate-300 font-bold flex items-center gap-2 mt-1">
                            {exp.nama_perusahaan}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          <button 
                            onClick={() => openEditModal(exp)}
                            className="p-2 text-slate-400 hover:text-indigo-400 bg-slate-800/50 hover:bg-indigo-500/10 rounded-xl transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => requestDelete(exp.id_experience)}
                            className="p-2 text-slate-400 hover:text-red-400 bg-slate-800/50 hover:bg-red-500/10 rounded-xl transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 py-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          <span>
                            {exp.tanggal_masuk} — {exp.tanggal_selesai || "Present"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <MapPin className="w-4 h-4 text-indigo-500" />
                          <span>{exp.lokasi_perusahaan}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-sm lg:col-span-1">
                          <Code2 className="w-4 h-4 text-indigo-500" />
                          <span className="truncate">{exp.keahlian}</span>
                        </div>
                      </div>

                      {exp.deskripsi && (
                        <p className="text-slate-400 text-sm mt-2 line-clamp-2 italic">
                          "{exp.deskripsi}"
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <Modal 
        isOpen={lightbox.isOpen} 
        onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
        title="Media Preview"
        size="xl"
      >
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-white/10">
          {lightbox.type === 'video' ? (
            lightbox.url.includes('youtube.com') || lightbox.url.includes('youtu.be') ? (
              <iframe 
                src={`https://www.youtube.com/embed/${lightbox.url.split('v=')[1]?.split('&')[0] || lightbox.url.split('/').pop()}`}
                className="w-full h-full"
                allowFullScreen
              />
            ) : lightbox.url.includes('drive.google.com') ? (
              <iframe 
                src={lightbox.url.replace('/view', '/preview').replace('?usp=sharing', '')}
                className="w-full h-full"
                allowFullScreen
              />
            ) : (
              <video 
                key={lightbox.url}
                src={lightbox.url} 
                controls 
                autoPlay 
                playsInline
                className="w-full h-full" 
              />
            )
          ) : (
            <img src={lightbox.url} className="w-full h-full object-contain" alt="Lightbox" />
          )}
        </div>
        <div className="flex justify-center mt-4">
          <a href={lightbox.url} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
            <ExternalLink className="w-3 h-3" /> View Original Source
          </a>
        </div>
      </Modal>

      {/* CRUD Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingExp ? "Edit Experience" : "Add New Experience"}
        size="xl"
      >
        <form onSubmit={requestSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Company Name" 
              name="nama_perusahaan" 
              defaultValue={editingExp?.nama_perusahaan || ""} 
              placeholder="e.g. Google" 
              required 
            />
            <Input 
              label="Job Position" 
              name="posisi" 
              defaultValue={editingExp?.posisi || ""} 
              placeholder="e.g. Senior Frontend Developer" 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Job Type</label>
              <select 
                name="jenis_pekerjaan" 
                defaultValue={editingExp?.jenis_pekerjaan || "Full-time"} 
                className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Program Type</label>
              <select 
                name="jenis_program" 
                defaultValue={editingExp?.jenis_program || "Employee"} 
                className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              >
                <option value="Employee">Employee</option>
                <option value="Mentorship">Mentorship</option>
                <option value="Bootcamp">Bootcamp</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              type="date" 
              label="Start Date" 
              name="tanggal_masuk" 
              defaultValue={editingExp?.tanggal_masuk || ""} 
              required 
            />
            <Input 
              type="date" 
              label="End Date (Empty if Present)" 
              name="tanggal_selesai" 
              defaultValue={editingExp?.tanggal_selesai || ""} 
            />
          </div>

          <Input 
            label="Location" 
            name="lokasi_perusahaan" 
            defaultValue={editingExp?.lokasi_perusahaan || ""} 
            placeholder="e.g. Jakarta, Indonesia" 
          />

          <Input 
            label="Key Skills" 
            name="keahlian" 
            defaultValue={editingExp?.keahlian || ""} 
            placeholder="e.g. React, Next.js, TypeScript" 
          />

          <Textarea 
            label="Job Description" 
            name="deskripsi" 
            defaultValue={editingExp?.deskripsi || ""} 
            placeholder="Describe your responsibilities and achievements..." 
            rows={4}
          />

          <MediaUpload 
            label="Gallery Media (Images or Videos)" 
            name="media_url" 
            defaultValue={editingExp?.media_url}
            accept="image/*,video/*"
            multiple={true}
            onUploadingChange={setIsMediaUploading}
          />

          <div className="flex justify-end gap-3 mt-8">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button 
              type="submit" 
              variant="primary" 
              isLoading={isPending}
              disabled={isMediaUploading}
            >
              {isMediaUploading ? "Uploading Media..." : "Save Experience"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.type === 'delete' ? "Delete Experience" : "Confirm Changes"}
        message={confirmState.type === 'delete' 
          ? "Are you sure you want to delete this experience entry? This action is permanent." 
          : "Are you sure you want to save these changes to your work history?"}
        variant={confirmState.type === 'delete' ? 'danger' : 'primary'}
        confirmText={confirmState.type === 'delete' ? "Yes, Delete" : "Save Changes"}
        onConfirm={() => {
          setConfirmState(prev => ({ ...prev, isOpen: false }));
          if (confirmState.action) confirmState.action();
        }}
        onCancel={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
