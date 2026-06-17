"use client";

import { skills } from "@/lib/skills";

import { useThock } from "@/lib/useThock";

export function SkillBadge({ name, Icon, className = "" }: { name: string, Icon: React.ElementType, className?: string }) {
  const playThock = useThock();

  return (
    <button 
      onPointerDown={(e) => {
        // Prevent default to avoid focusing the button and keeping it outlined/active in some browsers
        e.preventDefault();
        playThock();
      }}
      className={`group flex justify-center items-center gap-2.5 px-3.5 py-2 border border-[var(--text)]/20 bg-[var(--bg)] transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[2px_2px_0px_var(--text),inset_0_0_0_1px_var(--text)] hover:border-[var(--text)] active:translate-x-0 active:translate-y-0 active:shadow-none cursor-crosshair ${className}`}
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      <Icon className="w-4 h-4 text-[var(--text)] transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-125 group-hover:rotate-12 group-active:scale-100 group-active:rotate-0" />
      <span className="text-[12px] tracking-widest text-[var(--text)]">
        {name.toLowerCase()}
      </span>
    </button>
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
