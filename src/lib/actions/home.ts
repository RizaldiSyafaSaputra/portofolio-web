'use server'

import { createClient } from '@/lib/supabase/server'
/**
 * Get global stats for projects, experience, and certificates
 */
export async function getGlobalStats() {
  const supabase = await createClient()
  
  const [
    { count: projectsCount },
    { count: experienceCount },
    { count: certificateCount }
  ] = await Promise.all([
    supabase.from('project').select('*', { count: 'exact', head: true }),
    supabase.from('experience').select('*', { count: 'exact', head: true }),
    supabase.from('certified').select('*', { count: 'exact', head: true })
  ])

  return {
    projects: projectsCount || 0,
    experience: experienceCount || 0,
    certificates: certificateCount || 0
  }
}

/**
 * Get profile and studies for the home page
 */
export async function getProfileForHome() {
  const supabase = await createClient()
  const { data: profile } = await supabase.from('profiles').select('*').single()
  const { data: study } = await supabase.from('study').select('*').order('tanggal_selesai', { ascending: false })
  
  return {
    profile,
    studies: study || []
  }
}
