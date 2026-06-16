import { Hero } from "@/components/Hero";
import { Activity } from "@/components/Activity";
import { StackGrid } from "@/components/StackGrid";
import { SiGithub, SiX, SiHashnode } from "react-icons/si";

export default function Home() {
  return (
    <main className="min-h-svh flex justify-center bg-[var(--bg)]">
      <div className="flex flex-col relative w-full items-center" style={{ maxWidth: 700, minHeight: "100svh" }}>
        <div className="w-full max-w-[640px] px-4 pb-24 flex flex-col items-start">
          <div className="mt-32 w-full">
            <Hero />
          </div>

          <div className="w-full flex items-center justify-between mt-16 pt-8 border-t border-[var(--text)]/20">
            <div className="flex gap-6 items-center">
              <a href="https://github.com/aetosdios27" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] opacity-50 hover:opacity-100 transition-opacity">
                <SiGithub size={18} />
              </a>
              <a href="https://x.com/aetosdios_" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] opacity-50 hover:opacity-100 transition-opacity">
                <SiX size={18} />
              </a>
              <a href="https://hashnode.com/@aetosdios" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] opacity-50 hover:opacity-100 transition-opacity">
                <SiHashnode size={18} />
              </a>
            </div>
            
            <a 
              href="mailto:pushpendra@example.com" 
              className="group relative flex items-center gap-3 px-5 py-2.5 overflow-hidden border border-[var(--text)]/20 bg-[var(--bg)] transition-all duration-[400ms] hover:border-[var(--text)] no-underline"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              <div className="absolute inset-0 w-0 bg-[var(--text)] transition-all duration-[400ms] ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:w-full"></div>
              <span className="relative text-[13px] tracking-widest text-[var(--text)] group-hover:text-[var(--bg)] transition-colors duration-[400ms]">
                mail me
              </span>
              <div className="relative overflow-hidden w-3 h-3 flex items-center justify-center">
                <span className="absolute text-[var(--text)] group-hover:-translate-y-[150%] group-hover:opacity-0 transition-all duration-[400ms] ease-[cubic-bezier(0.85,0,0.15,1)] text-[12px]">
                  ↗
                </span>
                <span className="absolute translate-y-[150%] opacity-0 text-[var(--bg)] group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[400ms] ease-[cubic-bezier(0.85,0,0.15,1)] text-[12px]">
                  ↗
                </span>
              </div>
            </a>
          </div>

            <section className="mt-24 text-[15px] text-[var(--text)]" style={{ fontFamily: "var(--font-geist-mono)" }}>
              <h2 className="opacity-50 mb-8">a bit abt me</h2>
              <div className="space-y-6 leading-relaxed">
                <p>
                  i'm unreasonably curious and i can't ship something i'm not proud of. bad combination for sleep, good combination for software.
                </p>

                <ul className="list-disc ml-4 space-y-1">
                  <li>systems engineer</li>
                  <li>rust · typescript · go · and whatever the problem needs (raw vulkan, webgl, tauri, tokio...)</li>
                  <li>currently: Konto, Styx, Iris</li>
                </ul>

                <p>
                  my motto as a builder: make riches while scratching your itches
                </p>
              </div>
            </section>

          <section className="mt-24 text-[15px] text-[var(--text)] w-full" style={{ fontFamily: "var(--font-geist-mono)" }}>
            <h2 className="opacity-50 mb-8">activity</h2>
            <div className="w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <Activity />
            </div>
          </section>
        </div>
      </div>

    </main>
  );
}
