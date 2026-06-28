"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

interface ProjectData {
  title: string
  slug: string
  year?: number
  status?: string
  tags: string[]
  links?: Record<string, string>
}

interface FlightBoardProps {
  projects: ProjectData[]
}

const getHeroImage = (slug: string) => {
  const images: Record<string, string> = {
    "axiom-core": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    axiom: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    konto: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80",
    webnotes: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
    vmrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&q=80",
    iris: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    styx: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
  };
  return images[slug] || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80";
};

const getProjectSummary = (slug: string) => {
  const summaries: Record<string, string> = {
    "webnotes": "local-first collaborative notes app powered by serverless crdts",
    "konto": "mathematically strict double-entry accounting engine for typescript",
    "styx": "production-grade bittorrent client engineered in rust for privacy",
    "iris": "zero-copy vulkan image viewer featuring hardware-accelerated rendering",
    "axiom-core": "unified registry and cli for ai agent style guide schemas",
    "vmrl": "high-performance mathematical runtime and simulation framework"
  };
  return summaries[slug] || "SYSTEM OF RECORD // BRUTALIST ARCHITECTURE";
};

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

function ScrambleText({ text, isHovered }: { text: string; isHovered: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      return;
    }

    let frame = 0;
    const maxFrames = 15; // Approx 150ms at 60fps

    const animate = () => {
      frame++;
      if (frame >= maxFrames) {
        setDisplayText(text);
        return;
      }

      const scrambled = text
        .split("")
        .map((char) => {
          if (char === " ") return " ";
          return Math.random() > 0.3 ? CHARS[Math.floor(Math.random() * CHARS.length)] : char;
        })
        .join("");

      setDisplayText(scrambled);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isHovered, text]);

  return <>{displayText}</>;
}

export function FlightBoard({ projects }: FlightBoardProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div className="w-full border-t border-[var(--text)]/20 flex flex-col" style={{ fontFamily: "var(--font-geist-mono)" }}>
      {projects.map((project) => {
        const isHovered = hoveredSlug === project.slug;
        const isBuilding = project.status === 'building';
        const colorHex = isBuilding ? '#FF3333' : 'var(--live-badge)';
        const statusText = isBuilding ? 'BUILDING' : 'LIVE';

        return (
          <div 
            key={project.slug}
            className="group block w-full border-b border-[var(--text)]/20 hover:bg-[var(--text)]/5 transition-colors duration-0 cursor-pointer"
            onMouseEnter={() => setHoveredSlug(project.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
            onClick={() => setHoveredSlug(isHovered ? null : project.slug)}
          >
            {/* The Ledger Row (Always Visible) */}
            <div className="flex items-center justify-between py-3 px-2 w-full">
              <div className="flex items-center gap-4 sm:gap-8">
                <span className="text-[12px] opacity-40">[{project.year}]</span>
                <Link 
                  href={`/projects/${project.slug}`} 
                  onClick={(e) => e.stopPropagation()}
                  className="text-[14px] font-bold tracking-tight text-[var(--text)] uppercase m-0 min-w-[100px] hover:underline no-underline"
                >
                  <ScrambleText text={project.title} isHovered={isHovered} />
                </Link>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-[6px] h-[6px]">
                    <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: colorHex }}></span>
                    <span className="relative inline-flex w-[6px] h-[6px] rounded-full" style={{ backgroundColor: colorHex }}></span>
                  </div>
                  <span className="text-[10px] tracking-[0.1em] opacity-60 hidden sm:inline-block" style={{ color: colorHex }}>
                    {statusText}
                  </span>
                </div>
                <Link 
                  href={`/projects/${project.slug}`}
                  onClick={(e) => {
                    if (!isHovered) {
                      e.preventDefault();
                    } else {
                      e.stopPropagation();
                    }
                  }}
                  className="text-[12px] font-bold opacity-40 group-hover:opacity-100 transition-all text-[var(--text)] no-underline flex items-center"
                >
                  <span className="inline-block transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 text-[15px] leading-none">
                    ↗
                  </span>
                </Link>
              </div>
            </div>

            {/* The Hidden Compartment (Viewport Slice) */}
            <div 
              className={`w-full grid transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden min-h-0 w-full">
                <div className="p-4 pt-0 w-full h-[240px] flex flex-col">
                  <Link 
                    href={`/projects/${project.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="relative block w-full h-full border border-[var(--text)]/20 bg-[var(--text)]/5 overflow-hidden group-hover:shadow-[4px_4px_0px_var(--text)] transition-shadow duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    <Image
                      src={getHeroImage(project.slug)} 
                      alt={project.title}
                      fill
                      sizes="608px"
                      className="object-cover grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-0"
                    />
                    
                    {/* The Project Summary Ticker (Marquee) */}
                    <div className="absolute bottom-0 left-0 w-full border-t border-[var(--text)]/20 bg-[var(--bg)]/90 backdrop-blur-sm overflow-hidden flex">
                      <div className="whitespace-nowrap py-1.5 flex animate-[marquee_30s_linear_infinite]">
                        {[...Array(4)].map((_, i) => (
                          <span key={i} className="text-[9px] tracking-widest uppercase text-[var(--text)] mx-4">
                            {`// ${getProjectSummary(project.slug)} //`}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
