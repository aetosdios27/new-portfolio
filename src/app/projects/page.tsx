import Link from "next/link";
import { getEntries } from "@/lib/content";
import { SiGithub } from "react-icons/si";

export default function ProjectsPage() {
  const projects = getEntries("projects");

  const repos: Record<string, string> = {
    "webnotes": "https://github.com/aetosdios27/WebNotes",
    "iris": "https://github.com/aetosdios27/iris",
    "vmrl": "https://github.com/aetosdios27/vmrl",
    "konto": "https://github.com/aetosdios27/Konto",
    "axiom-core": "https://github.com/aetosdios27/axiom-core",
    "styx": "https://github.com/aetosdios27/Styx",
  };

  const getHeroImage = (slug: string) => {
    const images: Record<string, string> = {
      "axiom-core": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
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
      "webnotes": "serverless crdt collaboration",
      "konto": "strict double-entry accounting",
      "styx": "production bittorrent client",
      "iris": "zero-copy vulkan image viewer",
      "axiom-core": "agent style guide registry",
      "vmrl": "mathematical simulation runtime"
    };
    return summaries[slug] || "SYSTEM OF RECORD // BRUTALIST ARCHITECTURE";
  };

  return (
    <main className="min-h-svh flex flex-col pt-32 pb-16">
      <div className="flex flex-col w-full max-w-[640px] mx-auto px-6 lg:px-0">        
        <div className="flex flex-col group/list w-full border-t border-[var(--text)]/20" style={{ fontFamily: "var(--font-geist-mono)" }}>
          {projects.map((project, i) => (
            <div 
              key={project.slug}
              className="relative w-full py-10 flex items-start border-b border-[var(--text)]/20 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/list:opacity-30 hover:!opacity-100 group/item"
            >
              {/* Background Mask Image */}
              <div className="absolute -inset-x-4 inset-y-0 pointer-events-none z-0 opacity-0 group-hover/item:opacity-20 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hidden md:block overflow-hidden">
                <img 
                  src={getHeroImage(project.slug)} 
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[var(--text)] mix-blend-color pointer-events-none"></div>
              </div>

              <div className="w-16 flex-shrink-0 text-[11px] opacity-50 mt-1.5 tracking-widest relative z-10">
                {(i + 1).toString().padStart(2, "0")}
              </div>
              <Link 
                href={`/projects/${project.slug}`}
                className="flex-1 flex flex-col items-start no-underline outline-none relative z-10"
                style={{ viewTransitionName: `project-${project.slug}` }}
              >
                <div className="relative flex items-center gap-4 w-full transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:translate-x-2">
                  <h2 className="text-xl font-bold tracking-tight text-[var(--text)] uppercase">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center w-[6px] h-[6px]">
                      <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: project.status === 'building' ? '#FF3333' : 'var(--live-badge)' }}></span>
                      <span className="relative inline-flex w-[6px] h-[6px] rounded-full" style={{ backgroundColor: project.status === 'building' ? '#FF3333' : 'var(--live-badge)' }}></span>
                    </div>
                    <span className="text-[10px] tracking-[0.2em] font-bold uppercase opacity-80 hidden sm:inline-block" style={{ color: project.status === 'building' ? '#FF3333' : 'var(--live-badge)' }}>
                      {project.status === 'building' ? 'BUILDING' : 'LIVE'}
                    </span>
                  </div>
                </div>
                <div className="text-[13px] opacity-70 text-[var(--text)] mt-3 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:translate-x-2">
                  {getProjectSummary(project.slug)}
                </div>
              </Link>
              <div className="flex flex-col items-end w-16 flex-shrink-0 gap-3 relative z-10">
                <div className="text-[11px] opacity-50 tracking-widest mt-1.5">
                  {project.year ?? project.date?.slice(0, 4)}
                </div>
                {repos[project.slug] && (
                  <a 
                    href={repos[project.slug]} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 -mr-2 opacity-40 hover:opacity-100 transition-opacity text-[var(--text)]"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <SiGithub size={20} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
