import { 
  SiRust, SiTypescript, SiGo, SiPostgresql, SiReact, SiNextdotjs, SiTauri, 
  SiVulkan, SiRedis, SiNodedotjs, SiExpress, SiMongodb, SiPrisma, SiTailwindcss, 
  SiFramer, SiGreensock, SiPython, SiCplusplus, SiGit, SiGithub, 
  SiFigma, SiDocker, SiLinux, SiBun, SiShadcnui, SiSupabase, SiZod, SiTurborepo,
  SiTrpc, SiAstro, SiSolidity
} from "react-icons/si";
import { GiBearFace } from "react-icons/gi";
import { BsDatabase } from "react-icons/bs";

export const skills = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Bun", icon: SiBun },
  { name: "Go", icon: SiGo },
  { name: "Rust", icon: SiRust },
  { name: "SQL", icon: BsDatabase },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Supabase", icon: SiSupabase },
  { name: "Redis", icon: SiRedis },
  { name: "Prisma", icon: SiPrisma },
  { name: "Zustand", icon: GiBearFace },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "shadcn/ui", icon: SiShadcnui },
  { name: "Motion", icon: SiFramer },
  { name: "GSAP", icon: SiGreensock },
  { name: "Python", icon: SiPython },
  { name: "C/C++", icon: SiCplusplus },
  { name: "Express", icon: SiExpress },
  { name: "Docker", icon: SiDocker },
  { name: "Linux", icon: SiLinux },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "Figma", icon: SiFigma },
  { name: "Tauri", icon: SiTauri },
  { name: "Vulkan", icon: SiVulkan },
  { name: "Zod", icon: SiZod },
  { name: "Turborepo", icon: SiTurborepo },
  { name: "tRPC", icon: SiTrpc },
  { name: "Astro", icon: SiAstro },
  { name: "Solidity", icon: SiSolidity },
];

export function SkillBadge({ name, Icon, className = "" }: { name: string, Icon: React.ElementType, className?: string }) {
  return (
    <div 
      className={`group flex justify-center items-center gap-2.5 px-3.5 py-2 border border-[var(--text)]/20 bg-[var(--bg)] transition-all duration-75 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[2px_2px_0px_var(--text),inset_0_0_0_1px_var(--text)] hover:border-[var(--text)] cursor-crosshair ${className}`}
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      <Icon className="w-4 h-4 text-[var(--text)] transition-transform duration-75 group-hover:scale-125 group-hover:rotate-12" />
      <span className="text-[12px] tracking-widest text-[var(--text)]">
        {name.toLowerCase()}
      </span>
    </div>
  );
}

export function Skills() {
  return (
    <div className="flex flex-wrap gap-2.5 select-none">
      {skills.map((skill) => (
        <SkillBadge key={skill.name} name={skill.name} Icon={skill.icon} className="flex-grow" />
      ))}
    </div>
  );
}
