"use client";

import useSound from "use-sound";
import { useAnimation } from "@/context/AnimationContext";

export function usePremiumSound(soundPath: string, volume = 0.1) {
  const { isPowerMode } = useAnimation();
  
  const [play] = useSound(soundPath, { 
    volume,
    // Pre-check if sound should play
    soundEnabled: isPowerMode 
  });

  const safePlay = () => {
    try {
      play();
    } catch (e) {
      // Ignore sound errors
    }
  };

  return safePlay;
}
