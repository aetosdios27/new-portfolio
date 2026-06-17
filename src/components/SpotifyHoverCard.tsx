"use client";

import { motion } from "framer-motion";

export type SpotifyData = {
  isPlaying: boolean;
  isRecent?: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

export function SpotifyHoverCard({ data }: { data: SpotifyData }) {
  if (!data || (!data.isPlaying && !data.isRecent)) return null;

  return (
    <motion.a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -10, scale: 0.95, filter: "blur(4px)" }}
      animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -10, scale: 0.95, filter: "blur(4px)" }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute z-50 left-full top-0 ml-6 w-64 bg-[var(--bg)] border border-[var(--text)]/20 shadow-[4px_4px_0px_var(--text)] p-3 flex gap-3 items-center group cursor-crosshair no-underline"
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      <div className="w-12 h-12 flex-shrink-0 border border-[var(--text)]/20 overflow-hidden relative">
        <img 
          src={data.albumImageUrl} 
          alt="Album Art" 
          className="w-full h-full object-cover grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-300"
        />
        {/* Brutalist Equalizer overlay if playing */}
        {data.isPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="w-1 bg-[var(--bg)] animate-[bounce_1s_infinite] h-2"></span>
            <span className="w-1 bg-[var(--bg)] animate-[bounce_1s_infinite_0.2s] h-3"></span>
            <span className="w-1 bg-[var(--bg)] animate-[bounce_1s_infinite_0.4s] h-1.5"></span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center overflow-hidden w-full">
        <div className="text-[9px] uppercase tracking-widest opacity-40 mb-1 flex items-center justify-between">
          <span>{data.isPlaying ? "[ NOW PLAYING ]" : "[ LAST PLAYED ]"}</span>
        </div>
        <div className="text-[12px] font-bold text-[var(--text)] truncate">
          {data.title}
        </div>
        <div className="text-[10px] text-[var(--text)] opacity-60 truncate mt-0.5">
          {data.artist}
        </div>
      </div>
    </motion.a>
  );
}
