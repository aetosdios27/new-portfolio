import { getEntry, getEntries } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SkillBadge, skills } from "@/components/Skills";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getEntry("projects", resolvedParams.slug);
  
  if (!project) notFound();

  // Parse body for [ bullet ] sections
  const sections = project.body
    .split(/\n(?=\/\/|\[)/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
    
  const getHeroImage = (slug: string) => {
    const images: Record<string, string> = {
      axiom: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
      konto: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80",
      webnotes: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
      vmrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&q=80",
      iris: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
      styx: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    };
    return images[slug] || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80";
  };

  return (
    <main className="min-h-svh flex flex-col justify-center py-12">
      <div className="flex flex-col w-full max-w-[640px] mx-auto px-6 lg:px-0">
        <Link href="/projects" className="text-sm opacity-50 hover:opacity-100 no-underline mb-12 flex items-center gap-2 w-fit">
          <ArrowLeft size={14} /> back to work
        </Link>
        
        <div style={{ viewTransitionName: `project-${project.slug}` }}>
          {/* Brutalist Hero Media Block */}
          <div className="w-full aspect-[21/9] border border-[var(--text)]/20 mb-8 overflow-hidden relative bg-[var(--bg)]">
            <img 
              src={getHeroImage(project.slug)} 
              alt={`${project.title} hero image`}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-[var(--text)] mix-blend-color pointer-events-none"></div>
          </div>

          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold tracking-tight uppercase" style={{ fontFamily: "var(--font-geist-mono)" }}>{project.title}</h1>
            <div className="flex items-center gap-3 border border-[var(--text)]/20 px-3 py-1.5 bg-[var(--bg)] shadow-[2px_2px_0px_var(--text)]">
              <div className="relative flex items-center justify-center w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: project.status === 'building' ? '#FF3333' : 'var(--live-badge)' }}></span>
                <span className="relative inline-flex w-2 h-2 rounded-full" style={{ backgroundColor: project.status === 'building' ? '#FF3333' : 'var(--live-badge)' }}></span>
              </div>
              <span className="text-[10px] font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-geist-mono)", color: project.status === 'building' ? '#FF3333' : 'var(--live-badge)' }}>
                {project.status === 'building' ? 'BUILDING' : 'LIVE'}
              </span>
            </div>
          </div>

          {/* Project Abstract */}
          {sections[0] && (
            <div className="mb-12 text-[15px] leading-relaxed opacity-90">
              {sections[0]}
            </div>
          )}

          {/* Action Ledger */}
          {project.links && (
            <div className="flex flex-wrap gap-4 mb-12">
              {Object.entries(project.links).map(([label, href]) => (
                <a 
                  key={label} 
                  href={href as string} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative flex items-center justify-between gap-3 px-5 py-2.5 border border-[var(--text)]/20 bg-[var(--bg)] transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[2px_2px_0px_var(--text),inset_0_0_0_1px_var(--text)] hover:border-[var(--text)] active:translate-x-0 active:translate-y-0 active:shadow-none no-underline"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  <span className="relative text-[11px] font-bold tracking-widest uppercase text-[var(--text)] transition-colors duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {label}
                  </span>
                  <div className="relative w-3 h-3 flex items-center justify-center">
                    <span className="text-[var(--text)] transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] text-[15px] group-hover:rotate-45">
                      ↗
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold opacity-50 tracking-widest mb-2" style={{ fontFamily: "var(--font-geist-mono)" }}>[ STACK ]</h3>
            <div className="flex flex-wrap gap-2.5">
              {project.tags.map(tag => {
                const skillData = skills.find(s => s.name.toLowerCase() === tag.toLowerCase());
                if (skillData && skillData.icon) {
                  return <SkillBadge key={tag} name={skillData.name} Icon={skillData.icon} />;
                }
                return (
                  <span key={tag} className="text-[11px] px-2 py-1 bg-[var(--text)]/10 text-[var(--text)] border border-[var(--text)]/20 uppercase tracking-widest" style={{ fontFamily: "var(--font-geist-mono)" }}>
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
