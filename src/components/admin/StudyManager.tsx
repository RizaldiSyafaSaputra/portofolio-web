"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, GraduationCap, Loader2 } from "lucide-react";
import { createStudy, deleteStudy, updateStudy } from "@/lib/actions/study";
import type { Study } from "@/lib/types/database";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Textarea } from "@/components/ui/Textarea";

export function StudyManager({ initialStudy }: { initialStudy: Study[] }) {
  const [studies, setStudies] = useState<Study[]>(initialStudy);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState<Study | null>(null);
  const [confirmState, setConfirmState] = useState<{ isOpen: boolean, action: (() => void) | null, type: 'save' | 'delete' }>({ isOpen: false, action: null, type: 'save' });

  const openAddModal = () => {
    setEditingStudy(null);
    setIsModalOpen(true);
  };

  const openEditModal = (study: Study) => {
    setEditingStudy(study);
    setIsModalOpen(true);
  };

  const requestSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const studyData = {
      nama_sekolah: formData.get("nama_sekolah") as string,
      fakultas: formData.get("fakultas") as string,
      jurusan: formData.get("jurusan") as string,
      nilai: formData.get("nilai") as string,
      deskripsi: formData.get("deskripsi") as string,
      tanggal_masuk: formData.get("tanggal_masuk") as string,
      tanggal_selesai: formData.get("tanggal_selesai") as string,
    };

    setConfirmState({
      isOpen: true,
      type: 'save',
      action: () => handleSave(studyData)
    });
  };

  const handleSave = async (studyData: any) => {
    startTransition(async () => {
      try {
        if (editingStudy) {
          const updated = await updateStudy(editingStudy.id_study, studyData);
          setStudies((prev) => prev.map((s) => s.id_study === updated.id_study ? updated : s));
        } else {
          const created = await createStudy({ ...studyData, id: "dummy" });
          setStudies((prev) => [created, ...prev]);
        }
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to save study:", error);
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
        await deleteStudy(id);
        setStudies((prev) => prev.filter((s) => s.id_study !== id));
      } catch (error) {
        console.error("Failed to delete study:", error);
        alert("Failed to delete. Please try again.");
      }
    });
  };

  return (
    <div className="relative bg-neutral-950/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mt-8 transition-all duration-500 hover:border-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/5 group/manager">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 transition-all duration-700 group-hover/manager:bg-purple-500/10 pointer-events-none" />
      
      <div className="relative z-10 flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-purple-400" /> Education History
        </h3>
        <Button onClick={openAddModal} variant="primary" size="sm" className="!bg-purple-500/20 !text-purple-400 !border-purple-500/50 hover:!bg-purple-500/30 hover:!shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          <Plus className="w-4 h-4 mr-2" /> Add Education
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {studies.map((study) => (
            <motion.div
              key={study.id_study}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="flex items-center justify-between bg-black/50 border border-white/5 p-5 rounded-xl group"
            >
              <div className="flex-1 mr-4">
                <h4 className="text-white font-bold text-lg">{study.nama_sekolah}</h4>
                <p className="text-sm text-slate-400 font-medium mt-1">
                  {study.jurusan} {study.fakultas && <span className="opacity-60">• {study.fakultas}</span>}
                  {study.nilai && <span className="text-purple-400 ml-2 font-bold bg-purple-500/10 px-2 py-0.5 rounded-md">IPK: {study.nilai}</span>}
                </p>
                {study.deskripsi && <p className="text-xs text-slate-500 mt-2 line-clamp-1">{study.deskripsi}</p>}
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">
                  {study.tanggal_masuk} - {study.tanggal_selesai}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(study)} disabled={isPending} className="p-2 text-slate-400 hover:text-purple-400 bg-neutral-900/50 hover:bg-purple-500/10 rounded-lg transition-all">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => requestDelete(study.id_study)} disabled={isPending} className="p-2 text-slate-400 hover:text-red-400 bg-neutral-900/50 hover:bg-red-500/10 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingStudy ? "Edit Education" : "Add Education"}>
        <form onSubmit={requestSave} className="space-y-6">
          <Input label="Institution Name" name="nama_sekolah" defaultValue={editingStudy?.nama_sekolah || ""} placeholder="e.g. Universitas Indonesia" required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Major / Study Program" name="jurusan" defaultValue={editingStudy?.jurusan || ""} placeholder="e.g. Computer Science" required />
            <Input label="IPK / Score (Optional)" name="nilai" defaultValue={editingStudy?.nilai || ""} placeholder="e.g. 3.85" />
          </div>
          <Input label="Faculty (Optional)" name="fakultas" defaultValue={editingStudy?.fakultas || ""} placeholder="e.g. Fasilkom" />
          
          <Textarea 
            label="Description / Achievements" 
            name="deskripsi" 
            defaultValue={editingStudy?.deskripsi || ""} 
            placeholder="Describe your study or achievements..."
            rows={3}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Year" name="tanggal_masuk" defaultValue={editingStudy?.tanggal_masuk || ""} placeholder="e.g. 2018" required />
            <Input label="End Year" name="tanggal_selesai" defaultValue={editingStudy?.tanggal_selesai || ""} placeholder="e.g. 2022 or Present" required />
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" className="!bg-purple-500/20 !text-purple-400 !border-purple-500/50 hover:!bg-purple-500/30" isLoading={isPending}>Save Changes</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.type === 'delete' ? "Delete Education" : "Save Changes"}
        message={confirmState.type === 'delete' 
          ? "Are you sure you want to delete this education history? This action cannot be undone." 
          : "Are you sure you want to save these education changes?"}
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
