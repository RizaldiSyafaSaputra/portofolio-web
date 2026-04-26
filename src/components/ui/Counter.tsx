'use client'

import { useState, useEffect } from 'react'
import { motion, useSpring, useTransform, animate } from 'framer-motion'

interface CounterProps {
  value: number
  suffix?: string
  label: string
  delay?: number
}

export function Counter({ value, suffix = '', label, delay = 0 }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 0.8,
      delay: delay,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.floor(latest))
    })
    return () => controls.stop()
  }, [value, delay])

  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="text-4xl md:text-5xl font-black text-white flex items-baseline gap-1">
        <span>{displayValue}</span>
        <span className="text-cyan-500 text-2xl md:text-3xl">{suffix}</span>
      </div>
      <p className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
        {label}
      </p>
    </div>
  )
}
