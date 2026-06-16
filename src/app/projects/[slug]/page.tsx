import { getEntry, getEntries } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return getEntries("projects").map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getEntry("projects", params.slug);
  
  if (!project) notFound();

  // Parse body for [ bullet ] sections
  const sections = project.body
    .split(/\n(?=\/\/|\[)/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
    
  return (
    <main className="min-h-svh flex flex-col pt-32 pb-32">
      <div className="flex flex-col w-full max-w-[640px] mx-auto px-6 lg:px-0">
        <Link href="/projects" className="text-sm opacity-50 hover:opacity-100 no-underline mb-12 flex items-center gap-2 w-fit">
          <ArrowLeft size={14} /> back to work
        </Link>
        
        <div style={{ viewTransitionName: `project-${project.slug}` }}>
          <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-16">
            {project.tags.map(tag => (
              <span key={tag} className="text-[11px] px-2 py-1 bg-[var(--text)]/10 text-[var(--text)] border border-[var(--text)]/20 uppercase tracking-widest" style={{ fontFamily: "var(--font-geist-mono)" }}>
                {tag}
              </span>
            ))}
          </div>
          
          <div className="space-y-12 leading-relaxed text-[15px]">
            {sections.map((section, idx) => {
              const [first, ...rest] = section.split("\n");
              const isBullet = first.includes('bullet');
              const heading = isBullet ? null : first;
              const content = isBullet ? rest.join("\n") : rest.join("\n");
              
              if (!content.trim() && !heading) return null;
              
              return (
                <div key={idx} className="epv-section">
                  {heading && <h3 className="text-sm font-bold opacity-50 mb-2" style={{ fontFamily: "var(--font-geist-mono)" }}>{heading}</h3>}
                  {isBullet ? (
                    <div className="flex gap-4">
                      <span className="opacity-50 mt-[2px] leading-relaxed">~</span>
                      <p className="flex-1 leading-relaxed">{content.trim()}</p>
                    </div>
                  ) : (
                    content.split(/\n\n+/).map((paragraph, i) => (
                      <p key={i} className="leading-relaxed">{paragraph}</p>
                    ))
                  )}
                </div>
              );
            })}
          </div>
          
          {project.links && (
            <div className="mt-20 pt-8 border-t border-[var(--text)]/20">
              <h3 className="text-xs font-bold opacity-50 mb-4 tracking-widest" style={{ fontFamily: "var(--font-geist-mono)" }}>[ LINKS ]</h3>
              <div className="flex flex-col gap-3">
                {Object.entries(project.links).map(([label, href]) => (
                  <a key={label} href={href as string} target="_blank" rel="noopener noreferrer" className="no-underline hover:opacity-70 flex items-center gap-3 text-sm">
                    <span className="opacity-50 font-mono">-&gt;</span> {label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
