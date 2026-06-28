import { Hero } from "@/components/Hero";
import { Activity } from "@/components/Activity";
import { Skills } from "@/components/Skills";
import { KineticHeading } from "@/components/KineticHeading";
import { SocialPreviewCard } from "@/components/SocialPreviewCard";
import { FlightBoard } from "@/components/FlightBoard";
import { getGithubData, getHashnodeData, getTwitterFallbackData } from "@/lib/socials";
import { getEntry } from "@/lib/content";
import { SiGithub, SiX, SiHashnode } from "react-icons/si";

export default async function Home() {
  const [githubData, hashnodeData, twitterData] = await Promise.all([
    getGithubData("aetosdios27"),
    getHashnodeData("aetosdios"),
    getTwitterFallbackData("aetosdios_")
  ]);

  const pinnedSlugs = ["webnotes", "konto", "styx", "iris", "axiom-core"];
  const pinnedProjects = pinnedSlugs
    .map(slug => getEntry("projects", slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)
    .map(p => ({
      title: p.title,
      slug: p.slug,
      year: p.year,
      status: p.status,
      tags: p.tags,
      links: p.links
    }))
    .sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0));

  return (
    <main className="min-h-svh flex justify-center bg-[var(--bg)]">
      <div className="flex flex-col relative w-full items-center" style={{ maxWidth: 700, minHeight: "100svh" }}>
        <div className="w-full max-w-[640px] px-4 pb-24 flex flex-col items-start">
          <div className="mt-24 sm:mt-32 w-full">
            <Hero />
          </div>

          <div className="w-full flex items-center justify-between mt-8 sm:mt-12 py-6 sm:py-8 border-y border-[var(--text)]/20">
            <div className="flex gap-4 sm:gap-6 items-center">
              <div className="group relative flex items-center justify-center">
                <a href="https://github.com/aetosdios27" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] opacity-50 hover:opacity-100 transition-opacity">
                  <SiGithub size={18} />
                </a>
                <SocialPreviewCard data={githubData} position="bottom" />
              </div>

              <div className="group relative flex items-center justify-center">
                <a href="https://x.com/aetosdios_" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] opacity-50 hover:opacity-100 transition-opacity">
                  <SiX size={18} />
                </a>
                <SocialPreviewCard data={twitterData} position="bottom" />
              </div>

              <div className="group relative flex items-center justify-center">
                <a href="https://hashnode.com/@aetosdios" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] opacity-50 hover:opacity-100 transition-opacity">
                  <SiHashnode size={18} />
                </a>
                <SocialPreviewCard data={hashnodeData} position="bottom" />
              </div>
            </div>
            
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=aetosdios27@gmail.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-5 py-2.5 border border-[var(--text)]/20 bg-[var(--bg)] transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[2px_2px_0px_var(--text),inset_0_0_0_1px_var(--text)] hover:border-[var(--text)] active:translate-x-0 active:translate-y-0 active:shadow-none no-underline"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              <span className="relative text-[13px] tracking-widest text-[var(--text)] transition-colors duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                mail me
              </span>
              <div className="relative w-3 h-3 flex items-center justify-center">
                <span className="text-[var(--text)] transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] text-[15px] group-hover:rotate-45">
                  ↗
                </span>
              </div>
            </a>
          </div>

          <section className="mt-16 text-[15px] text-[var(--text)] w-full" style={{ fontFamily: "var(--font-geist-mono)" }}>
            <KineticHeading className="text-xl font-bold tracking-tight text-[var(--text)] mb-8">
              a bit abt me
            </KineticHeading>
            <div className="space-y-6 leading-relaxed">
              <p>
                i&apos;m unreasonably curious and i can&apos;t ship something i&apos;m not proud of. bad combination for sleep, good combination for software.
              </p>

              <ul className="list-disc ml-4 space-y-1">
                <li>systems engineer</li>
                <li>rust · typescript · go · and whatever the problem needs (raw vulkan, webgl, tauri, tokio...)</li>
                <li>currently working on: konto, styx, iris</li>
              </ul>

              <p>
                my motto as a builder: make riches while scratching your itches
              </p>
            </div>
          </section>

          <section className="mt-20 w-full">
            <KineticHeading className="text-xl font-bold tracking-tight text-[var(--text)] mb-8" style={{ fontFamily: "var(--font-geist-mono)" }}>
              pinned projects
            </KineticHeading>
            <FlightBoard projects={pinnedProjects} />
          </section>

          <section className="mt-20 w-full">
            <KineticHeading className="text-xl font-bold tracking-tight text-[var(--text)] mb-8" style={{ fontFamily: "var(--font-geist-mono)" }}>
              activity
            </KineticHeading>
            <div className="w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <Activity />
            </div>
          </section>

          <section className="mt-20 w-full">
            <KineticHeading className="text-xl font-bold tracking-tight text-[var(--text)] mb-8" style={{ fontFamily: "var(--font-geist-mono)" }}>
              stack
            </KineticHeading>
            <Skills />
          </section>
        </div>
      </div>
    </main>
  );
}
