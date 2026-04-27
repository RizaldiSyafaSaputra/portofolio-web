"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, Code, Loader2 } from "lucide-react";
import { createSkill, deleteSkill, updateSkill } from "@/lib/actions/skills";
import type { Skill } from "@/lib/types/database";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export function SkillsManager({ initialSkills }: { initialSkills: Skill[] }) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [confirmState, setConfirmState] = useState<{ isOpen: boolean, action: (() => void) | null, type: 'save' | 'delete' }>({ isOpen: false, action: null, type: 'save' });

  const openAddModal = () => {
    setEditingSkill(null);
    setIsModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const requestSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const skillData = {
      jenis_keahlian: formData.get("jenis_keahlian") as any,
      nama_keahlian: formData.get("nama_keahlian") as string,
      level_keahlian: formData.get("level_keahlian") as any,
    };

    setConfirmState({
      isOpen: true,
      type: 'save',
      action: () => handleSave(skillData)
    });
  };

  const handleSave = async (skillData: any) => {
    startTransition(async () => {
      try {
        if (editingSkill) {
          const updated = await updateSkill(editingSkill.id_skills, skillData);
          setSkills((prev) => prev.map((s) => s.id_skills === updated.id_skills ? updated : s));
        } else {
          const created = await createSkill({ ...skillData, id: "dummy" });
          setSkills((prev) => [...prev, created]);
        }
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to save skill:", error);
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
        await deleteSkill(id);
        setSkills((prev) => prev.filter((s) => s.id_skills !== id));
      } catch (error) {
        console.error("Failed to delete skill:", error);
        alert("Failed to delete. Please try again.");
      }
    });
  };

  return (
    <div className="relative bg-neutral-950/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mt-8 transition-all duration-500 hover:border-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/5 group/manager">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 transition-all duration-700 group-hover/manager:bg-cyan-500/10 pointer-events-none" />
      
      <div className="relative z-10 flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Code className="w-5 h-5 text-cyan-400" /> Skills Management
        </h3>
        <Button onClick={openAddModal} variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add Skill
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {skills.map((skill) => (
            <motion.div
              key={skill.id_skills}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center justify-between bg-black/50 border border-white/5 p-4 rounded-xl group"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {skill.jenis_keahlian}
                </span>
                <span className="text-white font-bold">{skill.nama_keahlian}</span>
                <span className="text-xs text-cyan-500 font-semibold">{skill.level_keahlian}</span>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEditModal(skill)} disabled={isPending} className="p-2 text-slate-400 hover:text-cyan-400 bg-neutral-900/50 hover:bg-cyan-500/10 rounded-lg transition-all">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => requestDelete(skill.id_skills)} disabled={isPending} className="p-2 text-slate-400 hover:text-red-400 bg-neutral-900/50 hover:bg-red-500/10 rounded-lg transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSkill ? "Edit Skill" : "Add New Skill"}>
        <form onSubmit={requestSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Skill Category</label>
            <select name="jenis_keahlian" defaultValue={editingSkill?.jenis_keahlian || "Hard Skills"} required className="w-full bg-neutral-950/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all">
              <option value="Hard Skills">Hard Skills</option>
              <option value="Soft Skills">Soft Skills</option>
              <option value="Langguange Skills">Language Skills</option>
            </select>
          </div>
          
          <Input label="Skill Name" name="nama_keahlian" defaultValue={editingSkill?.nama_keahlian || ""} placeholder="e.g. React.js" required />
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Proficiency Level</label>
            <select name="level_keahlian" defaultValue={editingSkill?.level_keahlian || "Begginer"} required className="w-full bg-neutral-950/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all">
              <option value="Begginer">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" isLoading={isPending}>Save Changes</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.type === 'delete' ? "Delete Skill" : "Save Changes"}
        message={confirmState.type === 'delete' 
          ? "Are you sure you want to delete this skill? This action cannot be undone." 
          : "Are you sure you want to save these skill changes?"}
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
