import { createClient } from "@/lib/supabase/server";
import { StatsCard } from "@/components/admin/StatsCard";
import { Briefcase, Code2, Award, FileText } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch counts in parallel
  const [
    { count: projectsCount },
    { count: experienceCount },
    { count: certificationsCount },
    { count: skillsCount }
  ] = await Promise.all([
    supabase.from('project').select('*', { count: 'exact', head: true }),
    supabase.from('experience').select('*', { count: 'exact', head: true }),
    supabase.from('certified').select('*', { count: 'exact', head: true }),
    supabase.from('skills').select('*', { count: 'exact', head: true })
  ]);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-white/5 p-8 md:p-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Administrator</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">
            Here's what's happening with your portfolio today. Manage your projects, update your experience, and keep your professional presence polished.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Projects" 
          value={projectsCount || 0} 
          icon={<Briefcase className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />} 
          trend="12%" 
          trendUp={true} 
          delay={0.1} 
        />
        <StatsCard 
          title="Experiences" 
          value={experienceCount || 0} 
          icon={<Code2 className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />} 
          trend="New" 
          trendUp={true} 
          delay={0.2} 
        />
        <StatsCard 
          title="Certifications" 
          value={certificationsCount || 0} 
          icon={<Award className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />} 
          delay={0.3} 
        />
        <StatsCard 
          title="Total Skills" 
          value={skillsCount || 0} 
          icon={<FileText className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />} 
          trend="Updated" 
          trendUp={true} 
          delay={0.4} 
        />
      </div>
      
      {/* Quick Actions / Recent Activity placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <p>Activity logs will appear here</p>
          </div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <h3 className="text-lg font-bold text-white mb-6">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-white/5">
              <span className="text-sm font-semibold text-slate-400">Database</span>
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
              </span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-white/5">
              <span className="text-sm font-semibold text-slate-400">Storage</span>
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
              </span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-white/5">
              <span className="text-sm font-semibold text-slate-400">API</span>
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Healthy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
