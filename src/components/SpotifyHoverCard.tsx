"use client";

import { motion } from "framer-motion";

export type SpotifyData = {
  isPlaying: boolean;
  isRecent?: boolean;
  isLockedIn?: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

export function SpotifyHoverCard({ data }: { data: SpotifyData | null }) {
  if (data && !data.isPlaying && !data.isRecent && !data.isLockedIn) return null;

  const isLoading = data === null;

  return (
    <motion.a
      href={isLoading ? undefined : data.songUrl}
      target={isLoading ? undefined : "_blank"}
      rel={isLoading ? undefined : "noopener noreferrer"}
      initial={{ opacity: 0, x: -10, scale: 0.95, filter: "blur(4px)" }}
      animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -10, scale: 0.95, filter: "blur(4px)" }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-50 left-full top-0 ml-6 w-64 bg-[var(--bg)] border border-[var(--text)]/20 shadow-[4px_4px_0px_var(--text)] p-3 flex gap-3 items-center group cursor-crosshair ${isLoading ? 'pointer-events-none' : 'no-underline'}`}
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      <div className="w-12 h-12 flex-shrink-0 border border-[var(--text)]/20 overflow-hidden relative bg-[var(--text)]/5 flex items-center justify-center">
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-[var(--text)]/20 border-t-[var(--text)] rounded-full animate-spin"></div>
        ) : (
          <>
            <img 
              src={data.albumImageUrl} 
              alt="Album Art" 
              className="w-full h-full object-cover grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-300"
            />
            {data.isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="w-1 bg-[var(--bg)] animate-[bounce_1s_infinite] h-2"></span>
                <span className="w-1 bg-[var(--bg)] animate-[bounce_1s_infinite_0.2s] h-3"></span>
                <span className="w-1 bg-[var(--bg)] animate-[bounce_1s_infinite_0.4s] h-1.5"></span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex flex-col justify-center overflow-hidden w-full">
        <div className="text-[9px] uppercase tracking-widest opacity-40 mb-1 flex items-center justify-between">
          <span>{isLoading ? "[ UPLINK ESTABLISHING ]" : (data?.isLockedIn ? "[ SILENCE DETECTED ]" : (data?.isPlaying ? "[ NOW PLAYING ]" : "[ LAST PLAYED ]"))}</span>
        </div>
        <div className="text-[12px] font-bold text-[var(--text)] truncate">
          {isLoading ? "decrypting telemetry..." : data?.title}
        </div>
        <div className="text-[10px] text-[var(--text)] opacity-60 truncate mt-0.5">
          {isLoading ? "standby" : data?.artist}
        </div>
      </div>
    </motion.a>
  );
}
