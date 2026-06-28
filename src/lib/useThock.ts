"use client";

import { useCallback, useRef } from "react";

export function useThock() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  return useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextConstructor =
          window.AudioContext ??
          (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

        if (!AudioContextConstructor) return;

        audioCtxRef.current = new AudioContextConstructor();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const t = ctx.currentTime;

      // 1. The "Thump" (Low frequency resonance of the board)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.05); // pitch drop
      
      oscGain.gain.setValueAtTime(0, t);
      oscGain.gain.linearRampToValueAtTime(0.8, t + 0.005);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08); // creamy fast fade

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      
      osc.start(t);
      osc.stop(t + 0.1);

      // 2. The "Click" (Plastic switch bottoming out)
      const bufferSize = ctx.sampleRate * 0.02; // 20ms of noise
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1; // white noise
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "lowpass"; // muffle the click to make it creamy
      noiseFilter.frequency.value = 1200; // roll off sharp highs
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0, t);
      noiseGain.gain.linearRampToValueAtTime(0.3, t + 0.002);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.02); // very fast plastic click

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      noise.start(t);
      
    } catch {
      // Browser audio blocked or unsupported, silently fail
      console.warn("Web Audio API not supported or blocked");
    }
  }, []);
}
