'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Download, MousePointer2, Settings, User, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ActivityLog {
  id: string
  event_name: string
  properties: any
  created_at: string
}

export function ActivityTimeline() {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 10
  const supabase = createClient()

  const fetchLogs = async (pageNum: number, isInitial = false) => {
    setLoading(true)
    const { data, count } = await supabase
      .from('activity_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1)
    
    if (data) {
      if (isInitial) {
        setLogs(data)
      } else {
        setLogs((prev) => [...prev, ...data])
      }
      if (data.length < PAGE_SIZE) setHasMore(false)
    }
    if (count !== null) setTotalCount(count)
    setLoading(false)
  }

  useEffect(() => {
    fetchLogs(0, true)

    // Subscribe to realtime updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activity_logs',
        },
        (payload) => {
          setLogs((prev) => [payload.new as ActivityLog, ...prev])
          setTotalCount((prev) => prev + 1)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchLogs(nextPage)
  }

  const getEventIcon = (name: string) => {
    switch (name) {
      case 'power_mode_toggle': return <Zap className="w-4 h-4 text-cyan-400" />
      case 'cv_download': return <Download className="w-4 h-4 text-emerald-400" />
      case 'external_link_click': return <MousePointer2 className="w-4 h-4 text-blue-400" />
      case 'admin_action': return <Settings className="w-4 h-4 text-purple-400" />
      default: return <User className="w-4 h-4 text-slate-400" />
    }
  }

  const getEventLabel = (log: ActivityLog) => {
    const name = log.event_name
    const props = log.properties

    switch (name) {
      case 'power_mode_toggle': 
        return `Switched to ${props.mode} mode`
      case 'cv_download': 
        return 'Downloaded Curriculum Vitae'
      case 'external_link_click': 
        return `Clicked ${props.link || 'external link'}`
      case 'admin_action': 
        return props.action || 'Performed admin action'
      default: 
        return name.replace(/_/g, ' ')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" /> Live Activity Feed
          </h3>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">
            Total Captured Events: <span className="text-cyan-400">{totalCount}</span>
          </p>
        </div>
        <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Real-time
        </span>
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-900/50 border border-white/5 rounded-xl p-3">
          <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Most Active</p>
          <p className="text-sm font-bold text-white truncate">
            {logs.length > 0 ? logs[0].event_name.replace(/_/g, ' ') : '---'}
          </p>
        </div>
        <div className="bg-neutral-900/50 border border-white/5 rounded-xl p-3">
          <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Last Visitor</p>
          <p className="text-sm font-bold text-white truncate">
            {logs.length > 0 ? logs[0].ip_address?.split(',')[0] || 'Unknown' : '---'}
          </p>
        </div>
      </div>

      <div className="relative space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
        {/* Timeline Line */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/50 via-slate-800 to-transparent" />

        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative pl-10 group mb-4"
            >
              <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center z-10 group-hover:border-cyan-500/50 transition-colors duration-300">
                {getEventIcon(log.event_name)}
              </div>

              <div className="bg-neutral-950/50 border border-white/5 rounded-2xl p-4 transition-all duration-300 group-hover:bg-neutral-900/80 group-hover:border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-medium text-slate-200 capitalize">
                    {getEventLabel(log)}
                  </p>
                  <span className="text-[10px] text-slate-500 whitespace-nowrap mt-1">
                    {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                  </span>
                </div>
                {log.properties && Object.keys(log.properties).length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(log.properties).map(([key, value]) => (
                      <span key={key} className="text-[9px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">
                        {key}: <span className="text-slate-300">{String(value)}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {hasMore && (
          <div className="pt-4 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors py-2 px-4 rounded-full border border-white/5 bg-white/5 disabled:opacity-50"
            >
              {loading ? 'Scanning Databases...' : 'Load Older Activity'}
            </button>
          </div>
        )}

        {logs.length === 0 && !loading && (
          <div className="py-12 text-center text-slate-500 italic text-sm">
            Waiting for incoming activity...
          </div>
        )}
      </div>
    </div>
  )
}
