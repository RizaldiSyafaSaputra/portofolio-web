"use server";

import { createClient } from "@/lib/supabase/server";
import type { SosmedInsert, SosmedUpdate } from "@/lib/types/database";

/**
 * Get all sosmed entries
 */
export async function getSosmeds() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sosmed")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Create a new sosmed entry
 */
export async function createSosmed(sosmed: SosmedInsert) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("sosmed")
    .insert({ ...sosmed, id: user.id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update a sosmed entry
 */
export async function updateSosmed(
  id_sosmed: string,
  updates: SosmedUpdate
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sosmed")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id_sosmed", id_sosmed)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a sosmed entry
 */
export async function deleteSosmed(id_sosmed: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("sosmed")
    .delete()
    .eq("id_sosmed", id_sosmed);

  if (error) throw error;
}
