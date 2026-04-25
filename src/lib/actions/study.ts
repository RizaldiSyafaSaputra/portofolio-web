"use server";

import { createClient } from "@/lib/supabase/server";
import type { StudyInsert, StudyUpdate } from "@/lib/types/database";

/**
 * Get all study entries
 */
export async function getStudies() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("study")
    .select("*")
    .order("tanggal_masuk", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Create a new study entry
 */
export async function createStudy(study: StudyInsert) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("study")
    .insert({ ...study, id: user.id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update a study entry
 */
export async function updateStudy(
  id_study: string,
  updates: StudyUpdate
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("study")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id_study", id_study)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a study entry
 */
export async function deleteStudy(id_study: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("study")
    .delete()
    .eq("id_study", id_study);

  if (error) throw error;
}
