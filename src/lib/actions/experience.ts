"use server";

import { createClient } from "@/lib/supabase/server";
import type {
  ExperienceInsert,
  ExperienceUpdate,
} from "@/lib/types/database";

/**
 * Get all experiences
 */
export async function getExperiences() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("tanggal_masuk", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Get a single experience by id
 */
export async function getExperienceById(id_experience: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .eq("id_experience", id_experience)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Create a new experience
 */
export async function createExperience(exp: ExperienceInsert) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("experience")
    .insert({ ...exp, id: user.id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update an experience
 */
export async function updateExperience(
  id_experience: string,
  updates: ExperienceUpdate
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experience")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id_experience", id_experience)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete an experience
 */
export async function deleteExperience(id_experience: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("experience")
    .delete()
    .eq("id_experience", id_experience);

  if (error) throw error;
}
