import { SocialData } from "@/lib/socials";
import { SiGithub, SiX, SiHashnode } from "react-icons/si";

interface SocialPreviewCardProps {
  data: SocialData | null;
  position?: "top" | "bottom";
}

export function SocialPreviewCard({ data, position = "top" }: SocialPreviewCardProps) {
  if (!data) return null;

  const Icon = data.platform === "GitHub" ? SiGithub : data.platform === "Hashnode" ? SiHashnode : SiX;

  const positionClasses = position === "top" 
    ? "bottom-full mb-4 left-1/2 -translate-x-1/2 origin-bottom"
    : "top-full mt-4 left-1/2 -translate-x-1/2 origin-top";

  return (
    <div 
      className={`absolute z-50 w-72 p-4 bg-[var(--bg)] border border-[var(--text)] shadow-[4px_4px_0px_var(--text)] transition-all duration-[150ms] ease-out pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 ${positionClasses}`}
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      {/* Platform Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 border border-[var(--text)]/20 p-0.5 bg-[var(--bg)] shadow-[2px_2px_0px_var(--text)]">
            <img 
              src="/pfp.jpg" 
              alt={data.handle}
              className="w-full h-full object-cover grayscale mix-blend-luminosity"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-[var(--text)] tracking-tight">
              {data.platform}
            </span>
            <span className="text-[12px] text-[var(--text)] opacity-50">
              @{data.handle}
            </span>
          </div>
        </div>
        <div className="text-[var(--text)] opacity-100">
          <Icon size={20} />
        </div>
      </div>

      {/* Bio */}
      <p className="text-[13px] leading-relaxed text-[var(--text)] opacity-90 mb-4 line-clamp-3">
        {data.bio}
      </p>

      {/* Location */}
      {data.location && (
        <div className="flex items-center gap-2 text-[12px] text-[var(--text)] opacity-60 mb-4">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>{data.location}</span>
        </div>
      )}

      {/* Metrics Ledger */}
      <div className="flex items-center gap-6 pt-3 border-t border-[var(--text)]/20">
        {data.metrics.map((metric, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-[14px] font-bold text-[var(--text)]">
              {metric.value}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[var(--text)] opacity-50">
              {metric.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
