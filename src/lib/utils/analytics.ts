import { track } from '@vercel/analytics'
import { logActivity } from '@/lib/actions/analytics'

export const trackEvent = async (eventName: string, properties?: Record<string, string | number | boolean>) => {
  try {
    // 1. Track to Vercel
    track(eventName, properties)
    
    // 2. Track to Supabase for Real-time Admin Dashboard
    await logActivity(eventName, properties)

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Tracked Event: ${eventName}`, properties)
    }
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error)
  }
}

export const ANALYTICS_EVENTS = {
  POWER_MODE_TOGGLE: 'power_mode_toggle',
  CV_DOWNLOAD: 'cv_download',
  PROJECT_VIEW: 'project_view',
  EXTERNAL_LINK_CLICK: 'external_link_click',
  ADMIN_ACTION: 'admin_action',
}
