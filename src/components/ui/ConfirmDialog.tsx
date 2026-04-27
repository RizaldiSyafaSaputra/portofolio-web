"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "primary";
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Yes, Continue",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "primary"
}: ConfirmDialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm bg-neutral-950 border border-white/10 rounded-3xl shadow-2xl z-[110] overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none ${variant === 'danger' ? 'bg-red-500/20' : 'bg-cyan-500/20'}`} />
            
            <div className="p-6 relative z-10 flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${variant === 'danger' ? 'bg-red-500/10 text-red-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400 mb-6">{message}</p>
              
              <div className="flex gap-3 w-full">
                <Button variant="ghost" onClick={onCancel} className="flex-1 border border-white/5">
                  {cancelText}
                </Button>
                <Button variant={variant} onClick={onConfirm} className="flex-1">
                  {confirmText}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
