"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";

export function AdminHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simple breadcrumb logic
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentPage = pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : "Dashboard";
  const formattedPage = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled 
        ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4" 
        : "bg-transparent py-6"
    }`}>
      <div className="flex items-center justify-between px-8">
        {/* Page Title & Breadcrumbs */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-neutral-950 border border-white/5">
            <LayoutDashboard className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{formattedPage}</h2>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 mt-1">
              <span>Admin</span>
              <span className="text-slate-700">/</span>
              <span className="text-cyan-500">{formattedPage}</span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {/* Search Placeholder */}
          <div className="hidden lg:flex items-center relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Quick search..." 
              className="bg-neutral-950/50 border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all w-64"
            />
          </div>

          <div className="h-6 w-px bg-white/10 hidden md:block" />

          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 border-2 border-slate-950" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-white">Administrator</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-cyan-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center p-[2px]">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-sm font-bold text-white">
                  AD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
