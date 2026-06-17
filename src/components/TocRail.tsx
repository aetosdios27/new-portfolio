"use client";

import { useEffect, useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";

export type HeadingInfo = {
  text: string;
  slug: string;
  level: number;
};

type HeadingNode = HeadingInfo & { children: HeadingInfo[] };

export function TocRail({ headings }: { headings: HeadingInfo[] }) {
  const [activeSlug, setActiveSlug] = useState<string>("");
  const [expandedOverrides, setExpandedOverrides] = useState<Record<string, boolean>>({});

  // 1. Group flat headings array into nested H2 -> H3[]
  const groupedHeadings = useMemo(() => {
    const result: HeadingNode[] = [];
    let currentH2: HeadingNode | null = null;
    
    headings.forEach((h) => {
      if (h.level === 2) {
        currentH2 = { ...h, children: [] };
        result.push(currentH2);
      } else if (h.level === 3 && currentH2) {
        currentH2.children.push(h);
      } else {
        result.push({ ...h, children: [] });
      }
    });
    return result;
  }, [headings]);

  // 2. Identify which H2 tree is currently "active"
  const activeH2Slug = useMemo(() => {
    const activeIdx = headings.findIndex((h) => h.slug === activeSlug);
    if (activeIdx !== -1) {
      if (headings[activeIdx].level === 2) {
        return headings[activeIdx].slug;
      } else {
        for (let i = activeIdx - 1; i >= 0; i--) {
          if (headings[i].level === 2) return headings[i].slug;
        }
      }
    }
    return "";
  }, [headings, activeSlug]);

  // 3. Auto-clear manual collapse when a user actively scrolls into a section
  // Ensures the active reading section is never hidden from the user.
  useEffect(() => {
    if (activeH2Slug) {
      setExpandedOverrides((prev) => {
        if (prev[activeH2Slug] === false) {
          const next = { ...prev };
          delete next[activeH2Slug];
          return next;
        }
        return prev;
      });
    }
  }, [activeH2Slug]);

  // 4. Scrollspy Intersection Observer engine
  useEffect(() => {
    if (headings.length === 0) return;

    const headingElements = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -80% 0px" }
    );

    headingElements.forEach((el) => observer.observe(el));

    let timeoutId: number;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const scrollPosition = window.scrollY;
        for (let i = headingElements.length - 1; i >= 0; i--) {
          const el = headingElements[i];
          if (el.offsetTop <= scrollPosition + 200) {
            setActiveSlug(el.id);
            break;
          }
        }
      }, 50);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  const toggleExpand = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedOverrides((prev) => {
      const isCurrentlyExpanded = prev[slug] ?? (activeH2Slug === slug);
      return { ...prev, [slug]: !isCurrentlyExpanded };
    });
  };

  return (
    <div className="flex flex-col gap-1.5 font-mono text-[12px] uppercase tracking-widest text-[var(--text)] w-full">
      <div className="text-[10px] opacity-30 mb-3 border-b border-[var(--text)]/20 pb-2">
        [ index ]
      </div>
      {groupedHeadings.map((h2) => {
        // Effective state merges manual overrides with the auto-scrollspy target
        const isExpanded = expandedOverrides[h2.slug] ?? (activeH2Slug === h2.slug);
        const isH2Active = activeSlug === h2.slug;
        const hasChildren = h2.children.length > 0;

        return (
          <div key={h2.slug} className="flex flex-col w-full group">
            {/* H2 Parent Row */}
            <div className="flex items-start justify-between w-full py-1.5">
              <a
                href={`#${h2.slug}`}
                className={`
                  flex-1 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] no-underline
                  hover:opacity-100 leading-relaxed
                  ${isH2Active ? "opacity-100 font-bold translate-x-2" : "opacity-40"}
                `}
              >
                {h2.text}
              </a>
              {hasChildren && (
                <button
                  onClick={(e) => toggleExpand(h2.slug, e)}
                  className="p-1 opacity-20 hover:opacity-100 transition-opacity flex-shrink-0 cursor-pointer ml-2 mt-0.5"
                  aria-label="Toggle section"
                >
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
              )}
            </div>

            {/* H3 Sub-items Grid Animation */}
            {hasChildren && (
              <div 
                className={`grid transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-0.5 mb-2" : "grid-rows-[0fr] opacity-0 mt-0 mb-0"}`}
              >
                <div className="overflow-hidden min-h-0 flex flex-col gap-1 border-l border-[var(--text)]/20 ml-2">
                  <div className="flex flex-col gap-1.5 py-1">
                    {h2.children.map((h3) => {
                      const isH3Active = activeSlug === h3.slug;
                      return (
                        <a
                          key={h3.slug}
                          href={`#${h3.slug}`}
                          className={`
                            pl-4 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] no-underline
                            hover:opacity-100 leading-relaxed text-[11px]
                            ${isH3Active ? "opacity-100 font-bold translate-x-1" : "opacity-40"}
                          `}
                        >
                          {h3.text}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
