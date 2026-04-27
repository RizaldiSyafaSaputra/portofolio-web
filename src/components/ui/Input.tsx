"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, icon: Icon, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            {Icon && <Icon className="w-3.5 h-3.5 text-cyan-500" />} {label}
          </label>
        )}
        <div className="relative group">
          <input
            ref={ref}
            className={`w-full bg-neutral-950/50 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all hover:bg-neutral-950/80 ${className}`}
            {...props}
          />
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";
