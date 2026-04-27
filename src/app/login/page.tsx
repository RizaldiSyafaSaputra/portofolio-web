'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowRight, ShieldAlert, Cpu } from 'lucide-react'
import { login } from '@/lib/actions/auth'
import Link from 'next/link'

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const res = await login(formData)
      if (res?.error) {
        setError(res.error)
      }
    })
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -30, 30, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur opacity-30 animate-pulse" />
        
        <div className="relative bg-neutral-950/80 backdrop-blur-xl ring-1 ring-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-10">
            <motion.div 
              className="mx-auto w-16 h-16 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Cpu className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Secure Access</h1>
            <p className="text-sm text-slate-400">Authenticate to enter the control panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3"
              >
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-200 leading-relaxed">{error}</p>
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-black/50 border border-slate-800 text-white placeholder-slate-500 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  className="w-full bg-black/50 border border-slate-800 text-white placeholder-slate-500 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl py-4 overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10 flex items-center gap-2">
                {isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>
                    Initialize Connection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" /> Return to Public Grid
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
