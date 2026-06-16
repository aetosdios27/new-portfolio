"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const words = ["build", "break", "shape"]

export function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="flex flex-col items-start gap-6 select-none"
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      <h1 className="text-[64px] leading-[0.95] tracking-tight text-[var(--text)]">
        aetos
      </h1>

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
  )
}
