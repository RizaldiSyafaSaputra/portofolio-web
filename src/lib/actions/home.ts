'use server'

import { createClient } from '@/lib/supabase/server'
import { unstable_cache } from 'next/cache'

/**
 * Get global stats for projects, experience, and certificates
 * Cached for 1 hour
 */
export const getGlobalStats = unstable_cache(
  async () => {
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
  },
  ['global-stats'],
  { revalidate: 3600, tags: ['stats'] }
)

/**
 * Get profile and studies for the home page
 * Cached for 1 hour
 */
export const getProfileForHome = unstable_cache(
  async () => {
    const supabase = await createClient()
    const { data: profile } = await supabase.from('profiles').select('*').single()
    const { data: study } = await supabase.from('study').select('*').order('tanggal_selesai', { ascending: false })
    
    return {
      profile,
      studies: study || []
    }
  },
  ['profile-home'],
  { revalidate: 3600, tags: ['profile', 'study'] }
)
