"use server";

import { createClient } from "@/lib/supabase/server";
import type { SkillInsert, SkillUpdate } from "@/lib/types/database";

/**
 * Get all skills
 */
export async function getSkills() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("jenis_keahlian", { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Create a new skill
 */
export async function createSkill(skill: SkillInsert) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("skills")
    .insert({ ...skill, id: user.id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update a skill
 */
export async function updateSkill(
  id_skills: string,
  updates: SkillUpdate
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id_skills", id_skills)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a skill
 */
export async function deleteSkill(id_skills: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("skills")
    .delete()
    .eq("id_skills", id_skills);

  if (error) throw error;
}
