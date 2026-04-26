"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, Link as LinkIcon, Loader2 } from "lucide-react";
import { createSosmed, deleteSosmed, updateSosmed } from "@/lib/actions/sosmed";
import type { Sosmed } from "@/lib/types/database";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export function SosmedManager({ initialSosmed }: { initialSosmed: Sosmed[] }) {
  const [sosmeds, setSosmeds] = useState<Sosmed[]>(initialSosmed);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSosmed, setEditingSosmed] = useState<Sosmed | null>(null);
  const [confirmState, setConfirmState] = useState<{ isOpen: boolean, action: (() => void) | null, type: 'save' | 'delete' }>({ isOpen: false, action: null, type: 'save' });

  const openAddModal = () => {
    setEditingSosmed(null);
    setIsModalOpen(true);
  };

  const openEditModal = (sosmed: Sosmed) => {
    setEditingSosmed(sosmed);
    setIsModalOpen(true);
  };

  const requestSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const sosmedData = {
      nama_sosmed: formData.get("nama_sosmed") as string,
      url_sosmed: formData.get("url_sosmed") as string,
    };

    setConfirmState({
      isOpen: true,
      type: 'save',
      action: () => handleSave(sosmedData)
    });
  };

  const handleSave = async (sosmedData: any) => {
    startTransition(async () => {
      try {
        if (editingSosmed) {
          const updated = await updateSosmed(editingSosmed.id_sosmed, sosmedData);
          setSosmeds((prev) => prev.map((s) => s.id_sosmed === updated.id_sosmed ? updated : s));
        } else {
          const created = await createSosmed({ ...sosmedData, id: "dummy" });
          setSosmeds((prev) => [...prev, created]);
        }
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to save social link:", error);
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
        await deleteSosmed(id);
        setSosmeds((prev) => prev.filter((s) => s.id_sosmed !== id));
      } catch (error) {
        console.error("Failed to delete social link:", error);
        alert("Failed to delete. Please try again.");
      }
    });
  };

  return (
    <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mt-8 transition-all duration-500 hover:border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/5 group/manager">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 transition-all duration-700 group-hover/manager:bg-blue-500/10 pointer-events-none" />
      
      <div className="relative z-10 flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-blue-400" /> Social Links
        </h3>
        <Button onClick={openAddModal} variant="primary" size="sm" className="!bg-blue-500/20 !text-blue-400 !border-blue-500/50 hover:!bg-blue-500/30 hover:!shadow-[0_0_15px_rgba(59,130,246,0.4)]">
          <Plus className="w-4 h-4 mr-2" /> Add Link
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {sosmeds.map((sosmed) => (
            <motion.div
              key={sosmed.id_sosmed}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center justify-between bg-slate-950/50 border border-white/5 p-5 rounded-xl group"
            >
              <div className="overflow-hidden mr-4">
                <h4 className="text-white font-bold text-sm mb-1">{sosmed.nama_sosmed}</h4>
                <a href={sosmed.url_sosmed || "#"} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline truncate block w-full">
                  {sosmed.url_sosmed}
                </a>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button onClick={() => openEditModal(sosmed)} disabled={isPending} className="p-2 text-slate-400 hover:text-blue-400 bg-slate-800/50 hover:bg-blue-500/10 rounded-lg transition-all">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => requestDelete(sosmed.id_sosmed)} disabled={isPending} className="p-2 text-slate-400 hover:text-red-400 bg-slate-800/50 hover:bg-red-500/10 rounded-lg transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSosmed ? "Edit Social Link" : "Add Social Link"}>
        <form onSubmit={requestSave} className="space-y-6">
          <Input label="Platform Name" name="nama_sosmed" defaultValue={editingSosmed?.nama_sosmed || ""} placeholder="e.g. LinkedIn, GitHub" required />
          <Input label="URL Link" name="url_sosmed" type="url" defaultValue={editingSosmed?.url_sosmed || ""} placeholder="https://..." required />

          <div className="flex justify-end gap-3 mt-8">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" className="!bg-blue-500/20 !text-blue-400 !border-blue-500/50 hover:!bg-blue-500/30" isLoading={isPending}>Save Changes</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.type === 'delete' ? "Delete Link" : "Save Changes"}
        message={confirmState.type === 'delete' 
          ? "Are you sure you want to delete this social link? This action cannot be undone." 
          : "Are you sure you want to save these social link changes?"}
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
