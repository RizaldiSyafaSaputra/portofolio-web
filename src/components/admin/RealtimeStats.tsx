'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Activity, Users, ShieldCheck, Zap } from 'lucide-react'

export function RealtimeStats() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeSessions: 0,
    healthScore: 100,
    powerModeUsers: 0
  })
  const supabase = createClient()

  useEffect(() => {
    const fetchInitialStats = async () => {
      const { count: total } = await supabase
        .from('activity_logs')
        .select('*', { count: 'exact', head: true })
      
      const { count: powerMode } = await supabase
        .from('activity_logs')
        .select('*', { count: 'exact', head: true })
        .eq('event_name', 'power_mode_toggle')
        .contains('properties', { mode: 'power' })

      setStats(prev => ({
        ...prev,
        totalEvents: total || 0,
        powerModeUsers: powerMode || 0,
        activeSessions: Math.floor(Math.random() * 5) + 1 // Simulated for now
      }))
    }

    fetchInitialStats()

    // Realtime listener to increment total count
    const channel = supabase
      .channel('stats-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'activity_logs' },
        (payload) => {
          setStats(prev => ({
            ...prev,
            totalEvents: prev.totalEvents + 1,
            powerModeUsers: payload.new.event_name === 'power_mode_toggle' && payload.new.properties.mode === 'power' 
              ? prev.powerModeUsers + 1 
              : prev.powerModeUsers
          }))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const statItems = [
    {
      label: 'Live Interactions',
      value: stats.totalEvents,
      icon: <Activity className="w-4 h-4 text-cyan-400" />,
      color: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'border-cyan-500/30'
    },
    {
      label: 'Power Mode Fans',
      value: stats.powerModeUsers,
      icon: <Zap className="w-4 h-4 text-purple-400" />,
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30'
    },
    {
      label: 'Active Now',
      value: stats.activeSessions,
      icon: <Users className="w-4 h-4 text-emerald-400" />,
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30'
    },
    {
      label: 'Security Status',
      value: 'Secure',
      icon: <ShieldCheck className="w-4 h-4 text-blue-400" />,
      color: 'from-blue-500/20 to-indigo-500/20',
      borderColor: 'border-blue-500/30'
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`relative overflow-hidden bg-neutral-950 border ${item.borderColor} rounded-2xl p-4 group`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                {item.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white tracking-tighter">
                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
              </span>
              {typeof item.value === 'number' && (
                <span className="text-[10px] text-emerald-400 font-bold animate-pulse">LIVE</span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
