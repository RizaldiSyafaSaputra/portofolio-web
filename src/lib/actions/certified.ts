"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { CertifiedInsert, CertifiedUpdate } from "@/lib/types/database";

/**
 * Get all certifications
 */
export async function getCertifications() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certified")
    .select("*")
    .order("tanggal_penerbitan", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Get a single certification by id
 */
export async function getCertificationById(id_certified: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certified")
    .select("*")
    .eq("id_certified", id_certified)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Create a new certification
 */
export async function createCertification(cert: CertifiedInsert) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("certified")
    .insert({ ...cert, id: user.id })
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/");
  return data;
}

/**
 * Update a certification
 */
export async function updateCertification(
  id_certified: string,
  updates: CertifiedUpdate
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certified")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id_certified", id_certified)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/");
  return data;
}

/**
 * Delete a certification
 */
export async function deleteCertification(id_certified: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("certified")
    .delete()
    .eq("id_certified", id_certified);

  if (error) throw error;
  revalidatePath("/");
}
