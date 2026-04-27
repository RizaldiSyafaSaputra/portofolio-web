"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  UserCircle, 
  Briefcase, 
  Award, 
  Code2, 
  GraduationCap, 
  LogOut,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { logout } from "@/lib/actions/auth";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Profiles", href: "/admin/profiles", icon: UserCircle },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Pengalaman", href: "/admin/pengalaman", icon: Code2 },
  { name: "Sertifikasi", href: "/admin/sertifikasi", icon: Award },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <aside className="fixed left-0 top-0 w-72 h-screen bg-black/80 backdrop-blur-2xl border-r border-white/5 flex flex-col z-50">
        {/* Logo Area */}
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold tracking-widest uppercase text-sm">Control Panel</h1>
            <p className="text-cyan-400 text-[10px] uppercase tracking-widest font-bold">Admin Workspace</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
            const Icon = item.icon;

            return (
              <Link key={item.name} href={item.href}>
                <div className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                  {isActive && (
                    <motion.div 
                      layoutId="active-sidebar-bg"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <Icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`} />
                  <span className="font-semibold text-sm relative z-10">{item.name}</span>
                  
                  {isActive && (
                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-6 mt-auto">
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Sign Out"
        message="Are you sure you want to exit the admin panel? You will need to log in again to access these settings."
        confirmText="Yes, Sign Out"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
}
