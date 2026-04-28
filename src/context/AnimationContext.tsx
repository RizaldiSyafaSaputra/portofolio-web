"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AnimationContextType {
  isPowerMode: boolean;
  togglePowerMode: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isPowerMode, setIsPowerMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("power-mode");
    if (savedMode !== null) {
      setIsPowerMode(savedMode === "true");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("power-mode", isPowerMode.toString());
      
      // Update body class for potential CSS-based performance optimizations
      if (isPowerMode) {
        document.documentElement.classList.add("power-mode-active");
        document.documentElement.classList.remove("low-power-mode");
      } else {
        document.documentElement.classList.add("low-power-mode");
        document.documentElement.classList.remove("power-mode-active");
      }
    }
  }, [isPowerMode, mounted]);

  const togglePowerMode = () => {
    setIsPowerMode((prev) => !prev);
  };

  return (
    <AnimationContext.Provider value={{ isPowerMode, togglePowerMode }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  
  // Fallback for SSR or when used outside Provider during initialization
  if (context === undefined) {
    return { 
      isPowerMode: false, 
      togglePowerMode: () => {} 
    };
  }
  
  return context;
}
