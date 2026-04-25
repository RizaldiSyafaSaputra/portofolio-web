"use server";

import { createClient } from "@/lib/supabase/server";
import type { ProjectInsert, ProjectUpdate } from "@/lib/types/database";

/**
 * Get all projects
 */
export async function getProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Get a single project by id
 */
export async function getProjectById(id_project: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project")
    .select("*")
    .eq("id_project", id_project)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Create a new project
 */
export async function createProject(project: ProjectInsert) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("project")
    .insert({ ...project, id: user.id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update a project
 */
export async function updateProject(
  id_project: string,
  updates: ProjectUpdate
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id_project", id_project)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a project
 */
export async function deleteProject(id_project: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("project")
    .delete()
    .eq("id_project", id_project);

  if (error) throw error;
}
