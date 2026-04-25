"use server";

import { createClient } from "@/lib/supabase/server";
import type { ProfileUpdate } from "@/lib/types/database";

// ============================================
// PROFILES
// ============================================

/**
 * Get profile data (single row)
 */
export async function getProfile() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update profile data
 */
export async function updateProfile(updates: ProfileUpdate) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
