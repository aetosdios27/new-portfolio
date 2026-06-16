import { getEntry, getEntries } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return getEntries("blog").map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getEntry("blog", params.slug);
  
  if (!post) notFound();

  // Parse body for standard markdown-style paragraphs
  const paragraphs = post.body.split(/\n\n+/).filter(Boolean);
    
  return (
    <main className="min-h-svh flex flex-col pt-32 pb-32">
      <div className="flex flex-col w-full max-w-[640px] mx-auto px-6 lg:px-0">
        <Link href="/blog" className="text-sm opacity-50 hover:opacity-100 no-underline mb-12 flex items-center gap-2 w-fit">
          <ArrowLeft size={14} /> back to log
        </Link>
        
        <div style={{ viewTransitionName: `blog-${post.slug}` }}>
          <div className="flex justify-between items-baseline mb-4">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            {(post.date ?? post.year) && (
              <span className="text-sm opacity-50 font-mono">
                {post.date ?? post.year}
              </span>
            )}
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-16">
              {post.tags.map(tag => (
                <span key={tag} className="text-[11px] px-2 py-1 bg-[var(--text)]/10 text-[var(--text)] border border-[var(--text)]/20 uppercase tracking-widest" style={{ fontFamily: "var(--font-geist-mono)" }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="space-y-8 leading-relaxed text-[15px]">
            {paragraphs.map((paragraph, idx) => {
              if (paragraph.startsWith('##')) {
                return (
                  <h2 key={idx} className="text-lg font-bold mt-12 mb-4">
                    {paragraph.replace(/^##\s+/, '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={idx} className="text-sm font-bold opacity-50 mt-8 mb-2" style={{ fontFamily: "var(--font-geist-mono)" }}>
                    {paragraph.replace(/^###\s+/, '')}
                  </h3>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
          
          {post.links && (
            <div className="mt-20 pt-8 border-t border-[var(--text)]/20">
              <h3 className="text-xs font-bold opacity-50 mb-4 tracking-widest" style={{ fontFamily: "var(--font-geist-mono)" }}>[ LINKS ]</h3>
              <div className="flex flex-col gap-3">
                {Object.entries(post.links).map(([label, href]) => (
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
