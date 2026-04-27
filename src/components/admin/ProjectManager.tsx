"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  FolderRoot, 
  Code2,
  Wrench,
  Loader2, 
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Film,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { 
  createProject, 
  deleteProject, 
  updateProject 
} from "@/lib/actions/project";
import type { Project } from "@/lib/types/database";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { MediaUpload } from "./MediaUpload";

export function ProjectManager({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
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

  const openLightbox = (item: any) => {
    setLightbox({
      isOpen: true,
      url: item.url,
      type: isVideo(item) ? 'video' : 'image'
    });
  };

  const openAddModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const requestSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isMediaUploading) return;
    
    const formData = new FormData(e.currentTarget);
    
    const projectData = {
      nama_project: formData.get("nama_project") as string,
      deskripsi: formData.get("deskripsi") as string,
      keahlian: formData.get("keahlian") as string,
      tools: formData.get("tools") as string,
      media_url: formData.get("media_url") as string || null,
    };

    setConfirmState({
      isOpen: true,
      type: 'save',
      action: () => handleSave(projectData)
    });
  };

  const handleSave = async (projectData: any) => {
    startTransition(async () => {
      try {
        if (editingProject) {
          const updated = await updateProject(editingProject.id_project, projectData);
          setProjects((prev) => 
            prev.map((p) => p.id_project === updated.id_project ? updated : p)
          );
        } else {
          const created = await createProject({ ...projectData, id: "dummy" });
          setProjects((prev) => [created, ...prev]);
        }
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to save project:", error);
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
        await deleteProject(id);
        setProjects((prev) => prev.filter((p) => p.id_project !== id));
      } catch (error) {
        console.error("Failed to delete project:", error);
        alert("Failed to delete. Please try again.");
      }
    });
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
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <FolderRoot className="w-6 h-6 text-cyan-400" />
            </div>
            Projects Portfolio
          </h2>
          <p className="text-slate-400 text-sm mt-1">Showcase your best work and technical projects.</p>
        </div>
        <Button onClick={openAddModal} variant="primary" className="shadow-lg shadow-cyan-500/20">
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-950/30 border border-dashed border-white/10 rounded-3xl p-12 text-center"
            >
              <FolderRoot className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <h3 className="text-white font-medium text-lg">No projects found</h3>
              <p className="text-slate-500 text-sm">Start by adding your first project showcase.</p>
            </motion.div>
          ) : (
            projects.map((project) => {
              const media = getMediaUrls(project.media_url);
              const currentIndex = activeMediaIndex[project.id_project] || 0;

              return (
                <motion.div
                  key={project.id_project}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative bg-neutral-950/50 border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 shadow-xl"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Media Gallery Slider */}
                    <div className="lg:w-96 h-64 lg:h-auto relative bg-black overflow-hidden shrink-0 group/slider">
                      {media.length > 0 ? (
                        <div className="relative w-full h-full">
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
                                <div className="w-full h-full relative">
                                  {media[currentIndex].url.includes('youtube.com') || media[currentIndex].url.includes('youtu.be') ? (
                                    <iframe 
                                      src={`https://www.youtube.com/embed/${media[currentIndex].url.split('v=')[1]?.split('&')[0] || media[currentIndex].url.split('/').pop()}`}
                                      className="w-full h-full pointer-events-none"
                                    />
                                  ) : (
                                    <video 
                                      src={media[currentIndex].url} 
                                      className="w-full h-full object-cover"
                                      muted
                                      playsInline
                                    />
                                  )}
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <Film className="w-10 h-10 text-white/50" />
                                  </div>
                                </div>
                              ) : (
                                <img 
                                  src={media[currentIndex].url} 
                                  alt={project.nama_project || ""} 
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover/slider:scale-110"
                                />
                              )}
                            </motion.div>
                          </AnimatePresence>

                          {media.length > 1 && (
                            <>
                              <button 
                                onClick={() => prevMedia(project.id_project, media.length)}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover/slider:opacity-100 transition-opacity z-10"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => nextMedia(project.id_project, media.length)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover/slider:opacity-100 transition-opacity z-10"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] text-white/80 font-bold z-10">
                                {currentIndex + 1} / {media.length}
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-700 gap-2">
                          <ImageIcon className="w-12 h-12 opacity-20" />
                          <span className="text-xs font-bold uppercase tracking-widest opacity-20">No Media</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 lg:p-10 relative">
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                              {project.nama_project}
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.keahlian?.split(",").map((s, i) => (
                                <span key={i} className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-md text-[10px] font-bold uppercase tracking-wider border border-cyan-500/20">
                                  {s.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => openEditModal(project)}
                              className="p-3 bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 rounded-2xl transition-all duration-300 border border-white/5 hover:border-cyan-500/30"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => requestDelete(project.id_project)}
                              className="p-3 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-2xl transition-all duration-300 border border-white/5 hover:border-red-500/30"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8 italic">
                          "{project.deskripsi}"
                        </p>

                        <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Wrench className="w-4 h-4 text-cyan-500" />
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              {project.tools || "No tools specified"}
                            </span>
                          </div>
                        </div>
                      </div>
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
        title="Project Preview"
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
            <img src={lightbox.url} className="w-full h-full object-contain" alt="Project Preview" />
          )}
        </div>
        <div className="flex justify-center mt-4">
          <a href={lightbox.url} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
            <ExternalLink className="w-3 h-3" /> View Original Source
          </a>
        </div>
      </Modal>

      {/* CRUD Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? "Edit Project" : "Add New Project"}
        size="xl"
      >
        <form onSubmit={requestSave} className="space-y-6">
          <Input 
            label="Project Name" 
            name="nama_project" 
            defaultValue={editingProject?.nama_project || ""} 
            required 
            placeholder="e.g. E-Commerce Platform"
          />
          
          <Textarea 
            label="Project Description" 
            name="deskripsi" 
            defaultValue={editingProject?.deskripsi || ""} 
            required 
            placeholder="Describe the goals and impact of this project..."
            rows={4}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Skills Used (Comma separated)" 
              name="keahlian" 
              defaultValue={editingProject?.keahlian || ""} 
              placeholder="e.g. React, Node.js, Supabase"
            />
            <Input 
              label="Tools (Comma separated)" 
              name="tools" 
              defaultValue={editingProject?.tools || ""} 
              placeholder="e.g. VS Code, Docker, Figma"
            />
          </div>

          <MediaUpload 
            label="Project Media (Images or Videos)" 
            name="media_url" 
            defaultValue={editingProject?.media_url}
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
              {isMediaUploading ? "Uploading Media..." : "Save Project"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.type === 'delete' ? "Delete Project" : "Confirm Changes"}
        message={confirmState.type === 'delete' 
          ? "Are you sure you want to delete this project? This action is permanent." 
          : "Are you sure you want to save these changes to your project showcase?"}
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
