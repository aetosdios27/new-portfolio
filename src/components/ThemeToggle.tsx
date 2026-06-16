"use client"

import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    const isDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
    setDark(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  const toggle = (e: React.MouseEvent) => {
    const next = !dark
    
    if (!document.startViewTransition) {
      setDark(next)
      document.documentElement.classList.toggle("dark", next)
      localStorage.setItem("theme", next ? "dark" : "light")
      return
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setDark(next)
      document.documentElement.classList.toggle("dark", next)
      localStorage.setItem("theme", next ? "dark" : "light")
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 850,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "switch to light mode" : "switch to dark mode"}
      className="fixed top-8 right-8 z-50 flex items-center justify-center text-[var(--text)] opacity-45 hover:opacity-100 transition-opacity duration-200 outline-none"
    >
      <svg 
        viewBox="0 0 24 24" 
        width="20" 
        height="20" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        fill="none"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3 A 9 9 0 0 1 12 21 Z" fill="currentColor" />
      </svg>
    </button>
  )
}
