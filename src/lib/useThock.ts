"use client";

import { useCallback, useRef, useEffect } from "react";

export function useThock() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload the audio file on mount so there's zero latency
    const audio = new Audio("/thock.wav");
    audio.volume = 0.5; // Mellow it out slightly so it's creamy, not abrasive
    audioRef.current = audio;
  }, []);

  return useCallback(() => {
    if (audioRef.current) {
      // Clone the node to allow rapid overlapping rapid-fire clicks
      const clone = audioRef.current.cloneNode() as HTMLAudioElement;
      clone.volume = 0.4 + Math.random() * 0.2; // slight volume humanization
      clone.preservesPitch = false; 
      if ('mozPreservesPitch' in clone) (clone as any).mozPreservesPitch = false;
      clone.playbackRate = 0.9 + Math.random() * 0.2; // pitch humanization for realism
      clone.play().catch(() => {}); // catch and ignore if autoplay is blocked
    }
  }, []);
}
