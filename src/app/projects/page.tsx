import Link from "next/link";
import { getEntries } from "@/lib/content";

export default function ProjectsPage() {
  const projects = getEntries("projects");

  return (
    <main className="min-h-svh flex flex-col pt-32 pb-16">
      <div className="flex flex-col w-full max-w-[640px] mx-auto px-6 lg:px-0">        
        <div className="grid grid-cols-1 gap-px bg-[var(--text)]/20 border border-[var(--text)]/20" style={{ fontFamily: "var(--font-geist-mono)" }}>
          {projects.map((project, i) => (
            <Link 
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="relative p-5 bg-[var(--bg)] flex flex-col justify-between transition-colors duration-150 ease-in-out group cursor-crosshair hover:bg-[var(--text)] hover:text-[var(--bg)] no-underline"
              style={{ viewTransitionName: `project-${project.slug}` }}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs opacity-50 group-hover:opacity-100 group-hover:text-[var(--bg)]">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span className="text-xs opacity-50 group-hover:opacity-100 group-hover:text-[var(--bg)]">
                  {project.year ?? project.date?.slice(0, 4)}
                </span>
              </div>
              <div>
                <h2 className="text-[17px] font-bold tracking-tight group-hover:text-[var(--bg)] mb-1">
                  {project.title}
                </h2>
                <div className="text-[13px] opacity-70 group-hover:text-[var(--bg)] group-hover:opacity-100 truncate mt-2">
                  {project.tags.slice(0, 3).join(" · ")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
