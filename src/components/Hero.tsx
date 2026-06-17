"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { KineticHeading } from "@/components/KineticHeading"
import { SpotifyHoverCard, type SpotifyData } from "@/components/SpotifyHoverCard"

const words = ["build", "break", "shape"]

export function Hero() {
  const [idx, setIdx] = useState(0)
  const [isHoveringPfp, setIsHoveringPfp] = useState(false)
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null)

  useEffect(() => {
    // Eager fetch for zero-latency hover interactions
    fetch("/api/spotify")
      .then((res) => res.json())
      .then((data) => setSpotifyData(data))
      .catch(() => setSpotifyData({ isPlaying: false }))
      
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="flex items-start justify-between w-full select-none"
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      <div className="flex flex-col gap-6">
        <KineticHeading as="h1" className="text-[64px] leading-[0.95] tracking-tight text-[var(--text)] mt-[-4px]">
          aetos
        </KineticHeading>

        <p className="flex items-center gap-[6px] text-[15px] text-[var(--text)] opacity-50 whitespace-nowrap" style={{ fontFamily: "var(--font-geist-mono)" }}>
          <span>i</span>
          <span className="relative flex items-center justify-center" style={{ width: 48, height: "1.2em" }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={words[idx]}
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -6, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {words[idx]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span>systems</span>
        </p>
      </div>

      <div 
        className="group relative w-28 h-28 border border-[var(--text)]/20 p-1 bg-[var(--bg)] shadow-[2px_2px_0px_var(--text)] transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:border-[var(--text)] cursor-crosshair"
        onMouseEnter={() => setIsHoveringPfp(true)}
        onMouseLeave={() => setIsHoveringPfp(false)}
      >
        <AnimatePresence>
          {isHoveringPfp && (
            <SpotifyHoverCard data={spotifyData} />
          )}
        </AnimatePresence>

        <img 
          src="/pfp.jpg" 
          alt="aetos" 
          className="w-full h-full object-cover grayscale mix-blend-luminosity transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:scale-[1.02]"
        />
      </div>
    </div>
  )
}
