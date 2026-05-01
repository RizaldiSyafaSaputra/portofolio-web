'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export async function logActivity(eventName: string, properties: any = {}) {
  try {
    const supabase = await createClient()
    const headerList = await headers()
    
    const ip = headerList.get('x-forwarded-for') || 'unknown'
    const userAgent = headerList.get('user-agent') || 'unknown'

    const { error } = await supabase.from('activity_logs').insert({
      event_name: eventName,
      properties,
      ip_address: ip,
      user_agent: userAgent
    })

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Failed to log activity:', error)
    return { success: false, error }
  }
}
