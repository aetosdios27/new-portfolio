import Link from "next/link";
import Image from "next/image";
import { getEntries } from "@/lib/content";

export default function BlogPage() {
  const posts = getEntries("blog");

  return (
    <main className="min-h-svh flex flex-col pt-32 pb-16">
      <div className="flex flex-col w-full max-w-[640px] mx-auto px-6 lg:px-0">        
        <div className="flex flex-col group/list w-full border-t border-[var(--text)]/20" style={{ fontFamily: "var(--font-geist-mono)" }}>
          {posts.map((post, i) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="relative w-full py-10 flex items-start border-b border-[var(--text)]/20 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/list:opacity-30 hover:!opacity-100 group/item no-underline"
              style={{ viewTransitionName: `blog-${post.slug}` }}
            >
              {post.image && (
                <div className="absolute -inset-x-4 inset-y-0 pointer-events-none z-0 opacity-0 group-hover/item:opacity-20 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hidden md:block overflow-hidden">
                  <Image
                    src={post.image} 
                    alt=""
                    fill
                    sizes="640px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[var(--text)] mix-blend-color pointer-events-none"></div>
                </div>
              )}

              <div className="w-16 flex-shrink-0 text-[11px] opacity-50 mt-1.5 tracking-widest relative z-10">
                {(i + 1).toString().padStart(2, "0")}
              </div>
              <div className="flex-1 flex flex-col items-start relative z-10">
                <div className="relative flex items-center gap-4 w-full transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:translate-x-2">
                  <h2 className="text-xl font-bold tracking-tight text-[var(--text)]">
                    {post.title}
                  </h2>
                  {post.project && (
                    <div className="hidden sm:flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] px-2 py-0.5 border border-[var(--text)]/30 uppercase tracking-[0.2em] font-bold" style={{ color: "var(--text)" }}>
                        {post.project}
                      </span>
                    </div>
                  )}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="text-[13px] opacity-70 text-[var(--text)] mt-3 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:translate-x-2">
                    {post.tags.slice(0, 3).join(" · ")}
                  </div>
                )}
              </div>
              <div className="text-[11px] opacity-50 text-right w-20 mt-1.5 flex-shrink-0 tracking-widest relative z-10">
                {post.date ?? post.year}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
